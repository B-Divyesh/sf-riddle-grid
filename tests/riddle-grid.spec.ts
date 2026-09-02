import { chromium, expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { puzzleForDate, puzzles, validatePuzzles } from '../src/puzzles';

async function solveSample(page: import('@playwright/test').Page) {
  const placements = [
    ['fern', 2],
    ['acorn', 13],
    ['berry', 11],
    ['pod', 4],
  ] as const;
  for (const [specimen, cell] of placements) {
    await page.locator(`[data-specimen="${specimen}"]`).click();
    await page.locator(`[data-cell="${cell}"]`).click();
  }
  await page.getByRole('button', { name: 'Check layout' }).click();
}

test('@claim:unique-solutions all authored puzzles have one solution', () => {
  expect(puzzles).toHaveLength(20);
  expect(validatePuzzles()).toEqual([]);
});

test('@claim:daily-puzzle the same date selects the same shared puzzle', () => {
  const date = '2026-09-01';
  expect(puzzleForDate(date)).toEqual(puzzleForDate(date));
  expect(puzzleForDate(date).id).toMatch(/^\d{2}$/);
});

test('@claim:offline-reload game reloads offline after the first visit', async () => {
  const isolatedBrowser = await chromium.launch();
  const context = await isolatedBrowser.newContext({ serviceWorkers: 'allow' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/demo');
  const workerScript = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return registration.active?.scriptURL;
  });
  expect(workerScript).toBe('http://127.0.0.1:4173/sw.js');
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Solve the sample deduction grid' })).toBeVisible();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Solve the sample deduction grid' })).toBeVisible();
  await context.close();
  await isolatedBrowser.close();
});

test('@claim:sample-complete sample reaches the solved result', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.getByRole('heading', { name: 'Solve the sample deduction grid' })).toBeVisible();
  await solveSample(page);
  await expect(page.getByRole('heading', { name: 'You found the only layout' })).toBeVisible();
  await expect(page.getByText('Score: 4 of 4 leaves.')).toBeVisible();
});

test('@claim:demo-isolation sample query route isolates progress and sound, then clears both demo keys', async ({ page }) => {
  await page.goto('/');
  const daily = await page.evaluate(() => {
    const key = `riddle-grid:daily:${new Date().toISOString().slice(0, 10)}`;
    const progress = JSON.stringify({ placements: { fern: { row: 0, col: 0 } } });
    localStorage.setItem(key, progress);
    localStorage.setItem('riddle-grid:muted', 'true');
    return { key, progress };
  });
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sound on' })).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:muted'))).toBeNull();
  await page.getByRole('button', { name: 'Sound on' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:muted'))).toBe('true');
  expect(await page.evaluate((key) => localStorage.getItem(key), daily.key)).toBe(daily.progress);
  expect(await page.evaluate(() => localStorage.getItem('riddle-grid:muted'))).toBe('true');
  await page.locator('[data-specimen="fern"]').click();
  await page.locator('[data-cell="2"]').click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem('demo:riddle-grid:sample'))).not.toBeNull();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:sample'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:muted'))).toBeNull();
  expect(await page.evaluate((key) => localStorage.getItem(key), daily.key)).toBe(daily.progress);
  expect(await page.evaluate(() => localStorage.getItem('riddle-grid:muted'))).toBe('true');
  await expect(page.getByRole('button', { name: 'Sound on' })).toBeVisible();

  await page.getByRole('button', { name: 'Sound on' }).click();
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('button', { name: 'Sound off' })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:sample'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('demo:riddle-grid:muted'))).toBeNull();
  expect(await page.evaluate((key) => localStorage.getItem(key), daily.key)).toBe(daily.progress);
  expect(await page.evaluate(() => localStorage.getItem('riddle-grid:muted'))).toBe('true');
});

test('@claim:restart-reset restarting the sample clears its layout', async ({ page }) => {
  await page.goto('/demo');
  await solveSample(page);
  await page.getByRole('button', { name: 'Restart sample' }).click();
  await expect(page.locator('.grid-cell.filled')).toHaveCount(0);
  await expect(page.getByText('Select a clue card, then choose a grid cell.')).toBeVisible();
});

test('@claim:hint-cost a hint reveals one position and spends one leaf', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: /Reveal one position/ }).click();
  await expect(page.getByText('Fern belongs in row 1, column 3.', { exact: true })).toBeVisible();
  await expect(page.getByText('3 leaves', { exact: true })).toBeVisible();
});

test('@claim:failed-checks three incorrect checks open the explanation', async ({ page }) => {
  await page.goto('/demo');
  for (const [specimen, cell] of [['fern', 0], ['acorn', 1], ['berry', 2], ['pod', 3]] as const) {
    await page.locator(`[data-specimen="${specimen}"]`).click();
    await page.locator(`[data-cell="${cell}"]`).click();
  }
  for (let attempt = 0; attempt < 3; attempt += 1) await page.getByRole('button', { name: 'Check layout' }).click();
  await expect(page.getByRole('heading', { name: 'Here is the only layout' })).toBeVisible();
});

test('@claim:sound-setting sound choice persists in this browser', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sound on' }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Sound off' })).toHaveAttribute('aria-pressed', 'true');
});

test('@claim:local-progress progress stays in this browser', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-specimen="fern"]').click();
  await page.locator('[data-cell="2"]').click();
  await page.reload();
  await expect(page.locator('[data-cell="2"]')).toHaveAttribute('aria-label', /Fern/);
});

test('@claim:keyboard-controls grid works with keyboard controls', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.locator('[data-specimen="fern"]').focus();
  await page.keyboard.press('Enter');
  await page.locator('[data-cell="0"]').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-cell="2"]')).toHaveAttribute('aria-label', /Fern/);
});

test('keyboard completion moves focus to the focusable result heading', async ({ page }) => {
  await page.goto('/?demo=1');
  for (const [specimen, cell] of [['fern', 2], ['acorn', 13], ['berry', 11], ['pod', 4]] as const) {
    await page.locator(`[data-specimen="${specimen}"]`).focus();
    await page.keyboard.press('Enter');
    await page.locator(`[data-cell="${cell}"]`).focus();
    await page.keyboard.press('Enter');
  }
  await page.getByRole('button', { name: 'Check layout' }).focus();
  await page.keyboard.press('Enter');
  const result = page.getByRole('heading', { name: 'You found the only layout' });
  await expect(result).toHaveAttribute('tabindex', '-1');
  await expect(result).toBeFocused();
});

test('one failed check uses singular check copy', async ({ page }) => {
  await page.goto('/demo');
  for (const [specimen, cell] of [['fern', 0], ['acorn', 1], ['berry', 2], ['pod', 3]] as const) {
    await page.locator(`[data-specimen="${specimen}"]`).click();
    await page.locator(`[data-cell="${cell}"]`).click();
  }
  await page.getByRole('button', { name: 'Check layout' }).click();
  await page.getByRole('button', { name: 'Check layout' }).click();
  await expect(page.locator('#game-message')).toHaveText('That layout did not fit every clue. 1 check left.');
});

test('solve-critical body text and the privacy link meet the 16px and 44px baselines', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  const privacyTarget = await page.getByRole('link', { name: 'Read the privacy details' }).boundingBox();
  expect(privacyTarget!.width).toBeGreaterThanOrEqual(44);
  expect(privacyTarget!.height).toBeGreaterThanOrEqual(44);

  await page.goto('http://127.0.0.1:4173/demo');
  const bodyTextSizes = await page.locator('.clue-copy small, .hint-panel p, .hint-panel li').evaluateAll((items) => items.map((item) => ({
    text: item.textContent?.trim(),
    size: Number.parseFloat(getComputedStyle(item).fontSize),
  })));
  expect(bodyTextSizes).not.toHaveLength(0);
  for (const item of bodyTextSizes) expect(item.size, `${item.text} must be at least 16px`).toBeGreaterThanOrEqual(16);
  await context.close();
});

test('@claim:phone-60fps game sustains the phone frame-rate target', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('http://127.0.0.1:4173/demo');
  const samples = await page.evaluate(async () => {
    const measured: number[] = [];
    for (let sample = 0; sample < 3; sample += 1) {
      const started = performance.now();
      let frames = 0;
      await new Promise<void>((resolve) => {
        const tick = (now: number) => {
          frames += 1;
          if (now - started >= 1_000) resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      measured.push(frames * 1_000 / (performance.now() - started));
    }
    return measured;
  });
  const median = [...samples].sort((a, b) => a - b)[1];
  expect(median).toBeGreaterThanOrEqual(55);
  expect(median).toBeLessThanOrEqual(65);
  await context.close();
});

test('@claim:no-third-party demo sends requests only to this site', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await page.goto('/demo');
  await page.getByRole('button', { name: /Reveal one position/ }).click();
  await page.locator('[data-specimen="fern"]').click();
  await page.locator('[data-cell="2"]').click();
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:free-to-play complete sample play has no payment path', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Free to play.', { exact: true })).toBeVisible();
  await page.goto('/?demo=1');
  await solveSample(page);
  await expect(page.getByRole('heading', { name: 'You found the only layout' })).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('button, a').filter({ hasText: /pay|purchase|subscribe|checkout|billing/i })).toHaveCount(0);
});

test('@claim:private-static-game demo has no cookies, tracking, ads, or external scripts', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await page.goto('/?demo=1');
  await solveSample(page);
  expect(await page.evaluate(() => document.cookie)).toBe('');
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
  expect(await page.locator('script[src]').evaluateAll((scripts) => scripts.every((script) => new URL((script as HTMLScriptElement).src).origin === location.origin))).toBe(true);
  await expect(page.locator('iframe, form, [data-analytics], [data-ad], [class*="ad-" i], [id*="ad-" i]')).toHaveCount(0);
  await expect(page.locator('button, a, input, textarea').filter({ hasText: /sign in|log in|chat|submit clue|send clue/i })).toHaveCount(0);
});

test('routes, metadata, and accessibility have no serious violations', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  for (const path of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Riddle Grid/);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  }
  expect(consoleErrors).toEqual([]);
});

test('routes set plain titles, descriptions, and canonical URLs', async ({ page }) => {
  const expected = [
    ['/', 'Riddle Grid — Solve a daily deduction grid', 'https://riddle-grid.sociobot.in/'],
    ['/?demo=1', 'Demo — Riddle Grid', 'https://riddle-grid.sociobot.in/demo'],
    ['/privacy', 'Privacy — Riddle Grid', 'https://riddle-grid.sociobot.in/privacy'],
    ['/terms', 'Terms — Riddle Grid', 'https://riddle-grid.sociobot.in/terms'],
    ['/missing-page', 'Page not found — Riddle Grid', 'https://riddle-grid.sociobot.in/404'],
  ] as const;
  for (const [path, title, canonical] of expected) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Riddle Grid|deduction grid|terms/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
  }
});

test('Back and Forward focus and announce the new route heading', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.locator('.site-header a[href="/privacy"]').click();
  await expect(page.getByRole('heading', { name: 'Privacy without an account' })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Solve the sample deduction grid' })).toBeFocused();
  await expect(page.locator('.route-status')).toHaveText('Demo — Riddle Grid');
  await page.goForward();
  await expect(page.getByRole('heading', { name: 'Privacy without an account' })).toBeFocused();
  await expect(page.locator('.route-status')).toHaveText('Privacy — Riddle Grid');
});

test('404 document carries complete product metadata', async () => {
  const { readFileSync } = await import('node:fs');
  const html = readFileSync(new URL('../404.html', import.meta.url), 'utf8');
  for (const required of ['apple-touch-icon', 'og:title', 'og:description', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description']) expect(html).toContain(required);
});

test('mobile layout has no horizontal page overflow', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await context.close();
});

test('390px specimen picker keeps every name intact and labels the hint section', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');

  await expect(page.getByRole('heading', { name: 'Hints', exact: true })).toBeVisible();
  const labels = await page.locator('.quick-specimen > span:last-child').evaluateAll((items) => items.map((item) => {
    const range = document.createRange();
    range.selectNodeContents(item);
    const lines = [...range.getClientRects()].filter(({ width, height }) => width > 0 && height > 0);
    return {
      text: item.textContent?.trim(),
      lines: lines.length,
      clientWidth: (item as HTMLElement).clientWidth,
      scrollWidth: (item as HTMLElement).scrollWidth,
    };
  }));
  expect(labels.map(({ text }) => text)).toEqual(['Fern', 'Acorn', 'Berries', 'Seed pod']);
  for (const label of labels) {
    expect(label.lines, `${label.text} must stay on one line`).toBe(1);
    expect(label.scrollWidth, `${label.text} must fit without clipping`).toBeLessThanOrEqual(label.clientWidth);
  }

  const firstCell = await page.locator('[data-cell="0"]').boundingBox();
  expect(firstCell!.y + firstCell!.height, 'the picker repair must leave a playable cell in the first phone viewport').toBeLessThanOrEqual(844);
  await page.screenshot({ path: testInfo.outputPath('root-picker-390x844.png'), fullPage: true });
  await context.close();
});

test('accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/demo');

  await page.locator('.quick-specimen').first().focus();
  const focus = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const button = document.querySelector<HTMLElement>('.quick-specimen:focus-visible')!;
    return {
      outline: getComputedStyle(button).outlineColor,
      surfaces: [
        root.getPropertyValue('--paper').trim(),
        root.getPropertyValue('--paper-deep').trim(),
        root.getPropertyValue('--surface').trim(),
        '#f5f0e1',
      ],
    };
  });
  expect(focus.outline).toBe('rgb(115, 84, 0)');
  const relativeLuminance = (hex: string) => {
    const rgb = hex.match(/[a-f\d]{2}/gi)!.map((value) => parseInt(value, 16) / 255);
    const [red, green, blue] = rgb.map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return red * 0.2126 + green * 0.7152 + blue * 0.0722;
  };
  for (const surface of focus.surfaces) {
    const ratio = (relativeLuminance(surface) + 0.05) / (relativeLuminance('#735400') + 0.05);
    expect(ratio).toBeGreaterThanOrEqual(3);
  }

  const mobileTargets = await page.locator('.wordmark, footer a').evaluateAll((links) => links.map((link) => {
    const { width, height } = link.getBoundingClientRect();
    return { text: link.textContent?.trim(), width, height };
  }));
  expect(mobileTargets).toHaveLength(4);
  for (const target of mobileTargets) {
    expect(target.width, `${target.text} needs a 44px-wide target`).toBeGreaterThanOrEqual(44);
    expect(target.height, `${target.text} needs a 44px-tall target`).toBeGreaterThanOrEqual(44);
  }

  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  const textResize = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    mainClientWidth: document.querySelector('main')!.clientWidth,
    mainScrollWidth: document.querySelector('main')!.scrollWidth,
    specimens: [...document.querySelectorAll<HTMLElement>('.quick-specimen')].map((specimen) => {
      const box = specimen.getBoundingClientRect();
      return { label: specimen.textContent?.trim(), clientWidth: specimen.clientWidth, scrollWidth: specimen.scrollWidth, right: box.right };
    }),
  }));
  expect(textResize.mainScrollWidth).toBeLessThanOrEqual(textResize.mainClientWidth);
  expect(textResize.specimens.map(({ label }) => label)).toEqual(['Fern', 'Acorn', 'Berries', 'Seed pod']);
  for (const specimen of textResize.specimens) {
    expect(specimen.scrollWidth, `${specimen.label} must not be clipped at 200% text`).toBeLessThanOrEqual(specimen.clientWidth);
    expect(specimen.right, `${specimen.label} must remain inside the viewport at 200% text`).toBeLessThanOrEqual(textResize.viewport);
  }
  await page.locator('[data-quick-specimen="pod"]').click();
  await expect(page.locator('[data-quick-specimen="pod"]')).toHaveAttribute('aria-pressed', 'true');
  await context.close();
});

test('cold root capture contains plain copy and an operable game at required viewports', async ({ browser }, testInfo) => {
  for (const viewport of [{ width: 1440, height: 900, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }] as const) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/');

    for (const selector of ['h1', '.hero-action .button', '.plain-facts', '[data-testid="game"]', '[data-cell="0"]']) {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} must render at ${viewport.width}x${viewport.height}`).not.toBeNull();
      expect(box!.y, `${selector} must start inside the cold viewport`).toBeLessThan(viewport.height);
    }
    const cell = await page.locator('[data-cell="0"]').boundingBox();
    expect(cell!.y + cell!.height, 'the first playable grid cell must be fully visible').toBeLessThanOrEqual(viewport.height);

    const specimen = viewport.name === 'mobile'
      ? page.locator('[data-quick-specimen="fern"]')
      : page.locator('[data-specimen="fern"]');
    const specimenBox = await specimen.boundingBox();
    expect(specimenBox!.y + specimenBox!.height, 'a specimen control must be fully visible').toBeLessThanOrEqual(viewport.height);
    await page.screenshot({ path: testInfo.outputPath(`cold-root-${viewport.width}x${viewport.height}.png`) });
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);

    await specimen.click();
    await page.locator('[data-cell="2"]').click();
    await expect(page.locator('[data-cell="2"]')).toHaveAttribute('aria-label', /Fern/);
    await context.close();
  }
});

test('static host policy preserves real 404 responses and immutable hashed assets', async () => {
  const config = JSON.parse(await import('node:fs').then(({ readFileSync }) => readFileSync(new URL('../public/staticwebapp.config.json', import.meta.url), 'utf8')));
  expect(config.navigationFallback).toBeUndefined();
  expect(config.routes).toEqual(expect.arrayContaining([
    expect.objectContaining({ route: '/assets/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }),
    { route: '/demo', rewrite: '/index.html' },
    { route: '/privacy', rewrite: '/index.html' },
    { route: '/terms', rewrite: '/index.html' },
  ]));
  expect(config.responseOverrides?.['404']).toEqual({ rewrite: '/404.html' });
});

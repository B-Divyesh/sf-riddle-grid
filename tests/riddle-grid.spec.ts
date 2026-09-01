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
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
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
  await page.goto('/demo');
  await solveSample(page);
  await expect(page.getByRole('heading', { name: 'You found the only layout' })).toBeVisible();
  await expect(page.getByText('Score: 4 of 4 leaves.')).toBeVisible();
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
  await expect(page.getByText('Fern belongs in row 1, column 3.')).toBeVisible();
  await expect(page.getByText('3 leaves', { exact: true })).toBeVisible();
});

test('@claim:local-progress progress stays in this browser', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-specimen="fern"]').click();
  await page.locator('[data-cell="2"]').click();
  await page.reload();
  await expect(page.locator('[data-cell="2"]')).toHaveAttribute('aria-label', /Fern/);
});

test('@claim:keyboard-controls grid works with keyboard controls', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-specimen="fern"]').focus();
  await page.keyboard.press('Enter');
  await page.locator('[data-cell="0"]').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-cell="2"]')).toHaveAttribute('aria-label', /Fern/);
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

test('routes, metadata, and accessibility have no serious violations', async ({ page }) => {
  for (const path of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Riddle Grid/);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  }
});

test('mobile layout has no horizontal page overflow', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await context.close();
});

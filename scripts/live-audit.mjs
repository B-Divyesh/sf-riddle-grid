import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] ?? 'https://riddle-grid.sociobot.in';
const evidenceDir = process.argv[3] ?? 'evidence/polish-5';
mkdirSync(evidenceDir, { recursive: true });

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const assertStaticDemoRequests = (requests) => {
  const expectedOrigin = new URL(base).origin;
  assert(requests.length > 0, 'privacy audit captured no document request');
  for (const request of requests) {
    const url = new URL(request.url);
    const pathAndQuery = `${url.pathname}${url.search}`;
    const isEntry = url.pathname === '/' && url.search === '?demo=1';
    const isStaticFile = /^\/assets\/app-[\w-]+\.(?:js|css)$/.test(url.pathname)
      || ['/sw.js', '/favicon.svg', '/apple-touch-icon.png'].includes(url.pathname);
    const isPrecache = [
      '/?precache=8',
      '/?demo=1&precache=8',
      '/demo?precache=8',
      '/privacy?precache=8',
      '/terms?precache=8',
      '/favicon.svg?precache=8',
      '/art/field-desk-640.webp?precache=8',
      '/art/field-desk.webp?precache=8',
    ].includes(pathAndQuery) || (/^\/assets\/app-[\w-]+\.(?:js|css)$/.test(url.pathname) && url.search === '?precache=8');
    assert(url.origin === expectedOrigin, `privacy request left the product origin: ${request.url}`);
    assert(request.method === 'GET', `privacy request was not GET: ${request.method} ${request.url}`);
    assert(request.body === null, `privacy request carried a body: ${request.url}`);
    assert(isEntry || (isStaticFile && url.search === '') || isPrecache, `privacy request is outside the static allowlist: ${request.url}`);
    assert(!(url.username || url.password || url.hash), `privacy request URL carried unexpected data: ${request.url}`);
  }
};

const browser = await chromium.launch();
const report = {
  base,
  checkedAt: new Date().toISOString(),
  routes: [],
  links: [],
  demo: {},
  privacy: {},
  mobile: {},
  offline: {},
  performance: {},
  headers: {},
};

try {
  const routeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const routePage = await routeContext.newPage();
  const errors = [];
  routePage.on('pageerror', (error) => errors.push(String(error)));
  routePage.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  const routes = [
    ['/', 'Riddle Grid — Solve a daily deduction grid', 'Solve one short deduction grid'],
    ['/?demo=1', 'Demo — Riddle Grid', 'Solve the sample deduction grid'],
    ['/privacy', 'Privacy — Riddle Grid', 'Privacy without an account'],
    ['/terms', 'Terms — Riddle Grid', 'Terms for playing Riddle Grid'],
  ];
  for (const [route, title, heading] of routes) {
    const response = await routePage.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    assert(response?.status() === 200, `${route} did not return 200`);
    assert(await routePage.title() === title, `${route} title mismatch`);
    assert(await routePage.locator('html').getAttribute('lang') === 'en', `${route} language mismatch`);
    assert(await routePage.locator('h1').count() === 1, `${route} needs one h1`);
    assert(await routePage.locator('main').count() === 1, `${route} needs one main`);
    assert(await routePage.locator('h1').innerText() === heading, `${route} h1 mismatch`);
    assert(await routePage.locator('.skip-link').innerText() === 'Skip to main content', `${route} skip label mismatch`);
    for (const [name, href] of [['Demo', '/?demo=1'], ['How it works', '/#how'], ['Privacy', '/privacy']]) {
      const link = routePage.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name, exact: true });
      assert(await link.isVisible(), `${route} header ${name} link is hidden`);
      assert(await link.getAttribute('href') === href, `${route} header ${name} link has the wrong target`);
    }
    assert(await routePage.locator('footer a[href="/privacy"]').count() === 1, `${route} lacks Privacy link`);
    assert(await routePage.locator('footer a[href="/terms"]').count() === 1, `${route} lacks Terms link`);
    const axe = await new AxeBuilder({ page: routePage }).analyze();
    assert(axe.violations.length === 0, `${route} has Axe violations: ${axe.violations.map(({ id }) => id).join(', ')}`);
    report.routes.push({ route, status: response.status(), title, heading, axeViolations: 0 });
  }
  assert(errors.length === 0, `route console errors: ${errors.join(' | ')}`);

  for (const href of ['/', '/?demo=1', '/#how', '/privacy', '/terms', 'https://sociobot.in/']) {
    const url = new URL(href, base).href;
    const response = await routeContext.request.get(url);
    assert(response.ok(), `${url} returned ${response.status()}`);
    report.links.push({ url, status: response.status() });
  }

  await routePage.goto(`${base}/?route-focus=1`);
  await routePage.locator('.site-header a[href="/privacy"]').click();
  await routePage.waitForFunction(() => document.activeElement === document.querySelector('h1'));
  await routePage.goBack();
  await routePage.waitForFunction(() => document.activeElement === document.querySelector('h1'));
  await routePage.goForward();
  await routePage.waitForFunction(() => document.activeElement === document.querySelector('h1'));
  const missingPage = await routeContext.newPage();
  const missingResponse = await missingPage.goto(`${base}/missing-polish-4-page`, { waitUntil: 'networkidle' });
  assert(missingResponse?.status() === 404, `missing route returned ${missingResponse?.status()}`);
  assert(await missingPage.title() === 'Page not found — Riddle Grid', '404 title mismatch');
  assert(await missingPage.locator('h1').innerText() === 'Page not found', '404 h1 mismatch');
  assert(await missingPage.locator('.skip-link').innerText() === 'Skip to main content', '404 skip label mismatch');
  const missingAxe = await new AxeBuilder({ page: missingPage }).analyze();
  assert(missingAxe.violations.length === 0, `404 has Axe violations: ${missingAxe.violations.map(({ id }) => id).join(', ')}`);
  await missingPage.setViewportSize({ width: 390, height: 844 });
  await missingPage.screenshot({ path: join(evidenceDir, 'live-404-390x844.png'), fullPage: true });
  report.routes.push({ route: '/missing-polish-4-page', status: 404, title: 'Page not found — Riddle Grid', heading: 'Page not found', axeViolations: 0 });
  await routeContext.close();

  const mobileNavigationContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobileNavigationPage = await mobileNavigationContext.newPage();
  const mobileRoutes = [];
  for (const [route] of routes) {
    await mobileNavigationPage.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    const links = await mobileNavigationPage.locator('.site-header nav a').evaluateAll((nodes) => nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return { label: node.textContent?.trim(), href: node.getAttribute('href'), width: box.width, height: box.height };
    }));
    assert(JSON.stringify(links.map(({ label, href }) => [label, href])) === JSON.stringify([
      ['Demo', '/?demo=1'], ['How it works', '/#how'], ['Privacy', '/privacy'],
    ]), `${route} has incorrect mobile header links: ${JSON.stringify(links)}`);
    assert(links.every(({ width, height }) => width >= 44 && height >= 44), `${route} has an undersized mobile header link: ${JSON.stringify(links)}`);
    assert(await mobileNavigationPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${route} overflows at 390px`);
    const routeName = route === '/' ? 'root' : route.includes('demo') ? 'demo' : route.slice(1);
    await mobileNavigationPage.screenshot({ path: join(evidenceDir, `live-header-${routeName}-390x844.png`), fullPage: false });
    mobileRoutes.push({ route, links, noHorizontalOverflow: true });
  }
  report.mobileNavigation = mobileRoutes;
  await mobileNavigationContext.close();

  const demoContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const demoPage = await demoContext.newPage();
  const requestOrigins = new Set();
  const demoErrors = [];
  demoPage.on('request', (request) => requestOrigins.add(new URL(request.url()).origin));
  demoPage.on('pageerror', (error) => demoErrors.push(String(error)));
  demoPage.on('console', (message) => {
    if (message.type() === 'error') demoErrors.push(message.text());
  });
  await demoPage.goto(`${base}/`);
  const daily = await demoPage.evaluate(() => {
    const key = `riddle-grid:daily:${new Date().toISOString().slice(0, 10)}`;
    const value = JSON.stringify({ placements: { fern: { row: 0, col: 0 } } });
    localStorage.setItem(key, value);
    localStorage.setItem('riddle-grid:muted', 'true');
    return { key, value };
  });
  await demoPage.getByRole('link', { name: 'Try it with sample data' }).click();
  assert(new URL(demoPage.url()).searchParams.get('demo') === '1', 'first-screen action did not enter ?demo=1');
  assert(await demoPage.getByLabel('Demo mode').isVisible(), 'demo banner is missing');
  assert(await demoPage.getByRole('button', { name: 'Reset demo' }).isVisible(), 'Reset demo is missing');
  assert(await demoPage.getByRole('button', { name: 'Start for real' }).isVisible(), 'Start for real is missing');
  assert(await demoPage.getByRole('button', { name: 'Turn sound off' }).isVisible(), 'demo sound did not start isolated');
  await demoPage.getByRole('button', { name: 'Turn sound off' }).click();
  await demoPage.locator('[data-specimen="fern"]').click();
  await demoPage.locator('[data-cell="2"]').click();
  for (let index = 0; index < 3; index += 1) await demoPage.getByRole('button', { name: /Reveal one position/ }).click();
  assert(await demoPage.getByText('1 leaf', { exact: true }).isVisible(), 'singular leaf label is missing');
  assert(await demoPage.getByText('1 leaves', { exact: true }).count() === 0, 'plural leaf regression is present');
  const demoAxe = await new AxeBuilder({ page: demoPage }).analyze();
  assert(demoAxe.violations.length === 0, `demo has Axe violations: ${demoAxe.violations.map(({ id }) => id).join(', ')}`);
  await demoPage.locator('.sheet-heading').screenshot({ path: join(evidenceDir, 'live-one-leaf-score.png') });
  await demoPage.locator('.game-sheet').evaluate((node) => node.scrollIntoView({ block: 'start' }));
  await demoPage.screenshot({ path: join(evidenceDir, 'live-demo-third-hint-390x844.png') });
  await demoPage.getByRole('button', { name: 'Reset demo' }).click();
  const isolatedState = await demoPage.evaluate(({ key }) => ({
    daily: localStorage.getItem(key),
    dailySound: localStorage.getItem('riddle-grid:muted'),
    demo: localStorage.getItem('demo:riddle-grid:sample'),
    demoSound: localStorage.getItem('demo:riddle-grid:muted'),
  }), daily);
  assert(isolatedState.daily === daily.value && isolatedState.dailySound === 'true', 'Reset demo changed daily data');
  assert(isolatedState.demo === null && isolatedState.demoSound === null, 'Reset demo retained demo data');

  await demoPage.getByRole('button', { name: 'Turn sound off' }).click();
  await demoPage.locator('[data-specimen="fern"]').click();
  await demoPage.locator('[data-cell="2"]').click();
  await demoPage.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'How it works', exact: true }).click();
  assert(new URL(demoPage.url()).hash === '#how', 'How it works did not leave demo for the instructions');
  const headerExitState = await demoPage.evaluate(({ key }) => ({
    daily: localStorage.getItem(key),
    dailySound: localStorage.getItem('riddle-grid:muted'),
    demo: localStorage.getItem('demo:riddle-grid:sample'),
    demoSound: localStorage.getItem('demo:riddle-grid:muted'),
  }), daily);
  assert(headerExitState.daily === daily.value && headerExitState.dailySound === 'true', 'header exit changed daily data');
  assert(headerExitState.demo === null && headerExitState.demoSound === null, 'header exit retained demo data');

  await demoPage.goto(`${base}/?demo=1&exit=1`);
  await demoPage.getByRole('button', { name: 'Turn sound off' }).click();
  await demoPage.getByRole('button', { name: 'Start for real' }).click();
  assert(new URL(demoPage.url()).pathname === '/', 'Start for real did not leave demo');

  await demoPage.goto(`${base}/?demo=1&complete=1`);
  for (const [specimen, cell] of [['fern', 2], ['acorn', 13], ['berry', 11], ['pod', 4]]) {
    await demoPage.locator(`[data-specimen="${specimen}"]`).click();
    await demoPage.locator(`[data-cell="${cell}"]`).click();
  }
  await demoPage.getByRole('button', { name: 'Check layout' }).click();
  const result = demoPage.getByRole('heading', { name: 'You found the only layout' });
  assert(await result.isVisible(), 'sample did not reach its end screen');
  assert(await result.evaluate((node) => node === document.activeElement), 'end screen did not receive focus');
  await result.evaluate((node) => node.scrollIntoView({ block: 'center' }));
  await demoPage.screenshot({ path: join(evidenceDir, 'live-complete-demo-390x844.png') });
  assert(await demoPage.evaluate(() => document.cookie) === '', 'demo set a cookie');
  assert([...requestOrigins].every((origin) => origin === new URL(base).origin), 'demo requested another origin');
  assert(demoErrors.length === 0, `demo console errors: ${demoErrors.join(' | ')}`);
  report.demo = { queryEntry: true, banner: true, resetIsolated: true, headerExitClearsDemo: true, startForRealClearsDemo: true, oneLeaf: true, solved: true, resultFocused: true, axeViolations: 0, requestOrigins: [...requestOrigins], cookies: '' };

  await demoPage.goto(`${base}/?mobile=1`);
  await demoPage.screenshot({ path: join(evidenceDir, 'live-root-390x844.png'), fullPage: true });
  const firstScreen = await demoPage.evaluate(() => {
    const cell = document.querySelector('[data-cell="0"]')?.getBoundingClientRect();
    const specimen = document.querySelector('[data-quick-specimen="fern"]')?.getBoundingClientRect();
    const targets = [...document.querySelectorAll('a, button')].filter((node) => {
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0;
    }).map((node) => {
      const box = node.getBoundingClientRect();
      return { label: node.textContent?.trim(), width: box.width, height: box.height };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      cellBottom: cell ? cell.bottom : null,
      specimenBottom: specimen ? specimen.bottom : null,
      undersizedTargets: targets.filter(({ width, height }) => width < 44 || height < 44),
      headerNavigation: [...document.querySelectorAll('.site-header nav a')].map((node) => ({
        label: node.textContent?.trim(),
        href: node.getAttribute('href'),
        visible: getComputedStyle(node).display !== 'none' && node.getBoundingClientRect().width >= 44 && node.getBoundingClientRect().height >= 44,
      })),
    };
  });
  assert(firstScreen.scrollWidth <= 390, 'mobile page overflows horizontally');
  assert(firstScreen.cellBottom !== null && firstScreen.cellBottom <= 844, 'first cell is outside the phone viewport');
  assert(firstScreen.specimenBottom !== null && firstScreen.specimenBottom <= 844, 'specimen control is outside the phone viewport');
  assert(firstScreen.undersizedTargets.length === 0, `undersized targets: ${JSON.stringify(firstScreen.undersizedTargets)}`);
  assert(firstScreen.headerNavigation.length === 3 && firstScreen.headerNavigation.every(({ visible }) => visible), `mobile header navigation is unavailable: ${JSON.stringify(firstScreen.headerNavigation)}`);
  await demoPage.emulateMedia({ reducedMotion: 'reduce' });
  const reducedMotion = await demoPage.locator('.quick-specimen').first().evaluate((node) => {
    const style = getComputedStyle(node);
    return { animationDuration: style.animationDuration, transitionDuration: style.transitionDuration };
  });
  await demoPage.emulateMedia({ reducedMotion: 'no-preference' });
  await demoPage.evaluate(() => document.documentElement.style.setProperty('font-size', '200%', 'important'));
  const resized = await demoPage.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    mainClientWidth: document.querySelector('main')?.clientWidth,
    mainScrollWidth: document.querySelector('main')?.scrollWidth,
    navigation: [...document.querySelectorAll('.site-header nav a')].map((node) => ({
      label: node.textContent?.trim(),
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
      right: node.getBoundingClientRect().right,
    })),
    specimens: [...document.querySelectorAll('.quick-specimen')].map((node) => ({
      label: node.textContent?.trim(),
      clientWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
      right: node.getBoundingClientRect().right,
    })),
  }));
  assert(resized.documentScrollWidth <= resized.viewport, '200% text causes document overflow');
  assert(resized.mainScrollWidth <= resized.mainClientWidth, '200% text causes horizontal overflow');
  assert(resized.navigation.every(({ clientWidth, scrollWidth, right }) => scrollWidth <= clientWidth && right <= 390), `200% text clips a header link: ${JSON.stringify(resized.navigation)}`);
  assert(resized.specimens.every(({ clientWidth, scrollWidth, right }) => scrollWidth <= clientWidth && right <= 390), `200% text clips a specimen control: ${JSON.stringify(resized.specimens)}`);
  report.mobile = { ...firstScreen, reducedMotion, resized };
  await demoContext.close();

  const privacyContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const privacyPage = await privacyContext.newPage();
  const privacyRequests = [];
  privacyContext.on('request', (request) => privacyRequests.push({
    url: request.url(),
    method: request.method(),
    body: request.postData(),
    resourceType: request.resourceType(),
  }));
  await privacyPage.goto(`${base}/?demo=1`, { waitUntil: 'networkidle' });
  await privacyPage.evaluate(() => navigator.serviceWorker.ready.then(() => undefined));
  await privacyPage.waitForLoadState('networkidle');
  const requestCountBeforePlay = privacyRequests.length;
  await privacyPage.getByRole('button', { name: /Reveal one position/ }).click();
  for (const [specimen, cell] of [['fern', 2], ['acorn', 13], ['berry', 11], ['pod', 4]]) {
    await privacyPage.locator(`[data-specimen="${specimen}"]`).click();
    await privacyPage.locator(`[data-cell="${cell}"]`).click();
  }
  await privacyPage.getByRole('button', { name: 'Check layout' }).click();
  assert(await privacyPage.getByRole('heading', { name: 'You found the only layout' }).isVisible(), 'privacy run did not complete');
  await privacyPage.waitForTimeout(100);
  assert(privacyRequests.length === requestCountBeforePlay, 'game interactions generated a network request');
  assertStaticDemoRequests(privacyRequests);
  const cookies = await privacyContext.cookies();
  assert(cookies.length === 0 && await privacyPage.evaluate(() => document.cookie) === '', 'privacy run created a cookie');
  assert(await privacyPage.locator('iframe, form, [data-analytics], [data-ad], [class*="ad-" i], [id*="ad-" i]').count() === 0, 'privacy run exposed tracking, advertising, or form markup');
  assert(await privacyPage.locator('button, a, input, textarea').filter({ hasText: /account|sign in|log in|register|chat|submit clue|send clue/i }).count() === 0, 'privacy run exposed account, chat, or submission controls');
  const savedDemoState = await privacyPage.evaluate(() => localStorage.getItem('demo:riddle-grid:sample'));
  assert(savedDemoState && JSON.parse(savedDemoState).phase === 'won', 'completed choices were not retained in demo browser storage');
  await privacyPage.screenshot({ path: join(evidenceDir, 'live-privacy-complete-390x844.png'), fullPage: true });
  report.privacy = {
    completeDemo: true,
    requests: privacyRequests,
    allowlistedStaticGetsOnly: true,
    requestsAddedByPlay: privacyRequests.length - requestCountBeforePlay,
    requestBodies: privacyRequests.filter(({ body }) => body !== null).length,
    cookies: cookies.length,
    analyticsAdsOrForms: 0,
    accountControls: 0,
    demoStateStoredLocally: true,
  };
  await privacyContext.close();

  const offlineContext = await browser.newContext({ serviceWorkers: 'allow' });
  const offlinePage = await offlineContext.newPage();
  await offlinePage.goto(`${base}/demo`);
  const worker = await offlinePage.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return registration.active?.scriptURL;
  });
  await offlinePage.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await offlinePage.reload();
  await offlineContext.setOffline(true);
  await offlinePage.reload();
  assert(await offlinePage.getByRole('heading', { name: 'Solve the sample deduction grid' }).isVisible(), 'offline demo reload failed');
  report.offline = { worker, reload: true };
  await offlineContext.close();

  const perfContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const perfPage = await perfContext.newPage();
  const session = await perfContext.newCDPSession(perfPage);
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await perfPage.goto(`${base}/demo`);
  const frameSamples = await perfPage.evaluate(async () => {
    const samples = [];
    for (let sample = 0; sample < 3; sample += 1) {
      const started = performance.now();
      let frames = 0;
      await new Promise((resolve) => {
        const tick = (now) => {
          frames += 1;
          if (now - started >= 1_000) resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      samples.push(frames * 1_000 / (performance.now() - started));
    }
    return samples;
  });
  const medianFps = [...frameSamples].sort((a, b) => a - b)[1];
  assert(medianFps >= 55 && medianFps <= 65, `median frame rate ${medianFps} is outside 55–65 fps`);
  report.performance = { frameSamples, medianFps, profile: '390x844, DPR 2, 4x CPU throttling' };
  await perfContext.close();

  const rootResponse = await fetch(`${base}/`, { cache: 'no-store' });
  const html = await rootResponse.text();
  const assetPath = html.match(/src="(\/assets\/[^\"]+\.js)"/)?.[1];
  assert(assetPath, 'hashed JavaScript asset not found');
  const assetResponse = await fetch(`${base}${assetPath}`, { cache: 'no-store' });
  const swResponse = await fetch(`${base}/sw.js`, { cache: 'no-store' });
  report.headers = {
    csp: rootResponse.headers.get('content-security-policy'),
    referrerPolicy: rootResponse.headers.get('referrer-policy'),
    contentTypeOptions: rootResponse.headers.get('x-content-type-options'),
    assetCacheControl: assetResponse.headers.get('cache-control'),
    serviceWorkerCacheControl: swResponse.headers.get('cache-control'),
  };
  assert(report.headers.csp?.includes("frame-ancestors 'none'"), 'CSP frame-ancestors is missing');
  assert(report.headers.assetCacheControl?.includes('immutable'), 'hashed asset is not immutable');
  assert(report.headers.serviceWorkerCacheControl?.includes('no-cache'), 'service worker is not no-cache');

  writeFileSync(join(evidenceDir, 'live-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}

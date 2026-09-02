import './style.css';
import { clueText, demoPuzzle, puzzleForDate, relationsFor, specimens, type Position, type Puzzle, type SpecimenId } from './puzzles';
import { specimenSvg } from './specimens';

type Phase = 'playing' | 'won' | 'explained';
type GameState = {
  placements: Partial<Record<SpecimenId, Position>>;
  selected: SpecimenId | null;
  hints: SpecimenId[];
  checks: number;
  phase: Phase;
};

const app = document.querySelector<HTMLDivElement>('#app')!;
const dateKey = new Date().toISOString().slice(0, 10);
let gameState: GameState;
let currentPuzzle: Puzzle;
let demoMode = false;
let activeCell = 0;

const isDemoLocation = (path = window.location.pathname, search = window.location.search) => path === '/demo' || new URLSearchParams(search).get('demo') === '1';

const blankState = (): GameState => ({ placements: {}, selected: null, hints: [], checks: 0, phase: 'playing' });
const specimenName = (id: SpecimenId) => specimens.find((item) => item.id === id)!.name;
const cellName = ({ row, col }: Position) => `row ${row + 1}, column ${col + 1}`;
const storageKey = () => demoMode ? 'demo:riddle-grid:sample' : `riddle-grid:daily:${dateKey}`;

function readState(): GameState {
  try {
    const saved = localStorage.getItem(storageKey());
    return saved ? { ...blankState(), ...JSON.parse(saved), selected: null } : blankState();
  } catch {
    return blankState();
  }
}

function saveState(): void {
  try {
    localStorage.setItem(storageKey(), JSON.stringify({ ...gameState, selected: null }));
  } catch {
    announce('This browser could not save progress. You can still finish this grid.');
  }
}

function icon(id: SpecimenId): string {
  return `<span class="specimen-art specimen-${id}">${specimenSvg(id)}</span>`;
}

function header(): string {
  return `<a class="skip-link" href="#main">Skip to puzzle</a>
    ${demoMode ? `<aside class="demo-banner" aria-label="Demo mode"><span><strong>Demo</strong> — sample data, nothing is saved to your daily game.</span><span class="demo-actions"><button type="button" data-action="reset-demo">Reset demo</button><button type="button" data-action="start-real">Start for real</button></span></aside>` : ''}
    <header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Riddle Grid home"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 7h26v26H7zM20 7v26M7 20h26"/><path d="M12 29c6-2 9-7 10-14 4 4 6 9 5 14-5 3-10 3-15 0Z"/></svg><span>Riddle Grid</span></a>
      <nav aria-label="Main navigation"><a href="/?demo=1" data-route>Demo</a><a href="/#how">How it works</a><a href="/privacy" data-route>Privacy</a></nav>
      <button class="sound-button" type="button" data-action="toggle-sound" aria-pressed="${localStorage.getItem('riddle-grid:muted') === 'true'}">${localStorage.getItem('riddle-grid:muted') === 'true' ? 'Sound off' : 'Sound on'}</button>
    </header>`;
}

function footer(): string {
  return `<footer><p>Riddle Grid is a daily deduction game.</p><nav aria-label="Footer navigation"><a href="/privacy" data-route>Privacy</a><a href="/terms" data-route>Terms</a><a href="https://sociobot.in">Built by Param Factory <span aria-hidden="true">↗</span><span class="sr-only">(external site)</span></a></nav><p>Original generated field-desk art · v1.0.0</p></footer>`;
}

function landing(): string {
  currentPuzzle = puzzleForDate(dateKey);
  gameState = readState();
  return `${header()}<main id="main">
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy"><h1 id="page-title" tabindex="-1">Solve one short deduction grid</h1><p class="lede">For coffee-break players who want logic without spelling tests.</p>
        <div class="hero-action"><a class="button primary" href="/?demo=1" data-route>Try it with sample data</a><span>Opens a ready sample.</span></div>
        <ul class="plain-facts"><li>Free to play.</li><li>Offline after one visit.</li><li>Saved in this browser.</li></ul>
      </div>
      <figure class="hero-art"><picture><source srcset="/art/field-desk-640.webp 640w, /art/field-desk.webp 1200w" sizes="(max-width: 760px) 92vw, 48vw" type="image/webp"><img src="/art/field-desk.webp" width="1200" height="800" alt="Four pressed plant specimens surround a blank field grid." fetchpriority="high" decoding="async"></picture><figcaption>Today’s clues belong on one field grid.</figcaption></figure>
    </section>
    ${gameMarkup(false)}
    <section class="how" id="how" aria-labelledby="how-title"><h2 id="how-title">How the grid works</h2><ol><li><strong>Read the clue cards.</strong><span>Above and left describe each pair.</span></li><li><strong>Place four specimens.</strong><span>Use each row and column once.</span></li><li><strong>Check the layout.</strong><span>See the solved grid and its explanation.</span></li></ol></section>
    <section class="privacy-note" aria-labelledby="privacy-title"><div><h2 id="privacy-title">The game stays on your device</h2></div><div><p>Your layout and sound setting use browser storage. The game sends no personal data.</p><a href="/privacy" data-route>Read the privacy details</a></div></section>
  </main>${footer()}<div class="route-status sr-only" aria-live="polite"></div><div class="online-status" role="status" hidden></div>`;
}

function demoPage(): string {
  currentPuzzle = demoPuzzle;
  gameState = readState();
  return `${header()}<main id="main"><section class="demo-intro"><p class="eyebrow">Sample field sheet</p><h1 id="page-title" tabindex="-1">Solve the sample deduction grid</h1><p>This fixed puzzle shows the complete game. Reset it whenever you want.</p></section>${gameMarkup(true)}</main>${footer()}<div class="route-status sr-only" aria-live="polite"></div><div class="online-status" role="status" hidden></div>`;
}

function occupiedAt(row: number, col: number): SpecimenId | undefined {
  return specimens.find(({ id }) => gameState.placements[id]?.row === row && gameState.placements[id]?.col === col)?.id;
}

function clueCard(id: SpecimenId): string {
  const rules = relationsFor(currentPuzzle).filter((rule) => rule.before === id || rule.after === id);
  const pos = gameState.placements[id];
  return `<button type="button" class="clue-card ${gameState.selected === id ? 'selected' : ''} ${pos ? 'placed' : ''}" data-specimen="${id}" aria-pressed="${gameState.selected === id}" aria-label="${specimenName(id)}. ${pos ? `Placed in ${cellName(pos)}.` : 'Not placed.'} Select specimen.">
      ${icon(id)}<span class="clue-copy"><strong>${specimenName(id)}</strong><small>${rules.map(clueText).join(' ')}</small></span><span class="card-state">${pos ? `R${pos.row + 1} C${pos.col + 1}` : 'Place'}</span>
    </button>`;
}

function gameMarkup(isDemo: boolean): string {
  const score = Math.max(0, 4 - gameState.hints.length);
  const complete = specimens.every(({ id }) => gameState.placements[id]);
  const hintsLeft = specimens.filter(({ id }) => !gameState.hints.includes(id));
  const end = gameState.phase !== 'playing';
  return `<section class="game-sheet" id="play" aria-labelledby="game-title" data-testid="game">
    <div class="sheet-heading"><div><p class="section-number">Field sheet ${currentPuzzle.id} · ${demoMode ? 'sample' : dateKey}</p><h2 id="game-title">${demoMode ? 'Sample deduction grid' : 'Today’s deduction grid'}</h2><p>${currentPuzzle.note}</p></div><div class="leaf-score" aria-label="Maximum score: ${score} leaves">${Array.from({ length: 4 }, (_, index) => `<span class="leaf ${index < score ? '' : 'spent'}">◆</span>`).join('')}<small>${score} leaves</small></div></div>
    <div class="field-rules" aria-label="The two field rules"><span><b>Rule 1</b> One specimen in each row</span><span><b>Rule 2</b> One specimen in each column</span></div>
    <div class="game-layout">
      <div class="quick-tray" role="group" aria-label="Quick specimen tray">${specimens.map(({ id }) => `<button type="button" class="quick-specimen ${gameState.selected === id ? 'selected' : ''} ${gameState.placements[id] ? 'placed' : ''}" data-quick-specimen="${id}" aria-pressed="${gameState.selected === id}" aria-label="${specimenName(id)}. ${gameState.placements[id] ? `Placed in ${cellName(gameState.placements[id]!)}.` : 'Not placed.'} Select specimen.">${icon(id)}<span>${specimenName(id)}</span></button>`).join('')}</div>
      <div class="clue-stack" aria-label="Illustrated clues"><h3>Clue cards</h3>${specimens.map(({ id }) => clueCard(id)).join('')}</div>
      <div class="grid-panel"><div class="grid-labels top" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></div><div class="grid-with-rows"><div class="grid-labels side" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></div><div class="puzzle-grid" role="group" aria-label="Four by four field grid">${Array.from({ length: 16 }, (_, index) => {
        const row = Math.floor(index / 4); const col = index % 4; const id = occupiedAt(row, col);
        return `<button type="button" class="grid-cell ${id ? 'filled' : ''}" data-cell="${index}" aria-label="Row ${row + 1}, column ${col + 1}${id ? `, ${specimenName(id)}` : ', empty'}" tabindex="${index === activeCell ? '0' : '-1'}">${id ? `${icon(id)}<span>${specimenName(id)}</span>` : '<span class="cell-dot" aria-hidden="true">·</span>'}</button>`;
      }).join('')}</div></div></div>
      <aside class="hint-panel"><h3>Field notes</h3>${gameState.hints.length ? `<ul>${gameState.hints.map((id) => `<li>${specimenName(id)} belongs in ${cellName(currentPuzzle.solution[id])}.</li>`).join('')}</ul>` : '<p>No hints revealed.</p>'}<button type="button" class="button secondary" data-action="hint" ${end || hintsLeft.length === 0 ? 'disabled' : ''}>Reveal one position <span>−1 leaf</span></button></aside>
    </div>
    <div class="game-controls"><p id="game-message" role="status">${statusText()}</p><div><button type="button" class="text-button" data-action="clear" ${end ? 'disabled' : ''}>Clear layout</button><button type="button" class="button primary" data-action="check" ${!complete || end ? 'disabled' : ''}>Check layout</button></div></div>
    ${end ? resultMarkup(isDemo) : ''}
  </section>`;
}

function statusText(): string {
  if (gameState.phase === 'won') return 'Solved. Every specimen follows both clue chains.';
  if (gameState.phase === 'explained') return 'The solution is open. Compare each cell with the clue chains.';
  if (gameState.selected) return `${specimenName(gameState.selected)} selected. Choose a grid cell.`;
  const placed = Object.keys(gameState.placements).length;
  if (gameState.checks) return `That layout did not fit every clue. ${3 - gameState.checks} checks left.`;
  return placed ? `${placed} of 4 specimens placed.` : 'Select a clue card, then choose a grid cell.';
}

function resultMarkup(isDemo: boolean): string {
  const score = Math.max(0, 4 - gameState.hints.length);
  return `<section class="result" aria-labelledby="result-title"><p class="eyebrow">${gameState.phase === 'won' ? 'Field sheet complete' : 'Solution explained'}</p><h3 id="result-title">${gameState.phase === 'won' ? `You found the only layout` : 'Here is the only layout'}</h3><p>${gameState.phase === 'won' ? `Score: ${score} of 4 leaves. ` : ''}${relationsFor(currentPuzzle).map(clueText).join(' ')}</p><div class="solution-list">${specimens.map(({ id }) => `<span>${icon(id)} <b>${specimenName(id)}</b> ${cellName(currentPuzzle.solution[id])}</span>`).join('')}</div><button type="button" class="button primary" data-action="restart">${isDemo ? 'Restart sample' : 'Play this grid again'}</button>${!isDemo ? '<a href="/demo" data-route>Open the sample grid</a>' : ''}</section>`;
}

function infoPage(kind: 'privacy' | 'terms' | '404'): string {
  const content = kind === 'privacy' ? {
    title: 'Privacy without an account', pageTitle: 'Privacy — Riddle Grid',
    body: `<p>Riddle Grid stores your current layout, completed result, and sound choice in your browser.</p><h2>What leaves your device</h2><p>No puzzle choices or personal details leave your device. The site uses no analytics, ads, cookies, or third-party scripts.</p><h2>Remove local data</h2><p>Clear this site’s browser storage to remove saved progress and settings.</p>`,
  } : kind === 'terms' ? {
    title: 'Terms for playing Riddle Grid', pageTitle: 'Terms — Riddle Grid',
    body: `<p>Riddle Grid is a puzzle provided as-is. You may play it for personal use.</p><h2>Fair use</h2><p>Do not disrupt the site or present its puzzles and artwork as your own.</p><h2>Availability</h2><p>The daily puzzle may change or stop without notice.</p>`,
  } : {
    title: 'This field sheet is missing', pageTitle: 'Page not found — Riddle Grid',
    body: `<p>The address does not match a Riddle Grid page.</p><a class="button primary" href="/" data-route>Return to today’s grid</a>`,
  };
  document.title = content.pageTitle;
  return `${header()}<main id="main" class="text-page"><div class="margin-sketch" aria-hidden="true">${specimenSvg('fern')}</div><p class="eyebrow">${kind === '404' ? '404 / page not found' : `Riddle Grid / ${kind}`}</p><h1 id="page-title" tabindex="-1">${content.title}</h1>${content.body}</main>${footer()}<div class="route-status sr-only" aria-live="polite"></div><div class="online-status" role="status" hidden></div>`;
}

function setMetadata(title: string, description: string, canonicalPath: string): void {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://riddle-grid.sociobot.in${canonicalPath}`);
}

function render(path = window.location.pathname, search = window.location.search): void {
  demoMode = isDemoLocation(path, search);
  if ((path === '/' || path === '/index.html') && !demoMode) {
    setMetadata('Riddle Grid — Solve a daily deduction grid', 'Place four illustrated specimens in a daily 4×4 deduction grid.', '/');
    app.innerHTML = landing();
  } else if (demoMode) {
    setMetadata('Demo — Riddle Grid', 'Play the complete Riddle Grid sample without changing daily progress.', '/demo');
    app.innerHTML = demoPage();
  } else if (path === '/privacy') {
    setMetadata('Privacy — Riddle Grid', 'Read how Riddle Grid keeps puzzle progress in your browser.', '/privacy');
    app.innerHTML = infoPage('privacy');
  } else if (path === '/terms') {
    setMetadata('Terms — Riddle Grid', 'Read the terms for playing Riddle Grid.', '/terms');
    app.innerHTML = infoPage('terms');
  } else {
    setMetadata('Page not found — Riddle Grid', 'This Riddle Grid page could not be found.', '/404');
    app.innerHTML = infoPage('404');
  }
  bindEvents();
  updateOnlineStatus();
}

function focusRouteHeading(): void {
  requestAnimationFrame(() => {
    document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
    const live = document.querySelector<HTMLElement>('.route-status');
    if (live) live.textContent = document.title;
  });
}

function navigate(target: string): void {
  const url = new URL(target, window.location.origin);
  history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  render(url.pathname, url.search);
  focusRouteHeading();
}

function announce(message: string): void {
  const status = document.querySelector<HTMLElement>('#game-message');
  if (status) status.textContent = message;
}

function playTone(success: boolean): void {
  if (localStorage.getItem('riddle-grid:muted') === 'true') return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = success ? 560 : 220;
  gain.gain.setValueAtTime(0.04, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(); oscillator.stop(context.currentTime + 0.12);
}

function updateGame(focusSelector?: string): void {
  saveState();
  const old = document.querySelector<HTMLElement>('.game-sheet');
  if (!old) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = gameMarkup(demoMode);
  old.replaceWith(wrapper.firstElementChild!);
  bindGameEvents();
  if (focusSelector) document.querySelector<HTMLElement>(focusSelector)?.focus();
}

function selectSpecimen(id: SpecimenId, focusSelector = `[data-specimen="${id}"]`): void {
  if (gameState.phase !== 'playing') return;
  if (gameState.placements[id]) delete gameState.placements[id];
  gameState.selected = id;
  updateGame(focusSelector);
}

function chooseCell(index: number): void {
  if (gameState.phase !== 'playing') return;
  activeCell = index;
  const row = Math.floor(index / 4); const col = index % 4;
  const existing = occupiedAt(row, col);
  if (!gameState.selected) {
    if (existing) selectSpecimen(existing);
    else announce('That cell is empty. Select a clue card first.');
    return;
  }
  if (existing && existing !== gameState.selected) delete gameState.placements[existing];
  gameState.placements[gameState.selected] = { row, col };
  const placed = gameState.selected;
  gameState.selected = null;
  playTone(true);
  updateGame(`[data-cell="${index}"]`);
  announce(`${specimenName(placed)} placed in row ${row + 1}, column ${col + 1}.`);
}

function checkLayout(): void {
  const solved = specimens.every(({ id }) => {
    const placed = gameState.placements[id]; const answer = currentPuzzle.solution[id];
    return placed?.row === answer.row && placed.col === answer.col;
  });
  gameState.checks += 1;
  if (solved) gameState.phase = 'won';
  else if (gameState.checks >= 3) {
    gameState.phase = 'explained';
    gameState.placements = structuredClone(currentPuzzle.solution);
  }
  playTone(solved);
  updateGame(solved || gameState.phase === 'explained' ? '#result-title' : '[data-action="check"]');
}

function revealHint(): void {
  const next = specimens.find(({ id }) => !gameState.hints.includes(id));
  if (!next) return;
  gameState.hints.push(next.id);
  updateGame('[data-action="hint"]');
  announce(`${next.name} belongs in ${cellName(currentPuzzle.solution[next.id])}. One leaf was spent.`);
}

function bindGameEvents(): void {
  document.querySelectorAll<HTMLElement>('[data-specimen]').forEach((button) => button.addEventListener('click', () => selectSpecimen(button.dataset.specimen as SpecimenId)));
  document.querySelectorAll<HTMLElement>('[data-quick-specimen]').forEach((button) => button.addEventListener('click', () => selectSpecimen(button.dataset.quickSpecimen as SpecimenId, `[data-quick-specimen="${button.dataset.quickSpecimen}"]`)));
  document.querySelectorAll<HTMLButtonElement>('[data-cell]').forEach((button) => {
    button.addEventListener('click', (event) => { if (event.detail !== 0) chooseCell(Number(button.dataset.cell)); });
    button.addEventListener('keydown', (event) => {
      const index = Number(button.dataset.cell);
      const row = Math.floor(index / 4); const col = index % 4;
      const target = event.key === 'ArrowRight' ? row * 4 + Math.min(3, col + 1)
        : event.key === 'ArrowLeft' ? row * 4 + Math.max(0, col - 1)
        : event.key === 'ArrowDown' ? Math.min(3, row + 1) * 4 + col
        : event.key === 'ArrowUp' ? Math.max(0, row - 1) * 4 + col : null;
      if (target !== null) { event.preventDefault(); activeCell = target; document.querySelectorAll('[data-cell]').forEach((cell) => cell.setAttribute('tabindex', '-1')); const next = document.querySelector<HTMLButtonElement>(`[data-cell="${target}"]`); next?.setAttribute('tabindex', '0'); next?.focus(); }
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseCell(index); }
      if (event.key === 'Escape') { const id = occupiedAt(row, col); if (id) { delete gameState.placements[id]; gameState.selected = null; updateGame(`[data-cell="${index}"]`); announce(`${specimenName(id)} returned to the clue cards.`); } }
    });
  });
  document.querySelector('[data-action="hint"]')?.addEventListener('click', revealHint);
  document.querySelector('[data-action="check"]')?.addEventListener('click', checkLayout);
  document.querySelector('[data-action="clear"]')?.addEventListener('click', () => { gameState.placements = {}; gameState.selected = null; updateGame('[data-action="clear"]'); });
  document.querySelector('[data-action="restart"]')?.addEventListener('click', () => { gameState = blankState(); updateGame('.clue-card'); });
}

function bindEvents(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); const url = new URL(link.href); navigate(`${url.pathname}${url.search}${url.hash}`); }));
  document.querySelector('[data-action="reset-demo"]')?.addEventListener('click', () => { localStorage.removeItem('demo:riddle-grid:sample'); gameState = blankState(); render('/demo'); document.querySelector<HTMLElement>('#page-title')?.focus(); });
  document.querySelector('[data-action="start-real"]')?.addEventListener('click', () => { localStorage.removeItem('demo:riddle-grid:sample'); navigate('/'); });
  document.querySelector('[data-action="toggle-sound"]')?.addEventListener('click', (event) => { const button = event.currentTarget as HTMLButtonElement; const next = button.getAttribute('aria-pressed') !== 'true'; localStorage.setItem('riddle-grid:muted', String(next)); button.setAttribute('aria-pressed', String(next)); button.textContent = next ? 'Sound off' : 'Sound on'; });
  bindGameEvents();
}

function updateOnlineStatus(): void {
  const status = document.querySelector<HTMLElement>('.online-status');
  if (!status) return;
  status.hidden = navigator.onLine;
  status.textContent = navigator.onLine ? '' : 'You are offline. The open puzzle still works.';
}

window.addEventListener('popstate', () => { render(); focusRouteHeading(); });
window.addEventListener('offline', updateOnlineStatus);
window.addEventListener('online', updateOnlineStatus);
render(window.location.pathname === '/404.html' ? '/404' : window.location.pathname);

if ('serviceWorker' in navigator && import.meta.env.PROD) navigator.serviceWorker.register('/sw.js').catch(() => undefined);

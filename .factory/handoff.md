# Riddle Grid handoff

## What shipped

- A complete daily 4×4 deduction game with four illustrated specimens, two field rules, relation clues, optional position hints, a four-leaf score, three-check recovery, solved and explained end states, and one-tap replay.
- Twenty authored daily layouts. The deterministic solver enumerates every valid row and column permutation and confirms exactly one solution for each layout.
- A fixed `/demo` sandbox with isolated `demo:riddle-grid:sample` storage, a persistent demo banner, reset, and a clean exit to the daily game.
- Pointer, touch-sized, and keyboard controls. Arrow keys move between cells; Enter or Space places; Escape picks up a placed specimen.
- Local progress and sound settings, with no account, analytics, third-party scripts, or backend.
- Offline reload after the first loaded visit through a versioned service worker.
- Real `/privacy`, `/terms`, and styled not-found routes; route-specific titles and canonical URLs; sitemap, robots, favicon, social image, CSP, and security headers.
- A botanical field-guide visual system with hand-authored specimen SVGs and an original generated desk illustration. The image prompt and generation metadata are stored under `assets/src/`.

## How to run

```sh
npm install
npm run dev
npm test
npm run build
```

The exact deploy build command is `npm run build`. It writes `dist/index.html` and all static assets to `dist/`.

## Verification

- `npm test`: 13 passed in 13.4 seconds.
- Claim tests: unique solutions, deterministic daily selection, offline reload, complete sample solve, restart reset, hint cost, three-check explanation, local progress, sound persistence, keyboard controls, and same-origin-only requests passed.
- Axe browser checks: no serious or critical findings on `/`, `/demo`, `/privacy`, `/terms`, or the not-found route.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo <evidence-dir>`: HTTP 200; no console errors; one title, language, h1, and main landmark present; no missing image alt text or unlabeled buttons. Measured load: 527 ms locally.
- Lighthouse 12.8.2, mobile preset, `/demo`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.0 s; CLS 0. INP was not available for the synthetic no-input run.
- Mobile Chromium at 390×844: no horizontal overflow.
- Three one-second `requestAnimationFrame` samples at 390×844: 61.1, 60.0, and 60.0 fps.
- Production bundle: 7.65 KB gzip JavaScript and 4.20 KB gzip CSS. Responsive hero WebP is 32 KB at 640px and 138 KB at 1200px.
- `npm audit --omit=dev`: zero vulnerabilities.
- `npm run build`: passes with Vite 6.4.3 and produces the required `dist/` root.

## Known gaps and next steps

- The daily schedule repeats after 20 puzzles. Add another validated set before the first rotation if more variety is needed.
- The brief’s completion and hint-use success measures are not collected because the product intentionally ships without analytics. A future study can use voluntary, aggregate feedback without weakening the privacy promise.
- The puzzle is state-driven and has no continuous simulation. Fixed-timestep physics is not applicable; all feedback animation is CSS and becomes static under reduced-motion preferences.

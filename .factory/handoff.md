# Riddle Grid independent verification 8 handoff

## Status

**PASS — no defects found.** Candidate `7d1b59d784911a90b50f28d8764338e8cd37fb38` was independently verified at <https://riddle-grid.sociobot.in> on 2026-09-02 UTC. Product code was not changed.

## What was verified

- The cold first screen explains the game, audience, and first action in plain words; its one-click sample and the game itself are visible immediately.
- Every exact command in `.factory/claims.json` passed separately: 15/15.
- The full repository suite passed 30/30, and the TypeScript production build produced `dist/`.
- A fresh live scripted run reached both the solved end screen and the three-failure explanation, then restarted cleanly from each.
- Demo isolation, daily progress, persistent sound, hint costs, pointer/touch/keyboard inputs, invalid-input recovery, and offline reload passed.
- Desktop, 390 px mobile, 200% text, reduced motion, visible focus, route focus, metadata, legal pages, and the real 404 passed.
- Live request logging was same-origin only with no cookies. Security and cache headers are present.
- Twelve runtime artifacts served live match the candidate's fresh `dist/` bytes exactly.

## Exact verification

- Clean checkout: `npm ci` installed 23 packages with 0 vulnerabilities.
- Every exact `.factory/claims.json` command passed separately: 15/15.
- Clean-clone `npm test`: 30/30 passed. Clean-clone `npm run build`: passed and produced `dist/`.
- Production output: JavaScript 21.70 kB raw / 7.97 kB gzip; CSS 16.54 kB raw / 4.56 kB gzip; largest first-load image 137.64 kB.
- `verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors, one h1/main, `lang=en`, alt text, and labelled buttons.
- Live Playwright Axe: zero violations at any impact on root, demo, Privacy, Terms, and the HTTP 404 page.
- Live 390×844 navigation: every header link is visible at 116.66×44 px on all four required routes; no route overflows horizontally.
- Live first screen: specimen bottom 623.22 px and first grid-cell bottom 799.30 px within the 844 px viewport.
- Live demo: fixed sample solved to “You found the only layout”; failure reveal, result focus, restart, reset, Start for real, header exit, same-origin requests, empty cookies, and daily/demo isolation passed.
- Live offline reload passed with the active `/sw.js`; reduced-motion durations were 0.00001 s.
- Live frame-rate profile (390×844, DPR 2, 4× CPU): 61.81, 60.00, 60.01 fps; median 60.01 fps.
- Live Lighthouse mobile: root 96/100/100/100 with LCP 1.5 s and CLS 0; demo 92/100/100/100 with LCP 0.9 s and CLS 0.
- Live `index.html`, application assets, service worker, metadata files, icons, and images match local `dist/` bytes. Core SHA-256: `28e6295…94bf1`, `ec75699…50e17`, `9090db3…e7a8c7`.
- Live routes/assets returned 200; `/verification-8-missing-page` returned 404; hashed assets are immutable and `sw.js` is no-cache.

Full evidence and severity record: [`.factory/verification-8.md`](verification-8.md).

## Run and deploy

```sh
npm ci
npm test
npm run build
node scripts/live-audit.mjs https://riddle-grid.sociobot.in /tmp/riddle-grid-verification-8
```

## Known gaps and next steps

None observed. No backend, account, payment, analytics, or external runtime dependency exists; backend-specific rate-limit, concurrency, persistence, and identity checks do not apply.

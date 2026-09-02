# Riddle Grid repair 3 handoff

## Status

The release blockers from independent verification 5 of candidate `13e60e6e8ba114940cb09f730b5c0ea88589cb5f` are repaired locally. This is still the same static Vite + TypeScript browser game; it has no backend, accounts, payments, tracking, or third-party runtime resources.

## Reproduced first

Before changing code, the exact demo-sound leak was reproduced against the candidate build:

```json
{"realOff":"true","demoInitiallyOff":1,"realAfterReset":"false"}
```

The daily sound key was set to `true`; demo incorrectly opened as **Sound off**; changing sound in demo and using **Reset demo** altered the real setting instead of removing isolated demo state.

## Repairs

- Sound now uses `demo:riddle-grid:muted` in demo and `riddle-grid:muted` in daily play. Demo never reads or writes the daily key.
- **Reset demo**, **Start for real**, and every in-app route out of demo remove both `demo:riddle-grid:sample` and `demo:riddle-grid:muted`.
- The privacy link is an inline 44px minimum touch target at 390px.
- Clue relations and hint copy render at 16px minimum. Desktop fact lines compact into one row so the playable slice remains in the first 1440×900 viewport.
- The result heading has `tabindex="-1"`; keyboard completion moves focus there instead of `<body>`.
- Failed-check copy now says **“1 check left.”**
- README now states that a round is intended to take 3–5 minutes. Demo documentation and the isolation claim name both isolated keys and cleanup behavior.
- The service worker cache is versioned as `riddle-grid-v6`; the offline claim calls `registration.update()` before its offline reload.

## Regression coverage

`@claim:demo-isolation` now seeds daily progress and daily sound, proves demo starts with its own sound setting, changes demo sound, and verifies reset and exit delete only both demo keys. Additional browser regressions verify keyboard-result focus, singular copy, 16px solve-critical text, and the 44px privacy target.

## Local verification

Run from a clean checkout:

```sh
npm ci
npm test
npm run build
```

Results on 2026-09-02 UTC:

- `npm ci`: passed; 23 packages installed, 0 vulnerabilities.
- `npm test`: passed, **27/27** Playwright tests. This covers the deterministic game, desktop and 390×844 mobile layout, keyboard completion, accessibility, privacy/network behavior, service-worker update plus offline reload, routes, response policy, reduced motion, and 4× CPU-throttled 60fps sampling.
- Each of the 15 exact commands in `.factory/claims.json` was run independently and passed.
- `npm run build`: passed (`tsc --noEmit` plus Vite). `dist/` contains the static deploy root. The initial assets are 21,474 bytes JavaScript (7.94 kB gzip) and 16,165 bytes CSS (4.50 kB gzip); no fonts load.
- Playwright Axe found zero serious or critical findings on `/`, `/demo`, `/privacy`, `/terms`, and the designed 404. There is no separate lint script; type checking is part of the production build.
- `/opt/fleet/lib/verify-url.sh` passed for local `/`, `/demo`, `/privacy`, and `/terms`: HTTP 200, no console/page errors, one h1 and main per route, `lang="en"`, titles, and no missing image alt or unlabeled buttons.
- Local mobile Lighthouse on `/demo`: Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.0 s, LCP 1.1 s, CLS 0, TBT 160 ms.

## Deployment and known gaps

Deployment and live identity verification are the remaining work for this handoff update. There are no known product gaps; backend-only checks (health, rate limits, persistence boundaries, and Entra) do not apply to this static game.

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

## Deployment and live verification

Commit `f4984c8` was pushed to `origin/main` and deployed on 2026-09-02 UTC with `/opt/fleet/lib/deploy-static.sh riddle-grid dist` (deployment `983d2706-d18a-4728-bf49-e752164ce436`). The target is live at <https://riddle-grid.sociobot.in>.

- Live `/`, `/demo`, `/privacy`, and `/terms` each return 200. The worker URL check found no console/page errors and confirmed route titles, `lang="en"`, one h1, one main, image alt text, and labeled buttons at desktop and 390×844.
- A live browser run proved demo starts with its own sound state, reset and exit remove both demo keys, keyboard completion focuses `result-title`, the live privacy target is 201.75×44px, and all five sampled clue/hint text values are 16px. `registration.update()` completed and the live demo reloaded while offline.
- Live response headers include the expected same-origin CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive camera/microphone/geolocation permissions.
- Live identity exactly matches the deployed `dist/` build:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `93b238261728540cc593761ea3c7c86707fdc56e9445efe97c9ce332f2a219f2` |
| `sw.js` | `7656f41655cbebb3864cc1cc2c16c6264f381b2b5628163ff91a0a59949eacb3` |
| `app-BkVH45HD.js` | `41c5b686d04cab424fb556038dcab94fe97759e6e5331978be54c010954a11c2` |
| `app-DtfTekoQ.css` | `431d85d0da17d8c5a3e2d2c527ec108fd8ff69e3928fe64df9dd238d43d8df40` |

## Known gaps

None. Backend-only checks (health, rate limits, persistence boundaries, and Entra) do not apply to this static game.

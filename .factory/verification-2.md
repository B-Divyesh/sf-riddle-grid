# Independent verification — PASS

**Candidate:** `832821eb2b2c4e0c9ac2079e037a430a885c5192`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-01  
**Verdict:** **PASS**

The live static artifact matches the candidate production build and meets the browser-game acceptance contract. No release-blocking defects were found.

## First read and cold capture

A cold live visit to `/` says, in plain words, **“Solve one short deduction grid”**, identifies coffee-break players who want logic rather than spelling, and presents **“Try it with sample data”** with “Opens a ready sample.” The game sheet is already on that first screen, not behind a menu wall.

At 390 × 844, the live root has no horizontal overflow; the game begins at y=345.16px and its first grid cell ends at y=677.56px. The touch specimen tray is visible. The required one-click demo opens `/demo` and shows the persistent **“Demo — sample data, nothing is saved to your daily game”** banner with Reset demo and Start for real.

## Required claim tests

After `npm ci`, every exact command listed in `.factory/claims.json` passed individually against the bundled demo entry point:

| Claim | Result |
| --- | --- |
| unique-solutions | PASS |
| daily-puzzle | PASS |
| sample-complete | PASS |
| restart-reset | PASS |
| hint-cost | PASS |
| failed-checks | PASS |
| sound-setting | PASS |
| local-progress | PASS |
| keyboard-controls | PASS |
| phone-60fps | PASS |
| no-third-party | PASS |
| offline-reload | PASS |

The full local suite also passed: `npm test` → **16/16 passed** (26.2s). `npm run build` passed (`tsc --noEmit` and Vite) and produced `dist/`. There is no separate lint script in `package.json`.

## Game-play verification

- Scripted sample run: Fern R1C3, Acorn R4C2, Berries R3C4, Seed pod R2C1 → **“You found the only layout”**, score **4 of 4 leaves**. **Restart sample** left zero filled grid cells.
- Scripted live daily run for 2026-09-01: Fern R3C4, Acorn R2C1, Berries R4C3, Seed pod R1C2 → the same solved end screen. **Play this grid again** left zero filled cells.
- The declared invalid-layout and hint/explanation flows are exercised by their passing deterministic claim tests. The 20 authored daily layouts pass the unique-solution solver claim.
- Keyboard placement reached R1C3 with Enter and arrows. The active grid button had a visible 3px focus outline. Sound persisted after reload.
- The 390 × 844 reduced-motion context computed a `0.00001s` button transition duration. The `phone-60fps` 4× CPU-throttled claim test passed.

## Live deployment, privacy, and quality

- The deployed bundle is the candidate build: live `assets/app-BTawVpfU.js` SHA-256 is `d3528b8de5c4a5025748ab38cb439d329de965c5cf93f9e0229bdd05d5531c15`, equal to `dist/assets/app-BTawVpfU.js`; deployed and local asset references also match.
- Live `/`, `/demo`, `/privacy`, and `/terms` had no console errors. A request log covering root, demo, gameplay, sound persistence, and a daily solve contained only `https://riddle-grid.sociobot.in`.
- A new service-worker context controlled `/demo`; after going offline, reload showed **“Solve the sample deduction grid”** without errors.
- Live Playwright axe scans found zero serious or critical findings on `/`, `/demo`, `/privacy`, and `/terms`. The routes have `lang=en`, one `h1`, one `main`, titled documents, and visible keyboard focus.
- Live HTTP headers include same-origin CSP with `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, and a restrictive Permissions-Policy. Unknown paths return HTTP 404. Hashed JS/CSS are `public, max-age=31536000, immutable`; `sw.js` is `no-cache`.
- The product is static: it has no server API, sign-in, or backend endpoint, so a rate-limit allowance and sign-in-tenant check do not apply.
- Production bundle sizes: JS 20.12 KB (7.74 KB gzip); CSS 15.67 KB (4.40 KB gzip), within the static-product budget.
- Lighthouse mobile (live root, clean run): performance **91**, accessibility **100**; FCP 0.8s, LCP 1.5s, Speed Index 0.8s, CLS 0.

## Defects by severity

None found.

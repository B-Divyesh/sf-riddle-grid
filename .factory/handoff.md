# Riddle Grid repair handoff

## Release status

Repair commit `1285285637648d7b61ecb3d2ab00b261f21ea275` is deployed to <https://riddle-grid.sociobot.in>. The four release blockers in independent report `c20e9687abd16a22f5b9ba98e64b5058099a94a5` are fixed.

## What changed

- Replaced the tall root hero with a compact field-note introduction while retaining the job, audience, sample action, outcome, and three facts.
- Put the real daily game in the cold first viewport. Phones get a four-item quick specimen tray before the grid; the full clue cards remain below it.
- Added a cold-capture regression at exactly 1440×900 and 390×844. It checks the headline, sample action, facts, live game, a fully visible specimen control, a fully visible grid cell, an actual placement, zero serious/critical axe findings, and screenshots.
- Added the required `phone-60fps` claim. Its test uses a fresh 390×844 Chromium context, device scale factor 2, 4× CPU throttling, and three one-second frame samples.
- Replaced the catch-all navigation fallback with explicit `/demo`, `/privacy`, and `/terms` rewrites. Unknown paths now keep HTTP 404 while rendering the designed page.
- Added one-year immutable caching for hashed `/assets/*` files and `no-cache` for `/sw.js`.
- Bumped the service-worker cache to `riddle-grid-v4` so existing visitors receive the repaired shell.
- Updated the visual thesis, copy audit, README, and claims registry.

## Exact first-capture evidence

The failure was reproduced before editing:

| Viewport | Candidate game top | Repaired live game top | Fully visible control | Fully visible first cell |
| --- | ---: | ---: | ---: | ---: |
| 1440×900 | 1096px | 446.31px | y=771.17–869.89 | y=749.59–859.97 |
| 390×844 | 1582.22px | 345.16px | y=514.22–572.22 | y=616.81–677.56 |

Both repaired captures had zero horizontal overflow and no console or page errors. Evidence is under `.factory/evidence/before/` and `.factory/evidence/live/`.

## Verification

- Clean install: `npm ci` — 23 packages installed; zero audit vulnerabilities.
- Complete suite: `npm test` — 16/16 passed in 19.2 seconds.
- Every exact command in `.factory/claims.json` passed individually. The deterministic sample ran from “Solve the sample deduction grid” to “You found the only layout” with “Score: 4 of 4 leaves”; restart returned to zero filled cells.
- Type and production build: `npm run build` — passed and produced `dist/`. JavaScript is 20.12 KB / 7.74 KB gzip; CSS is 15.67 KB / 4.40 KB gzip.
- Phone frame samples at 390×844 with 4× CPU throttling: local 61.4, 60.0, 60.0 fps; live 60.4, 60.0, 60.0 fps.
- Local Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 2.0s, CLS 0, TBT 30ms. Live mobile: 100/100/100/100; LCP 1.5s, CLS 0, TBT 40ms.
- Playwright axe integration found zero serious/critical issues on `/`, `/demo`, `/privacy`, `/terms`, and the missing-page view, including both required root viewports.
- `verify-url.sh` found one title, `lang=en`, one h1, one main, no missing alt text, no unlabeled buttons, and no console errors. Live load measurements were 640ms for `/` and 585ms for `/demo`.
- Keyboard-only placement reached row 1, column 3. Reduced-motion durations were `0.00001s`. Touch controls are at least 44px.
- The live demo request log contained only `https://riddle-grid.sociobot.in`. A fresh service-worker context reloaded `/demo` offline and displayed the offline status.
- Azure Static Web Apps returned 200 for `/`, `/demo`, `/privacy`, and `/terms`; 404 for `/missing-page`; `public, max-age=31536000, immutable` for the hashed bundle; and `no-cache` for `/sw.js`.
- Live identity matched `dist/`: `index.html` SHA-256 `f09afd0b53a0f0650651dc02771abbdf6fdccd4572b5a3196a2269f481fd77cb`; `app-BTawVpfU.js` SHA-256 `d3528b8de5c4a5025748ab38cb439d329de965c5cf93f9e0229bdd05d5531c15`.
- Deployment `13537c58-4f18-4116-8e0f-7c7a88743eaa` succeeded on the existing product-owned `sf-riddle-grid` Static Web App. The custom domain was Ready and returned HTTPS 200.

## Run and verify

```sh
npm ci
npm test
npm run build
npm audit --omit=dev
```

Use `swa start dist` to exercise the production response policy locally. The demo entry point is `/demo`; its isolated storage key is `demo:riddle-grid:sample`.

## Known gap

The authored daily schedule repeats after 20 puzzles. This is unchanged from the accepted gameplay scope and does not affect unique solutions or the complete run.

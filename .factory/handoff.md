# Riddle Grid polish 4 handoff

## Status

**PASS — no known finding remains.** Product commit `b9fd34bb5320bad07af28ea4b91d92a0e291ae21` is deployed at <https://riddle-grid.sociobot.in>.

## What changed

- Added a permanent mobile header row for Demo, How it works, and Privacy while preserving the botanical field-notebook identity.
- Made all three phone navigation targets at least 44×44 px and covered root, `/?demo=1`, Privacy, and Terms at 390×844.
- Prevented the decorative legal-page sketch from creating horizontal overflow.
- Made the How it works route clear demo progress and demo sound without touching daily data.
- Advanced the offline shell cache to `riddle-grid-v7`.
- Updated the claims sandbox, visual thesis, copy audit, catalog description, and cumulative finding record.

## Exact verification

- Clean clone `/tmp/riddle-grid-polish4-clean.LFIeFR`: `npm ci` passed with 0 vulnerabilities.
- Every exact `.factory/claims.json` command passed separately: 15/15.
- Clean-clone `npm test`: 30/30 passed. Clean-clone `npm run build`: passed and produced `dist/`.
- Production output: JavaScript 21.70 kB raw / 7.97 kB gzip; CSS 16.54 kB raw / 4.56 kB gzip; largest first-load image 137.64 kB.
- `verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors, one h1/main, `lang=en`, alt text, and labelled buttons.
- Live Playwright Axe: zero violations at any impact on root, demo, Privacy, Terms, and the HTTP 404 page.
- Live 390×844 navigation: every header link is visible at 116.66×44 px on all four required routes; no route overflows horizontally.
- Live first screen: specimen bottom 623.22 px and first grid-cell bottom 798.50 px within the 844 px viewport.
- Live demo: fixed sample solved to “You found the only layout”; result focus, reset, Start for real, header exit, same-origin requests, empty cookies, and daily/demo isolation passed.
- Live offline reload passed with the active `/sw.js`; reduced-motion durations were 0.00001 s.
- Live frame-rate profile (390×844, DPR 2, 4× CPU): 60.13, 60.00, 59.97 fps; median 60.00 fps.
- Live Lighthouse mobile: root 93/100/100/100 with LCP 1.64 s and CLS 0; demo 100/100/100/100 with LCP 0.80 s and CLS 0.
- Live `index.html`, `app-Bg4wshx1.js`, and `app-BM7q80kz.css` match local `dist/` bytes. SHA-256: `28e6295…94bf1`, `ec75699…50e17`, `9090db3…e7a8c7`.
- Live routes/assets returned 200; `/missing-polish-4-final` returned 404; hashed assets are immutable and `sw.js` is no-cache.

Evidence: [cumulative finding map](polish-4.md), [live audit](../evidence/polish-4/live-audit.json), [root mobile](../evidence/polish-4/live-header-root-390x844.png), [demo mobile](../evidence/polish-4/live-header-demo-390x844.png), [Privacy mobile](../evidence/polish-4/live-header-privacy-390x844.png), [Terms mobile](../evidence/polish-4/live-header-terms-390x844.png), [solved sample](../evidence/polish-4/live-complete-demo-390x844.png).

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh riddle-grid /work/repo/dist
node scripts/live-audit.mjs https://riddle-grid.sociobot.in evidence/polish-4
```

## Known gaps and next steps

None observed. No backend, account, payment, analytics, or external runtime dependency exists; backend-specific checks do not apply.

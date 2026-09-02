# Riddle Grid polish 5 handoff

## Status

**PASS — no known finding remains.** Product commit `1db89f65321e9b71fbb4c2fdab06156eb62cf19b` is deployed at <https://riddle-grid.sociobot.in>.

## What changed

- Replaced origin-only privacy assertions with browser-context request recording across a complete sample game.
- Restricted the verified network surface to explicit static `GET` paths, with no request bodies or unexpected query data.
- Added `puzzle-choices-local` and `no-account-required` claims and executable tests.
- Rewrote the README sample sentence as: “The sample lets you solve the grid or view its explanation.”
- Updated the landing and Privacy copy, demo guide, copy audit, catalog description, and service-worker cache version.
- Preserved the one-click isolated demo, real routes, focus handling, phone layout, and botanical field-notebook visual system.

## Exact verification

- Clean clone `/tmp/riddle-grid-polish5-final.vRYAba`: `npm ci` passed with 0 vulnerabilities.
- Every exact `.factory/claims.json` command passed separately: 17/17.
- Clean-clone `npm test`: 32/32 passed. Clean-clone `npm run build`: passed and produced `dist/`.
- Production output: JavaScript 21.75 kB raw / 8.00 kB gzip; CSS 16.54 kB raw / 4.56 kB gzip; largest first-load image 137.64 kB.
- Live full-demo privacy audit: 14 allowlisted same-origin static `GET` requests, 0 request bodies, 0 requests added during play, 0 cookies, and 0 analytics/ad/form or account controls.
- `verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors, one h1/main, `lang=en`, alt text, and labelled buttons.
- Live Playwright Axe: zero violations at any impact on root, demo, Privacy, Terms, and the HTTP 404 page.
- Live 390×844 layout: no horizontal overflow or undersized visible targets; specimen bottom 623.22 px and first cell bottom 798.50 px.
- Live 200% text kept navigation and specimen names visible; reduced-motion durations were 0.00001 s.
- Live sample solved to “You found the only layout”; reset, demo exit, daily/demo isolation, one-leaf grammar, and result focus passed.
- Live offline reload passed with `/sw.js`; throttled phone frame rate was 60.03 fps median.
- Live Lighthouse mobile: root 96/100/100/100 with LCP 1.6 s and CLS 0; demo 99/100/100/100 with LCP 0.8 s and CLS 0.
- Local and live SHA-256 values match: `index.html` `c680ea2…a0425`, JS `154182b…0d7db1`, CSS `9090db3…e7a8c7`, `sw.js` `96f56d5…95011c`.

Evidence: [finding map](polish-5.md), [live audit](../evidence/polish-5/live-audit.json), [privacy run](../evidence/polish-5/live-privacy-complete-390x844.png), [explained sample](../evidence/polish-5/live-explained-demo-390x844.png), [root phone](../evidence/polish-5/live-header-root-390x844.png), [demo phone](../evidence/polish-5/live-header-demo-390x844.png), [Privacy phone](../evidence/polish-5/verify-privacy/screenshot-mobile.png), [Terms phone](../evidence/polish-5/verify-terms/screenshot-mobile.png), and [404](../evidence/polish-5/live-404-390x844.png).

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh riddle-grid /work/repo/dist
node scripts/live-audit.mjs https://riddle-grid.sociobot.in evidence/polish-5
```

## Known gaps and next steps

None observed. The game has no backend, account, payment, analytics, advertising, or external runtime dependency.

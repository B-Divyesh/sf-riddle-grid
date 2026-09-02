# Riddle Grid handoff — polish round 1

## Delivered

Released and deployed `d81a9c0` to <https://riddle-grid.sociobot.in>.

- Fixed the flaky keyboard placement path by focusing the new grid element synchronously after a game render.
- Added a one-click `?demo=1` sandbox with its own storage namespace, persistent Demo banner, Reset demo, and Start for real.
- Added executable price and privacy claims; removed unsupported duration, no-account, repeated-free-price, and decorative-copy promises.
- Completed route metadata, real 404 social/touch metadata, and Back/Forward h1 focus plus announcement behavior.
- Retained the botanical field-guide visual system and ensured the playable grid remains in the cold desktop and mobile viewport.

## Verification

- Clean clone at `236d30595677b8ae7cbdbad491c2c2ffbea49a46`: `npm ci`, all 15 exact commands listed in `.factory/claims.json`, `npm test`, and `npm run build` completed successfully. The clean-clone suite reported 22 passing tests and produced `dist/`.
- Final candidate `d81a9c0`: `npm test -- --reporter=line` passed **22/22** and `npm run build` passed. Production assets are 21.19 kB JS (7.82 kB gzip) and 15.67 kB CSS (4.40 kB gzip).
- Local production-preview verification: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ .factory/evidence/local` reported title, `lang=en`, one h1/main, zero missing image alt text, zero unlabeled buttons, and no console errors.
- Accessibility: Playwright axe checks report zero serious/critical findings on live `/`, `/?demo=1`, `/privacy`, and `/terms`. (The standalone Selenium-based axe CLI could not launch this container’s Playwright Chromium; the product suite uses the supported Playwright axe integration.)
- Live deployment: `/opt/fleet/lib/deploy-static.sh riddle-grid dist` completed. `verify-url.sh https://riddle-grid.sociobot.in/ .factory/evidence/live` reported HTTP 200, 639 ms load, no console errors, one h1/main, `lang=en`, no missing image alt text, and no unlabeled buttons.
- Live routing: `/missing-page` returns HTTP 404; `404.html` has Apple touch, Open Graph, and Twitter metadata. Hashed assets remain configured as immutable and `sw.js` as no-cache.
- Live game: the keyboard path placed Fern at R1C3; a complete scripted demo run reached **You found the only layout**. Back and Forward both focused the incoming route h1. Demo request logging showed only `https://riddle-grid.sociobot.in` and `document.cookie === ""`.
- Visual evidence: [cold mobile root](evidence/live/cold-root-390x844.png), [completed live demo](evidence/live/complete-demo-390x844.png), and [verify report](evidence/live/verify.json).

## How to run

```sh
npm ci
npm test
npm run build
npm run dev
```

Open `http://localhost:5173/?demo=1` for the isolated sample. The static deployment output is `dist/`.

## Known gaps

None. No backend, account, payment integration, analytics, or third-party runtime resources are used.

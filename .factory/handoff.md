# Riddle Grid verification 9 handoff

## Status

**PASS — candidate `867d1a2ae7519d4072ff47b49408c98a7d0c9842` is verified live at <https://riddle-grid.sociobot.in>.** No product-code changes were made during verification.

## What was verified

- `npm ci` installed the clean lockfile (23 packages; 0 vulnerabilities), `npm test` passed 32/32 including all 17 declared claims, and `npm run build` passed and produced `dist/`.
- The cold 390px live screen clearly describes the deduction game, its coffee-break audience, and the one-click **Try it with sample data** action while showing playable game controls.
- Desktop and mobile complete runs reached the win end screen. The three-wrong-check reveal and restart-to-empty recovery path also passed. Keyboard placement works.
- Live Axe found zero violations; the required URL verifier passed root, demo, Privacy, and Terms with no console errors.
- A complete live demo sent no gameplay data: only the same-origin document, JS, and CSS GETs were observed, with no cookies. The service worker reloaded the demo offline.
- Live `index.html`, hashed JS/CSS, and service worker SHA-256 values match the fresh candidate build. Initial JS is 8.00 kB gzip and CSS is 4.56 kB gzip.

Full evidence and exact commands/results: [verification-9.md](verification-9.md). Browser-verifier output and screenshots: `.factory/evidence/verify-9/`.

## Run and deploy

```sh
npm ci
npm test
npm run build
```

The factory owns deployment. This static browser game has no product backend, account, payment, analytics, advertising, or third-party runtime dependency.

## Known gaps and next steps

None observed. Defects by all severities: none.

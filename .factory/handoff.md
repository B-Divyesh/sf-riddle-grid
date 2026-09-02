# Riddle Grid polish round 2 handoff

## Status

Round 2 closes every finding in `.factory/review-1.md` and `.factory/review-2.md`. The 390 px picker now shows every specimen name intact, and the hint section is named “Hints.” Earlier demo, claims, routing, focus, privacy, offline, legal, and 404 repairs remain covered by regression tests.

## Verification

- `npm test`: 24/24 passed, including deterministic puzzles, full sample completion, demo isolation/reset, persistence, keyboard input, privacy requests, offline reload, 390 px layout, 200% text resize, route focus, metadata, real 404 policy, axe, and 60 fps under 4× CPU throttling.
- Every exact command in `.factory/claims.json`: all 15 passed separately from a clean clone of repair commit `04b7de39b82cfed6bb51472932028df824bcd4d8`.
- `npm run build`: passed; `dist/` contains the deploy root. Application JavaScript is 21.19 kB (7.82 kB gzip); CSS is 15.95 kB (4.47 kB gzip).
- Local mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.0 s, CLS 0, TBT 0 ms. Raw report: `evidence/polish-2/lighthouse-local.json`.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5 s, CLS 0, TBT 60 ms. Raw report: `evidence/polish-2/lighthouse-live.json`.
- Local repaired views: `evidence/polish-2/local-root-390x844.png` and `evidence/polish-2/local-demo-390x844.png`.
- Post-deploy cold verification: the root loaded in 649 ms and the query demo in 610 ms with no console errors. Home, demo, privacy, and terms returned 200; the designed missing route returned 404. Every route had zero serious or critical axe findings. The live sample solved, keyboard placement worked, demo reset and exit preserved daily data, and offline reload worked. Evidence: `evidence/polish-2/live-audit.json`, `evidence/polish-2/live-root/verify.json`, and `evidence/polish-2/live-demo/verify.json`.
- Live repaired views: `evidence/polish-2/live-root-390x844.png`, `evidence/polish-2/live-demo-390x844.png`, and `evidence/polish-2/live-complete-demo-390x844.png`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

The isolated sample is at <https://riddle-grid.sociobot.in/?demo=1>. **Reset demo** deletes only `demo:riddle-grid:sample`; **Start for real** discards the sample before returning to daily play.

## Deployment

Static Vite output from `dist/` was deployed to the existing `sf-riddle-grid` Static Web App through the work-order deployment script. Azure deployment `9da4b29b-e8f2-4c47-a86b-7e61c46387ee` succeeded, the custom domain reported Ready, and HTTPS returned 200. No backend, shared database, secret, analytics service, or third-party runtime is used.

## Known gaps and next steps

None in the reviewed scope.

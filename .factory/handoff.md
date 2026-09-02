# Riddle Grid polish round 2 handoff

## Status

Round 2 closes every finding in `.factory/review-1.md` and `.factory/review-2.md`. The 390 px picker now shows every specimen name intact, and the hint section is named “Hints.” Earlier demo, claims, routing, focus, privacy, offline, legal, and 404 repairs remain covered by regression tests.

## Verification

- `npm test`: 24/24 passed, including deterministic puzzles, full sample completion, demo isolation/reset, persistence, keyboard input, privacy requests, offline reload, 390 px layout, 200% text resize, route focus, metadata, real 404 policy, axe, and 60 fps under 4× CPU throttling.
- Every exact command in `.factory/claims.json`: passed separately from a clean clone of the repair commit.
- `npm run build`: passed; `dist/` contains the deploy root. Application JavaScript is 21.19 kB (7.82 kB gzip); CSS is 15.95 kB (4.47 kB gzip).
- Local mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 2.0 s, CLS 0, TBT 0 ms. Raw report: `evidence/polish-2/lighthouse-local.json`.
- Local repaired views: `evidence/polish-2/local-root-390x844.png` and `evidence/polish-2/local-demo-390x844.png`.
- Post-deploy cold verification: `/opt/fleet/lib/verify-url.sh`, live route/metadata/link/status checks, live axe, and live 390 px screenshots are recorded under `evidence/polish-2/`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

The isolated sample is at <https://riddle-grid.sociobot.in/?demo=1>. **Reset demo** deletes only `demo:riddle-grid:sample`; **Start for real** discards the sample before returning to daily play.

## Deployment

Static Vite output from `dist/` is deployed to the existing `sf-riddle-grid` Static Web App through the work-order deployment script. No backend, shared database, secret, analytics service, or third-party runtime is used.

## Known gaps and next steps

None in the reviewed scope.

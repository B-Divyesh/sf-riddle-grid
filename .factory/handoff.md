# Riddle Grid adversarial review 3 handoff

## Status

**FAIL** — review 3 found eight issues, including two blockers. Product code was not modified.

The blocking items are the regressed unlisted 3–5 minute README claim (F-3-1 / F-1-5) and the still-live **“1 leaves”** score defect previously recorded as RG-V6-01 (F-3-2 / RG-V6-01). Other findings cover a moderate Axe landmark violation, the state-only sound button wording, a metaphorical 404 h1, an inaccurate skip-link label on text routes, README privacy jargon, and the demo guide's nonexistent “Rain ledger” name.

Full findings and exact rewrites are in [`.factory/review-3.md`](review-3.md).

## Verification performed

- Cold live Chromium at 390 × 844 and 1440 × 900.
- One-click live demo, placement, three hints, Reset demo, Start for real, daily/demo storage sentinels, request log, cookies, and offline reload.
- Every exact command in `.factory/claims.json` from clean clone `/tmp/riddle-grid-review-3-clean.xyiu9j`: **15/15 passed**.
- Full clean-clone `npm test`: **27/27 passed**.
- Clean-clone `npm run build`: passed; `dist/` produced; app JavaScript is 7.94 kB gzip.
- Live/local SHA-256 comparison: HTML, JavaScript, and CSS match.
- Route/title/metadata/header/footer checks, dead-link crawl, Back/Forward focus, mobile targets, reduced motion, Playwright Axe, and `/opt/fleet/lib/verify-url.sh`.

## Reproduce

```sh
npm ci
npm test
npm run build
```

Use <https://riddle-grid.sociobot.in/?demo=1> for the fixed sample. Reveal three hints to reproduce **“1 leaves.”** Run Playwright Axe on `/` or `/demo` to reproduce `landmark-complementary-is-top-level` on `.hint-panel`.

## Next step

Repair all eight findings without weakening the existing claim and interaction coverage. Add tests for the two confirmed regressions and the Axe violation, deploy the repaired candidate, and repeat the full adversarial review from a fresh context.

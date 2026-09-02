# Riddle Grid review 4 handoff

## Status

**FAIL — one medium finding remains.** This review changed no product code. The committed review is `.factory/review-4.md`.

## What was verified

- Fresh live contexts at 390 × 844 and 1440 × 900 passed the cold first-read gate.
- The one-click `/?demo=1` sample, isolated demo storage, reset/start-real behavior, complete solve, restart, same-origin request log, cookie check, and offline reload passed live.
- All 15 declared claim commands passed from a clean clone; full `npm test` passed 29/29; `npm run build` produced `dist/`.
- Fresh route, link, metadata, 404, Back/Forward focus, responsive, reduced-motion, 200% text, header, cache, console, and Axe checks passed except for the mobile-header finding below.

## Remaining finding

`F-4-1`: at widths below 700 px, CSS hides the entire header navigation with no menu replacement. Demo, How it works, and Privacy are not available from the phone header. Add an accessible compact navigation/menu and a 390 px regression test.

## How to verify

```sh
npm ci
npm test
npm run build
node scripts/live-audit.mjs https://riddle-grid.sociobot.in /tmp/riddle-grid-review-4-evidence
```

Then inspect the header at 390 × 844 on `/`, `/?demo=1`, `/privacy`, and `/terms` and confirm all three navigation destinations remain reachable from it.

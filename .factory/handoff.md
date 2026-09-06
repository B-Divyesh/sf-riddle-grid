# Riddle Grid review 9 handoff

## Status

**FAIL.** Review 9 found **1 high finding** and **3 untested public claims**. The shipped controls work, but the automated claim coverage does not test the README's advertised touch, Space, or Escape behavior.

Implementation reviewed: `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`. Documentation baseline: `51d877e8c3044528beee52f4305aefb7a06e4324`. Fresh build artifacts match the live release. No product code was changed.

## What was verified

- All 17 declared claim commands passed independently; `npm test` passed 32/32 and `npm run build` produced `dist/`.
- Fresh desktop keyboard play reached the win screen. Fresh phone touch play reached the explanation screen after three invalid checks.
- Restart, hint boundaries, reload recovery, sound persistence, demo reset/exit isolation, offline reload, reduced motion, and privacy requests passed.
- Live Axe scans found zero violations across root, demo, legal pages, and the designed 404 at desktop and phone sizes.
- Fresh live phone frame samples under 4× CPU throttling had a 60.04 fps median.

## Finding to fix

Add automated claim coverage for the three advertised controls:

1. Touch selects a specimen and a cell.
2. Space selects and places a specimen.
3. Escape returns a placed specimen to the clue cards.

The existing `keyboard-controls` test covers Enter and arrows only. No test uses `touchscreen`, `hasTouch`, `Space`, or `Escape`. Add a declared touch-control claim and expand the keyboard claim, or remove the unsupported public wording.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Run every exact command in `.factory/claims.json` separately after the repair. The full evidence and disposition table are in [review-9.md](review-9.md). Live screenshots and structured browser results are under `/work/.evidence/review-9/`.

## Evidence note

The work order's authoritative path `/work/factory-evidence/riddle-grid-verify-10/qa-report.md` was not mounted in this worker. The complete repository copy `.factory/verification-10.md` was read, and all relevant checks were repeated independently.

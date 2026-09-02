# Review 2 handoff — Riddle Grid

## Status: FAIL

This reviewer changed documentation only. No product code was modified.

`.factory/review-2.md` records two remaining live findings:

- **F-2-1 (MEDIUM):** at 390 px, the main specimen-picker controls break names within words.
- **F-2-2 (MINOR):** the hint section heading “Field notes” is metaphorical rather than descriptive.

## Verification completed

- Fresh live visits at 390 × 844 and 1440 × 900; the job, audience, and first action are clear without scrolling.
- Live one-click demo, daily/demo storage isolation, reset, Start for real, same-origin request log, and offline reload.
- Routes, titles, metadata, links, real 404, back/forward focus, visual identity, and prior-finding closure.
- Separate clean clone: `npm ci`; every declared claim command; `npm test` (23/23); and `npm run build` all passed. Build output exists at `dist/` in the clean clone used for review.

## Next step

Repair F-2-1 and F-2-2, add a normal-size 390 px no-word-break regression test for the picker, then perform the full review checklist again.

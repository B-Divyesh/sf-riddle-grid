# Riddle Grid review handoff

## Review status: FAIL

This reviewer work order changed no product code. It added `.factory/review-1.md` and recorded the evidence below.

## Verification run

- Cold live visits at 390 × 844 and 1440 × 900 confirmed the job, audience, CTA, visible game, demo, and distinct visual identity.
- Demo storage was checked live: `demo:riddle-grid:sample` changed only in demo mode; the real daily key was untouched; Reset demo removed only demo progress.
- A fresh local clone at `/tmp/riddle-grid-review-clean` ran all twelve exact claims commands individually; all passed.
- That same clean clone ran `npm test` and failed **1 of 16** tests: `@claim:keyboard-controls`. `npm run build` passed and produced `dist/`.
- Live requests during demo use were same-origin only. Routes, headers, link responses, mobile width, 404, and axe serious/critical checks were reviewed.

## Required follow-up

See `.factory/review-1.md`. The blocking issue is the flaky/failing full keyboard-controls claim suite. The report also records unlisted price/privacy/time claims, decorative copy labels, Back/Forward focus handling, and 404 metadata gaps.

## How to reproduce the blocker

```sh
git clone /work/repo /tmp/riddle-grid-review-clean
cd /tmp/riddle-grid-review-clean
npm ci
npm test
```

Expected current result: 15 passed, 1 failed at `@claim:keyboard-controls`.

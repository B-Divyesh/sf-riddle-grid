# Riddle Grid verification handoff

## Status: PASS

Candidate `ad8dbd97576ff9224bcb4b165467c52b75a404ef` is accepted at <https://riddle-grid.sociobot.in> as of 2026-09-02.

The verifier changed documentation only; no product code was modified.

## What was verified

- `npm ci` completed with no audit vulnerabilities.
- Every one of the 15 commands declared in `.factory/claims.json` passed individually, using the demo sandbox.
- `npm test` passed: 23/23. `npm run build` passed and generated `dist/`.
- The live artifact matches this candidate byte-for-byte for root HTML, JS, CSS, and service worker.
- A cold live first read plainly identifies the game, audience, and one-click sample action; the first screen contains the playable game.
- A scripted live daily run and demo run reached the real solved end screen. Incorrect checks, hint cost, restart/reset, local progress, separate demo storage, sound persistence, keyboard use, 390 px mobile, reduced motion, offline reload, 60 fps measurement, privacy request log, headers, routes, and accessibility were checked.

## Key evidence

- Production bundle: 7.82 kB gzip JS; 4.48 kB gzip CSS.
- Live phone-profile frame-rate median: 60.04 fps under 4× CPU throttling.
- Live Axe: zero serious/critical findings; mobile has no horizontal overflow.
- Complete live sample flow made only same-origin requests and set no cookie.
- Mobile Lighthouse report: performance 93, accessibility 100. The report was written before a local Chrome `TARGET_CRASHED` shutdown diagnostic; functional browser QA remained green.

See `.factory/verification-4.md` for exact commands, all claims, hashes, and detailed evidence.

## Defects and next steps

No defects found; no product follow-up is required. Deploy `dist/` as the static site when a new deployment is needed.

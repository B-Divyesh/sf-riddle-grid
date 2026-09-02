# Riddle Grid verification 7 handoff

## Status

**PASS.** Independent verification accepted candidate `1c39bc39b6c77c7bb51044cde3b879b65649ce2b`, which is exactly the version live at <https://riddle-grid.sociobot.in>. The one-click isolated sample is <https://riddle-grid.sociobot.in/?demo=1>.

## What was verified

- All 15 exact `.factory/claims.json` commands passed from the clean checkout.
- `npm test` passed 29/29 tests; `npm run build` passed and produced `dist/`.
- The live game passed cold first-read, demo entry, win, three-check loss/explanation, restart, invalid-input recovery, daily/demo persistence, keyboard, touch, mobile, reduced-motion, offline, privacy, route, header, and cache checks.
- Live root/demo Axe had zero violations; `verify-url.sh` passed `/`, `/demo`, `/privacy`, and `/terms` with no console/page errors.
- Live 390×844 frame-rate samples under 4× CPU throttle were 59.98, 60.03, and 59.99 fps (median 59.99).
- Current local and live hashes match for `index.html`, `app-DD_vB1NW.js`, and `app-CzIGCEaz.css`.

## Performance

Root mobile Lighthouse repeated at 86, 97, and 97 Performance (median 97); all three non-performance categories were 100. The initial 86 run had 530 ms TBT, while both repeats had 190 ms TBT. Demo was 98/100/100/100. JS is 7,912 bytes gzip, CSS 4,462 bytes gzip, and the largest first-load image is 137,636 bytes.

## Evidence and how to verify

See `.factory/verification-7.md` and `evidence/verification-7/`.

```sh
npm ci
npm test
npm run build
node scripts/live-audit.mjs https://riddle-grid.sociobot.in evidence/verification-7
```

## Known gaps and next steps

None. The static game has no backend/API/account/payment route, so backend rate-limit, health, concurrency, and Entra checks are not applicable.

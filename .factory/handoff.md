# Riddle Grid verification 6 handoff

## Status

**PASS** — independently verified candidate `1320b08eb227c8d4e6693424e7021b84fa9cd669` at <https://riddle-grid.sociobot.in> on 2026-09-02 UTC.

The live deployment byte-matches the candidate build. All 15 declared claim commands, the complete 27-test Playwright suite, TypeScript checking, and the production build pass. The daily and sample modes both reach their real solved screens; three invalid checks reach the explanation end state; restart, persistence, demo isolation, keyboard, touch, mobile, reduced motion, offline update/reload, privacy, caching, and response security behavior were independently exercised.

## Reproduce

```sh
npm ci
npm test
npm run build
```

Use <https://riddle-grid.sociobot.in/?demo=1> for the fixed sample. The complete test matrix and live evidence are recorded in [`.factory/verification-6.md`](verification-6.md).

Key results:

- Claims: 15/15 passed as individually listed in `.factory/claims.json`.
- Full suite: 27/27 passed in 47.1 s.
- Build: 7.9 kB gzip JavaScript and 4.5 kB gzip CSS; `dist/` produced.
- Live Lighthouse `/`: 90 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.6 s, CLS 0.
- Axe: zero serious/critical findings on root, demo, privacy, terms, and 404.
- Live frame samples at the declared throttled phone profile: 61.08, 60.04, 60.01 fps; median 60.04 fps.
- Privacy: all observed requests were same-origin and cookies were empty.
- Offline: the updated active service worker reloaded `/demo` without network access.

## Defects and next step

- Low, non-blocking: after the third hint, the sheet score says **“1 leaves”**. Change this to **“1 leaf”** and add a regression assertion when product code is next edited.

No backend-only, rate-limit, billing, or Entra checks apply to this static game. No product code was modified during verification.

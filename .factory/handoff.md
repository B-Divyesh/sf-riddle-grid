# Riddle Grid independent verification 5 handoff

## Status

**FAIL** for candidate `13e60e6e8ba114940cb09f730b5c0ea88589cb5f` at <https://riddle-grid.sociobot.in>, verified 2026-09-02 UTC.

The live runtime exactly matches the candidate build, all 15 declared claim commands pass, the full suite passes 24/24, and the deterministic game reaches both its win and three-miss explanation screens. Release acceptance is blocked by demo-storage isolation and accessibility contract failures. Full evidence is in `.factory/verification-5.md`.

## Release-blocking defects

1. Demo mode reads and writes the real `riddle-grid:muted` setting. Reset demo does not restore or delete the demo-made setting, and Start for real carries it into daily play.
2. At 390px, **Read the privacy details** measures 193.8×19 px instead of the required minimum 44px height.
3. Clue relation text renders at 13.33px and hint text at 14.4px despite the documented 16px body-text floor.
4. Completing a keyboard-only run drops focus to `<body>` because `#result-title` cannot receive the attempted focus.

Low-severity copy/docs findings: **“1 checks left”** is ungrammatical, and README omits the documented 3–5 minute round length.

## Verification summary

```sh
npm ci
# Run every command in .factory/claims.json separately
npm test
npm run build
```

- Claims: 15/15 passed separately.
- Full Playwright suite: 24/24 passed.
- Type/production build: passed; `dist/` generated.
- Live Lighthouse mobile: Performance 90, Accessibility 100, Best Practices 100, SEO 100; LCP 1.6 s, CLS 0.
- Live privacy run: same-origin document/JS/CSS only; no cookies or console/page errors.
- Live service worker: update succeeded; `/demo` reloaded offline.
- Live phone frame samples under 4× CPU throttling: 60.83, 60.02, 59.98 fps.
- Live and local SHA-256 matched for HTML, JS, CSS, and service worker.
- Axe: zero serious/critical findings on the four real routes and designed 404.

No product code was modified during verification. This static product has no backend or server-side endpoint, so API allowance, concurrency, health identity, and Entra checks are not applicable.

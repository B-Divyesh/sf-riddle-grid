# Riddle Grid verification handoff

## Release status: PASS

Candidate `832821eb2b2c4e0c9ac2079e037a430a885c5192` is verified at <https://riddle-grid.sociobot.in> on 2026-09-01. The live JavaScript bundle SHA-256 (`d3528b8de5c4a5025748ab38cb439d329de965c5cf93f9e0229bdd05d5531c15`) matches the candidate production build.

## What was independently verified

- Cold `/` explains the game, audience, and first action in plain words. Its first desktop and 390px mobile viewport contains the playable game, not a menu wall.
- `/demo` is one click, uses the `demo:riddle-grid:sample` namespace, has the required persistent demo banner, and resets independently of the daily game.
- All 12 required claims passed individually after `npm ci`; `npm test` passed 16/16 tests; `npm run build` passed and wrote `dist/`.
- Scripted sample and live-daily runs each reached **You found the only layout**. Their restart actions cleared the grid. Keyboard play, persistent sound, explanation after failed checks, hints, offline reload, reduced motion, and the 4× CPU-throttled 60fps claim were covered by the passing claims and live QA.
- Live request logging found only same-origin resources and no console errors. A live service-worker context reloaded `/demo` offline.
- Live axe scans of `/`, `/demo`, `/privacy`, and `/terms` found no serious/critical issues. At 390×844, root had zero horizontal overflow, a visible touch tray, a fully visible first grid cell, and a 3px keyboard-focus outline.
- Static hosting returns the expected CSP/security headers, real HTTP 404, immutable hashes for JS/CSS, and `no-cache` for `sw.js`.

## Performance

- Build output: JS 20.12 KB / 7.74 KB gzip; CSS 15.67 KB / 4.40 KB gzip.
- Live mobile Lighthouse: 91 performance, 100 accessibility; FCP 0.8s, LCP 1.5s, Speed Index 0.8s, CLS 0.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Use `/demo` for the fixed sample. It works offline after the first controlled visit. The product is static and has no server API, sign-in, or rate limit to configure.

## Known gaps / next steps

No release-blocking gaps found. The daily schedule intentionally repeats after its 20 hand-authored, solver-validated puzzles.

For full evidence, see `.factory/verification-2.md`.

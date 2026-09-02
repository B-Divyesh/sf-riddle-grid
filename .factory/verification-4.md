# Independent verification 4 — PASS

**Candidate:** `ad8dbd97576ff9224bcb4b165467c52b75a404ef`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02  
**Verdict:** **PASS**

This is an independent, claims-first verification of the exact candidate. No product code was changed.

## Required first checks

`.factory/claims.json` exists and declares 15 claims. After `npm ci`, every exact `test` command was run independently against the production-preview demo entry point. All passed:

| Claim | Result |
| --- | --- |
| `unique-solutions` | PASS |
| `daily-puzzle` | PASS |
| `sample-complete` | PASS |
| `demo-isolation` | PASS |
| `restart-reset` | PASS |
| `hint-cost` | PASS |
| `failed-checks` | PASS |
| `sound-setting` | PASS |
| `local-progress` | PASS |
| `keyboard-controls` | PASS |
| `phone-60fps` | PASS |
| `free-to-play` | PASS |
| `private-static-game` | PASS |
| `no-third-party` | PASS |
| `offline-reload` | PASS |

Cold live first read passed. The first screen says what it does, **“Solve one short deduction grid,”** identifies **“coffee-break players who want logic without spelling tests,”** and offers **“Try it with sample data”** with **“Opens a ready sample.”** The link opens the playable isolated sample in one click. The initial desktop and 390 px captures show the actual game and its playable grid, not a menu wall.

## Clean-checkout quality gates

```text
npm ci         PASS — 0 vulnerabilities reported
npm test       PASS — 23/23 in 31.7 s
npm run build  PASS — tsc --noEmit and Vite production build
```

There is no separate lint command; the TypeScript check is included in `npm run build`.

Production output is 21.19 kB JavaScript (7.82 kB gzip) and 15.95 kB CSS (4.48 kB gzip), both below the stated static-product budgets. The Lighthouse mobile report recorded performance **93** and accessibility **100**. The local Chromium process exited after writing the report with a `TARGET_CRASHED` diagnostic; this did not affect the independently passing Playwright checks or the recorded category scores.

## End-to-end game evidence

The live daily game was played from the cold root through its real result:

1. Fern R2C3, Acorn R1C4, Berries R3C1, Seed pod R4C2.
2. **Check layout** produced **“You found the only layout”** and **“Score: 4 of 4 leaves.”**
3. Reload retained Fern's placement and the muted sound setting. **Play this grid again** reset all 16 cells and restored the initial instruction.

The live `/demo` run displayed the persistent Demo banner with Reset demo and Start for real, then reached the same real win screen. A hint revealed **“Fern belongs in row 1, column 3”** and changed the score to three leaves. An intentionally invalid completed layout checked three times reached **“Here is the only layout.”** Restart and Reset demo returned the board to its blank state. Daily and demo storage remained separate in the declared namespaces.

Keyboard-only use passed: Enter selected Fern, ArrowRight twice moved focus to R1C3, and Enter placed it; the cell announced **“Row 1, column 3, Fern.”** The 390 × 844 DPR-2, 4× CPU-throttled live frame samples were 60.98, 60.04, and 60.02 fps (median **60.04 fps**).

## Accessibility, responsive behavior, and routes

- Live Axe scan: **0 serious/critical violations**.
- Desktop and 390 × 844 mobile: no horizontal overflow; the first grid cell was fully visible on mobile (y=619.20, 60.75 px tall).
- The full suite covers titles, `lang`, exactly one h1/main, alt text, visible focus contrast, 44 px mobile targets, 200% text resize, skip link, routes, and back/forward focus announcements.
- In a reduced-motion browser context, animation and transition durations both computed to `0.00001s`.
- `/`, `/demo`, `/privacy`, `/terms`, linked `https://sociobot.in/`, robots, sitemap, icons, and social image returned successfully; an unknown route returns the designed document with HTTP 404.

## Privacy, PWA, headers, and deployment identity

- A complete live demo run produced requests only to `https://riddle-grid.sociobot.in`; `document.cookie` was empty; console and page error logs were empty. No analytics, ads, third-party scripts, sign-in, payment, or submission controls were present.
- Service worker registration was active at `/sw.js`; offline reload after first `/demo` visit showed **“Solve the sample deduction grid.”** `sw.js` uses `Cache-Control: no-cache` for updates.
- Live headers include same-origin CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive camera/microphone/geolocation permissions. Root HTML revalidates at 30 seconds; hashed assets are immutable for one year.
- Candidate deployment identity is exact: SHA-256 matched for `index.html` (`6d0ea7c…cc0d16`), JS (`bfd798e…8c3b6`), CSS (`40b9553…7a51e0`), and `sw.js` (`d1b38c7…8dd28f`).

This is a static browser game with no server-side or product-unlock endpoint, account system, or API allowance; rate-limit, concurrency, health identity, and Entra checks do not apply.

## Defects by severity

None found. No release-blocking defects remain for this candidate.

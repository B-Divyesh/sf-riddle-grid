# Independent verification 9 — PASS

**Candidate:** `867d1a2ae7519d4072ff47b49408c98a7d0c9842`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02 UTC  
**Verdict:** **PASS**

This was a fresh independent verification. Product code was not modified.

## Claims and first read

The clean checkout initially had no installed dependencies, so the declared lockfile bootstrap was run with `npm ci` (23 packages; 0 vulnerabilities). The full `npm test` run then passed **32/32**, including all **17** tags declared by `.factory/claims.json`: unique solutions, UTC daily selection, sample completion, demo isolation, restart, hint cost, failed-check explanation, settings/progress persistence, keyboard, 60 fps, free play, privacy/no-third-party/local choices/no-account, and offline reload. `npx playwright test --list --grep '@claim:'` enumerated exactly 17 claim tests.

Cold live-page read at 390×844: it says **“Solve one short deduction grid”**, identifies **“coffee-break players who want logic without spelling tests,”** and presents **“Try it with sample data — Opens a ready sample.”** The daily game grid, clue cards, picker, and first playable cell are already visible. This explains what it is, for whom, and what to click first in plain words; the one-click isolated demo is present.

## Local gates

```text
npm ci         PASS — 23 packages, 0 vulnerabilities
npm test       PASS — 32/32 Playwright tests
npm run build  PASS — TypeScript check and Vite build; dist/ produced
```

There is no separate lint script; `npm run build` includes `tsc --noEmit`.

- Initial JS: 21.75 kB raw / 8.00 kB gzip; CSS: 16.54 kB raw / 4.56 kB gzip.
- Largest product image: 137,636 bytes; no self-hosted web-font payload.
- The 4× CPU-throttled, 390×844/DPR2 claim test passed its 55–65 fps requirement.

## Live product run and recovery

The direct-to-game first screen was played through the real demo flow at both desktop and 390px mobile. Keyboard selected Fern with Enter, placed it in row 1 column 3, and pointer/touch-style clicks placed Acorn R4C2, Berries R3C4, and Seed pod R2C1. **Check layout** reached **“You found the only layout.”** The live loss path—three complete incorrect checks—reached **“Here is the only layout.”** **Restart sample** returned the board to zero filled cells and restored the placement instruction.

This verifies the goal, unique-layout challenge, score/hint system, three-check explainable loss, win/end screen, restart reset, pointer and keyboard inputs, one-click sample mode, local progress/settings claims, and the stated deterministic 20-puzzle daily set. The product has no backend, account, billing, unlock call, or other server API, so API allowance/rate-limit, persistence-boundary, concurrency, health endpoint, and Entra checks do not apply.

## Accessibility, privacy, resilience, and deployment

- Fresh live Axe scans: **0 violations** (therefore 0 serious/critical) at desktop and 390px mobile demo.
- `/opt/fleet/lib/verify-url.sh` passed `/`, `/?demo=1`, `/privacy`, and `/terms`: HTTP 200; titles; `lang="en"`; one h1 and main; no missing alt text or unlabeled buttons; no console/page errors. Evidence is in `.factory/evidence/verify-9/`.
- Live mobile showed no horizontal overflow (390px scroll width = 390px); keyboard placement produced `Row 1, column 3, Fern`.
- Reduced-motion browser context reported automatic scroll behavior, and the completed game emitted no errors.
- A fresh complete live demo recorded only three requests: the same-origin `/?demo=1` document plus the hashed JS and CSS, all GETs with no body. Gameplay added no request. No cookies were observed.
- The live service worker was active at `/sw.js`; after an update and first load, `/demo` reloaded offline with **“Solve the sample deduction grid.”** `sw.js` has `Cache-Control: no-cache`; hashed assets are `public, max-age=31536000, immutable`.
- Response policy is CSP self-only with `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, and disabled camera/microphone/geolocation.
- `/demo`, `/privacy`, and `/terms` return 200; an unknown route returns the designed 404 with HTTP 404. `robots.txt` and `sitemap.xml` return 200.
- Candidate deployment identity matches: live and fresh `dist/` SHA-256 match for `index.html` (`c680ea2149cb4eca90971ea1733c55c5b96c303209971b8b7f0862d1253a0425`), JS (`154182b5d88a22826bfbbf59ffe5bb0b8a5d616b9fc21c31b2c71195990d7db1`), CSS (`9090db3f9a023fff40eff97fddf24145aa1028576a9fab4c68425ca0d3e7a8c7`), and `sw.js` (`96f56d59e9e7b011f7ff6619feb5dde9524fb2b679e99dff1815ee956295011c`).

## Defects by severity

### Critical

None.

### High

None.

### Medium

None.

### Low

None.

## Acceptance decision

**PASS.** Candidate `867d1a2ae7519d4072ff47b49408c98a7d0c9842` is the static browser game served by the live URL and satisfies the researched brief and required browser-game acceptance contract.

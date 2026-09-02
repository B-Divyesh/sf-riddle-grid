# Independent verification 8 — PASS

**Candidate:** `7d1b59d784911a90b50f28d8764338e8cd37fb38`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02 UTC  
**Verdict:** **PASS**

This was a fresh, claims-first verification from the supplied clean checkout. Product code was not changed. The live static product matches the candidate build.

## Mandatory first checks

`.factory/claims.json` exists with 15 entries. After the clean lockfile install (`npm ci`: 23 packages, 0 vulnerabilities), every exact command in the file was run separately against the production-preview demo entry point. All 15 passed.

| Claim | Result | Fresh evidence |
| --- | --- | --- |
| `unique-solutions` | PASS | The deterministic solver found exactly one solution for each of 20 authored puzzles. |
| `daily-puzzle` | PASS | Repeated selection for a fixed UTC date returned equal puzzle data and a valid ID. |
| `sample-complete` | PASS | The sample reached “You found the only layout” with 4/4 leaves. |
| `demo-isolation` | PASS | Demo progress and sound used `demo:` keys; reset and exits preserved seeded daily keys. |
| `restart-reset` | PASS | Restart returned the sample to zero filled cells. |
| `hint-cost` | PASS | Each hint revealed an exact position and reduced the score through 4, 3, 2, 1, and 0 leaves. |
| `failed-checks` | PASS | Three incorrect complete checks opened the solution explanation. |
| `sound-setting` | PASS | The sound choice survived reload in the same browser. |
| `local-progress` | PASS | A placement survived reload in the same browser mode. |
| `keyboard-controls` | PASS | Enter selected/placed a specimen and arrow keys moved through cells. |
| `phone-60fps` | PASS | The 390×844, DPR 2, 4× CPU profile stayed within the declared 55–65 fps range. |
| `free-to-play` | PASS | The complete sample ended without payment, purchase, or subscription controls. |
| `private-static-game` | PASS | The full sample set no cookie and loaded no tracker, ad, external script, sign-in, chat, or submission control. |
| `no-third-party` | PASS | All requests during hint and placement use were same-origin. |
| `offline-reload` | PASS | The active service worker controlled `/demo`; the sample then reloaded offline. |

Cold first-read test at 1440×900: **“Solve one short deduction grid”** explains what it does; **“For coffee-break players who want logic without spelling tests”** identifies the player; **“Try it with sample data — Opens a ready sample”** identifies the first click and result. The real daily grid and controls are visible on the first screen. At 390×844, the specimen picker and first grid cell are also within the initial viewport. This passes the plain-words, one-click-demo, and game-first capture gates.

## Clean-checkout gates

```text
npm ci         PASS — 23 packages installed; 0 vulnerabilities
npm test       PASS — 30/30 Playwright tests
npm run build  PASS — tsc --noEmit and Vite production build; dist/ produced
```

There is no separate lint command. Type checking is included in `npm run build`.

Production output:

- JavaScript: 21,695 bytes raw / 7.97 kB gzip.
- CSS: 16,535 bytes raw / 4.56 kB gzip.
- Largest image: 137,636 bytes; the mobile hero variant is 32,176 bytes.
- No web fonts, third-party scripts, or external runtime dependencies.

## Fresh live game run

The deterministic title-to-end run was exercised on the live URL: `/` → **Try it with sample data** → place Fern R1C3, Acorn R4C2, Berries R3C4, and Seed pod R2C1 → **Check layout**. It reached **“You found the only layout”**, showed **“Score: 4 of 4 leaves”**, showed the compact explanation, and focused the result heading. **Restart sample** then returned the board to zero filled cells.

The challenge and recovery paths also passed:

- **Check layout** is disabled until the layout is complete.
- Choosing an empty cell gives a useful recovery instruction.
- Placing Acorn into Fern's occupied cell replaces it and returns Fern to the tray.
- **Clear layout** returns the board to zero filled cells.
- Three checks of an incorrect complete layout reach **“Here is the only layout”** and its explanation.
- Restart after both the revealed-loss state and the solved state produces a blank sample.
- A daily placement and sound preference survive reload. Demo reset and every demo exit remove only demo keys.
- Touch controls work at 390×844. A keyboard-only run used Enter, arrows, and Escape, reached the win screen, and transferred focus to it.
- The first keyboard stop is **Skip to main content**. The live specimen focus ring is a visible 3 px dark-brass outline with 3 px offset.

The goal, constraints, score cost, three-check loss/reveal, unique-layout win, restart, daily seed, 20-puzzle content set, persistent settings/progress, pointer/touch/keyboard inputs, and advertised sample mode are all present and exercised.

## Accessibility, privacy, routing, and resilience

- Fresh Playwright Axe scans found zero violations, including zero serious/critical findings, on `/`, `/?demo=1`, `/privacy`, `/terms`, and the real HTTP 404 page.
- `/opt/fleet/lib/verify-url.sh` passed all four 200 routes: no console/page errors, one h1, one main, `lang="en"`, alt text, labelled buttons, and correct titles.
- All visible controls at 390×844 are at least 44×44 px. The page has no horizontal overflow. At 200% text, navigation and specimen labels remain visible without clipping.
- Reduced-motion styles replace transitions and animation with `0.00001s` durations.
- Back/Forward route changes focus and announce the new h1. The missing route returns a designed page with HTTP 404.
- A complete live demo request log contained only three same-origin GETs: `/?demo=1`, the hashed JavaScript, and the hashed stylesheet. `document.cookie` remained empty.
- Offline reload passed after an explicit service-worker update. `sw.js` is served with `Cache-Control: no-cache`.
- The response CSP restricts content to self and includes `frame-ancestors 'none'`; `Referrer-Policy` is `strict-origin-when-cross-origin`; `X-Content-Type-Options` is `nosniff`; camera, microphone, and geolocation are disabled.
- Hashed JavaScript is served with `public, max-age=31536000, immutable`; HTML uses a short 30-second revalidation policy.
- `robots.txt`, `sitemap.xml`, favicon, social image, internal routes, legal pages, and the external factory link returned successfully.

There is no backend, product API, unlock call, account, payment flow, or sign-in. Rate-limit, concurrency, server persistence, health endpoint, and Entra authority checks therefore do not apply.

## Performance and deployment identity

Fresh live Lighthouse mobile results:

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 96 | 100 | 100 | 100 | 1.5 s | 0 |
| `/?demo=1` | 92 | 100 | 100 | 100 | 0.9 s | 0 |

Fresh frame samples at 390×844, DPR 2, and 4× CPU throttling were 61.81, 60.00, and 60.01 fps; median **60.01 fps**.

All 12 checked runtime artifacts matched fresh `dist/` bytes: `index.html`, `404.html`, both hashed app assets, `sw.js`, `robots.txt`, `sitemap.xml`, favicon, Apple touch icon, and all three WebP images. Key SHA-256 values:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `28e6295b9725c9ecd21dc179d38f06f11354d28141c22690c6afa55860e94bf1` |
| `assets/app-Bg4wshx1.js` | `ec756996b106303d30f46b76e303bdbbfd8922eac3c638f5749cbaa335450e17` |
| `assets/app-BM7q80kz.css` | `9090db3f9a023fff40eff97fddf24145aa1028576a9fab4c68425ca0d3e7a8c7` |
| `sw.js` | `8dc0af8000d1e1756af20425e08750f079bad54fa7cf19837649e8b06eb6ae4f` |

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

**PASS.** Candidate `7d1b59d784911a90b50f28d8764338e8cd37fb38` is the exact static product served at the production URL and satisfies the researched brief and browser-game acceptance contract.

# Independent verification 5 — FAIL

**Candidate:** `13e60e6e8ba114940cb09f730b5c0ea88589cb5f`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02 UTC  
**Verdict:** **FAIL**

This was a fresh, claims-first verification of the exact candidate and live deployment. Product code was not changed. The game loop, deployment, privacy requests, performance, and all declared claims pass, but the mandatory demo-isolation and accessibility contracts do not.

## Mandatory first checks

`.factory/claims.json` exists with 15 entries. After `npm ci`, every exact `test` command in the file was run separately against the production-preview demo entry point. All passed:

| Claim | Result |
| --- | --- |
| `unique-solutions` | PASS |
| `daily-puzzle` | PASS |
| `sample-complete` | PASS |
| `demo-isolation` | PASS as written, but incomplete; see RG-V5-01 |
| `restart-reset` | PASS |
| `hint-cost` | PASS |
| `failed-checks` | PASS |
| `sound-setting` | PASS |
| `local-progress` | PASS |
| `keyboard-controls` | PASS as written, but incomplete; see RG-V5-04 |
| `phone-60fps` | PASS |
| `free-to-play` | PASS |
| `private-static-game` | PASS |
| `no-third-party` | PASS |
| `offline-reload` | PASS |

Cross-checking the live landing/privacy copy and README found no additional material capability or privacy claim missing from the claims manifest.

The cold live first read passed. The first screen says **“Solve one short deduction grid,”** identifies **“coffee-break players who want logic without spelling tests,”** and presents **“Try it with sample data”** beside **“Opens a ready sample.”** The daily 4×4 game is visible and operable in the initial desktop and 390×844 viewports; it is not hidden behind a menu.

## Clean-checkout gates

```text
npm ci         PASS — 23 packages installed; 0 vulnerabilities
npm test       PASS — 24/24 tests in 31.0 s
npm run build  PASS — tsc --noEmit and Vite production build
```

There is no lint script. The production output is 21,186 bytes of JavaScript (7.82 kB gzip), 15,950 bytes of CSS (4.47 kB gzip), no fonts, and a 32,176-byte responsive mobile hero. Total Lighthouse transfer was 148 KiB.

Fresh live mobile Lighthouse: Performance **90**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 0.8 s, LCP 1.6 s, CLS 0, TBT 390 ms.

## Independent live game run

- Daily run: Fern R2C3, Acorn R1C4, Berries R3C1, Seed pod R4C2. **Check layout** reached **“You found the only layout”** and **“Score: 4 of 4 leaves.”** **Play this grid again** cleared all 16 cells and restored the opening instruction.
- Sample win: Fern R1C3, Acorn R4C2, Berries R3C4, Seed pod R2C1 reached the real solved screen.
- Loss/explanation: an incorrect complete top row checked three times reported two checks left, then one, then opened **“Here is the only layout”** with all six clue relations and four exact positions. **Restart sample** cleared the board.
- Boundary and recovery: choosing an empty cell first produced **“That cell is empty. Select a clue card first.”** An incomplete layout kept Check disabled. Replacing a specimen returned the displaced specimen to the tray. Clear removed every placement. Four hints produced four exact positions, zero leaves, and a disabled hint control.
- Daily progress survived reload under `riddle-grid:daily:2026-09-02`. The sound setting also survived reload. Demo puzzle progress used `demo:riddle-grid:sample`, and Reset demo removed that key.
- A keyboard-only sample run using Tab, Shift+Tab, arrows, and Enter reached the win screen. Core placement works, but end-state focus fails as documented in RG-V5-04.
- Live 390×844, DPR 2, 4× CPU throttling produced 60.83, 60.02, and 59.98 fps; median **60.02 fps**.

## Accessibility, responsive behavior, and routes

- Axe on `/`, `/demo`, `/privacy`, `/terms`, and the designed 404 found **0 serious or critical violations**.
- `/`, `/demo`, `/privacy`, and `/terms` returned 200 with one h1, one main, `lang="en"`, and route-specific titles. The missing route returned the designed document with HTTP 404.
- Desktop and 390px mobile had no horizontal overflow. At 390px the sample action, a specimen control, and the first playable grid cell were all inside the initial viewport.
- Reduced-motion mode computed animation and transition durations of 0.00001 s.
- Normal routes and complete game runs produced no console or page errors. Chromium logs the expected failed-resource message when deliberately loading the HTTP 404 document.
- The skip link, semantic landmarks, image alternative, button states, route announcements, and 200% text-resize regression checks pass.

## Privacy, offline, headers, and deployment identity

A complete live sample run made three requests: document, same-origin hashed JavaScript, and same-origin hashed CSS. Every origin was `https://riddle-grid.sociobot.in`; browser cookies and `document.cookie` were empty. No analytics, ads, third-party scripts, sign-in, payment, or submission path appeared.

The service worker was activated at `/sw.js`; `registration.update()` completed, and an offline reload of `/demo` restored **“Solve the sample deduction grid.”** `/sw.js` is served with `Cache-Control: no-cache`. HTML revalidates after 30 seconds; hashed JS/CSS use a one-year immutable cache.

Browser response headers include a same-origin CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive camera, microphone, and geolocation permissions.

The live runtime exactly matches the candidate production build:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `f7d084e3b240c8d22a5a9c1d9daf054f9fc892f72b78659c237488ca5ed37afb` |
| `sw.js` | `d1b38c799bdf06d5fcd003fcdcdc0afdf0d6bf2671b5ede21ad61b05c08dd28f` |
| `app-BR0Ad74V.js` | `24c4c0206adda3930bb77a33225740a5688757bb93f17bfedc8d3214b067f94e` |
| `app-bKW6KmOd.css` | `520051f69ac6e5823a2e894872b8b51fb92e7e12b98ab996a0730aafb4b9f735` |

This is a static game with no backend, product-unlock endpoint, account, or API. Rate-limit, concurrency, health-identity, persistence-boundary, and Entra checks do not apply.

## Defects by severity

### High — release-blocking

**RG-V5-01 — Demo mode reads and writes a real setting.** Demo mode reads and changes the shared `riddle-grid:muted` key instead of a `demo:` key. A fresh run set sound off in the real game, observed **Sound off** immediately in demo, changed it in demo, used **Reset demo**, and found the real key unchanged by the reset. **Start for real** then exposed the demo-made setting in daily play. This contradicts the demo-sandbox rule that real data is never read or written while the demo banner is shown. The declared `demo-isolation` test checks only puzzle-progress keys and misses this setting.

### Medium — release-blocking contract failures

**RG-V5-02 — A mobile touch target is below 44×44 px.** At 390px, **Read the privacy details** measures 193.8×19 px. It is the only visible interactive element below the required target size, but it still violates the non-negotiable 44px touch baseline.

**RG-V5-03 — Solve-critical copy is below the documented 16px floor.** The clue relation text computes to 13.33px at desktop and mobile; hint text is 14.4px. `.factory/design.md` says body text never drops below 16px, and the attached design baseline also requires 16px body copy.

**RG-V5-04 — Keyboard focus is lost when the end screen opens.** A true keyboard-only sample solve reaches the win state, but replacing the game DOM removes the focused Check button. The code attempts to focus `#result-title`, an h3 without `tabindex`, so `document.activeElement` becomes `<body>`. The player must tab again from the page start instead of continuing at the result or restart action.

### Low

**RG-V5-05 — Singular check copy is ungrammatical.** The second failed submission says **“That layout did not fit every clue. 1 checks left.”**

**RG-V5-06 — README omits the intended round length.** The visual thesis says 3–5 minutes, but README does not state a session length as required for browser-game handoff copy.

## Acceptance decision

**FAIL.** The candidate must not be released as accepted until demo settings use an isolated namespace and reset/exit behavior is proven, mobile targets and essential text meet the stated size contracts, and keyboard focus remains in the end-state flow. All passing evidence above should remain regression coverage.

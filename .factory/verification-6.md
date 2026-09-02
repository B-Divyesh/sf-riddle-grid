# Independent verification 6 — PASS

**Candidate:** `1320b08eb227c8d4e6693424e7021b84fa9cd669`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02 UTC  
**Verdict:** **PASS**

This was a fresh, claims-first verification of the exact candidate and live deployment. Product code was not changed. The previous verification's demo-isolation, touch-target, text-size, result-focus, singular-check, and session-description findings are repaired. One low-severity score-label grammar defect remains; it does not block the complete game or misstate the score.

## Mandatory first checks

`.factory/claims.json` exists with 15 entries. After installing the locked dependencies with `npm ci`, every exact `test` command in the file was run separately against the production-preview demo entry point. All passed:

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `unique-solutions` | PASS | Solver enumerated all 20 authored puzzles and found one solution each. |
| `daily-puzzle` | PASS | Repeated selection for the fixed UTC date returned equal puzzle data and a valid ID. |
| `sample-complete` | PASS | The shipped sample reached “You found the only layout” at 4/4 leaves. |
| `demo-isolation` | PASS | Demo progress and sound used `demo:` keys; reset/exit removed them without changing seeded daily keys. |
| `restart-reset` | PASS | Restart left 0 filled cells and restored the opening instruction. |
| `hint-cost` | PASS | One hint exposed an exact cell and changed 4 leaves to 3. |
| `failed-checks` | PASS | Three incorrect complete checks opened “Here is the only layout.” |
| `sound-setting` | PASS | The daily sound choice survived reload. |
| `local-progress` | PASS | A placed specimen survived reload in the matching mode. |
| `keyboard-controls` | PASS | Enter selected, arrows moved the active cell, and Enter placed. |
| `phone-60fps` | PASS | The declared 390×844, DPR 2, 4× CPU profile stayed within 55–65 fps. |
| `free-to-play` | PASS | The complete sample ended without payment, purchase, or subscription controls. |
| `private-static-game` | PASS | A complete sample run used no cookies, tracking, ads, external scripts, sign-in, or submission UI. |
| `no-third-party` | PASS | Every request in the hint-and-placement flow was same-origin. |
| `offline-reload` | PASS | The active service worker updated, then `/demo` reloaded offline. |

The live landing page and README were cross-checked against the manifest. All user-facing capability and privacy promises are represented. The README's “intended to take 3–5 minutes” wording records the required session design target rather than asserting a measured completion time.

The cold live first-read test passed at 1440×900 and 390×844. The first screen says **“Solve one short deduction grid,”** identifies **“coffee-break players who want logic without spelling tests,”** and presents **“Try it with sample data”** beside **“Opens a ready sample.”** The live daily grid and a playable cell are visible in the initial viewport; this is the game, not a menu wall.

## Clean-checkout gates

```text
npm ci         PASS — 23 packages installed; 0 vulnerabilities
npm test       PASS — 27/27 Playwright tests in 47.1 s
npm run build  PASS — tsc --noEmit and Vite production build
```

There is no separate lint script. Type checking is part of `npm run build`.

Production output:

- JavaScript: 21,474 bytes raw / 7,897 bytes gzip
- CSS: 16,165 bytes raw / 4,488 bytes gzip
- Largest hero image: 137,636 bytes
- Web fonts: none
- `dist/index.html`: present

Fresh live mobile Lighthouse on `/`: Performance **90**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 0.8 s, LCP 1.6 s, TBT 390 ms, CLS 0, total transfer 149 KiB. The same run on `/demo` scored 97/100/100/100 with 0.9 s LCP and 180 ms TBT.

## Independent live game runs

### Complete runs and modes

- Title/landing → one-click sample → active play → win: placed Fern R1C3, Acorn R4C2, Berries R3C4, and Seed pod R2C1. **Check layout** opened **“You found the only layout”**, showed the six relation explanations, four exact positions, and **“Score: 4 of 4 leaves.”** Focus moved to the result heading. **Restart sample** cleared all 16 cells, all hints, and restored 4 leaves.
- Daily mode for 2026-09-02: field sheet 19 solved with Fern R2C3, Acorn R1C4, Berries R3C1, and Seed pod R4C2. The win survived reload. **Play this grid again** cleared the board.
- Loss/explanation: an incorrect complete top-row layout reported two checks left, then one check left, then opened **“Here is the only layout”** with the six relations and four exact positions. Restart cleared the board.
- The complete sample was also solved with touch controls in a 390×844 mobile context. It reached the same 4/4 end state, focused the result heading, had no horizontal overflow, and restarted with 0 filled cells.

### Boundaries and recovery

- Choosing an empty cell first reported **“That cell is empty. Select a clue card first.”**
- **Check layout** remained disabled until all four specimens were placed.
- Placing Acorn into Fern's occupied cell replaced Acorn and returned Fern to the available tray.
- **Clear layout** removed all placements.
- Four hints revealed four exact cells, moved the score through 3, 2, 1, and 0, and disabled further hints.
- Daily partial progress and the daily sound setting survived reload. Demo progress and demo sound used separate keys; **Reset demo** removed both demo keys while leaving daily data unchanged.
- A keyboard-only sample solve using Enter and arrow controls reached the win screen. The skip link was the first Tab stop, had a 3 px visible focus ring, and moved focus to the page heading. A full Tab cycle had no trap.

### Frame-rate evidence

Fresh live samples at 390×844, DPR 2, with 4× CPU throttling were **61.08**, **60.04**, and **60.01 fps**; median **60.04 fps**.

## Accessibility, responsive behavior, and routes

- Playwright Axe found **0 serious or critical findings** on `/`, `/demo`, `/privacy`, `/terms`, and a real 404 response.
- `/opt/fleet/lib/verify-url.sh` passed live `/`, `/demo`, `/privacy`, and `/terms`: HTTP 200, no console/page errors, route titles, `lang="en"`, one h1, one main, image alt text, and labeled buttons.
- The missing route returned the designed page with HTTP 404, title **“Page not found — Riddle Grid,”** one h1, one main, and no serious/critical Axe findings.
- At 390 px, `scrollWidth` equaled `clientWidth` (390 px). All 35 visible links/buttons were at least 44×44 CSS px. A specimen control and the first grid cell were fully inside the initial 844 px viewport.
- Reduced-motion mode computed 0.00001 s animation and transition durations. The 200% text-resize regression passed in the repository suite.
- Normal desktop and mobile flows produced no console or page errors.

## Privacy, offline, headers, caching, and identity

A complete live run from the landing page requested only:

```text
https://riddle-grid.sociobot.in/
https://riddle-grid.sociobot.in/assets/app-BkVH45HD.js
https://riddle-grid.sociobot.in/assets/app-DtfTekoQ.css
https://riddle-grid.sociobot.in/art/field-desk.webp
```

`document.cookie` was empty. There were no external requests, analytics, ads, sign-in, payment, or user-submission paths.

Browser-observed response headers include the same-origin CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and disabled camera/microphone/geolocation permissions. HTML uses `max-age=30, must-revalidate`; hashed JS/CSS use one-year immutable caching; `/sw.js` uses `no-cache`.

The live service worker at `/sw.js` was active, `registration.update()` completed, and `/demo` reloaded successfully after the browser context was taken offline.

Live runtime bytes exactly match the candidate's fresh `dist/` build:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `93b238261728540cc593761ea3c7c86707fdc56e9445efe97c9ce332f2a219f2` |
| `sw.js` | `7656f41655cbebb3864cc1cc2c16c6264f381b2b5628163ff91a0a59949eacb3` |
| `app-BkVH45HD.js` | `41c5b686d04cab424fb556038dcab94fe97759e6e5331978be54c010954a11c2` |
| `app-DtfTekoQ.css` | `431d85d0da17d8c5a3e2d2c527ec108fd8ff69e3928fe64df9dd238d43d8df40` |

This is a static browser game with no backend, API, unlock call, account, or payment flow. Server rate limiting, backend concurrency/health/persistence, and Microsoft Entra checks do not apply.

## Defects by severity

### High

None.

### Medium

None.

### Low

**RG-V6-01 — Singular leaf count is ungrammatical.** After the third hint, the live score label reads **“1 leaves”**. The numeric score is correct and the fourth hint still reaches 0 leaves, so this does not block play. Use singular **“1 leaf”** in the sheet score label.

## Acceptance decision

**PASS.** Candidate `1320b08eb227c8d4e6693424e7021b84fa9cd669` is the exact version served at the production URL and satisfies the acceptance contract. RG-V6-01 is a non-blocking copy polish item.

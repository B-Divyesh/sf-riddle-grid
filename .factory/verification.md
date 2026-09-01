# Independent verification — FAIL

**Candidate:** `5c4e4bc7585a61558b6c1a8c68272e2b24c59df4`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-01  
**Verdict:** **FAIL**

The deployed root and JavaScript bundle match the candidate, and the puzzle itself is functional. The release is nevertheless blocked because a cold root-page capture does not show the game: at the required desktop and phone viewports, the playable sheet starts below the first viewport. The game-lane contract explicitly requires the captured first screen to show the game itself rather than a menu/landing wall.

## First-read result

Cold opening `/` plainly says it is a short deduction grid, that it is for coffee-break players who want logic rather than spelling, and that the first action is **Try it with sample data**. That button is one click and opens the fixed sample. The copy and demo requirement pass.

The visual first-screen requirement fails:

| Viewport | Game sheet top | Viewport height | Result |
| --- | ---: | ---: | --- |
| 1440 × 900 | 1096 px | 900 px | No playable game visible |
| 390 × 844 | 1582 px | 844 px | No playable game visible |

The inspected screenshots were captured from a clean Playwright context at `/`. The root screen shows only the headline, CTA, facts, and illustration; it does not show the active daily grid. `/demo` correctly opens the game, but that does not satisfy the root first-capture rule.

## Required claim checks

Ran `npm ci`, then every exact command in `.factory/claims.json` individually against the bundled `/demo` entry point. All passed:

| Claim ID | Result |
| --- | --- |
| `unique-solutions` | PASS |
| `daily-puzzle` | PASS |
| `sample-complete` | PASS |
| `restart-reset` | PASS |
| `hint-cost` | PASS |
| `failed-checks` | PASS |
| `sound-setting` | PASS |
| `local-progress` | PASS |
| `keyboard-controls` | PASS |
| `no-third-party` | PASS |
| `offline-reload` | PASS |

`npm test` also passed all 13 tests. `npm run build` passed (`tsc --noEmit` plus Vite) and produced `dist/`; production JS is 19.60 KB / 7.66 KB gzip and CSS is 14.28 KB / 4.20 KB gzip.

## Live QA evidence

- Live `/` HTML SHA-256 matches `dist/index.html`: `13acb9383fccd5ae4e18d10b71bd397c52dcc6f9a9fd9920b08061a65eefb19c`.
- Live `/assets/app-BRy9lABV.js` SHA-256 matches the candidate build: `d9adf30bc77375bb7340b59cfa63a6c5efd165add904837d22b753e9d8e4fff0`.
- Scripted live sample run placed Fern→R1C3, Acorn→R4C2, Berries→R3C4, Seed pod→R2C1, reached **“You found the only layout”**, and showed **Score: 4 of 4 leaves**. `Restart sample` returned to zero filled cells.
- The invalid full layout, checked three times, reached **“Here is the only layout”**. One hint displayed Fern’s exact position and reduced the score to three leaves.
- Keyboard-only placement reached R1C3; mobile 390 × 844 had no horizontal overflow. Reduced-motion computed animation and transition durations of `0.00001s`.
- A fresh live service-worker context reloaded `/demo` while offline and showed the sample heading plus “You are offline. The open puzzle still works.”
- A request log covering demo load, hint, placement, and solve contained only `https://riddle-grid.sociobot.in`; console and page errors were empty.
- Live axe scans of `/`, `/demo`, `/privacy`, and `/terms` had zero serious/critical findings. `verify-url.sh` on the production preview reported HTTP 200, `lang=en`, exactly one title/h1/main, no missing image alt text, no unlabeled buttons, no console errors, and 544 ms load.
- Root, demo, privacy, and terms returned CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, and same-origin-only `connect-src`.
- Independent headless 390px rAF samples were 61.5, 60.2, and 60.1 fps (60.6 average). A Lighthouse invocation could not complete in this container because its Chrome connection closed; this is not used to assess the product.

## Defects

### Blocker — game absent from the cold first viewport

The root page makes the game sheet visible only after scrolling beyond the hero. This violates the explicit browser-game capture acceptance rule and the product visual thesis that the puzzle is visible on the first screen. Move a live playable grid or meaningful active-game preview into the initial root viewport at both desktop and 390px, then rerun cold screenshots.

### High — mandatory frame-rate claim test is absent

The game-loop contract requires a claim and deterministic test for “60 fps on a mid-range phone.” `.factory/claims.json` has no such claim or `@claim:` test. `.factory/handoff.md` reports an FPS number, but this is not an executable sandbox claim. Add the claim and a reproducible measurement/test, or remove the unsupported assertion from the handoff. The observed headless rAF rate above is diagnostic evidence only, not a mid-range-phone acceptance test.

### Medium — static assets are not immutably cached

The live hashed JS bundle, CSS, service worker, and images all return `Cache-Control: public, must-revalidate, max-age=30`. The performance contract requires long-lived immutable caching for hashed assets. Configure immutable caching for content-hashed `/assets/*` (and versioned static art as appropriate) while retaining short revalidation for HTML and the service worker.

### Medium — missing routes return HTTP 200

`https://riddle-grid.sociobot.in/missing-page` renders the styled client-side not-found view but returns HTTP 200 and the SPA shell, not HTTP 404. The contract calls for a real 404 route. Adjust the hosting fallback/404 configuration so unknown paths preserve a 404 status while serving the designed page.

## Retest condition

Do not accept this candidate until the blocker is fixed and the root page is recaptured cold at 1440×900 and 390×844 with the playable grid visible. The frame-rate claim and cache/404 findings should also be resolved or explicitly waived by the product owner.

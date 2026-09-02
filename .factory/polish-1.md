# Polish round 1 — finding closure

**Released candidate:** `d81a9c0`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Checked:** 2026-09-02

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Removed deferred game-control focus after a render; game updates now focus the stable replacement synchronously. | `@claim:keyboard-controls`; full `npm test` (22 passed); live `/?demo=1` keyboard placement reached Fern at R1C3. |
| F-1-2 | Kept “Free to play.” and registered `free-to-play`. Its test completes the sample with no payment controls or form. | `@claim:free-to-play`; live scripted end screen at <https://riddle-grid.sociobot.in/?demo=1>. |
| F-1-3 | Removed the untestable no-account/no-ads/chat/submissions sentence from the landing page. | Cold live root check and [cold root screenshot](evidence/live/cold-root-390x844.png). |
| F-1-4 | Removed repeated free-price text from the footer and terms. The sole remaining price statement is covered by `free-to-play`. | `@claim:free-to-play`; live `/terms` check. |
| F-1-5 | Removed the unsupported “3–5 minute” duration from the README. The tested 60 fps claim remains registered as `phone-60fps`. | README audit; `@claim:phone-60fps`. |
| F-1-6 | Registered `private-static-game`, which checks cookies, requests, scripts, and prohibited controls. | `@claim:private-static-game`; live demo request check: cookie `""`, only `https://riddle-grid.sociobot.in`. |
| F-1-7 | Removed “Field method / 03 steps” and “A small daily ritual.” | Cold live root check; [cold root screenshot](evidence/live/cold-root-390x844.png). |
| F-1-8 | Replaced game-sheet headings with “Today’s deduction grid” and “Sample deduction grid”; authored puzzle labels are now clear daily-grid labels. | `routes, metadata, and accessibility have no serious violations`; live root heading check. |
| F-1-9 | Routed `popstate` through title announcement and h1 focus, using `preventScroll` to retain browser-restored scroll. | `Back and Forward focus and announce the new route heading`; live Back/Forward check passed. |
| F-1-10 | Added Apple touch, Open Graph, and Twitter metadata to the true `404.html`. | `404 document carries complete product metadata`; live <https://riddle-grid.sociobot.in/404.html> metadata check and HTTP 404 at <https://riddle-grid.sociobot.in/missing-page>. |

## Controller requirements

- `?demo=1` is the first-screen sample action, opens the isolated `demo:riddle-grid:sample` namespace, displays the persistent banner, and supplies Reset demo / Start for real. `@claim:demo-isolation` verifies it.
- Price and privacy claims are registered and browser-tested. The unsupported round-duration copy was removed; the existing quantitative frame-rate claim remains executable.
- Route title, description, canonical, OG, and Twitter metadata are tested for home, query-demo, privacy, terms, and the app 404.
- The final live scripted sample run reached **You found the only layout**; [its screenshot](evidence/live/complete-demo-390x844.png) is retained as evidence.

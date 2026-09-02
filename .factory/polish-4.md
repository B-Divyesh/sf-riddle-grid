# Polish round 4 — cumulative finding closure

**Reviewed base:** `8ef0ea83d0a0dcebd982b2cf2555433ab671fe3f`  
**Released product commit:** `b9fd34bb5320bad07af28ea4b91d92a0e291ae21`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Checked:** 2026-09-02 UTC  
**Result:** PASS — no known finding remains.

## Review findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept synchronous replacement-focus behavior so keyboard selection and placement cannot race a deferred focus change. | `@claim:keyboard-controls`; clean-clone `npm test` 30/30; live complete-game audit. |
| F-1-2 | Kept the sole “Free to play” statement registered and proved it through a complete sample run without payment controls. | `@claim:free-to-play`; live `/?demo=1` completed in `live-audit.json`. |
| F-1-3 | Kept unsupported account, ad, chat, and clue-submission marketing out of the landing page. | `@claim:private-static-game`; live root copy and request audit. |
| F-1-4 | Kept repeated free-price wording out of the footer and Terms. | `@claim:free-to-play`; live `/terms` check. |
| F-1-5 / F-3-1 | Kept the unsupported 3–5 minute number removed. The README describes only a short-break design intent. | `review 3 copy stays plain and the documented sample name matches the game`; clean copy scan. |
| F-1-6 | Kept cookie, tracker, advertising, external-script, and prohibited-control checks in an executable privacy claim. | `@claim:private-static-game`; live `document.cookie === ""`; same-origin request log. |
| F-1-7 | Kept the decorative “Field method” and “A small daily ritual” labels removed. | `.factory/copy-audit.md`; live `/` first-screen check. |
| F-1-8 | Kept task-naming game headings: “Today’s deduction grid” and “Sample deduction grid.” | `routes set plain titles, complete metadata, legal links, and useful route copy`; [root capture](../evidence/polish-4/live-header-root-390x844.png). |
| F-1-9 | Kept Back and Forward navigation focused on and announced through the destination h1. | `Back and Forward focus and announce the new route heading`; live route audit. |
| F-1-10 | Kept Apple touch, Open Graph, Twitter, canonical, favicon, title, and description metadata on the real 404 document. | `404 document carries complete product metadata`; [live 404](../evidence/polish-4/live-404-390x844.png); `/missing-polish-4-page` returned 404. |
| F-2-1 | Kept all four phone specimen names on one line with no clipping at normal or 200% text. | `390px specimen picker keeps every name intact and labels the hint section`; `accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable`; root capture above. |
| F-2-2 | Kept the functional section heading “Hints.” | Same 390px specimen-picker regression; live demo Axe scan. |
| F-3-2 / RG-V6-01 | Kept shared score grammar for 4, 3, 2, 1, and 0 leaves. | `@claim:hint-cost`; [live one-leaf capture](../evidence/polish-4/live-one-leaf-score.png). |
| F-3-3 | Kept Hints as a labelled section rather than an invalid nested complementary landmark. | `routes, metadata, and accessibility have no Axe violations at any impact`; live Axe: zero violations on five routes. |
| F-3-4 | Kept result-naming sound controls: “Turn sound off/on.” | `@claim:sound-setting`; live root and demo checks. |
| F-3-5 | Kept the plain 404 h1 “Page not found.” | Route-copy test; live 404 URL and screenshot above. |
| F-3-6 | Kept “Skip to main content” accurate on every route and focusable to its h1. | `skip link focuses the main route heading`; four `verify-url.sh` reports. |
| F-3-7 | Kept the plain README wording “loads no files from other websites.” | Review-3 copy test; `@claim:no-third-party`. |
| F-3-8 | Kept “Field sheet 05 sample” consistent in the product and demo guide. | Review-3 copy test; live `/?demo=1`. |
| F-4-1 | Replaced the hidden phone navigation with a ruled second header row. Demo, How it works, and Privacy are each visible, keyboard reachable, and at least 44×44 px on root, demo, Privacy, and Terms. The legal-page sketch is clipped to its page so those routes do not overflow. | `390px header keeps Demo, How it works, and Privacy reachable on every route`; [root](../evidence/polish-4/live-header-root-390x844.png), [demo](../evidence/polish-4/live-header-demo-390x844.png), [Privacy](../evidence/polish-4/live-header-privacy-390x844.png), and [Terms](../evidence/polish-4/live-header-terms-390x844.png); exact live sizes are in `live-audit.json`. |

## Independent-verification findings

| Finding | Change preserved | Evidence |
| --- | --- | --- |
| Verification 1 — cold first screen | The live daily game remains visible and operable in the opening desktop and phone viewports after adding mobile navigation. | `cold root capture contains plain copy and an operable game at required viewports`; live phone cell bottom 798.50 px in an 844 px viewport. |
| Verification 1 — frame-rate claim | The 390×844, DPR 2, 4× CPU claim remains registered. | `@claim:phone-60fps`; live median 60.00 fps. |
| Verification 1 — cache policy | Hashed assets remain one-year immutable and `sw.js` remains no-cache. Cache version advanced to `riddle-grid-v7`. | `static host policy preserves real 404 responses and immutable hashed assets`; live response headers in `live-audit.json`. |
| Verification 1 — real 404 | Unknown URLs still use the designed document with HTTP 404. | Static-host test; live `/missing-polish-4-page` check and screenshot. |
| Verification 3 — focus contrast | The dark brass focus token still exceeds 3:1 on every paper surface. | `accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable`. |
| Verification 3 — touch targets | Wordmark, header navigation, footer links, and all live visible controls remain at least 44×44 px. | Same accessibility test; live audit found zero undersized targets. |
| Verification 3 — 200% text | Header links and specimen controls reflow without clipping or document overflow. | Same accessibility test; live audit records 390 px document width and unclipped navigation/specimens. |
| RG-V5-01 | Demo progress and sound retain separate `demo:` keys. Reset, Start for real, route changes, and the newly visible How it works link clear demo keys without changing daily keys. | `@claim:demo-isolation`; live audit records `resetIsolated`, `headerExitClearsDemo`, and `startForRealClearsDemo`. |
| RG-V5-02 | The privacy-detail link and every visible mobile control retain 44 px targets. | Mobile accessibility regression; live zero-undersized-target result. |
| RG-V5-03 | Clue and hint text remain at least 16 px. | `solve-critical body text and the privacy link meet the 16px and 44px baselines`. |
| RG-V5-04 | A completed keyboard run focuses the result heading. | `keyboard completion moves focus to the focusable result heading`; [live solved sample](../evidence/polish-4/live-complete-demo-390x844.png). |
| RG-V5-05 | One remaining attempt reads “1 check left.” | `one failed check uses singular check copy`. |
| RG-V5-06 | README keeps the non-quantitative “short break” session shape. | Review-3 copy test; `.factory/copy-audit.md`. |

## Verification record

- Clean clone: `/tmp/riddle-grid-polish4-clean.LFIeFR` at the released product commit; `npm ci` reported zero vulnerabilities.
- Claims: all 15 exact commands in `.factory/claims.json` passed separately.
- Full clean-clone suite: `npm test` passed 30/30. `npm run build` passed and produced `dist/`.
- Bundle: 21.70 kB JavaScript (7.97 kB gzip), 16.54 kB CSS (4.56 kB gzip), no web fonts.
- Live audit: [JSON](../evidence/polish-4/live-audit.json). Root, demo, Privacy, Terms, and 404 have zero Axe violations; demo requests are same-origin; cookies are empty; offline reload passed.
- Live Lighthouse: root **93/100/100/100**, demo **100/100/100/100** for Performance/Accessibility/Best Practices/SEO. [Root report](../evidence/polish-4/lighthouse-live-root.json), [demo report](../evidence/polish-4/lighthouse-live-demo.json).
- Deployment identity: live `index.html`, JavaScript, and CSS match `dist/` byte for byte.


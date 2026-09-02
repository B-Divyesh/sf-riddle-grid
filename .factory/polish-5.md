# Polish round 5 — cumulative finding closure

**Reviewed base:** `4b86708a2cd0a67855c9234374f3b4bd5d773727`  
**Released product commit:** `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Checked:** 2026-09-02 UTC  
**Result:** PASS — no known finding remains.

## Round 5 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-5-1 | Replaced origin-only privacy checks with full-run request recording at the browser-context level. Every request must be an explicitly allowlisted static `GET`, use no body, and contain no query data except the fixed demo and cache-version parameters. Hinting, placing all four specimens, checking, and rendering the result must add zero requests. Cookie, external-script, analytics, ad, form, and local-storage assertions remain. Added the separate `puzzle-choices-local` claim. | `@claim:private-static-game`, `@claim:no-third-party`, and `@claim:puzzle-choices-local`; [live request evidence](../evidence/polish-5/live-audit.json); [completed live privacy run](../evidence/polish-5/live-privacy-complete-390x844.png); live `/?demo=1` recorded 14 allowlisted static GETs, zero bodies, zero cookies, and zero play-time requests. |
| F-5-2 | Retained “Privacy without an account” and registered `no-account-required`. Its test verifies that no account, sign-in, registration, profile, or form control exists before completing the sample. | `@claim:no-account-required`; [live Privacy page](../evidence/polish-5/verify-privacy/screenshot-mobile.png); live `/privacy` and `/?demo=1` checks. |
| F-5-3 | Replaced the README’s “bundled sample … explanation flow” sentence with “The sample lets you solve the grid or view its explanation.” Expanded the sample claim test to prove both the solved result and the three-failed-check explanation. | `@claim:sample-complete`; `review 3 copy stays plain and the documented sample name matches the game`; [solved sample](../evidence/polish-5/live-complete-demo-390x844.png) and [explained sample](../evidence/polish-5/live-explained-demo-390x844.png); live `/?demo=1`. |

## Earlier review findings rechecked

| Finding | Preserved change | Evidence |
| --- | --- | --- |
| F-1-1 | Keyboard selection, arrows, placement, and replacement focus remain deterministic. | `@claim:keyboard-controls`; [completed live demo](../evidence/polish-5/live-complete-demo-390x844.png); live `/?demo=1`; clean-clone `npm test` 32/32. |
| F-1-2 | “Free to play” remains the single price statement and the complete sample has no payment path. | `@claim:free-to-play`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/` and `/?demo=1`. |
| F-1-3 | Unsupported landing promises remain absent; the retained no-account and privacy statements now have dedicated claims. | `@claim:no-account-required`, `@claim:private-static-game`; [live Privacy page](../evidence/polish-5/verify-privacy/screenshot-mobile.png); live `/privacy`. |
| F-1-4 | Repeated free-price text remains absent from the footer and Terms. | `@claim:free-to-play`; [live Terms page](../evidence/polish-5/verify-terms/screenshot-mobile.png); live `/terms`. |
| F-1-5 | The untested 3–5 minute number remains absent. | `review 3 copy stays plain and the documented sample name matches the game`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/`. |
| F-1-6 | Privacy proof now checks full request method, URL, body, cookies, and rendered tracking/ad surfaces. | `@claim:private-static-game`; [live Privacy page](../evidence/polish-5/verify-privacy/screenshot-mobile.png) and [request log](../evidence/polish-5/live-audit.json); live `/privacy` and `/?demo=1`. |
| F-1-7 | Decorative landing labels remain removed. | `cold root capture contains plain copy and an operable game at required viewports`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/`. |
| F-1-8 | Puzzle headings remain “Today’s deduction grid” and “Sample deduction grid.” | `routes set plain titles, complete metadata, legal links, and useful route copy`; [live root](../evidence/polish-5/live-header-root-390x844.png) and [demo](../evidence/polish-5/live-header-demo-390x844.png); live `/` and `/?demo=1`. |
| F-1-9 | Link navigation and browser Back/Forward focus and announce the destination h1. | `Back and Forward focus and announce the new route heading`; [live demo](../evidence/polish-5/live-header-demo-390x844.png) and `live-audit.json`; live `/privacy` ↔ `/?demo=1`. |
| F-1-10 | The real 404 retains canonical, favicon, Apple touch, Open Graph, and Twitter metadata. | `404 document carries complete product metadata`; [live 404](../evidence/polish-5/live-404-390x844.png); live `/missing-polish-5-page` returned 404. |
| F-2-1 | All four phone specimen names remain unbroken and unclipped at normal and 200% text. | `390px specimen picker keeps every name intact and labels the hint section`; `accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable`; [live root](../evidence/polish-5/live-header-root-390x844.png). |
| F-2-2 | The section remains named “Hints.” | `390px specimen picker keeps every name intact and labels the hint section`; [live demo](../evidence/polish-5/live-header-demo-390x844.png); live `/?demo=1`. |
| F-3-1 | README keeps the non-quantitative short-break description. | `review 3 copy stays plain and the documented sample name matches the game`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/`. |
| F-3-2 / RG-V6-01 | Score grammar remains correct for 4, 3, 2, 1, and 0 leaves. | `@claim:hint-cost`; [live one-leaf score](../evidence/polish-5/live-one-leaf-score.png); live `/?demo=1`. |
| F-3-3 | Hints remains a labelled section instead of a nested complementary landmark. | `routes, metadata, and accessibility have no Axe violations at any impact`; [live demo](../evidence/polish-5/live-header-demo-390x844.png); live Axe checks on all five routes. |
| F-3-4 | Sound controls keep result-naming labels: “Turn sound off/on.” | `@claim:sound-setting`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/` and `/?demo=1`. |
| F-3-5 | The styled 404 h1 remains “Page not found.” | `routes set plain titles, complete metadata, legal links, and useful route copy`; [live 404](../evidence/polish-5/live-404-390x844.png); live HTTP 404. |
| F-3-6 | Every route keeps “Skip to main content” and focuses its h1. | `skip link focuses the main route heading`; [live Privacy page](../evidence/polish-5/verify-privacy/screenshot-mobile.png); four live `verify-url.sh` checks. |
| F-3-7 | README keeps the plain “loads no files from other websites” wording. | `review 3 copy stays plain and the documented sample name matches the game` and `@claim:no-third-party`; [completed live privacy run](../evidence/polish-5/live-privacy-complete-390x844.png); live full-demo request audit. |
| F-3-8 | Product and demo guide still name the fixed Field sheet 05 sample. | `review 3 copy stays plain and the documented sample name matches the game`; [live demo](../evidence/polish-5/live-header-demo-390x844.png); live `/?demo=1`. |
| F-4-1 | Demo, How it works, and Privacy stay visible and at least 44×44 px on every phone route. | `390px header keeps Demo, How it works, and Privacy reachable on every route`; [live header captures](../evidence/polish-5/); live root/demo/Privacy/Terms audit. |

## Earlier verification findings rechecked

| Finding | Preserved change | Evidence |
| --- | --- | --- |
| RG-V5-01 | Demo progress and sound use `demo:` keys; reset and every exit preserve daily keys. | `@claim:demo-isolation`; [live demo](../evidence/polish-5/live-header-demo-390x844.png) and `live-audit.json`; live `/?demo=1`. |
| RG-V5-02 | Visible phone controls and links remain at least 44×44 px. | `accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/` audit reports no undersized targets. |
| RG-V5-03 | Clue and hint text remain at least 16 px. | `solve-critical body text and the privacy link meet the 16px and 44px baselines`; [live demo](../evidence/polish-5/live-demo-third-hint-390x844.png); live `/?demo=1`. |
| RG-V5-04 | Keyboard completion moves focus to the result heading. | `keyboard completion moves focus to the focusable result heading`; [completed live demo](../evidence/polish-5/live-complete-demo-390x844.png); live `/?demo=1`. |
| RG-V5-05 | One remaining attempt reads “1 check left.” | `one failed check uses singular check copy`; [live one-check state](../evidence/polish-5/live-one-check-left-390x844.png); live `/?demo=1`. |
| RG-V5-06 | README states only the non-quantitative short-break session shape. | `review 3 copy stays plain and the documented sample name matches the game`; [live root](../evidence/polish-5/live-header-root-390x844.png); live `/`. |

The original first-screen wording, one-click `?demo=1` entry, persistent demo banner, isolated reset, real routes, legal links, metadata, 404, focus behavior, and botanical field-notebook identity were retained. The service-worker cache advanced to `riddle-grid-v8` for this release.

## Verification record

- Clean clone: `/tmp/riddle-grid-polish5-final.vRYAba` at `1db89f6640ca4ba4b0f169099462604650fd28e2`; `npm ci` found zero vulnerabilities.
- All 17 exact commands in `.factory/claims.json` passed separately.
- Clean-clone `npm test`: 32/32 passed. Clean-clone `npm run build`: passed and produced `dist/`.
- Production output: JavaScript 21.75 kB raw / 8.00 kB gzip; CSS 16.54 kB raw / 4.56 kB gzip; largest first-load image 137.64 kB.
- `verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors and the required title, language, h1, main, image alternatives, and button names.
- Live Playwright Axe found zero violations at any impact on root, demo, Privacy, Terms, and the HTTP 404.
- Live Lighthouse mobile: root 96/100/100/100 with LCP 1.6 s and CLS 0; demo 99/100/100/100 with LCP 0.8 s and CLS 0.
- Live frame-rate profile (390×844, DPR 2, 4× CPU): 61.10, 60.03, and 60.00 fps; median 60.03 fps.
- Live and local `index.html`, JavaScript, CSS, and `sw.js` SHA-256 hashes match byte for byte.

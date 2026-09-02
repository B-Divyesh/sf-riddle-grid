# Polish round 3 — cumulative finding closure

**Reviewed base:** `317fd3f980e4c5cf8864a78c38fd25baeca2b4af`  
**Repaired code:** `749e65d`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Checked:** 2026-09-02 UTC  
**Result:** PASS — no known finding remains.

## Review 3 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 / F-1-5 | Removed the untestable 3–5 minute statement from README and design copy. The session description is now “A round is designed for a short break.” | `review 3 copy stays plain and the documented sample name matches the game`; README and design audit. |
| F-3-2 / RG-V6-01 | Added one score formatter for visual and accessible score labels. It emits “1 leaf” and pluralizes 0, 2, 3, and 4. | `@claim:hint-cost` checks all five values; [live score screenshot](../evidence/polish-3/live-one-leaf-score.png); live `/?demo=1`. |
| F-3-3 | Replaced the nested complementary `aside` with a labelled hint `section`. Axe regressions now fail for any violation, not only serious/critical impact. | `routes, metadata, and accessibility have no Axe violations at any impact`; `live-audit.json` records zero violations on root, demo, privacy, terms, and 404. |
| F-3-4 | Reworded the sound control as the action: “Turn sound off” or “Turn sound on.” Removed the conflicting pressed-state semantics. | `@claim:sound-setting`; `@claim:demo-isolation`; `review 3 copy stays plain and the documented sample name matches the game`; live root and demo screenshots. |
| F-3-5 | Replaced the metaphorical 404 h1 with “Page not found.” The botanical illustration and return action remain. | `routes set plain titles, complete metadata, legal links, and useful route copy`; [live 404 screenshot](../evidence/polish-3/live-404-390x844.png); live `/missing-polish-3-page` returned 404. |
| F-3-6 | Changed every skip link to “Skip to main content” and made activation focus the route h1. | `skip link focuses the main route heading`; route metadata regression; live audit on all five routes. |
| F-3-7 | Replaced “third-party runtime resources” with “files from other websites” in README and the claim manifest. | `review 3 copy stays plain and the documented sample name matches the game`; `@claim:no-third-party`. |
| F-3-8 | Renamed the documented sample to the shipped “Field sheet 05 sample.” | `review 3 copy stays plain and the documented sample name matches the game`; live `/?demo=1`. |

## Earlier review findings rechecked

| Finding | Preserved change | Evidence |
| --- | --- | --- |
| F-1-1 | Keyboard selection, arrow movement, placement, and stable focus remain deterministic. | `@claim:keyboard-controls`; full clean-clone suite 29/29. |
| F-1-2 | “Free to play” remains registered and tested through a complete sample run. | `@claim:free-to-play`. |
| F-1-3 | Unsupported account, advertising, chat, and submission copy remains absent. | `@claim:private-static-game`. |
| F-1-4 | Repeated free-price wording remains absent from footer and terms. | `@claim:free-to-play`; live route audit. |
| F-1-5 | The numeric session claim is removed again and guarded against regression. | F-3-1 regression test above. |
| F-1-6 | Cookie, analytics, advertising, script, request-origin, and prohibited-control checks remain executable. | `@claim:private-static-game`; `@claim:no-third-party`; `live-audit.json`. |
| F-1-7 | Decorative section slogans remain absent. | `.factory/copy-audit.md`; [live root screenshot](../evidence/polish-3/live-root/screenshot-mobile.png). |
| F-1-8 | The daily and sample headings remain task names, not botanical metaphors. | Route metadata test; live root/demo checks. |
| F-1-9 | Link navigation and browser Back/Forward focus the destination h1 and announce its title. | `Back and Forward focus and announce the new route heading`; live audit. |
| F-1-10 | The true 404 document retains Apple touch, Open Graph, Twitter, canonical, icon, title, and description metadata. | `404 document carries complete product metadata`; route metadata test. |
| F-2-1 | Phone specimen names remain intact, unclipped, and usable at normal and 200% text size. | `390px specimen picker keeps every name intact and labels the hint section`; `accessibility regressions: focus, mobile targets, and 200% specimen labels stay usable`; live audit. |
| F-2-2 | The functional heading remains “Hints.” | The 390px specimen-picker regression and zero-violation Axe scans. |

## Independent-verification findings rechecked

| Finding | Current evidence |
| --- | --- |
| Verification 1: game absent from first viewport | `cold root capture contains plain copy and an operable game at required viewports`; live cell bottom 751.23 px at 390×844; [mobile](../evidence/polish-3/live-root/screenshot-mobile.png) and [desktop](../evidence/polish-3/live-root/screenshot-desktop.png) captures. |
| Verification 1: missing frame-rate claim | `phone-60fps` remains listed exactly once and passed; live median 60.02 fps on 390×844, DPR 2, 4× CPU. |
| Verification 1: cache policy and real 404 | `static host policy preserves real 404 responses and immutable hashed assets`; live assets are one-year immutable, `sw.js` is no-cache, and the missing route returns 404. |
| Verification 3: focus contrast | The `#735400` focus token and its contrast regression remain unchanged and pass. |
| Verification 3: 44 px touch targets | The mobile regression passes; the live audit found zero undersized visible links or buttons. |
| Verification 3: 200% text clipping | The resize regression passes; live main width remained 390 px and every specimen control reflowed to 354 px without clipping. |
| RG-V5-01 | Demo progress and sound remain in `demo:` keys; reset and exit remove only demo keys. `@claim:demo-isolation` and live audit pass. |
| RG-V5-02 | The privacy link and every live mobile target remain at least 44×44 px. |
| RG-V5-03 | Clue and hint text remain at least 16 px. |
| RG-V5-04 | A completed keyboard run focuses the result heading. |
| RG-V5-05 | One remaining check is rendered as “1 check left.” |
| RG-V5-06 | README now states the non-quantitative session shape without creating an untested duration promise. |
| RG-V6-01 | Closed by F-3-2; “1 leaves” is absent locally and live. |

## Verification record

- Every command in `.factory/claims.json`: 15/15 passed separately from clean clone `/tmp/riddle-grid-polish-3-clean.iPyYpx`.
- Full clean-clone `npm test`: 29/29 passed. Clean-clone `npm run build`: passed.
- Production build: 21.60 kB JavaScript raw / 7.95 kB gzip; 16.10 kB CSS raw / 4.48 kB gzip.
- Live audit: [JSON evidence](../evidence/polish-3/live-audit.json), including all-impact Axe, demo isolation, privacy, routing, focus, mobile, reduced motion, 200% text, offline, headers, and fps.
- Live Lighthouse: root and demo both scored 100 performance, accessibility, best practices, and SEO. Reports: [root](../evidence/polish-3/lighthouse-live-root.json), [demo](../evidence/polish-3/lighthouse-live-demo.json).
- Live build identity: JavaScript SHA-256 `0992c0547c07047e1e2e3c0eedaf039b10e026ed3a0a4a3b18a7b89401d68c53`; CSS SHA-256 `90bee4ab20475d1ff3b62397ace98f174aaefaff656acb3095f09a9fd3d27023`; both match `dist/`.

# Solve a daily deduction grid — review 8

**Verdict: PASS**

**Findings: 0. Untested claims: 0.**

## Scope

- Live URL: <https://riddle-grid.sociobot.in>
- Implementation reviewed: `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`
- Documentation checkout reviewed: `ed6045e928cb148b67f0744d1e9f28f1e080de1f`
- The later commits are report-only. A fresh build of the implementation checkout matched the live `index.html`, application JavaScript, CSS, and service worker byte-for-byte.

No product code or deployment configuration was changed in this review.

## First screen and game loop

Fresh 1440 × 900 desktop and 390 × 844 phone browser contexts opened `/` before any scrolling. The first screen states the job, **“Solve one short deduction grid,”** identifies the audience, **“For coffee-break players who want logic without spelling tests,”** and gives the first action, **“Try it with sample data — Opens a ready sample.”** The daily game, specimen control, and a fully visible grid cell were present in both initial viewports. This is a playable game screen, not a menu.

The first action entered `?demo=1` in one click. The persistent label read **“Demo — sample data, nothing is saved to your daily game,”** with **Reset demo** and **Start for real**. The fixed Field sheet 05 sample showed realistic populated clues, controls, score, and grid.

On a fresh phone context, the review completed the deterministic sample to **“You found the only layout”** and recorded the end screen at `/work/.evidence/review-8-live.J9eMTd/live-complete-demo-390x844.png`. Restart cleared every grid cell. A separate complete wrong layout was checked three times and opened **“Here is the only layout”**; evidence is `/work/.evidence/review-8-live.J9eMTd/live-explained-demo-390x844.png`.

Pointer/touch selection, keyboard Enter, arrows, Escape recovery, hint cost, disabled incomplete check, clear, restart, reset, sound setting, Back/Forward focus, and offline recovery passed. Demo reset and both exits removed only `demo:riddle-grid:*` storage keys while seeded daily progress and sound remained unchanged.

## Claims and quality commands

The clean documented setup used `npm ci` (23 packages, 0 vulnerabilities). Every exact command declared in `.factory/claims.json` was run separately and passed. Full command output is in `/work/.evidence/review-8-claims.gwzDxP/claims.log`.

| Claim ID | Result |
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
| `puzzle-choices-local` | PASS |
| `no-account-required` | PASS |
| `offline-reload` | PASS |

`npm test` passed **32/32** in 41.3 seconds. `npm run build` passed and produced `dist/`; application JavaScript is 21.75 kB (8.00 kB gzip) and CSS is 16.54 kB (4.56 kB gzip).

The page, README, demo guide, privacy page, terms, and first-screen facts were checked against `.factory/claims.json`. Every testable public promise has a declared claim and passing observable test. No unlisted public claim remains.

## Live checks

- `verify-url.sh` passed `/`, `?demo=1`, `/privacy`, and `/terms`: HTTP 200, correct route title, `lang="en"`, one h1, one main, image alt text, labelled controls, and no console or page errors.
- Fresh live Axe scans found zero violations on desktop and phone for `/`, the demo, privacy, terms, and the designed unknown route.
- The unknown route returned the expected HTTP 404 with the designed page, title, required metadata, and a route back. The HTTP 404 itself is expected and is not a defect.
- Every tested internal and external footer/header link returned 200 or was a valid internal anchor. Route titles, canonical links, Open Graph/Twitter metadata, favicon, legal pages, robots, sitemap, security headers, and the response CSP passed.
- Full sample play generated no request after initial static loading, no cookie, no request body, no third-party origin, tracker, advertisement, account, chat, or submission control. The request allowlist contained only same-origin static GETs.
- Service-worker-controlled `/demo` reloaded while offline after the first visit. The online/offline status message and recovery path worked.
- At 390 × 844, DPR 2, and 4× CPU throttling, three one-second frame samples were 60.48, 59.94, and 60.06 fps; median **60.06 fps**, within the claimed 55–65 range.
- Phone navigation stayed visible, all checked targets were at least 44 px, there was no horizontal overflow, 200% text did not clip controls, and reduced motion reduced animation and transition durations to `0.00001s`.

## Earlier findings

All historical findings were rechecked. Their current disposition is fixed and verified:

| Earlier findings | Current evidence |
| --- | --- |
| F-1-1 | Keyboard test is deterministic; isolated claim and 32-test suite pass. |
| F-1-2, F-1-4 | The only price statement is tested by `free-to-play`; no duplicate free-price copy remains. |
| F-1-3, F-5-2 | Unsupported absence copy is gone; the retained no-account promise passes `no-account-required`. |
| F-1-5, F-3-1, RG-V5-06 | No numeric session-duration promise remains. |
| F-1-6, F-5-1 | Full-run request, cookie, script, and prohibited-control tests prove the privacy promises. |
| F-1-7, F-1-8 | Decorative labels remain removed; the game headings name the current puzzle. |
| F-1-9 | Link, Back, and Forward focus and announce the destination h1. |
| F-1-10, F-3-5 | The real 404 has plain wording, complete metadata, and a return action. |
| F-2-1, F-2-2, F-4-1 | Phone labels stay intact; Hints is named; all header links remain reachable. |
| F-3-2, RG-V6-01 | Score grammar uses singular `1 leaf`; `hint-cost` checks all score values. |
| F-3-3 through F-3-8 | Landmark, sound action label, skip link, README wording, and sample naming remain correct; Axe is clear. |
| RG-V5-01 through RG-V5-05 | Demo isolation, target sizing, text size, result focus, and singular check recovery passed. |
| Verification baseline | The earlier missing frame-rate test, focus contrast, undersized target, and 200% resize findings are covered and pass. |

## Result

**PASS.** There are zero findings at every severity and zero untested claims.

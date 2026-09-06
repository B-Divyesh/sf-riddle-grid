# Verify a daily deduction grid across browser engines

**Verdict: PASS**

**Findings: 0** (critical 0, high 0, medium 0, low 0)

**Untested public claims: 0**

## Scope

- Live URL: <https://riddle-grid.sociobot.in>
- Implementation reviewed: `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`
- Documentation baseline reviewed: `dd8c03ef81ca26d48859a520b3b2e2196750ff8b`
- Verified: 2026-09-06 UTC
- Playwright: 1.58.2
- Engines: Chromium 145.0.7632.6, Firefox 146.0.1, WebKit 26.0

The commits after the implementation are evidence and documentation changes. A fresh build matches the live HTML, JavaScript, CSS, 404 document, and service worker byte-for-byte. Product code was not changed.

The public product does not name supported browser brands. It promises pointer/touch and keyboard input, local progress, a persistent sound setting, and offline reload after one visit. It does not offer or promise multiplayer, rooms, gamepads, accounts, payments, a backend, or an API. Multiplayer, tenant isolation, server restart persistence, health, and 429/Retry-After checks therefore do not apply.

## First screen and complete runs

Fresh 1440 × 900 desktop and 390 × 844 phone contexts opened the live root without scrolling in each engine. The first screen states the job, **“Solve one short deduction grid,”** names the audience, **“For coffee-break players who want logic without spelling tests,”** and presents **“Try it with sample data — Opens a ready sample.”** A specimen control and a complete first grid cell are visible in both viewports. There is no horizontal overflow.

The first action opens the fixed Field sheet 05 sample in one click. The persistent label says **“Demo — sample data, nothing is saved to your daily game,”** and includes **Reset demo** and **Start for real**.

| Engine | Desktop keyboard run | Phone touch run | Recovery and isolation |
| --- | --- | --- | --- |
| Chromium 145.0.7632.6 | An invalid complete layout was checked three times and reached **“Here is the only layout.”** | The correct layout reached **“You found the only layout”** with 4 of 4 leaves. | Save/reload, restart, reset, sound persistence, and daily/demo separation passed. |
| Firefox 146.0.1 | Same explanation ending and result-heading focus passed. | Same win ending and score passed. | Save/reload, restart, reset, sound persistence, and daily/demo separation passed. |
| WebKit 26.0 | Same explanation ending and result-heading focus passed. | Same win ending and score passed. | Save/reload, restart, reset, sound persistence, and daily/demo separation passed. |

The desktop path used Enter on specimen controls and cells. The phone path used Playwright touch input. Empty-cell feedback, the disabled incomplete check, end-screen focus, and restart to zero filled cells also passed. Fresh seeded daily progress and sound remained unchanged during demo play and reset. Demo keys were removed by reset and **Start for real**.

End-screen evidence is in:

- `/work/.evidence/screenshots/chromium-desktop-explained.png`
- `/work/.evidence/screenshots/chromium-phone-win.png`
- `/work/.evidence/screenshots/firefox-desktop-explained.png`
- `/work/.evidence/screenshots/firefox-phone-win.png`
- `/work/.evidence/screenshots/webkit-desktop-explained.png`
- `/work/.evidence/screenshots/webkit-phone-win.png`

Matching cold-screen captures for both viewports and all three engines are in the same directory.

## Declared claims and clean commands

The documented prerequisite is Node.js 20 or newer. The clean checkout used Node.js 22.23.2 and npm 10.9.8. `npm ci` installed 23 packages with 0 vulnerabilities. Firefox and WebKit were installed with the Playwright 1.58.2 browser installer because the worker cache initially contained Chromium only.

Every exact `test` command in `.factory/claims.json` was run separately:

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

Additional gates:

```text
npm test       PASS — 32/32 tests
npm run build  PASS — TypeScript check and Vite build; dist/ produced
verify-url.sh  PASS — HTTP 200, title, lang, one h1/main, alt text, labels, no load errors
```

The current page, README, demo guide, privacy page, terms, and first-screen facts were compared with the 17 claim entries. Each testable public statement has an observable claim test. No unlisted or untested public claim remains.

## Accessibility, routes, privacy, and performance

- Playwright Axe reported zero violations on `/`, `/demo`, `/privacy`, `/terms`, and the designed unknown route in all three engines.
- Each audited route has `lang="en"`, one h1, one main, and the expected route title. Privacy and Terms return 200. The unknown route returns the expected HTTP 404 with **“Page not found”** and a return action; that deliberate 404 is not a defect.
- Header/footer links, `robots.txt`, `sitemap.xml`, and the external Param Factory link returned 200. Route metadata, canonical URLs, social metadata, the favicon, security headers, and immutable hashed-asset caching remain present.
- A complete live demo in every engine added zero gameplay requests. All observed loads were same-origin GETs without request bodies. Cookie storage remained empty.
- Reduced-motion contexts matched the media query and reduced animation and transition durations to 0.01 ms in all three engines.
- The fresh 390 × 844, DPR 2, 4× CPU-throttled Chromium measurement produced 61.45, 59.99, and 60.02 fps; median **60.02 fps**, within the declared 55–65 fps test range.
- Build output is 21.75 kB JavaScript (8.00 kB gzip) and 16.54 kB CSS (4.56 kB gzip). The existing same-candidate Lighthouse records remain valid because live artifacts are unchanged: root 96 performance/100 accessibility and demo 99 performance/100 accessibility.
- Live and fresh-build SHA-256 values match for `index.html` (`c680ea…425`), `404.html` (`27aa99…11b`), application JavaScript (`154182…db1`), CSS (`9090db…8c7`), and `sw.js` (`96f56d…11c`).

## Worker infrastructure limits

These are not product findings and do not leave a public claim untested:

- Chromium and Firefox completed a real service-worker-controlled offline reload. Playwright WebKit 26.0 returns `WebKit encountered an internal error` when its context is switched offline. A separate minimal service-worker fixture fails in the same way. Before the toggle, the live WebKit context had an active controller and all demo shell entries in `riddle-grid-v8`. The declared offline claim passed its exact Chromium command and an additional live Firefox run.
- Headless workers cannot confirm audible speaker output. The product created an oscillator only after the phone gesture in all three engines. Chromium reported a running audio context. Firefox's headless context remained suspended even in a separate page that explicitly called `resume()`. WebKit headless state varied, while a separate explicit-resume fixture reached running. The persistent sound-setting behavior passed in all three engines.
- Playwright WebKit may log a CSP rejection when its screenshot helper injects an inline style. Fresh route loads without screenshot injection had no console or page errors in WebKit. This is a tooling artifact, not a live-page CSP violation.

## Earlier finding disposition

Every earlier review and verification report, including minor findings, was inspected.

| Earlier finding(s) | Current evidence |
| --- | --- |
| Initial verification: game below the first viewport | Fresh phone and desktop captures in all three engines show the game and a usable cell before scrolling. |
| Initial verification: missing frame-rate claim | `phone-60fps` exists, passed independently, and the fresh median is 60.02 fps. |
| Initial verification: cache and real-404 failures | Hashed assets return one-year immutable caching; an unknown live route returns the designed HTTP 404. |
| Verification 3: focus contrast, small touch targets, and clipped 200% labels | The regression suite passed; focus uses `#735400`, checked mobile targets are at least 44 px, and the 200% layout assertion passes. Cross-engine keyboard focus and mobile layout also passed. |
| F-1-1 | The isolated keyboard claim, full suite, and each cross-engine desktop keyboard run pass. |
| F-1-2, F-1-4 | The sole price statement is covered by `free-to-play`; complete play exposes no payment control. |
| F-1-3, F-5-2 | Unsupported absence copy remains removed; the retained no-account statement is covered by `no-account-required`. |
| F-1-5, F-3-1, RG-V5-06 | No numeric session-duration promise remains; README says only “short break.” |
| F-1-6, F-5-1 | Full-run request tests and fresh live runs in all three engines show only same-origin static GETs, no request bodies, no gameplay request, and no cookies. |
| F-1-7, F-1-8 | Decorative headings remain absent; puzzle headings plainly name the daily or sample grid. |
| F-1-9 | Link, Back, and Forward focus/announcement tests pass; end-state focus passed across engines. |
| F-1-10, F-3-5 | The real 404 has plain wording, complete metadata, HTTP 404, and a return action. |
| F-2-1, F-2-2, F-4-1 | Phone specimen labels remain intact, the section is named **Hints**, and all header navigation remains visible and reachable. |
| F-3-2, RG-V6-01 | `hint-cost` checks 4, 3, 2, 1, and 0; singular **“1 leaf”** remains correct. |
| F-3-3 | The Hints section has valid landmark structure; all route Axe scans are clear. |
| F-3-4 | Sound controls remain action-named **“Turn sound off/on.”** |
| F-3-6 | **“Skip to main content”** remains accurate and its focus test passes. |
| F-3-7 | README retains the plain statement “loads no files from other websites.” |
| F-3-8 | Demo guide and UI both identify Field sheet 05. |
| RG-V5-01 | Demo progress and sound use separate `demo:` keys; three-engine reset and exit checks retained seeded daily data. |
| RG-V5-02, RG-V5-03 | Privacy link target and solve-critical text-size regressions pass in the full suite. |
| RG-V5-04, RG-V5-05 | Result focus and singular **“1 check left”** regressions pass. |
| F-5-3 | README plainly says the sample can be solved or its explanation viewed; both endings were exercised. |

## Acceptance decision

**PASS.** The released implementation has zero findings at every severity and zero untested public claims. The browser-engine extension completed the real game in Chromium, Firefox, and WebKit without changing product code.

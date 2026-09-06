# Strict browser-game review 7 — solve a short daily deduction grid

**Reviewed:** 2026-09-06 UTC
**Live URL:** <https://riddle-grid.sociobot.in>
**Implementation candidate:** `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`
**Documentation checkout:** `217082d4820777894eca7f37ed47d7dc28b919b0`
**Verdict:** **PASS**
**Findings:** **0** (critical 0, high 0, medium 0, low 0)
**Untested public claims:** **0**

The documentation checkout differs from the implementation candidate only in review, verification, evidence, and audit-report work. A clean build from the checkout matched the live `index.html`, `404.html`, JavaScript, CSS, and service worker byte for byte, so the live product is the reviewed implementation.

## Job, audience, and first action

The job is to solve one short four-specimen deduction grid. It is for coffee-break players who want logic without spelling tests. Before scrolling, fresh desktop and phone browsers showed:

- `Solve one short deduction grid`
- `For coffee-break players who want logic without spelling tests.`
- `Try it with sample data` with `Opens a ready sample.`

At 1440 × 900, the first playable cell ended at 796 px; at 390 × 844 it ended at 798 px. The game, a specimen control, and the primary action are therefore all usable on the first screen. Both views had document width equal to viewport width and no console or page errors. Cold captures are in [review-7 evidence](evidence/review-7/).

## Live game run

Fresh phone and desktop contexts entered the one-click `?demo=1` sandbox. It immediately showed the persistent label **“Demo — sample data, nothing is saved to your daily game.”**, **Reset demo**, and **Start for real**.

- Touch/pointer run: selected and placed Fern R1C3, Acorn R4C2, Berries R3C4, and Seed pod R2C1; **Check layout** reached **“You found the only layout.”** The mobile win capture is [live-mobile-win.png](evidence/review-7/live-mobile-win.png).
- Loss/recovery run: selecting an empty cell first announced `That cell is empty. Select a clue card first.` Three complete incorrect checks reached **“Here is the only layout”** and showed every solved position. The desktop loss capture is [live-desktop-loss.png](evidence/review-7/live-desktop-loss.png).
- Keyboard run: Enter selected Fern, ArrowRight twice moved the grid focus, Enter placed it at R1C3, and Escape returned it to the tray. The accessible labels changed from `Row 1, column 3, Fern` to `Row 1, column 3, empty`.
- Restart after both endings returned the board to zero filled cells. Hinting, replacement, clear, check-disabled-until-full, score cost, and the explanatory third-failure end state are covered by the clean claim suite.
- A seeded daily-progress key and muted setting stayed unchanged while demo play wrote `demo:riddle-grid:*`; **Reset demo** removed only the demo keys. The complete demo run created zero requests after entry and set no cookies.

The product is a static browser game: it has no backend, API, account, payment path, multiplayer, health endpoint, tenant, or rate limit. Backend-only isolation, restart-persistence, health, and 429 checks do not apply.

## Declared claims

From a new clone at `/tmp/riddle-grid-review7-clean.uhHcmG`, Node 22.23.2, `npm ci` installed the documented prerequisites with 0 vulnerabilities. Every exact command in `.factory/claims.json` passed separately:

| Claim | Result |
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

The full `npm test` gate passed **32/32** (`test-results/.last-run.json` reports `passed`). `npm run build` passed and produced `dist/`: initial JavaScript is 21.75 kB raw / 8.00 kB gzip and CSS is 16.54 kB raw / 4.56 kB gzip. The separate live 390 × 844, DPR 2, 4× CPU samples were 61.30, 60.02, and 59.97 fps; median **60.02 fps**, within the claim's 55–65 range.

I audited landing, demo, Privacy, Terms, README, and demo-guide copy against the claims manifest. Every visitor-operational statement maps to a declared claim or is an instruction/legal limitation. No unlisted public product claim remains.

## Accessibility, privacy, routes, and offline behavior

- `/opt/fleet/lib/verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms`: correct titles, `lang="en"`, one h1, main landmark, image alternatives, button names, and no console/page errors. Its captures are in [verify-url evidence](evidence/review-7/verify-url/).
- Fresh Axe scans found zero violations on `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, and the missing route at 390 px. The existing full suite additionally checks 44 px targets, focus visibility, 200% text, content text size, skip-link focus, and route history focus.
- With `prefers-reduced-motion: reduce`, game transition duration was `0.00001s`. Link navigation and browser Back focused the new h1 and updated the polite announcement.
- `/demo`, Privacy, and Terms returned 200. An unknown path returned the designed `Page not found` page with HTTP 404, correct route title/canonical metadata, and zero Axe violations. That deliberate 404 is expected, not a defect. `robots.txt`, `sitemap.xml`, and the external Param Factory link returned 200.
- A fresh complete demo requested only same-origin static GETs with no payload; gameplay added zero requests and cookies remained empty. No account, payment, analytics, ad, chat, or submission controls appeared.
- After service-worker activation, `/demo` reloaded while offline with `Solve the sample deduction grid` and the status `You are offline. The open puzzle still works.` `sw.js` is no-cache; hashed assets are immutable.

## Earlier finding disposition

I read every earlier review, verification, and polish record. All prior items remain closed:

| Earlier item(s) | Current evidence |
| --- | --- |
| F-1-1 | Full 32-test suite and `keyboard-controls` pass; the fresh live Enter/arrow/Escape run worked. |
| F-1-2, F-1-4 | The sole free-access line is covered by `free-to-play`; no repeated footer or Terms price claim exists. |
| F-1-3, F-5-2 | Unsupported account/ad/chat copy remains absent; `no-account-required` passed. |
| F-1-5, F-3-1, RG-V5-06 | No numeric 3–5-minute promise returned; README says only “short break.” |
| F-1-6, F-5-1 | Full-run privacy claims passed; fresh live play had no cookies or game-time requests. |
| F-1-7, F-1-8 | Decorative labels remain absent; game headings are `Today’s deduction grid` and `Sample deduction grid`. |
| F-1-9 | Fresh Privacy navigation and Back focused `page-title` and announced the destination title. |
| F-1-10, F-3-5 | The designed HTTP 404 has the plain heading, required metadata, and a route back. |
| F-2-1, F-2-2, F-4-1 | Phone cold view has no overflow, visible navigation and grid, intact specimen controls, and the functional `Hints` heading. |
| F-3-2, RG-V6-01 | `hint-cost` passed all score labels, including singular `1 leaf`. |
| F-3-3 through F-3-8 | Axe is clear; action-named sound control, accurate skip link, plain README privacy wording, and Field sheet 05 sample name all remain present. |
| RG-V5-01 through RG-V5-05 | Clean claims/full suite and fresh live isolation, target, focus, and grammar checks remain passing. |
| F-5-3 | README says the sample lets players solve the grid or view its explanation; both endings were exercised live. |

## Acceptance decision

**PASS.** There are zero findings and zero untested public claims. The live release matches the reviewed implementation and completes the brief's short, local-first daily deduction-game loop on phone, desktop, keyboard, and touch.

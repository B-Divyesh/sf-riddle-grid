# Adversarial first-read review 1 — Riddle Grid

**Reviewed:** 2026-09-01  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verdict:** **FAIL**

## First 30 seconds

Cold visits used fresh Chromium contexts at 390 × 844 and 1440 × 900 before scrolling. The first screen answers the three required questions:

- **What:** “Solve one short deduction grid.”
- **For whom:** “For coffee-break players who want logic without spelling tests.”
- **First action:** “Try it with sample data” — “Opens a ready sample.”

At 390px, the playable field sheet starts at 345px and its specimen tray and first playable grid cell are visible. At 1440px, the sheet starts at 446px and the grid is visible. Both views have no horizontal overflow. This part is clear and passes.

## Findings

### F-1-1 — BLOCKING — `npm test` is not reliable because the declared keyboard claim fails

**Location:** `tests/riddle-grid.spec.ts:94-102`, claim `keyboard-controls`.

**Evidence:** In a clean clone, all twelve exact `claims.json` commands passed when run separately. The required full quality command then failed reproducibly: `npm test` → **15 passed, 1 failed**. The failing assertion is `@claim:keyboard-controls`: after Enter, ArrowRight, ArrowRight, Enter, cell R1C3 remains `"Row 1, column 3, empty"` rather than containing Fern. The same failure occurred in the review worktree and in `/tmp/riddle-grid-review-clean`.

**Why this fails review:** The definition of done requires `npm test` to pass. A claimed keyboard control must not be timing-dependent.

**Concrete fix:** Make selection, grid focus, and placement deterministic for keyboard input; remove the competing deferred focus move or await a stable post-render focus target in the test. Run the full suite repeatedly from a clean clone until it passes consistently, not only the isolated grep command.

### F-1-2 — HIGH — “Free to play.” is an unlisted claim

**Location / quote:** landing first-screen fact: “Free to play.”

**Why this fails review:** Visitors can rely on price. No `claims.json` entry or sandbox test proves that the game has no payment requirement.

**Concrete fix:** Add a `free-to-play` claim with a demo/UI test that confirms the complete game is usable without a payment path, or remove the statement.

### F-1-3 — HIGH — The no-account/no-ads promise is an unlisted claim

**Location / quote:** landing privacy section: “Riddle Grid has no account, ads, chat, or user-made clues.”

**Why this fails review:** This is four specific product and privacy promises. `no-third-party` tests outgoing requests, not absence of accounts, ads, chat, or submissions.

**Concrete fix:** Add a narrowly worded, testable claim (for example, that the shipped static product exposes no sign-in, ad, chat, or clue-submission controls) with a browser test, or delete the sentence.

### F-1-4 — HIGH — Repeated free-price claims are unlisted

**Location / quotes:** landing footer: “Riddle Grid is a free daily deduction game.”; `/terms`: “Riddle Grid is a free puzzle provided as-is.”

**Why this fails review:** These repeat the untested price promise in visitor-facing routes. The daily-selection part is covered by `daily-puzzle`; “free” is not.

**Concrete fix:** Cover the free access promise with the claim proposed in F-1-2, and use one consistent description, or remove “free” from both statements.

### F-1-5 — HIGH — The stated play time is an unlisted quantitative claim

**Location / quote:** `README.md`: “A round is designed for a 3–5 minute break.”

**Why this fails review:** A visitor can interpret the numeric duration as an expectation. It has no claim entry or measured test.

**Concrete fix:** Remove the duration, or define a reproducible usability/performance measure and add it to `claims.json`. “One short grid” is sufficient without an unsupported time estimate.

### F-1-6 — HIGH — The privacy policy contains an unlisted no-cookie/no-analytics promise

**Location / quote:** `/privacy`: “The site uses no analytics, ads, cookies, or third-party scripts.”

**Why this fails review:** The request-log claim covers third-party runtime requests, but does not assert cookies, analytics calls, or ad/script absence.

**Concrete fix:** Add a privacy claim that starts at `/demo`, records requests, checks `document.cookie`, and checks that no analytics/ad/script elements are present; or reduce the sentence to the existing tested wording.

### F-1-7 — MEDIUM — Decorative section labels carry no usable information

**Location / quotes:** landing labels “Field method / 03 steps” and “A small daily ritual”.

**Why this fails review:** The first is jargon for “How the grid works,” and the second is a mood slogan. Neither names its section or helps a first-time player decide what to do. This violates the attached plain-words rule.

**Concrete fix:** Delete both labels. Keep the useful headings “How the grid works” and “The game stays on your device.”

### F-1-8 — MEDIUM — Daily puzzle headings are metaphors rather than names

**Location / quote:** live daily sheet heading: “Field margin”; authored daily headings in `src/puzzles.ts` include “First fronds”, “Oak shade”, “Berry path”, and “Last light”.

**Why this fails review:** These headings do not identify the game, puzzle type, or task out of context. They are field-guide mood copy rather than useful headings.

**Concrete fix:** Use a clear, stable heading such as “Today’s deduction grid” and, if a daily label is retained, present it as optional supporting text after the clear heading.

### F-1-9 — MEDIUM — Browser Back does not move focus to the new route heading

**Location:** client routing in `src/app.ts`; live `/demo` → `/privacy` → browser Back.

**Evidence:** Forward navigation focuses the privacy h1. After Back to `/demo`, the active element is `BODY`, not the demo h1. The code’s `popstate` handler calls `render()` directly, while only `navigate()` focuses the h1 and updates the live region.

**Why this fails review:** Keyboard and screen-reader users do not receive the required route-change focus/announcement when using Back or Forward.

**Concrete fix:** Route `popstate` through the same post-render focus and `aria-live` announcement logic as `navigate()`, while preserving the browser-restored scroll position. Add a Playwright Back/Forward focus test.

### F-1-10 — MINOR — The real 404 document lacks social and touch metadata

**Location:** `404.html`.

**Evidence:** The designed 404 has a correct title, description, canonical link, and SVG favicon, but omits the Open Graph/Twitter tags and `apple-touch-icon` present in `index.html`.

**Why this fails review:** The site-structure contract requires canonical, OG, and favicon metadata for routes; sharing or saving the true HTTP 404 loses the product presentation.

**Concrete fix:** Add the same product-specific Open Graph/Twitter image metadata and Apple touch icon to `404.html` (with a 404-appropriate title and description).

## Copy audit

Word counts treat hyphenated and numeric compounds as one word. The table includes all reader-facing landing statements, labels, controls, and the current live clue sentences. Repeated clue sentences are listed with their visible repeat count.

| Landing text | Words | Review |
| --- | ---: | --- |
| Solve one short deduction grid | 5 | Pass |
| For coffee-break players who want logic without spelling tests. | 9 | Pass |
| Try it with sample data | 5 | Pass |
| Opens a ready sample. | 4 | Pass |
| Free to play. | 3 | F-1-2 |
| Offline after one visit. | 4 | Covered by `offline-reload` |
| Saved in this browser. | 4 | Covered by `local-progress` |
| Today’s clues belong on one field grid. | 7 | Pass |
| Field sheet 18 · 2026-09-01 | 4 | Label; Pass |
| Field margin | 2 | F-1-8 |
| An empty cell can help you see the remaining column. | 10 | Pass |
| 4 leaves | 2 | Label; Pass |
| Rule 1 / Rule 2 | 2 each | Labels; Pass |
| One specimen in each row. | 5 | Game rule; Pass |
| One specimen in each column. | 5 | Game rule; Pass |
| Clue cards / Field notes | 2 each | Labels; Pass |
| Acorn is above Fern. | 4 | Game clue, shown twice; Pass |
| Fern is above Berries. | 4 | Game clue, shown twice; Pass |
| Berries is left of Fern. | 5 | Game clue, shown twice; Pass |
| Seed pod is above Acorn. | 5 | Game clue, shown twice; Pass |
| Acorn is left of Seed pod. | 5 | Game clue, shown twice; Pass |
| Seed pod is left of Berries. | 6 | Game clue, shown twice; Pass |
| Place | 1 | Control label; Pass |
| No hints revealed. | 3 | State; Pass |
| Reveal one position | 3 | Result-naming control; Pass |
| −1 leaf | 2 | Cost label; Pass |
| Select a clue card, then choose a grid cell. | 9 | Pass |
| Clear layout / Check layout | 2 each | Result-naming controls; Pass |
| Field method / 03 steps | 4 | F-1-7 |
| How the grid works | 4 | Pass |
| Read the clue cards. | 4 | Pass |
| Above and left describe each pair. | 6 | Pass |
| Place four specimens. | 3 | Pass |
| Use each row and column once. | 6 | Pass |
| Check the layout. | 3 | Pass |
| See the solved grid and its explanation. | 7 | Pass |
| A small daily ritual | 4 | F-1-7 |
| The game stays on your device | 6 | Pass |
| Riddle Grid has no account, ads, chat, or user-made clues. | 10 | F-1-3 |
| Your layout and sound setting use browser storage. | 8 | Covered by storage claims |
| The game sends no personal data. | 6 | Covered by `no-third-party` |
| Read the privacy details | 4 | Result-naming link; Pass |
| Riddle Grid is a free daily deduction game. | 8 | F-1-4 |
| Privacy / Terms | 1 each | Link labels; Pass |
| Built by Param Factory | 4 | Attribution; Pass |
| Original generated field-desk art · v1.0.0 | 5 | Provenance/version label; Pass |

README reader-facing sentences and instructions:

| README text | Words | Review |
| --- | ---: | --- |
| Solve a four-specimen daily deduction grid. | 6 | Product description; Pass |
| Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Audience statement; Pass |
| A round is designed for a 3–5 minute break. | 9 | F-1-5 |
| The game selects one shared puzzle for each UTC date. | 10 | Covered by `daily-puzzle` |
| All 20 daily layouts have exactly one solution. | 8 | Covered by `unique-solutions` |
| The bundled sample reaches the same complete solve and explanation flow. | 11 | Covered by `sample-complete` |
| Read the illustrated clue cards. | 5 | Pass |
| Place each specimen so every row and column contains one specimen and every relation is true. | 16 | Pass |
| A hint reveals one exact position and costs one score leaf. | 11 | Covered by `hint-cost` |
| Three incorrect checks open the explanation. | 6 | Covered by `failed-checks` |
| Use a pointer or touch to select a specimen and then a cell. | 13 | Pass |
| With a keyboard, use Enter or Space to select and place. | 11 | F-1-1 claim currently fails in suite |
| Arrow keys move through the grid. | 6 | F-1-1 claim currently fails in suite |
| Escape returns a placed specimen to the clue cards. | 9 | F-1-1 claim currently fails in suite |
| Progress stays in this browser. | 5 | Covered by `local-progress` |
| The game sends no personal data and loads no third-party runtime resources. | 13 | Covered by `no-third-party` |
| It works offline after the first visit. | 7 | Covered by `offline-reload` |
| The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | Covered by `phone-60fps` |
| The automated check uses 4× CPU throttling. | 7 | Covered by `phone-60fps` |
| Requirements: Node.js 20 or newer. | 5 | Development instruction; Pass |
| Open `http://localhost:5173/demo` for the fixed verification sandbox. | 7 | Development instruction; Pass |
| Demo progress uses `demo:riddle-grid:sample`; daily progress uses `riddle-grid:daily:<UTC date>`. | 8 | Technical documentation; Pass |
| `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 21 | F-1-1: command does not pass |
| `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 15 | Verified; Pass |
| Upload `dist/` to the static host. | 6 | Deployment instruction; Pass |
| `staticwebapp.config.json` supplies SPA fallback, the styled 404 response, security headers, and the content security policy. | 15 | Verified; Pass |
| No backend or environment variables are required. | 7 | Verified static product; Pass |
| The privacy policy is at `/privacy`; the terms are at `/terms`. | 11 | Verified; Pass |
| The code is available under the MIT License. | 8 | Verified; Pass |
| Original generated artwork provenance is recorded in `.factory/design.md`. | 8 | Verified; Pass |

No listed sentence exceeds 22 words. The terminology is generally consistent: *specimen*, *grid*, *clue card*, *hint*, *layout*, and *sample* are used consistently.

## Demo and sandbox verification

`/demo` is one click from the first screen and directly loads “Solve the sample deduction grid” with the authored Rain ledger clue cards, 4×4 board, and controls. Its persistent banner says “Demo — sample data, nothing is saved to your daily game,” and includes **Reset demo** and **Start for real**.

In a fresh 390px context, I placed Fern in the daily game first, then entered demo, revealed a hint, and placed Fern in the sample. The daily key remained unchanged; only `demo:riddle-grid:sample` changed. **Reset demo** removed that demo key and cleared the sample grid while retaining the daily key. This passes isolation and reset checks. No useful AI, import/export, or sync feature is implied by this short local-first daily game, so no missed-leverage finding is recorded.

## Claims and local verification

I cloned the committed repository to `/tmp/riddle-grid-review-clean`, ran `npm ci`, and ran every exact command in `.factory/claims.json` individually. All twelve individual commands passed:

`unique-solutions`, `daily-puzzle`, `sample-complete`, `restart-reset`, `hint-cost`, `failed-checks`, `sound-setting`, `local-progress`, `keyboard-controls`, `phone-60fps`, `no-third-party`, and `offline-reload`.

However, `npm test` in that same clean clone failed F-1-1 (15/16); `npm run build` passed and produced `dist/` with 20.12 kB JS (7.74 kB gzip) and 15.67 kB CSS (4.40 kB gzip). The individual keyboard command passing while the full suite fails is itself proof of a flaky quality gate, not a pass.

The `no-third-party` claim’s fresh live request log during demo use contained only the same origin. Offline reload, individual demo flow, service worker, and privacy claims are covered by the declared test suite; the unlisted promises above are not.

## History check

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. I read `.factory/verification.md`, `.factory/verification-2.md`, and the prior handoff. The earlier verification findings are actually fixed on the live site and in code:

- The live game is in the first 390px and desktop viewport.
- `phone-60fps` is now present in `claims.json` with its tagged test.
- Live hashed assets send `Cache-Control: public, max-age=31536000, immutable` and `sw.js` is `no-cache`.
- `/missing-page` returns HTTP 404 with the designed field-sheet page.

No prior finding is re-opened under its earlier condition.

## Structure and live checks

Root, `/demo`, `/privacy`, `/terms`, and the 404 were checked live. The normal pages have their required titles, one h1, one main landmark, lang, canonical URL, favicon, security headers, and no normal-page console or page errors. The unknown path returns HTTP 404. The root’s `How it works` anchor reaches its section, all internal links return 200, and the external Param Factory link returns 200. Live axe scans found no serious or critical violations. The botanical field-notebook system is distinct from a generic SaaS template and matches `.factory/design.md`.

The expected browser console entry for the HTTP 404 navigation itself is a failed-resource message for the 404 document; it is not present on the normal routes. F-1-10 covers its missing metadata rather than treating a real HTTP 404 as a defect.

## What would make this perfect

Make the keyboard claim and full suite deterministic; make every price, product-absence, duration, and privacy promise either a declared sandbox claim or remove it; replace the field-guide mood labels with useful headings; fix Back/Forward focus announcements; and complete the 404 metadata. Then repeat this entire review with a clean-clone `npm test` pass.

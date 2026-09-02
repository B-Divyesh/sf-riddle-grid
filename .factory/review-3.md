# Adversarial first-read review 3 — Riddle Grid

**Reviewed:** 2026-09-02 UTC  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Repository candidate:** `dc853ae0e23b17607947942105e991095196f2fc`  
**Verdict:** **FAIL**

Eight findings remain. Two are blocking history or claims regressions. A PASS requires zero findings and no untested claim.

## First 30 seconds

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900 before scrolling.

- **What it does:** “Solve one short deduction grid.”
- **For whom:** “For coffee-break players who want logic without spelling tests.”
- **What to click first:** “Try it with sample data,” followed by “Opens a ready sample.”

All three answers are explicit in the first screen. The live game begins at 345 px on the phone and 383 px on desktop. The first playable cell ends at 753 px on the phone and 796 px on desktop, so it is fully visible in both first viewports. The phone has no horizontal overflow. No console or page error occurred on either cold root visit.

## Findings

### F-3-1 / F-1-5 — BLOCKING — the untested 3–5 minute claim has regressed

**Exact quote/location:** `README.md`, opening paragraph: “A round is intended to take 3–5 minutes.”

**Why this fails:** Review 1 recorded the same unsupported quantitative duration as F-1-5. Polish 1 removed it. It has returned with “intended” in place of “designed,” but a reader can still rely on the 3–5 minute number. `.factory/claims.json` has no duration claim or measured test. The attached claims rule requires every quantitative claim to be asserted with its number. The later verification suggestion to restore a session description does not override that rule.

**Concrete fix:** Remove the number, for example: **“A round is designed for a short break.”** If the number is essential, add a reproducible `@claim:round-duration` usability test that measures representative first-time completions within the stated range.

### F-3-2 / RG-V6-01 — BLOCKING — the known “1 leaves” defect is still live

**Exact quote/location:** live root and `/demo`, score beside the puzzle after the third hint: **“1 leaves”**; `src/app.ts`, score rendering.

**Why this fails:** `.factory/handoff.md` and `.factory/verification-6.md` identify this as RG-V6-01. The work order requires every earlier finding to be confirmed, and any unfixed one to return as blocking. The malformed score is in a central game status, not hidden documentation.

**Concrete fix:** Render **“1 leaf”** when the score is one and **“0 leaves”** or **“2–4 leaves”** otherwise. Add a regression assertion to `@claim:hint-cost` or a dedicated score-pluralization test covering 4, 3, 2, 1, and 0.

### F-3-3 — MEDIUM — the puzzle exposes an invalid nested complementary landmark

**Exact location:** live `/` and `/demo`; `<aside class="hint-panel">` is inside `<section class="game-sheet">`.

**Evidence:** A fresh Playwright Axe scan reports `landmark-complementary-is-top-level` with moderate impact on both routes: “Aside should not be contained in another landmark.” Privacy and Terms have no Axe violations.

**Why this fails:** The hint panel is part of the puzzle, not page-level complementary content. Its landmark semantics create an invalid landmark structure for screen-reader navigation. The repository test filters out moderate violations, so the full suite passes without detecting it.

**Concrete fix:** Change the nested `aside` to a labelled `section` or `div`, then make the route accessibility test fail on every Axe violation rather than only serious and critical impacts.

### F-3-4 — MEDIUM — the sound button names state, not the result of pressing it

**Exact quote/location:** header on every route: **“Sound on”** and, after activation, **“Sound off.”**

**Why this fails:** The label describes the current state while the click performs the opposite result. It is also paired with `aria-pressed` for the muted state, so “Sound on, not pressed” is needlessly difficult to interpret. The plain-words rule requires buttons to use result-naming verbs.

**Concrete fix:** Label the action **“Turn sound off”** while sound is on and **“Turn sound on”** while it is off. If `aria-pressed` is retained, use a stable accessible name such as **“Sound”** and expose the state consistently.

### F-3-5 — MEDIUM — the 404 headline is a field-guide metaphor

**Exact quote/location:** live unknown route h1: **“This field sheet is missing.”**

**Why this fails:** Out of context, the heading sounds like missing game content rather than an invalid URL. The smaller eyebrow and body eventually explain the error, but the h1 itself violates the requirement that headings name their section without brand lore or metaphor.

**Concrete fix:** Change the h1 to **“Page not found.”** Keep the botanical treatment in the illustration and retain **“Return to today’s grid.”**

### F-3-6 — MINOR — the skip link is wrong outside the game

**Exact quote/location:** first focusable control on `/privacy`, `/terms`, and the 404: **“Skip to puzzle.”**

**Why this fails:** These routes contain no puzzle. The link correctly moves focus to each page h1, but its label promises the wrong destination.

**Concrete fix:** Use **“Skip to main content”** on every route, or render **“Skip to puzzle”** only where the main target actually contains the game.

### F-3-7 — MINOR — README privacy copy uses avoidable implementation jargon

**Exact quote/location:** `README.md`: “The game sends no personal data and loads no third-party runtime resources.”

**Why this fails:** “Runtime resources” is implementation language, not a phrase a player needs in order to understand the privacy guarantee.

**Concrete fix:** Use **“The game sends no personal data and loads no files from other websites.”** The existing `no-third-party` test can prove the rewritten statement.

### F-3-8 — MINOR — the demo guide names a sample that the product does not expose

**Exact quote/location:** `.factory/demo.md`: **“the fixed ‘Rain ledger’ field sheet”**. The live demo and `src/puzzles.ts` expose only **“Field sheet 05 · sample”**, **“Sample deduction grid”**, and **“Each row and column accepts one specimen.”** No current product string or puzzle record is named “Rain ledger.”

**Why this fails:** The verifier guide and the shipped sample use different identifiers, so a reviewer cannot confirm that the documented sample is the one on screen.

**Concrete fix:** Name the sample consistently in the product, puzzle data, README, and `.factory/demo.md`, or change the guide to **“the fixed Field sheet 05 sample.”**

## Copy audit

Counts treat hyphenated terms, dates, dimensions, and code spans as one word. Repeated daily clue sentences are listed once with their repeat count. Labels and controls are included so button wording and terminology can be checked. No item exceeds 22 words and no banned marketing adjective appears.

### Live landing page

| Text | Words | Result |
| --- | ---: | --- |
| Skip to puzzle | 3 | F-3-6 on non-game routes |
| Riddle Grid | 2 | Product name |
| Demo | 1 | Navigation label |
| How it works | 3 | Navigation label |
| Privacy | 1 | Navigation label |
| Sound on / Sound off | 2 each | F-3-4 |
| Solve one short deduction grid | 5 | Pass |
| For coffee-break players who want logic without spelling tests. | 9 | Pass |
| Try it with sample data | 5 | Pass; result-naming primary action |
| Opens a ready sample. | 4 | Pass |
| Free to play. | 3 | Covered by `free-to-play` |
| Offline after one visit. | 4 | Covered by `offline-reload` |
| Saved in this browser. | 4 | Covered by `local-progress` |
| Four pressed plant specimens surround a blank field grid. | 9 | Useful image alternative |
| Today’s clues belong on one field grid. | 7 | Pass |
| Field sheet 19 · 2026-09-02 | 4 | Puzzle/date label |
| Today’s deduction grid | 3 | Pass |
| Hints show exact cells but reduce the leaf score. | 9 | Covered by `hint-cost` |
| 4 leaves / 3 leaves / 2 leaves / 0 leaves | 2 each | Pass |
| 1 leaves | 2 | F-3-2 |
| Rule 1 / Rule 2 | 2 each | Rule labels |
| One specimen in each row. | 5 | Pass |
| One specimen in each column. | 5 | Pass |
| Fern / Acorn / Berries / Seed pod | 1 / 1 / 1 / 2 | Selection labels; accessible names say “Select specimen” |
| Clue cards | 2 | Pass |
| Acorn is above Fern. | 4 | Game clue; shown twice |
| Fern is above Berries. | 4 | Game clue; shown twice |
| Berries is above Seed pod. | 5 | Game clue; shown twice |
| Berries is left of Seed pod. | 6 | Game clue; shown twice |
| Seed pod is left of Fern. | 6 | Game clue; shown twice |
| Fern is left of Acorn. | 5 | Game clue; shown twice |
| Place | 1 | Contextual clue-card state; accessible name supplies the specimen and action |
| Hints | 1 | Pass |
| No hints revealed. | 3 | Pass |
| Reveal one position | 3 | Pass; result-naming action |
| −1 leaf | 2 | Cost label; covered by `hint-cost` |
| Select a clue card, then choose a grid cell. | 9 | Pass |
| Clear layout | 2 | Pass; result-naming action |
| Check layout | 2 | Pass; result-naming action |
| How the grid works | 4 | Pass |
| Read the clue cards. | 4 | Pass |
| Above and left describe each pair. | 6 | Pass |
| Place four specimens. | 3 | Pass |
| Use each row and column once. | 6 | Pass |
| Check the layout. | 3 | Pass |
| See the solved grid and its explanation. | 7 | Pass |
| The game stays on your device | 6 | Covered by storage and privacy claims |
| Your layout and sound setting use browser storage. | 8 | Covered by `local-progress` and `sound-setting` |
| The game sends no personal data. | 6 | Covered by `no-third-party` |
| Read the privacy details | 4 | Pass; result-naming link |
| Riddle Grid is a daily deduction game. | 7 | Covered by `daily-puzzle` |
| Terms | 1 | Navigation label |
| Built by Param Factory | 4 | Attribution |
| Original generated field-desk art · v1.0.0 | 5 | Provenance and version |

### README

| Sentence | Words | Result |
| --- | ---: | --- |
| Solve a four-specimen daily deduction grid. | 6 | Pass |
| Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Pass |
| A round is intended to take 3–5 minutes. | 8 | F-3-1 / F-1-5 |
| The game selects one shared puzzle for each UTC date. | 10 | Covered by `daily-puzzle` |
| All 20 daily layouts have exactly one solution. | 8 | Covered by `unique-solutions` |
| The bundled sample reaches the same complete solve and explanation flow. | 11 | Covered by `sample-complete` |
| Read the illustrated clue cards. | 5 | Pass |
| Place each specimen so every row and column contains one specimen and every relation is true. | 16 | Pass |
| A hint reveals one exact position and costs one score leaf. | 11 | Covered by `hint-cost` |
| Three incorrect checks open the explanation. | 6 | Covered by `failed-checks` |
| Use a pointer or touch to select a specimen and then a cell. | 13 | Pass |
| With a keyboard, use Enter or Space to select and place. | 11 | Covered by `keyboard-controls` |
| Arrow keys move through the grid. | 6 | Covered by `keyboard-controls` |
| Escape returns a placed specimen to the clue cards. | 9 | Covered by `keyboard-controls` |
| Progress stays in this browser. | 5 | Covered by `local-progress` |
| The game sends no personal data and loads no third-party runtime resources. | 12 | F-3-7; covered behavior, jargon in wording |
| It works offline after the first visit. | 7 | Covered by `offline-reload` |
| The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | Covered by `phone-60fps` |
| The automated check uses 4× CPU throttling. | 7 | Covered by `phone-60fps` |
| Requirements: Node.js 20 or newer. | 5 | Development requirement |
| Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. | 7 | Development instruction |
| The `/demo` route also opens the sample. | 7 | Verified route instruction |
| Demo progress and sound use `demo:riddle-grid:sample` and `demo:riddle-grid:muted`; daily keys use `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`. | 14 | Covered by `demo-isolation` |
| Reset demo and Start for real clear both demo keys. | 10 | Covered by `demo-isolation` |
| `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 21 | Verified; developer-facing detail |
| `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 15 | Verified |
| Upload `dist/` to the static host. | 6 | Deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the styled 404 response, security headers, and the content security policy. | 15 | Verified |
| No backend or environment variables are required. | 7 | Confirmed by build and source inspection |
| The privacy policy is at `/privacy`; the terms are at `/terms`. | 11 | Verified |
| The code is available under the MIT License. | 8 | Verified |
| Original generated artwork provenance is recorded in `.factory/design.md`. | 8 | Verified |

Terminology is otherwise consistent: *specimen* is the illustrated object, *clue card* is its relation list, *grid* is the board, *layout* is a submitted arrangement, *hint* is an exact position, *leaf* is the score unit, and *sample* is the fixed demo puzzle.

## Demo and sandbox

The root primary action opens `/?demo=1` in one click. The first demo screen already contains fixed Field sheet 05, four illustrated specimens, six concrete relations, the 4×4 grid, hint control, and check controls. The persistent banner reads **“Demo — sample data, nothing is saved to your daily game.”** It includes **Reset demo** and **Start for real**. F-3-8 records the mismatch between this visible sample and the “Rain ledger” name in `.factory/demo.md`.

In a fresh live context, the review seeded `riddle-grid:daily:2026-09-02` and `riddle-grid:muted`, entered the demo, placed Fern, changed sound, revealed three hints, reset, and exited. Only `demo:riddle-grid:sample` and `demo:riddle-grid:muted` changed during demo use. Reset removed both demo keys, restored the blank sample and four-leaf score, and left both daily sentinels unchanged. Start for real also removed the demo keys. This confirms demo isolation and exposes F-3-2 at the third hint.

The complete request log used only `https://riddle-grid.sociobot.in`; cookies were empty. After the service worker became active, `/demo` reloaded while the context was offline and still showed “Solve the sample deduction grid.”

## Claims and quality gates

A clean clone was created at `/tmp/riddle-grid-review-3-clean.xyiu9j`. `npm ci` succeeded. Every exact command in `.factory/claims.json` was run separately:

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
| `offline-reload` | PASS |

The full clean-clone `npm test` run passed **27/27**. `npm run build` passed and produced `dist/`; application JavaScript is 21.47 kB raw / 7.94 kB gzip and CSS is 16.17 kB raw / 4.50 kB gzip. The live HTML, JavaScript, and CSS SHA-256 hashes match the clean build. F-3-1 remains blocking because its duration claim has no manifest entry despite all listed tests passing.

## History check

Every earlier review, polish report, verification report, and the incoming handoff was read. Current live behavior and source were checked rather than accepting closure notes.

| Earlier item | Current confirmation |
| --- | --- |
| F-1-1 keyboard suite flake | Fixed: isolated claim and full 27-test suite pass. |
| F-1-2 / F-1-4 free-access copy | Fixed: sole landing price claim is covered by `free-to-play`. |
| F-1-3 unsupported absence claims | Fixed: old landing sentence remains absent; privacy statement is covered by `private-static-game`. |
| F-1-5 unsupported 3–5 minute claim | **Regressed: F-3-1 / F-1-5.** |
| F-1-6 privacy claim coverage | Fixed: claim tests pass; live requests are same-origin and cookie-free. |
| F-1-7 decorative landing labels | Fixed: the old mood labels remain absent. |
| F-1-8 unclear daily heading | Fixed: live heading is “Today’s deduction grid.” |
| F-1-9 Back/Forward focus | Fixed: Back and Forward focus the destination h1 and update the polite announcement. |
| F-1-10 incomplete 404 metadata | Fixed: Apple touch, Open Graph, Twitter, canonical, title, and description are present. |
| F-2-1 broken phone specimen names | Fixed: all four names occupy one line at 390 px and the first grid cell remains visible. |
| F-2-2 “Field notes” hint heading | Fixed: live heading is “Hints.” |
| Verification 1 viewport, FPS, cache, and HTTP 404 findings | Fixed: first cells are visible, FPS claim passes, hashed assets are immutable, and unknown paths return 404. |
| Verification 3 focus contrast, touch targets, and 200% resize | Fixed by live measurements and the passing regression test. |
| RG-V5-01 through RG-V5-05 | Fixed: demo sound isolation, 44 px targets, 16 px solve text, result focus, and singular check copy pass. |
| RG-V5-06 missing session length | A number was restored, but it reopens F-1-5 because no duration claim test was added. |
| RG-V6-01 singular leaf count | **Unfixed: F-3-2 / RG-V6-01.** |

Polish 1 and Polish 2 closure claims match the current site except for the later F-1-5 regression described above.

## Structure, links, and accessibility

- `/`, `/demo`, `/privacy`, and `/terms` return 200. An unknown path returns the designed document with HTTP 404.
- Each route has its required title pattern, one h1, one main, `lang="en"`, description, canonical, Open Graph/Twitter metadata, favicon, consistent header/footer, Privacy, and Terms.
- `robots.txt`, `sitemap.xml`, icons, social image, internal routes, in-page anchors, and the Param Factory link all resolve. No dead link was found.
- Back and Forward restore the correct route, focus the new h1, and update the polite route announcement.
- `/opt/fleet/lib/verify-url.sh` passes root, demo, privacy, and terms with no console/page errors. The 404 navigation emits only the browser's expected failed-resource message for its intentional 404 response.
- All visible phone links and buttons measured at least 44 × 44 px. Reduced-motion mode removed animations and transitions. Playwright Axe found F-3-3; no other Axe violation appeared on the audited routes.
- The botanical field-notebook treatment is product-specific: ruled paper, berry/fern ink, original field-desk art, specimen drawings, and a live grid. It does not present as a generic SaaS template.

F-3-5 and F-3-6 are the remaining structural copy failures.

## Missed leverage

No AI, import/export, or sync feature is an obvious omission. The brief defines a short authored daily puzzle with local progress. AI-generated clues would conflict with the hand-authored unique-solution constraint, export has no useful user artifact, and account sync would add identity and privacy cost to a one-round local game. No provider key or decorative AI feature is present.

## What would make this perfect

Remove or test the 3–5 minute claim; pluralize the one-leaf score; correct the nested hint landmark; make the sound control name its result; rename the 404 h1; correct the skip-link label; replace the README privacy jargon; and use one documented sample name. Add regressions for score pluralization, all-impact Axe results, route-specific skip-copy, the 404 h1, and sound-control naming. Then rerun all 15 claims, the full suite, build, live demo isolation/offline checks, cold captures, link crawl, and copy audit. A later review can PASS only if all eight findings are closed and no new one appears.

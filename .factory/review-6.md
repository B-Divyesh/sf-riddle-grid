# Adversarial first-read review 6 — Riddle Grid

**Reviewed:** 2026-09-02 UTC
**Live URL:** <https://riddle-grid.sociobot.in>
**Reviewed commit:** `023c15e775ac9dfb710eb5993529a28bc9c0a1b1`
**Verdict:** **PASS**

## First 30 seconds

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900 before scrolling.

- **What it does:** “Solve one short deduction grid.” It is a compact four-specimen logic-placement game.
- **For whom:** “For coffee-break players who want logic without spelling tests.”
- **What to click first:** “Try it with sample data”; the adjacent result says “Opens a ready sample.”

At 390 px the action, three facts, specimen tray, and first playable grid row are visible in the first viewport. At desktop size the grid is visible in the first viewport. Neither viewport overflows horizontally and neither emitted a console error. The botanical field-sheet presentation is distinct from a generic SaaS template and matches the recorded field-guide design direction.

## Copy audit

Word counts treat hyphenated terms, dates, labels, and numbers as one word. All sentences are at or below 22 words. The landing uses one term consistently for each concept: specimen, clue card, grid, hint, layout, leaf, and sample. All actions name their result.

### Landing-page sentences

| Copy | Words | Check |
| --- | ---: | --- |
| For coffee-break players who want logic without spelling tests. | 9 | Clear audience and outcome. |
| Opens a ready sample. | 4 | States the result of the primary action. |
| Free to play. | 3 | `free-to-play`. |
| Offline after one visit. | 4 | `offline-reload`. |
| Saved in this browser. | 4 | `local-progress`. |
| Four pressed plant specimens surround a blank field grid. | 9 | Useful image alternative. |
| Today’s clues belong on one field grid. | 7 | Plain preview caption. |
| Hints show exact cells but reduce the leaf score. | 9 | `hint-cost`. |
| One specimen in each row. | 5 | Rule text. |
| One specimen in each column. | 5 | Rule text. |
| Acorn is above Fern. | 4 | Puzzle clue. |
| Fern is above Berries. | 4 | Puzzle clue. |
| Berries is above Seed pod. | 5 | Puzzle clue. |
| Berries is left of Seed pod. | 6 | Puzzle clue. |
| Seed pod is left of Fern. | 6 | Puzzle clue. |
| Fern is left of Acorn. | 5 | Puzzle clue. |
| No hints revealed. | 3 | Clear empty state. |
| Select a clue card, then choose a grid cell. | 9 | Clear first in-game instruction. |
| Read the clue cards. | 4 | Clear step. |
| Above and left describe each pair. | 6 | Explains the clue vocabulary. |
| Place four specimens. | 3 | Clear step. |
| Use each row and column once. | 6 | Clear constraint. |
| Check the layout. | 3 | Clear step. |
| See the solved grid and its explanation. | 7 | States the outcome. |
| Your layout, puzzle choices, and sound setting stay in browser storage. | 11 | `local-progress`, `puzzle-choices-local`, `sound-setting`. |
| Riddle Grid is a daily deduction game. | 7 | `daily-puzzle`. |

### Landing labels and actions

`Solve one short deduction grid` (5), `Try it with sample data` (5), `Today’s deduction grid` (3), `Clue cards` (2), `Hints` (1), `Reveal one position` (3), `Clear layout` (2), `Check layout` (2), `How the grid works` (4), `The game stays on your device` (6), and `Read the privacy details` (4) all name the section, state, or result plainly. `Turn sound off/on` is an action, not a state label. No metaphor-only heading, jargon, marketing adjective, or non-result-naming button remains.

### README sentences

| Copy | Words | Check |
| --- | ---: | --- |
| Solve a four-specimen daily deduction grid. | 6 | Product description. |
| Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Audience and use case. |
| A round is designed for a short break. | 8 | Non-quantitative session shape. |
| The game selects one shared puzzle for each UTC date. | 10 | `daily-puzzle`. |
| All 20 daily layouts have exactly one solution. | 8 | `unique-solutions`. |
| The sample lets you solve the grid or view its explanation. | 11 | `sample-complete`. |
| Read the illustrated clue cards. | 5 | Instruction. |
| Place each specimen so every row and column contains one specimen and every relation is true. | 16 | Instruction. |
| A hint reveals one exact position and costs one score leaf. | 11 | `hint-cost`. |
| Three incorrect checks open the explanation. | 6 | `failed-checks`. |
| Use a pointer or touch to select a specimen and then a cell. | 13 | Instruction. |
| With a keyboard, use Enter or Space to select and place. | 11 | `keyboard-controls`. |
| Arrow keys move through the grid. | 6 | `keyboard-controls`. |
| Escape returns a placed specimen to the clue cards. | 9 | Keyboard instruction. |
| Your progress and puzzle choices stay in this browser. | 9 | `local-progress`, `puzzle-choices-local`. |
| The game loads no files from other websites. | 8 | `no-third-party`. |
| It works offline after the first visit. | 7 | `offline-reload`. |
| The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | `phone-60fps`. |
| The automated check uses 4× CPU throttling. | 7 | Documents the registered test profile. |
| Requirements: Node.js 20 or newer. | 5 | Development requirement. |
| Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. | 7 | Demo entry instruction. |
| The `/demo` route also opens the sample. | 7 | `demo-isolation`. |
| Demo progress and sound use `demo:riddle-grid:sample` and `demo:riddle-grid:muted`; daily keys use `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`. | 15 | `demo-isolation`. |
| Reset demo and Start for real clear both demo keys. | 10 | `demo-isolation`. |
| `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 21 | Accurate command documentation. |
| `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 13 | Verified by build. |
| Upload `dist/` to the static host. | 6 | Deployment instruction. |
| `staticwebapp.config.json` supplies route rewrites, the styled 404 response, security headers, and the content security policy. | 15 | Verified in source and live headers. |
| No backend or environment variables are required. | 7 | Repository deployment fact. |
| The privacy policy is at `/privacy`; the terms are at `/terms`. | 11 | Verified live. |
| The code is available under the MIT License. | 8 | Verified by `LICENSE`. |
| Original generated artwork provenance is recorded in `.factory/design.md`. | 7 | Verified by the design record. |

The final seven README items are developer/legal instructions or repository facts, not visitor-facing product promises. All visitor-operational claims above have a matching manifest entry. No unlisted product claim was found on the live landing page or README.

## Demo and sandbox

Clicking the root action in a fresh live context changed the URL to `/?demo=1` and immediately showed the live game: Field sheet 05, four clue cards, 16 cells, hint and check controls, and the persistent banner **“Demo — sample data, nothing is saved to your daily game.”** The banner exposes **Reset demo** and **Start for real**.

The sample was solved from that entry point. It reached **“You found the only layout”** without a payment or account control. No new request occurred while placing all four specimens and checking the result. A live isolation run seeded a daily progress sentinel and daily muted setting, then placed a demo specimen, reset, and left with Start for real. Demo use wrote only `demo:riddle-grid:*`; both demo keys were removed by Reset and exit; the daily sentinel and setting were unchanged. Restart sample returned the grid to zero filled cells.

The live request log contained only same-origin `GET` requests for the document and allowlisted static assets/service-worker precache. It had no bodies or cookies, and game interaction made zero requests. After first load, a live service-worker run reloaded `/demo` while the browser context was offline and retained the sample heading.

## Claims and quality gates

Clean clone: `/tmp/riddle-grid-review6-clean.r0N8z7`.

- `npm ci` completed with 0 vulnerabilities.
- Every one of the 17 exact commands listed in `.factory/claims.json` passed independently: `unique-solutions`, `daily-puzzle`, `sample-complete`, `demo-isolation`, `restart-reset`, `hint-cost`, `failed-checks`, `sound-setting`, `local-progress`, `keyboard-controls`, `phone-60fps`, `free-to-play`, `private-static-game`, `no-third-party`, `puzzle-choices-local`, `no-account-required`, and `offline-reload`.
- Full `npm test` passed: **32 passed (42.1 s)**.
- `npm run build` passed and produced `dist/`. Initial application JavaScript is 21.75 kB raw / 8.00 kB gzip; CSS is 16.54 kB raw / 4.56 kB gzip.

## Structure, routes, and accessibility

Live checks confirmed the following.

| Route | HTTP | Title | One h1 |
| --- | ---: | --- | --- |
| `/` | 200 | Riddle Grid — Solve a daily deduction grid | Solve one short deduction grid |
| `/?demo=1` and `/demo` | 200 | Demo — Riddle Grid | Solve the sample deduction grid |
| `/privacy` | 200 | Privacy — Riddle Grid | Privacy without an account |
| `/terms` | 200 | Terms — Riddle Grid | Terms for playing Riddle Grid |
| `/missing-review6-page` | 404 | Page not found — Riddle Grid | Page not found |

Each route has `lang="en"`, one `<main>`, a meta description, canonical URL, favicon, Apple touch icon, OG/Twitter metadata, the shared header/footer, skip link, Privacy, and Terms. The five live routes produced zero Axe violations. The one browser console message was the expected failed-resource entry for the intentionally requested HTTP 404; ordinary pages had no console errors. All root links resolved successfully (same-origin links and `https://sociobot.in/` returned 200; fragment links resolve to page anchors). `robots.txt` and `sitemap.xml` returned 200.

Live link navigation, Back, and Forward each focused the destination h1 and updated the polite route announcement. The HTTP headers on normal and 404 routes include the configured CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.

## Earlier findings rechecked

Every earlier review and polish document was read. The following confirmations use the live site plus the current source and clean-clone regression suite; none is merely a historical closure note.

| Earlier id(s) | Current confirmation |
| --- | --- |
| F-1-1 | Keyboard Enter/arrow placement is deterministic; `keyboard-controls` and the full 32-test suite pass. |
| F-1-2, F-1-4 | The sole price statement is “Free to play.” and `free-to-play` proves a complete sample needs no payment. |
| F-1-3, F-5-2 | Unsupported account/ad/chat copy remains absent; the retained no-account statement has `no-account-required`. |
| F-1-5, F-3-1, RG-V5-06 | No 3–5-minute claim returned; README uses only the non-quantitative short-break description. |
| F-1-6, F-5-1 | Request recording now verifies static GET-only loading, no bodies, cookies, external scripts, trackers, ads, or game-time requests. The independent live run confirmed it. |
| F-1-7 | Decorative “Field method” and “A small daily ritual” labels remain absent. |
| F-1-8 | Game headings remain “Today’s deduction grid” and “Sample deduction grid.” |
| F-1-9 | Link, Back, and Forward focus/announce the destination route heading live. |
| F-1-10 | The real 404 retains canonical, favicon, Apple touch, OG, Twitter, title, and description metadata. |
| F-2-1 | All four specimen labels fit on one line at 390 px; the current mobile regression and live cold view keep a grid cell visible. |
| F-2-2 | The functional section is named “Hints.” |
| F-3-2, RG-V6-01 | The shared formatter renders “1 leaf” and plural values correctly; `hint-cost` covers 4 through 0. |
| F-3-3 | Hints is a labelled section, not an invalid nested complementary landmark; live Axe is clear. |
| F-3-4 | Sound controls say “Turn sound off/on,” naming the action. |
| F-3-5 | The designed 404 headline is “Page not found.” |
| F-3-6 | “Skip to main content” is present and focuses each route h1. |
| F-3-7 | README says “loads no files from other websites,” not implementation jargon. |
| F-3-8 | Product, demo guide, and visible demo consistently identify the Field sheet 05 sample. |
| F-4-1 | Demo, How it works, and Privacy remain visible and reachable on all audited phone routes. |
| RG-V5-01 | Separate demo keys and clean exit behavior were independently rechecked live. |
| RG-V5-02, RG-V5-03 | The mobile regression suite verifies 44 px controls and at least 16 px clue/hint text. |
| RG-V5-04, RG-V5-05 | Keyboard completion focuses the result heading and one remaining attempt reads “1 check left.” |

## Findings

None. No missed leverage was identified: the brief calls for a concise, local-first daily deduction game, and the shipped hint/reveal, sample sandbox, offline use, and privacy behavior cover that job without decorative AI or an unnecessary account/sync feature.

## What would make this perfect

Nothing actionable remains within the stated brief and product contract. Maintain the existing claim tests and repeat the cold mobile, demo-isolation, privacy-request, route, and accessibility checks whenever puzzle content or routing changes.

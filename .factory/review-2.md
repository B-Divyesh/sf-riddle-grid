# Adversarial first-read review 2 — Riddle Grid

**Reviewed:** 2026-09-02  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Candidate reviewed:** `679d185e627d9280de23e52886cdbc549975a69e`  
**Verdict:** **FAIL**

Two findings remain. The game is clear and the sample is functional, but the phone's core specimen picker renders three names as broken fragments and its hint heading is a metaphor instead of a useful section name. A PASS requires zero findings.

## First 30 seconds

Fresh Chromium visits at 390 × 844 and 1440 × 900, before scrolling, answered all three required questions.

- **What it does:** “Solve one short deduction grid.”
- **For whom:** “For coffee-break players who want logic without spelling tests.”
- **What to click first:** “Try it with sample data” — “Opens a ready sample.”

The live puzzle is already on the first screen at both sizes. At 390 px the first grid row is visible and usable; at desktop the first grid row is visible. There was no horizontal overflow or console/page error on the root visit. The first-read requirement passes.

## Findings

### F-2-1 — MEDIUM — The phone specimen picker breaks essential names into fragments

**Location / quote:** live root at 390 × 844, quick specimen tray directly above the grid. The visible button labels render as `Acor` / `n`, `Berr` / `ies`, and `See` / `d pod`.

**Why this fails review:** These are the controls a player must use to place specimens. The 4-column phone layout leaves too little text width once the illustration is present, so normal names are visibly split inside the control. A first-time player can eventually infer the words, but the main interaction looks broken and is slower to scan than the clue cards. This is especially noticeable in the first phone viewport, where the picker is the route into the playable grid.

**Concrete fix:** At the 390 px layout, give the tray labels enough inline width (for example, use a three-plus-one or two-by-two tray while retaining a fully visible first grid cell), or place each icon above its full unbroken label. Keep each target at least 44 px. Add a 390 × 844 visual/layout test that asserts every quick-specimen label renders without a word-internal line break.

### F-2-2 — MINOR — “Field notes” does not name the hint section

**Location / quote:** live game-sheet heading, `Field notes`, above “No hints revealed.” and “Reveal one position”.

**Why this fails review:** “Field notes” is field-guide mood language rather than the name of this functional section. It does not tell a screen-reader or first-time player that this is where hints appear. The plain-words requirement says headings must name their section and must not rely on metaphor.

**Concrete fix:** Change the heading to **“Hints”**. Retain the useful action label “Reveal one position.”

## Copy audit

Word counts treat a hyphenated or date compound as one word. The table covers every distinct reader-facing landing text; repeated relation sentences appear twice because they are shown on both related clue cards. Control and navigation labels are included so non-result-naming buttons can be checked.

| Landing text | Words | Result |
| --- | ---: | --- |
| Skip to puzzle | 3 | Pass |
| Riddle Grid | 2 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Sound on | 2 | Pass |
| Solve one short deduction grid | 5 | Pass |
| For coffee-break players who want logic without spelling tests. | 9 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a ready sample. | 4 | Pass |
| Free to play. | 3 | Covered by `free-to-play` |
| Offline after one visit. | 4 | Covered by `offline-reload` |
| Saved in this browser. | 4 | Covered by `local-progress` |
| Four pressed plant specimens surround a blank field grid. | 9 | Pass — image alt |
| Today’s clues belong on one field grid. | 7 | Pass |
| Field sheet 19 · 2026-09-02 | 4 | Label; Pass |
| Today’s deduction grid | 3 | Pass |
| Hints show exact cells but reduce the leaf score. | 9 | Covered by `hint-cost` |
| 4 leaves | 2 | State; Pass |
| Rule 1 / Rule 2 | 2 each | Labels; Pass |
| One specimen in each row | 5 | Rule; Pass |
| One specimen in each column | 6 | Rule; Pass |
| Fern / Acorn / Berries / Seed pod | 1 / 1 / 1 / 2 | Specimen labels; F-2-1 at 390 px |
| Clue cards | 2 | Pass |
| Acorn is above Fern. | 4 | Rule; Pass (shown twice) |
| Fern is above Berries. | 4 | Rule; Pass (shown twice) |
| Berries is above Seed pod. | 5 | Rule; Pass (shown twice) |
| Berries is left of Seed pod. | 6 | Rule; Pass (shown twice) |
| Seed pod is left of Fern. | 6 | Rule; Pass (shown twice) |
| Fern is left of Acorn. | 5 | Rule; Pass (shown twice) |
| Place | 1 | State label; Pass |
| Field notes | 2 | F-2-2 |
| No hints revealed. | 3 | Pass |
| Reveal one position | 3 | Pass — result-naming action |
| −1 leaf | 2 | Cost label; Covered by `hint-cost` |
| Select a clue card, then choose a grid cell. | 9 | Pass |
| Clear layout | 2 | Pass — result-naming action |
| Check layout | 2 | Pass — result-naming action |
| How the grid works | 4 | Pass |
| Read the clue cards. | 4 | Pass |
| Above and left describe each pair. | 6 | Pass |
| Place four specimens. | 3 | Pass |
| Use each row and column once. | 6 | Pass |
| Check the layout. | 3 | Pass |
| See the solved grid and its explanation. | 7 | Pass |
| The game stays on your device | 6 | Covered by local/privacy claims |
| Your layout and sound setting use browser storage. | 8 | Covered by `local-progress` and `sound-setting` |
| The game sends no personal data. | 6 | Covered by `no-third-party` |
| Read the privacy details | 4 | Pass — result-naming link |
| Riddle Grid is a daily deduction game. | 7 | Covered by `daily-puzzle` |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Attribution; Pass |
| Original generated field-desk art · v1.0.0 | 5 | Provenance; Pass |

No landing sentence exceeds 22 words. Apart from F-2-2, the landing uses consistent terms: *specimen*, *clue card*, *grid*, *hint*, *layout*, and *sample*. The primary and game action labels are result-naming verbs.

README sentences and instructions:

| README text | Words | Result |
| --- | ---: | --- |
| Solve a four-specimen daily deduction grid. | 6 | Pass |
| Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Pass |
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
| The game sends no personal data and loads no third-party runtime resources. | 13 | Covered by `no-third-party` |
| It works offline after the first visit. | 7 | Covered by `offline-reload` |
| The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | Covered by `phone-60fps` |
| The automated check uses 4× CPU throttling. | 7 | Covered by `phone-60fps` |
| Requirements: Node.js 20 or newer. | 5 | Development instruction; Pass |
| Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. | 7 | Development instruction; Pass |
| Demo progress uses `demo:riddle-grid:sample`; daily progress uses `riddle-grid:daily:<UTC date>`. | 8 | Technical instruction; Pass |
| `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 21 | Verified; Pass |
| `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 15 | Verified; Pass |
| Upload `dist/` to the static host. | 7 | Deployment instruction; Pass |
| `staticwebapp.config.json` supplies SPA fallback, the styled 404 response, security headers, and the content security policy. | 15 | Verified; Pass |
| No backend or environment variables are required. | 7 | Verified; Pass |
| The privacy policy is at `/privacy`; the terms are at `/terms`. | 11 | Verified; Pass |
| The code is available under the MIT License. | 8 | Verified; Pass |
| Original generated artwork provenance is recorded in `.factory/design.md`. | 8 | Verified; Pass |

No README sentence exceeds 22 words or uses a banned marketing adjective. No unlisted claim was found in the landing or README: each visitor-reliance statement maps to a listed claim above or is a directly observable instruction/rule.

## Demo and sandbox

The first-screen action opens `/?demo=1` in one click. The initial demo screen already shows the complete playable sample, its four realistic plant specimens, rules, clue cards, 4×4 grid, and controls. The persistent banner reads “Demo — sample data, nothing is saved to your daily game.” It includes **Reset demo** and **Start for real**.

In a fresh live phone context, I seeded a daily key, entered the sample, placed Fern, reset the demo, and left for the daily game. The daily value remained byte-for-byte unchanged; only `demo:riddle-grid:sample` was created and Reset demo removed it. Start for real also removed the demo value. After service-worker control, the live `/demo` reloaded offline successfully. The whole recorded flow requested only `https://riddle-grid.sociobot.in` and produced no console or page errors.

No AI, import/export, or sync feature is implied by the brief's deliberately short, local-first daily puzzle. No decorative AI feature or embedded provider key was found.

## Claims and quality gates

I made a separate clean clone at the reviewed commit, ran `npm ci`, then ran every exact command declared in `.factory/claims.json`. All 15 claim commands passed:

`unique-solutions`, `daily-puzzle`, `sample-complete`, `demo-isolation`, `restart-reset`, `hint-cost`, `failed-checks`, `sound-setting`, `local-progress`, `keyboard-controls`, `phone-60fps`, `free-to-play`, `private-static-game`, `no-third-party`, and `offline-reload`.

The clean clone also passed `npm test` (**23/23**, 22.9 s) and `npm run build`. The build created `dist/`; its application JavaScript is 21.19 kB (7.82 kB gzip) and CSS is 15.95 kB (4.48 kB gzip).

## History check

I read `.factory/review-1.md`, `.factory/polish-1.md`, all `.factory/verification*.md`, and the previous handoff. Each earlier review finding is fixed live and in the current code:

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 keyboard suite flake | Clean full suite passed 23/23; the declared keyboard claim passed. |
| F-1-2 / F-1-4 free-access claims | “Free to play.” is the sole price copy and is covered by `free-to-play`; the old footer/terms free text is absent. |
| F-1-3 no-account/ads/chat copy | The unsupported landing sentence is absent. |
| F-1-5 time estimate | The 3–5 minute copy is absent from README. |
| F-1-6 privacy claim coverage | `private-static-game` is listed and passed; live demo request log was same-origin and cookie-free. |
| F-1-7 decorative landing labels | “Field method / 03 steps” and “A small daily ritual” are absent. |
| F-1-8 unclear daily title | The visible title is “Today’s deduction grid.” |
| F-1-9 Back/Forward focus | Live `/demo` → `/privacy` → Back/Forward focuses the destination h1 and updates the route announcement. |
| F-1-10 404 metadata | `404.html` has Apple touch, Open Graph, and Twitter metadata; an unknown live route returns HTTP 404. |

The later focus-contrast, 44 px target, 200% text-resize, immutable-cache, and real-404 repair checks are present in the current 23-test suite and passed. F-2-1 is a remaining normal-size phone layout issue, not a regression of the 200% resize assertion.

## Structure and routing

`/`, `/demo`, `/privacy`, and `/terms` returned 200 with route-specific plain titles, description, canonical, Open Graph title, one h1, one main, consistent header/footer, Privacy and Terms links, and no console errors. The designed unknown route returned 404, gave a route-specific title and h1, and offers a return action. Root, demo, privacy, terms, robots, sitemap, icons, assets, and the external Param Factory link resolved successfully. The 404 navigation's normal browser “resource responded 404” message was the only observed console error on that intentionally missing route.

Back/Forward focus and the polite route announcement worked. The botanical field-notebook surface is distinct from a generic SaaS template: paper and ink palette, ruled puzzle sheet, original field desk art, and illustrated specimens all match `.factory/design.md`. F-2-2 is nevertheless a copy issue within that visual system.

## What would make this perfect

At 390 px, render every specimen name as a normal unbroken word in the picker, and rename the hint panel to “Hints.” Then repeat the cold-phone capture, demo isolation check, all listed claims, full suite, and build. With those two findings closed, the reviewed scope has no other observed gap.

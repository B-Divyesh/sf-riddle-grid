# Adversarial first-read review 4 — Riddle Grid

**Reviewed:** 2026-09-02 UTC  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Candidate:** `5f774269a7827a8d2eadf2a44e9b5cf0047a4132`  
**Verdict:** **FAIL**

One mobile navigation finding remains. The first screen, demo, claims, game loop, privacy boundary, and quality gates otherwise verify. A PASS requires no findings.

## First 30 seconds

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900, with no stored state and before scrolling.

- **What it does:** “Solve one short deduction grid.” It is a four-specimen logic-placement game.
- **For whom:** “For coffee-break players who want logic without spelling tests.”
- **What to click first:** “Try it with sample data,” followed by “Opens a ready sample.”

The daily puzzle is visible and operable in the initial viewport at both sizes. At 390 px, the first grid cell ends at 751.23 px and the first specimen control ends at 578.22 px. There was no horizontal overflow or console/page error. The first-read gate passes.

## Findings

### F-4-1 — MEDIUM — The phone header removes all navigation without a replacement

**Location / evidence:** live root, demo, Privacy, and Terms at 390 × 844. The visible header contains only the **Riddle Grid** home link and **Turn sound off**. It does not contain the desktop links **Demo**, **How it works**, or **Privacy**. Source: `src/style.css:178`, `.site-header nav { display: none; }` under `@media (max-width: 700px)`.

**Why this fails review:** The required shared header is the route-level way to reach Demo, the product section, and Privacy. A phone visitor on `/privacy` or `/terms` must return home and scroll to the footer to reach Demo or Privacy; the navigation disappears rather than adapting. This does not make the first landing action unclear, but it fails the required consistent site skeleton for the primary mobile audience.

**Concrete fix:** Keep the three route links available below 700 px, either as a compact visible nav or an accessible **Open navigation menu** control that exposes Demo, How it works, and Privacy. The menu must have 44 px targets, keyboard open/close behavior, focus management, and a regression test at 390 px that confirms each route is reachable from the header.

## Copy audit

Counts treat hyphenated words and `4×4` as one word. Relation sentences are listed once with their visible repetition noted. No audited sentence exceeds 22 words, uses a banned marketing adjective, or uses inconsistent core terms. Controls are separately checked for result-naming labels.

### Landing-page sentences

| Text | Words | Result |
| --- | ---: | --- |
| Solve one short deduction grid | 5 | Pass |
| For coffee-break players who want logic without spelling tests. | 9 | Pass |
| Opens a ready sample. | 4 | Pass |
| Free to play. | 3 | `free-to-play` |
| Offline after one visit. | 4 | `offline-reload` |
| Saved in this browser. | 4 | `local-progress` |
| Four pressed plant specimens surround a blank field grid. | 9 | Useful image alternative |
| Today’s clues belong on one field grid. | 7 | Pass; explains the single grid |
| Hints show exact cells but reduce the leaf score. | 9 | `hint-cost` |
| One specimen in each row | 5 | Game rule |
| One specimen in each column | 5 | Game rule |
| Acorn is above Fern. | 4 | Game clue; repeated on related cards |
| Fern is above Berries. | 4 | Game clue; repeated on related cards |
| Berries is above Seed pod. | 5 | Game clue; repeated on related cards |
| Berries is left of Seed pod. | 6 | Game clue; repeated on related cards |
| Seed pod is left of Fern. | 6 | Game clue; repeated on related cards |
| Fern is left of Acorn. | 5 | Game clue; repeated on related cards |
| No hints revealed. | 3 | Accurate empty state |
| Select a clue card, then choose a grid cell. | 9 | Pass |
| Read the clue cards. | 4 | Pass |
| Above and left describe each pair. | 6 | Pass |
| Place four specimens. | 3 | Pass |
| Use each row and column once. | 6 | Pass |
| Check the layout. | 3 | Pass |
| See the solved grid and its explanation. | 7 | Pass |
| Your layout and sound setting use browser storage. | 8 | `local-progress`, `sound-setting` |
| The game sends no personal data. | 6 | `no-third-party` |
| Riddle Grid is a daily deduction game. | 7 | `daily-puzzle` |

The non-sentence labels are clear: **Try it with sample data**, **Reveal one position**, **Clear layout**, **Check layout**, **Turn sound off**, **Read the privacy details**, **Demo**, **How it works**, **Privacy**, and **Terms**. The interactive labels name outcomes or destinations. **Place** is a card-state label; its accessible button name says the specimen and “Select specimen.”

### README sentences

| Text | Words | Result |
| --- | ---: | --- |
| Solve a four-specimen daily deduction grid. | 6 | Pass |
| Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Pass |
| A round is designed for a short break. | 9 | Design intent, not a duration claim |
| The game selects one shared puzzle for each UTC date. | 10 | `daily-puzzle` |
| All 20 daily layouts have exactly one solution. | 8 | `unique-solutions` |
| The bundled sample reaches the same complete solve and explanation flow. | 11 | `sample-complete` |
| Read the illustrated clue cards. | 5 | Pass |
| Place each specimen so every row and column contains one specimen and every relation is true. | 16 | Pass |
| A hint reveals one exact position and costs one score leaf. | 11 | `hint-cost` |
| Three incorrect checks open the explanation. | 6 | `failed-checks` |
| Use a pointer or touch to select a specimen and then a cell. | 13 | Pass |
| With a keyboard, use Enter or Space to select and place. | 11 | `keyboard-controls` |
| Arrow keys move through the grid. | 6 | `keyboard-controls` |
| Escape returns a placed specimen to the clue cards. | 9 | `keyboard-controls` |
| Progress stays in this browser. | 5 | `local-progress` |
| The game sends no personal data and loads no files from other websites. | 13 | `no-third-party` |
| It works offline after the first visit. | 7 | `offline-reload` |
| The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | `phone-60fps` |
| The automated check uses 4× CPU throttling. | 7 | `phone-60fps` |
| Requirements: Node.js 20 or newer. | 5 | Development requirement |
| Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. | 7 | Development instruction |
| The `/demo` route also opens the sample. | 7 | `demo-isolation` |
| Demo progress and sound use `demo:riddle-grid:sample` and `demo:riddle-grid:muted`; daily keys use `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`. | 14 | Technical documentation |
| Reset demo and Start for real clear both demo keys. | 10 | `demo-isolation` |
| `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 21 | Verified |
| `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 15 | Verified |
| Upload `dist/` to the static host. | 6 | Deployment instruction |
| `staticwebapp.config.json` supplies route rewrites, the styled 404 response, security headers, and the content security policy. | 15 | Verified |
| No backend or environment variables are required. | 7 | Verified static deployment instruction |
| The privacy policy is at `/privacy`; the terms are at `/terms`. | 11 | Route documentation |
| The code is available under the MIT License. | 8 | Verified |
| Original generated artwork provenance is recorded in `.factory/design.md`. | 8 | Verified |

## Demo and sandbox

The root action entered `/?demo=1` in one click. The first demo screen already showed the fixed sample grid, specimen controls, clue cards, hints, and check controls. The persistent banner read **“Demo — sample data, nothing is saved to your daily game.”** and supplied **Reset demo** and **Start for real**.

Fresh live verification seeded daily progress and sound, changed demo sound and progress, then used Reset demo and Start for real. Only `demo:riddle-grid:sample` and `demo:riddle-grid:muted` were removed; the seeded daily keys remained unchanged. The sample solved to **“You found the only layout”** and **Restart sample** cleared it. A live request log for the complete demo flow contained only `https://riddle-grid.sociobot.in`; `document.cookie` was empty. The service worker then reloaded `/demo` offline after its first visit.

The brief does not imply an AI action, import/export, or sync feature. This local four-clue daily game has no missed-leverage finding.

## Claims and quality gates

A clean clone was installed at `/tmp/riddle-grid-review-4.hXt5pr`. Every exact command in `.factory/claims.json` passed individually: `unique-solutions`, `daily-puzzle`, `sample-complete`, `demo-isolation`, `restart-reset`, `hint-cost`, `failed-checks`, `sound-setting`, `local-progress`, `keyboard-controls`, `phone-60fps`, `free-to-play`, `private-static-game`, `no-third-party`, and `offline-reload`.

The full clean-clone `npm test` passed all 29 tests. `npm run build` passed and produced `dist/` with 21.60 kB JavaScript (7.95 kB gzip) and 16.10 kB CSS (4.48 kB gzip). No landing or README capability, price, privacy, or performance promise is unlisted in `claims.json`.

## Earlier findings and history

Every earlier review, polish report, verification report, and handoff was read and rechecked against current source and the live site.

| Earlier finding | Current result |
| --- | --- |
| F-1-1 keyboard suite flake | Fixed: isolated claim and full 29-test suite pass. |
| F-1-2 / F-1-4 free-access copy | Fixed: one tested `free-to-play` statement remains. |
| F-1-3 unsupported account/ads/chat copy | Fixed: the unsupported sentence remains absent. |
| F-1-5 / F-3-1 numeric 3–5-minute duration | Fixed: the numeric promise is absent. |
| F-1-6 privacy coverage | Fixed: cookie, request, script, and prohibited-control checks pass. |
| F-1-7 decorative landing labels | Fixed: the old labels remain absent. |
| F-1-8 unclear puzzle heading | Fixed: live heading is “Today’s deduction grid.” |
| F-1-9 Back/Forward focus | Fixed: live Back/Forward focuses and announces the destination h1. |
| F-1-10 404 metadata | Fixed: the real 404 has icon, Apple touch, canonical, Open Graph, and Twitter metadata. |
| F-2-1 phone specimen fragments | Fixed: all four labels fit on one line at 390 px and at 200% text. |
| F-2-2 unclear hint heading | Fixed: the heading is “Hints.” |
| F-3-2 / RG-V6-01 singular leaf | Fixed: the score shows “1 leaf.” |
| F-3-3 through F-3-8 and RG-V5-01 through RG-V5-06 | Fixed: current live checks confirm landmark, sound, 404, skip-link, demo-name, demo-isolation, target-size, text-size, focus, and grammar repairs. |

F-4-1 is new; it was not covered by a prior review because it concerns the now-current mobile header presentation.

## Structure, links, accessibility, and identity

Root, demo, Privacy, Terms, and an unknown route were freshly checked. The normal routes returned 200; the unknown route returned the designed 404 with HTTP 404. Each route has its expected title, one h1, one main, `lang="en"`, meta description, canonical URL, social metadata, favicon, consistent footer, and legal links. `robots.txt`, `sitemap.xml`, art, favicon, internal routes, the in-page anchor, and the Param Factory external link resolve. `verify-url.sh` reported no console/page errors on root, demo, Privacy, or Terms. Fresh Axe scans reported zero violations on root, demo, Privacy, Terms, and 404.

The site retains its product-specific botanical field-notebook identity: ruled paper, restrained botanical art, specimen geometry, dark-green ink, berry selection state, and a live grid rather than a generic card-template landing page. F-4-1 is the remaining site-skeleton failure.

## What would make this perfect

Add an accessible mobile header navigation that retains Demo, How it works, and Privacy at 390 px, test it in the browser, then repeat this full review from a clean clone and fresh live contexts.

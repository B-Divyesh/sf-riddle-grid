# Adversarial first-read review 5 — Riddle Grid

**Reviewed:** 2026-09-02 UTC  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verdict:** **FAIL**

## First 30 seconds

Fresh Chromium contexts were opened at 390 × 844 and 1440 × 900 before scrolling.

- **What it does:** solve one short logic/deduction grid by placing four illustrated specimens.
- **For whom:** coffee-break players who want logic instead of spelling.
- **What to click first:** **Try it with sample data**; the adjacent text says it opens a ready sample.

This is clear from the first screen at both sizes. On the phone, the first specimen control ended at 623.22 px and the first grid cell at 799.06 px in the 844 px viewport. The opening game board is visible and operable; no horizontal overflow occurred. This part passes.

The visual system is distinct rather than a generic SaaS template: the warm field-paper surface, botanical specimen art, ruled grid, dark-green ink, and editorial serif type directly support the deduction-grid theme.

## Findings

### F-5-1 — BLOCKING — Privacy claims have passing tests that do not prove the claimed result

**Locations / quotes:**

- `/privacy`: “No puzzle choices or personal details leave your device. The site uses no analytics, ads, cookies, or third-party scripts.”
- `README.md:16`: “The game sends no personal data and loads no files from other websites.”
- `.factory/claims.json`: `no-third-party` and `private-static-game`.

**Evidence:** Both exact claim commands passed from a clean clone. Their Playwright tests record only a set of request **origins** and accept every same-origin request. `no-third-party` therefore passes if an interaction posts a puzzle choice to `https://riddle-grid.sociobot.in/collect`; `private-static-game` likewise passes if same-origin analytics runs without one of its scanned selector names. Neither test asserts request method, request body, query payload, or a static-asset allowlist.

**Why this fails review:** These are privacy statements a visitor can rely on. The claims contract requires an observable sandbox assertion for the promise, not merely an origin check. “No puzzle choices … leave your device” is also more specific than the registered `no-third-party` claim. The current browser log confirms only that requests remain on the product origin, not that player data is never sent.

**Concrete fix:** Split or narrow the claims and make the demo privacy test assert the promised behavior. During a full clean demo run, record every request and assert that all are `GET` requests for an explicit static-file allowlist, with no body and no player data in the URL; retain the empty-cookie assertion. Add an explicit entry for “Puzzle choices stay in this browser” if that sentence remains. If same-origin collection is intentionally allowed, state it plainly instead of saying data stays on the device.

### F-5-2 — HIGH — “Without an account” is an unlisted claim

**Location / quote:** `/privacy` h1: “Privacy without an account”.

**Why this fails review:** This promises that an account is not needed, but no `.factory/claims.json` entry states or tests that promise. `private-static-game` names tracking, ads, cookies, and third-party scripts; it does not name accounts. A first-time visitor can reasonably rely on the heading when deciding whether to try the game.

**Concrete fix:** Either change the heading to **“Privacy”** (or another heading that does not make the account promise), or add a `no-account-required` claim. Its clean demo test should complete the sample without a sign-in, registration, account, or payment path and verify no account controls are rendered.

### F-5-3 — MINOR — README uses vague product jargon for the sample outcome

**Location / quote:** `README.md:5`: “The bundled sample reaches the same complete solve and explanation flow.”

**Why this fails review:** “Bundled” and “flow” are implementation/product jargon. The sentence does not plainly say what a reader can do in the sample.

**Concrete fix:** Replace it with: **“The sample lets you solve the grid or view its explanation.”** The existing `sample-complete` coverage can be expanded to check both stated outcomes.

## Copy audit

Word counts treat hyphenated terms and specimen names as one word. Labels, headings, dates, and button names that are not sentences are listed separately after the tables. No reviewed sentence exceeds 22 words. F-5-3 is the sole plain-language flag; F-5-1 and F-5-2 are claim flags.

### Landing page sentences

| Location | Sentence | Words | Result |
| --- | --- | ---: | --- |
| Hero | For coffee-break players who want logic without spelling tests. | 9 | Pass |
| Hero action | Opens a ready sample. | 4 | Pass |
| Facts | Free to play. | 3 | Registered: `free-to-play` |
| Facts | Offline after one visit. | 4 | Registered: `offline-reload` |
| Facts | Saved in this browser. | 4 | Registered: `local-progress` |
| Hero art | Today’s clues belong on one field grid. | 7 | Pass |
| Game note | Hints show exact cells but reduce the leaf score. | 9 | Registered: `hint-cost` |
| Rule 1 | One specimen in each row. | 5 | Pass |
| Rule 2 | One specimen in each column. | 5 | Pass |
| Fern clue card | Acorn is above Fern. Fern is above Berries. Seed pod is left of Fern. Fern is left of Acorn. | 4 / 4 / 6 / 5 | Pass; playable clue text |
| Acorn clue card | Acorn is above Fern. Fern is left of Acorn. | 4 / 5 | Pass; playable clue text |
| Berries clue card | Fern is above Berries. Berries is above Seed pod. Berries is left of Seed pod. | 4 / 5 / 6 | Pass; playable clue text |
| Seed pod clue card | Berries is above Seed pod. Berries is left of Seed pod. Seed pod is left of Fern. | 5 / 6 / 6 | Pass; playable clue text |
| Hints | No hints revealed. | 3 | Pass |
| Game status | Select a clue card, then choose a grid cell. | 9 | Pass |
| How it works | Read the clue cards. | 4 | Pass |
| How it works | Above and left describe each pair. | 6 | Pass |
| How it works | Place four specimens. | 3 | Pass |
| How it works | Use each row and column once. | 6 | Pass |
| How it works | Check the layout. | 3 | Pass |
| How it works | See the solved grid and its explanation. | 7 | Pass |
| Privacy section | Your layout and sound setting use browser storage. | 8 | Registered: `local-progress`, `sound-setting` |
| Privacy section | The game sends no personal data. | 6 | Blocked by F-5-1 |
| Footer | Riddle Grid is a daily deduction game. | 7 | Registered: `daily-puzzle` |
| Footer | Original generated field-desk art · v1.0.0 | 5 | Asset provenance; not a sentence claim |

Non-sentence landing text was also checked: **Solve one short deduction grid**, **Today’s deduction grid**, **How the grid works**, **The game stays on your device**, **Clue cards**, **Hints**, **Try it with sample data**, **Reveal one position**, **Clear layout**, **Check layout**, **Read the privacy details**, **Turn sound off**, and the header/footer links. The action labels name their results; headings name their sections; there are no mood slogans or buttons labeled “Go”, “Submit”, or “Continue”.

### README sentences

| Line | Sentence | Words | Result |
| --- | --- | ---: | --- |
| 3 | Solve a four-specimen daily deduction grid. | 6 | Pass |
| 3 | Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. | 14 | Pass |
| 3 | A round is designed for a short break. | 8 | Pass |
| 5 | The game selects one shared puzzle for each UTC date. | 10 | Registered: `daily-puzzle` |
| 5 | All 20 daily layouts have exactly one solution. | 8 | Registered: `unique-solutions` |
| 5 | The bundled sample reaches the same complete solve and explanation flow. | 11 | **F-5-3** |
| 12 | Read the illustrated clue cards. | 4 | Pass |
| 12 | Place each specimen so every row and column contains one specimen and every relation is true. | 16 | Pass |
| 12 | A hint reveals one exact position and costs one score leaf. | 11 | Registered: `hint-cost` |
| 12 | Three incorrect checks open the explanation. | 6 | Registered: `failed-checks` |
| 14 | Use a pointer or touch to select a specimen and then a cell. | 13 | Pass |
| 14 | With a keyboard, use Enter or Space to select and place. | 11 | Registered: `keyboard-controls` |
| 14 | Arrow keys move through the grid. | 6 | Registered: `keyboard-controls` |
| 14 | Escape returns a placed specimen to the clue cards. | 9 | Registered: `keyboard-controls` |
| 16 | Progress stays in this browser. | 5 | Registered: `local-progress` |
| 16 | The game sends no personal data and loads no files from other websites. | 13 | **F-5-1** |
| 16 | It works offline after the first visit. | 7 | Registered: `offline-reload` |
| 18 | The game runs at 60 frames per second on the 390×844 mid-range phone test profile. | 15 | Registered: `phone-60fps` |
| 18 | The automated check uses 4× CPU throttling. | 7 | Context for the registered performance test |
| 22 | Requirements: Node.js 20 or newer. | 5 | Developer instruction |
| 29 | Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. | 8 | Developer instruction |
| 29 | The `/demo` route also opens the sample. | 7 | Pass |
| 29 | Demo progress and sound use `demo:riddle-grid:sample` and `demo:riddle-grid:muted`; daily keys use `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`. | 16 | Developer instruction; demo behavior registered by `demo-isolation` |
| 29 | Reset demo and Start for real clear both demo keys. | 10 | Registered: `demo-isolation` |
| 38 | `npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. | 18 | Developer instruction |
| 38 | `npm run build` writes the static deploy to `dist/`, with `index.html` at its root. | 14 | Developer instruction |
| 42 | Upload `dist/` to the static host. | 7 | Developer instruction |
| 42 | `staticwebapp.config.json` supplies route rewrites, the styled 404 response, security headers, and the content security policy. | 15 | Developer instruction |
| 42 | No backend or environment variables are required. | 7 | Developer instruction; confirmed by build and source inspection |
| 46 | The privacy policy is at `/privacy`; the terms are at `/terms`. | 14 | Pass |
| 46 | The code is available under the MIT License. | 9 | Pass |
| 46 | Original generated artwork provenance is recorded in `.factory/design.md`. | 9 | Pass |

The README’s labels/commands/URLs (**Live site**, **One-click demo**, headings, `npm install`, `npm run dev`, `npm test`, and `npm run build`) are not sentences. They are clear developer navigation and commands.

## Demo and sandbox

The first-screen action entered `/?demo=1` in one click. The 390 px demo showed the real four-specimen sample game immediately, with the persistent **Demo — sample data, nothing is saved to your daily game** banner, **Reset demo**, and **Start for real**. A fresh scripted run solved the sample, opened the explanation after three incorrect checks, restarted it, and verified that reset/exit remove only `demo:` keys while retaining seeded daily keys. The exact `demo-isolation`, `restart-reset`, `sample-complete`, and `failed-checks` tests passed.

The live request log contained only `https://riddle-grid.sociobot.in`, cookies were empty, and offline reload passed after service-worker activation. This is useful evidence, but it does not close F-5-1 because the assertion is origin-only.

## Claims and quality checks

A clean clone at `a75100eedabe1ed1da159270aec0b3a5661fe98d` was installed with `npm ci`. `npm run build` passed and produced `dist/` (21.70 kB JS raw / 7.97 kB gzip; 16.54 kB CSS raw / 4.56 kB gzip). The full `npm test` suite passed 30/30.

Every exact command in `.factory/claims.json` was run separately from that clone and passed:

| Claim id | Result |
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
| `private-static-game` | PASS, but insufficient for F-5-1 |
| `no-third-party` | PASS, but insufficient for F-5-1 |
| `offline-reload` | PASS |

## Earlier findings rechecked

Each earlier review, polish record, verification record, demo guide, and handoff was read. The following closures were independently confirmed on the current live site and current code; none regressed.

| Earlier id | Current confirmation |
| --- | --- |
| F-1-1 | Keyboard select, arrows, Enter placement, and replacement focus pass `keyboard-controls` and the full suite. |
| F-1-2 | The sole free-price line is covered by the successful `free-to-play` sample completion. |
| F-1-3 | The former landing no-account/ads/chat/submission sentence remains absent. F-5-2 is a separate privacy-heading claim. |
| F-1-4 | Repeated free-price wording remains absent from the footer and Terms. |
| F-1-5 | The unsupported 3–5 minute estimate remains absent. |
| F-1-6 | Cookies were empty and live requests were same-origin; F-5-1 records the remaining proof gap. |
| F-1-7 | “Field method / 03 steps” and “A small daily ritual” remain absent. |
| F-1-8 | Current game headings are “Today’s deduction grid” and “Sample deduction grid.” |
| F-1-9 | Link navigation and Back/Forward focus and announce the destination h1. |
| F-1-10 | The live HTTP 404 has the expected title, h1, favicon, Apple touch, canonical, OG, and Twitter metadata. |
| F-2-1 | All phone specimen names fit at 390 px and 200% text without overflow. |
| F-2-2 | The functional section heading is “Hints.” |
| F-3-1 | README still uses the non-quantitative short-break description. |
| F-3-2 / RG-V6-01 | Score grammar reads “1 leaf”; no “1 leaves” instance appeared after the third hint. |
| F-3-3 | Hints is a labelled section; live Axe reported zero violations. |
| F-3-4 | Sound buttons name the action: “Turn sound off/on.” |
| F-3-5 | The designed live 404 h1 is “Page not found.” |
| F-3-6 | “Skip to main content” is present and focuses the route h1. |
| F-3-7 | README uses the plain wording “loads no files from other websites.” |
| F-3-8 | The code, page, and demo guide agree on the Field sheet 05 sample. |
| F-4-1 | Demo, How it works, and Privacy stay visible, focusable, 44 px high, and un-clipped on all four mobile routes. |
| RG-V5-01 | Demo progress and sound use separate `demo:` keys; reset and exits retain daily keys. |
| RG-V5-02 | Visible mobile controls, including the privacy-detail link, met the 44 px target baseline. |
| RG-V5-03 | Clue and hint copy computed at 16 px or more. |
| RG-V5-04 | Keyboard completion moves focus to the focusable result heading. |
| RG-V5-05 | The second failure says “1 check left.” |
| RG-V5-06 | No unsupported duration was restored to the README. |

## Structure and routes

Live `/`, `/?demo=1`, `/privacy`, and `/terms` returned 200 with route-specific titles, one h1, one main landmark, descriptions, canonical URLs, header/footer, Privacy/Terms links, and no Axe violations. A live unknown URL returned the designed HTTP 404 with 404 metadata and a return action. The link crawl returned 200 for all internal destinations and the Param Factory external link. `robots.txt`, sitemap, favicon, Apple touch icon, Open Graph image, CSP, referrer policy, immutable hashed assets, and no-cache service worker were present. No console errors occurred. The demo and root passed reduced-motion, 200% text, focus, mobile-width, keyboard, and offline checks.

No missed AI, import/export, or sync feature was found: the brief is deliberately a hand-authored, finite, private daily puzzle. An AI-assisted step would not improve the stated job and would introduce unnecessary collection and complexity.

## What would make this perfect

Make the privacy proof as strong as the privacy copy: test that a played demo performs only allowlisted static GETs with no input payload, register or remove the no-account heading promise, and replace the README’s vague sample “flow” wording. Then rerun every exact claim command, the full suite, and the live request audit from a fresh browser context.

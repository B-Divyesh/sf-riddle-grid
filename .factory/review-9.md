# Solve one short deduction grid — strict review 9

**Verdict: FAIL**

**Findings: 1** (critical 0, high 1, medium 0, low 0)

**Untested public claims: 3**

## Scope

- Live URL: <https://riddle-grid.sociobot.in>
- Implementation reviewed: `1db89f65321e9b71fbb4c2fdab06156eb62cf19b`
- Documentation baseline reviewed: `51d877e8c3044528beee52f4305aefb7a06e4324`
- Reviewed: 2026-09-06 UTC
- Browser: Chromium 145 through Playwright 1.58.2

The commits after `1db89f6` change reports, evidence, the handoff, and an audit script. They do not change the shipped runtime. A fresh build matches the live `index.html`, `404.html`, JavaScript, CSS, and service worker byte-for-byte.

The work order also names `/work/factory-evidence/riddle-grid-verify-10/qa-report.md`. That path is not mounted in this worker, and a search under `/work` found no `riddle-grid-verify-10` directory. The full repository copy, `.factory/verification-10.md`, was read. This missing external copy is an evidence-source limitation, not a product finding; the review below was repeated independently.

## Job, audience, and first action

Fresh 1440 × 900 desktop and 390 × 844 phone contexts opened the live root before scrolling.

- Job: **Solve one short deduction grid.**
- Audience: **For coffee-break players who want logic without spelling tests.**
- First action: **Try it with sample data — Opens a ready sample.**

The live game starts at 382.69 px on desktop and 390.16 px on phone. The first cell ends at 796.34 px and 797.56 px respectively, so the game is visible and usable in both first screens. Neither viewport has horizontal overflow.

## Finding

### F-9-1 — HIGH — advertised touch, Space, and Escape controls lack claim tests

**Public copy:** `README.md` says: “Use a pointer or touch to select a specimen and then a cell. With a keyboard, use Enter or Space to select and place. Arrow keys move through the grid. Escape returns a placed specimen to the clue cards.”

**Declared coverage:** `.factory/claims.json` has `keyboard-controls`, but its sandbox and tagged test exercise only Enter, two ArrowRight presses, and Enter. No test under `tests/` contains `Space`, `Escape`, `touchscreen`, or `hasTouch`. There is no declared touch-control claim.

Three public behaviors therefore remain untested by a claim command:

1. Touch selects a specimen and a cell.
2. Space selects and places a specimen.
3. Escape returns a placed specimen to the clue cards.

Fresh live checks confirmed that all three behaviors currently work. The phone end-to-end run used `touchscreen.tap`; a separate keyboard run used Space to place Fern at row 1, column 3 and Escape to return it. The defect is incomplete repeatable claim coverage, not a broken control.

**Why this fails:** The supplied claims contract requires every public capability statement to have an exact tagged sandbox test. It also says an incomplete or untested public claim is a finding. Manual review evidence does not run on every build.

**Required repair:** Add a declared pointer/touch-controls claim with a real touch-enabled Playwright context, and expand `@claim:keyboard-controls` to assert Space selection/placement and Escape return. Alternatively, remove the untested control wording. Then rerun every exact claim command and the full suite.

## Complete live game runs

The root action opened the fixed Field sheet 05 sample in one click. The persistent label remained **“Demo — sample data, nothing is saved to your daily game”** with **Reset demo** and **Start for real**.

- Desktop keyboard win: Enter and arrows placed Fern R1C3, Acorn R4C2, Berries R3C4, and Seed pod R2C1. **Check layout** reached **“You found the only layout”** with **“Score: 4 of 4 leaves.”** Focus moved to the result heading. **Restart sample** cleared all cells.
- Phone touch loss: touch input placed an invalid complete row. Three checks reached **“Here is the only layout”** and the populated explanation, including **Fern — row 1, column 3**. **Restart sample** cleared all cells.
- Invalid and boundary behavior: an incomplete board kept **Check layout** disabled. Four hints produced 4, 3, 2, 1, then 0 leaves; a fifth hint was disabled.
- Recovery and settings: progress and sound survived reload. **Start for real** removed both demo keys. A seeded daily progress value and daily sound value remained unchanged after demo play and **Reset demo**.
- Privacy: both complete live runs added zero gameplay requests and set zero cookies. A separate save/reload flow contained only same-origin GET requests without bodies.

Screenshots and structured results are in `/work/.evidence/review-9/`, including `desktop-cold-root.png`, `phone-cold-root.png`, `desktop-win.png`, `phone-explained.png`, and `live-run.json`.

## Declared claims and clean commands

The documented prerequisite is Node.js 20 or newer. The review used Node.js 22.23.2 and installed the locked dependencies with `npm ci`; 23 packages installed with 0 vulnerabilities.

Every exact command in `.factory/claims.json` was run separately:

| Claim | Command result | Coverage review |
| --- | --- | --- |
| `unique-solutions` | PASS | Complete |
| `daily-puzzle` | PASS | Complete |
| `sample-complete` | PASS | Complete |
| `demo-isolation` | PASS | Complete |
| `restart-reset` | PASS | Complete |
| `hint-cost` | PASS | Complete |
| `failed-checks` | PASS | Complete |
| `sound-setting` | PASS | Complete |
| `local-progress` | PASS | Complete |
| `keyboard-controls` | PASS | **Incomplete; F-9-1** |
| `phone-60fps` | PASS | Complete |
| `free-to-play` | PASS | Complete |
| `private-static-game` | PASS | Complete |
| `no-third-party` | PASS | Complete |
| `puzzle-choices-local` | PASS | Complete |
| `no-account-required` | PASS | Complete |
| `offline-reload` | PASS | Complete |

Additional commands:

```text
npm test       PASS — 32/32 tests
npm run build  PASS — TypeScript check and Vite build; dist/ produced
verify-url.sh  PASS — root, demo, privacy, and terms
```

The fresh build contains 21.75 kB JavaScript (8.00 kB gzip) and 16.54 kB CSS (4.56 kB gzip). The earlier same-artifact Lighthouse records report root 96 performance/100 accessibility and demo 99 performance/100 accessibility.

## Accessibility, routes, privacy, and offline behavior

- Playwright Axe found zero violations on `/`, `/demo`, `/privacy`, `/terms`, and the designed unknown route at both desktop and phone sizes.
- Each route has `lang="en"`, one h1, one main, its expected title, and no horizontal overflow. Privacy and Terms return 200. The unknown route returns the expected HTTP 404 with **“Page not found”** and a return action. Chromium's document-load 404 message is expected and is not a defect.
- Back and Forward focus the destination h1 and update the polite route announcement after navigation settles.
- The focus outline is `rgb(115, 84, 0)`. Checked phone targets are at least 44 px. Solve-critical text is at least 16 px. At 200% text, the page, navigation, and specimen names remain inside the viewport without clipping.
- Reduced-motion media matching is active in a reduced-motion context. The stylesheet reduces animation and transition durations to 0.01 ms.
- The live service worker completed `registration.update()` and then reloaded `/demo` offline with the sample heading visible.
- Fresh 390 × 844, DPR 2, 4× CPU-throttled live frame samples were 60.88, 60.04, and 60.02 fps; median **60.04 fps**.
- `robots.txt`, `sitemap.xml`, the favicon, social image, internal links, and the external Sociobot/Param Factory link return 200. Hashed JavaScript and CSS use one-year immutable caching.
- This is a static game with no backend, account, payment, API, room, or multiplayer promise. Tenant isolation, server restart persistence, health, and 429/Retry-After checks do not apply.

## Earlier finding disposition

Every earlier review and verification finding, including minor items, was inspected and rechecked.

| Earlier finding | Current disposition |
| --- | --- |
| Initial verification: game below the first viewport | Fixed; fresh desktop and phone captures show the game and a complete first cell. |
| Initial verification: missing frame-rate claim | Fixed; `phone-60fps` passed and the fresh live median is 60.04 fps. |
| Initial verification: cache and real-404 failures | Fixed; hashed assets are immutable and an unknown route returns the designed HTTP 404. |
| Verification 3: focus contrast, small touch targets, and clipped 200% labels | Fixed; live focus, 44 px, 16 px, and 200% reflow checks pass. |
| F-1-1 | The original Enter/arrow flake is fixed; the isolated command and 32-test suite pass. F-9-1 is a new completeness finding for other advertised controls. |
| F-1-2, F-1-4 | Fixed; the sole price statement is covered by `free-to-play`. |
| F-1-3, F-5-2 | Fixed; unsupported absence copy is removed and `no-account-required` passes. |
| F-1-5, F-3-1, RG-V5-06 | Fixed; no numeric duration promise remains. |
| F-1-6, F-5-1 | Fixed; tests and live checks allow only static same-origin GETs without bodies, gameplay requests, or cookies. |
| F-1-7, F-1-8 | Fixed; decorative labels are absent and puzzle headings name the grid. |
| F-1-9 | Fixed; link, Back, and Forward focus and announcements pass live. |
| F-1-10, F-3-5 | Fixed; the real 404 has plain wording, complete metadata, HTTP 404, and a return action. |
| F-2-1, F-2-2, F-4-1 | Fixed; phone specimen labels fit, the section is named Hints, and mobile navigation remains visible. |
| F-3-2, RG-V6-01 | Fixed; all leaf counts, including **1 leaf**, pass. |
| F-3-3 | Fixed; Hints uses valid structure and Axe is clear. |
| F-3-4 | Fixed; sound controls say **Turn sound off/on**. |
| F-3-6 | Fixed; the skip link says **Skip to main content**. |
| F-3-7 | Fixed; README says the game loads no files from other websites. |
| F-3-8 | Fixed; the guide and UI both identify Field sheet 05. |
| RG-V5-01 | Fixed; demo progress and sound use separate keys, and reset/exit preserve seeded daily data. |
| RG-V5-02, RG-V5-03 | Fixed; the privacy link target and solve-critical text meet their size requirements. |
| RG-V5-04, RG-V5-05 | Fixed; result focus and **1 check left** pass. |
| F-5-3 | Fixed; README plainly states that the sample can be solved or its explanation viewed. |

## Acceptance decision

**FAIL.** The runtime works, all declared commands pass, and every earlier defect remains fixed. Acceptance is still blocked by one high finding and three untested public control claims in F-9-1. A PASS requires zero findings and zero untested claims.

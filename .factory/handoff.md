# Riddle Grid repair 4 handoff

## Status

**PASS.** The review-9 control-coverage finding is resolved. The product remains a free, local-first daily 4×4 deduction game for coffee-break players who want logic without spelling tests.

- Implementation SHA: `c52e03162f7dd893bfd83f3fcdba7970064d850d`
- Documentation baseline: `c52e03162f7dd893bfd83f3fcdba7970064d850d`
- Handoff updates after that implementation are report-only and do not change the deployed runtime.

## What changed

- Added the `pointer-touch-controls` claim. Its outcome test uses a desktop pointer and a 390×844 `hasTouch` phone context with low-level touchscreen taps. Both must select a specimen and place it in a cell.
- Expanded `keyboard-controls` to prove Enter, arrows, Space, and Escape. It asserts grid placement, returned clue-card state, and the recovery message.
- Removed the grid cell click-count filter. It incorrectly rejected a valid zero-count touch click in the automated phone path. Keyboard handlers still prevent their default click before applying their own action.
- Updated the copy audit to map the README's pointer/touch and keyboard instructions to their declared claims.
- Kept the catalog description verb-first and copied the 72-character value to `/work/.evidence/catalog-description.txt`.

## Verification

Clean checkout: `/tmp/riddle-grid-claims.M9HWgi` at the implementation SHA, with Node 22.23.2 and npm 10.9.8.

- `npm ci` passed with 0 vulnerabilities.
- All 18 exact commands in `.factory/claims.json` passed independently.
- `npx playwright test --list --grep '@claim:'` listed 18 claim tests, matching the manifest.
- `npm test` passed 33/33 tests.
- `npm run build` passed and produced `dist/`.
- Production output: JavaScript 21.73 kB raw / 7.99 kB gzip; CSS 16.54 kB raw / 4.56 kB gzip.
- The suite's Playwright Axe checks cover root, demo, legal pages, and 404 with no violations. The fresh live phone and desktop root scans also found zero violations.

## Deployment and live checks

Deployed the built `dist/` to the existing `sf-riddle-grid` static app. HTTPS returned 200 after deployment. Live `index.html`, `404.html`, JavaScript, and CSS SHA-256 values match the local build. The expected missing route remains a designed HTTP 404.

`verify-url.sh` passed on the live root, demo, Privacy, and Terms pages: each has its expected title, `lang="en"`, one h1, main landmark, image alternatives, labelled buttons, and no console or page errors.

Fresh live evidence is in `/work/.evidence/riddle-grid-repair-4/`.

- Desktop 1440×900 and phone 390×844 both stated the job, audience, and first action before scrolling: **Solve one short deduction grid**; **For coffee-break players who want logic without spelling tests**; **Try it with sample data — Opens a ready sample.** A specimen control and full first grid cell were visible in both.
- Desktop demo: Space placed Fern, Escape returned it to the clue cards, then three invalid checks reached **Here is the only layout**.
- Phone demo: touchscreen taps placed the four correct specimens and reached **You found the only layout**. Restart cleared the grid. Reset and Start for real preserved seeded daily progress and sound while removing demo keys.
- Live frame samples at 390×844, DPR2, 4× CPU throttling were 61.58, 60.03, and 59.98 fps; median 60.03 fps.

## Earlier finding disposition

All findings recorded before review 9 remain fixed under the current clean suite and fresh live checks: first-screen game visibility, frame-rate coverage, cache and real-404 behavior, focus contrast, 44px targets, 200% text reflow, deterministic keyboard placement, claim coverage for free/privacy/account wording, plain headings and labels, route-history focus, 404 metadata, phone navigation and specimen labels, singular score/check grammar, valid landmarks, demo storage isolation, result focus, and sample naming.

Review-9 F-9-1 is now fixed: touch, Space, and Escape each have repeatable declared-claim coverage. The pointer/touch claim also proves the README's pointer wording.

## Known gaps and next steps

No product gaps remain within the brief. The game has no backend, payments, account system, or multiplayer feature, so backend persistence, tenant, health, and rate-limit checks do not apply. Repeat the 18 claim commands, full suite, build, and fresh phone touch run whenever controls or service-worker behavior change.

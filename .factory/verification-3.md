# Independent verification 3 — FAIL

**Candidate:** `d81a9c0f32c11dfaf043ad1c5e5734b3ff2404e4`
**Live URL:** <https://riddle-grid.sociobot.in>
**Verified:** 2026-09-02
**Verdict:** **FAIL**

The game, deployment, privacy behavior, deterministic end states, claims, build, and performance checks pass. The candidate is not releasable because the live UI fails three non-negotiable accessibility requirements: focus indicators do not reach 3:1 contrast, several mobile links have targets below 44 px, and 200% text resizing clips specimen labels.

No product code was changed during this verification.

## Mandatory first checks

I checked out the candidate before running product tests, ran `npm ci`, and then ran every exact command in `.factory/claims.json` individually before broader QA. All 15 claims passed:

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

Cold live visits answered the required first-read questions in plain words:

- What it does: **“Solve one short deduction grid.”**
- For whom: **“For coffee-break players who want logic without spelling tests.”**
- What to click first: **“Try it with sample data”**, followed by **“Opens a ready sample.”**

The one-click action opened `/?demo=1`, immediately showed the playable sample, and displayed the persistent “Demo — sample data, nothing is saved to your daily game” banner with Reset demo and Start for real.

The cold root showed the game itself rather than a menu wall. At 1440 × 900 the game began at y=436.31 px and the first cell ended at y=849.97 px. At 390 × 844 it began at y=345.16 px and the first cell ended at y=677.56 px. Both viewports had zero horizontal overflow.

## Clean checkout and production build

A separate clean checkout at the exact candidate ran:

```text
npm ci        PASS; 0 audit vulnerabilities
npm test      PASS; 22/22 (34.8 s)
npm test      PASS; 22/22 (34.3 s)
npm test      PASS; 22/22 (33.7 s)
npm run build PASS; tsc --noEmit and Vite production build
```

The repeated full-suite runs specifically retest the earlier keyboard-suite flake. It did not recur. There is no separate lint script in `package.json`; TypeScript checking is part of the production build.

Production output:

- JavaScript: 21.19 KB, 7.82 KB gzip (budget: 200 KB).
- CSS: 15.67 KB, 4.40 KB gzip (budget: 50 KB).
- Mobile hero image: 32.18 KB; full hero image: 137.64 KB (budget: 300 KB).
- `dist/` contains the root, real 404 document, routes/config, service worker, images, icons, and hashed assets.

## Deterministic game run

The live daily game for 2026-09-02 was played from the cold root through active play to its real end screen:

- Fern → row 2, column 3
- Acorn → row 1, column 4
- Berries → row 3, column 1
- Seed pod → row 4, column 2
- Result: **“You found the only layout”**, score **4 of 4 leaves**.
- Reload preserved the solved state. Sound off persisted after another reload.
- **Play this grid again** cleared all 16 cells and restored the initial instruction.

The live sample was also exercised on a touch-enabled 390 × 844 context:

- An intentionally invalid complete first row was checked three times and reached **“Here is the only layout.”**
- Reset demo cleared the explained board.
- A hint revealed “Fern belongs in row 1, column 3” and reduced the score from four to three leaves.
- Fern R1C3, Acorn R4C2, Berries R3C4, and Seed pod R2C1 reached **“You found the only layout”**, score **3 of 4 leaves**.

Boundary, invalid-input, and recovery checks passed: Enter on an empty cell announced what to do; ArrowLeft/ArrowUp stayed at R1C1; keyboard selection, arrows, and Enter placed Fern at R1C3; Escape returned it to the clue cards; Clear layout, restart, reset, and the three-failure explanation all worked.

Demo and daily storage remained isolated. During the live check, `riddle-grid:daily:2026-09-02` stayed byte-for-byte unchanged while `demo:riddle-grid:sample` was created. Reset demo removed only the demo key, and Start for real retained the daily key.

## Accessibility and mobile findings

Passing evidence:

- Playwright axe found zero serious or critical findings on `/`, `/demo`, `/privacy`, `/terms`, the live end state, and the real 404.
- `/opt/fleet/lib/verify-url.sh` reported HTTP 200, one title, `lang=en`, one h1, a main landmark, no missing image alt text, no unlabeled buttons, no console errors, and a 679 ms load.
- Keyboard Tab traversal reached the skip link, demo controls, navigation, sound, clue cards, and grid without a trap. Enter, Space, arrows, and Escape worked.
- Back and Forward moved focus to the new route h1 and updated the polite route announcement.
- Reduced motion computed `0.00001s` animation and transition durations.
- Normal 390 px layout had no horizontal overflow.

Failing evidence:

1. The designed focus outline is `#d6a534`, 3 px solid. Its contrast is only 1.64:1 against `#e6dbc0`, 1.93:1 against `#f3eddd`, 1.98:1 against `#f5f0e1`, and 2.17:1 against `#fffaf0`. The required focus contrast is at least 3:1.
2. At 390 px, visible interactive bounds below the required 44 px included the Riddle Grid home link at 128.2 × 36 px and footer links at 48 × 20.6 px (Privacy), 39.1 × 20.6 px (Terms), and 164.8 × 20.6 px (Built by Param Factory).
3. In the 390 px text-only 200% resize check, all four quick specimen controls clipped content: their 83 px content width was smaller than scroll widths of 119 px (Fern), 142 px (Acorn), 167 px (Berries), and 127 px (Seed pod). The Seed pod label extended to x=416.1 px and was clipped by the 390 px viewport/main overflow.

These checks are not covered by axe, so the zero-violation axe result does not clear them.

## Privacy, network, routes, and deployment identity

- Full live daily and sample runs made requests only to `https://riddle-grid.sociobot.in`; `document.cookie` remained empty. No analytics, ads, account, payment, chat, or clue-submission path appeared.
- `/`, `/demo`, `/privacy`, and `/terms` returned 200 with no console or page errors. Unknown paths returned the designed document with HTTP 404; the browser's expected failed-resource console message was limited to that 404 navigation.
- Same-origin links returned 200. Titles, descriptions, canonicals, Open Graph/Twitter metadata, one h1, one main, alt text, robots, and sitemap were present as applicable.
- Headers included a same-origin CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and restrictive camera/microphone/geolocation permissions.
- HTML used 30-second revalidation; hashed JS/CSS used `public, max-age=31536000, immutable`; `sw.js` used `no-cache`.
- The live artifact matched the candidate production build byte-for-byte for `index.html`, the hashed JS and CSS, `sw.js`, the hero image, and `404.html`. Representative SHA-256 matches: root `1a75ea99afef2d41a1f7ec039abd95f1ba4e21930a1e9284d680b0e3722c9832`; JS `c8cfa5722aaee5ea4622e95594800b731ad6cae8014b6c543f51069321604d82`; CSS `3916bb6fabec76471d5bd0d9e9d718ed481aaaed67bb3199cdefe2481b6dacf3`.
- The service worker was activated and controlling `/demo`, `registration.update()` completed, and cache `riddle-grid-v5` was present. Offline reload retained the sample and announced “You are offline. The open puzzle still works,” with no errors.

The product is entirely static and exposes no server-side product or unlock endpoint, so API concurrency, persistence boundaries, rate-limit allowance/429/Retry-After, health identity, and Entra sign-in checks do not apply.

## Performance

- The 390 × 844, DPR 2, 4× CPU-throttled live frame samples were 61.40, 59.99, and 60.00 fps; median **60.00 fps**.
- Three Lighthouse 12.8.2 mobile performance runs scored 88, 96, and 91; median **91**. The combined run scored accessibility 100, best practices 100, and SEO 100. FCP was 0.8–0.9 s, LCP 1.6 s, CLS 0, and TBT 210–460 ms.

## Defects by severity

### High — release-blocking — focus indicators fail the 3:1 contrast requirement

The single gold outline color is below 3:1 on every light game surface. Keyboard users can focus controls, but the indicator does not meet the supplied accessibility contract. Use a darker focus token or a two-color indicator, then verify every surface at 3:1 or better.

### High — release-blocking — mobile touch targets are below 44 px

The home wordmark and all footer links have live bounds below 44 px in height; Terms is also below 44 px in width. Expand their clickable padding/minimum dimensions without relying on surrounding whitespace.

### High — release-blocking — 200% text resizing clips specimen labels

The fixed four-column quick tray cannot contain the resized labels, and `main { overflow: hidden; }` clips the overflow. Reflow the tray at enlarged text sizes and remove clipping so every label remains readable and operable.

## Retest condition

Fix all three accessibility defects, add automated coverage for focus contrast, 44 px mobile targets, and 200% text reflow, then repeat the claims-first clean-clone run and live scripted game verification.

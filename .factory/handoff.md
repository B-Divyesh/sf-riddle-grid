# Riddle Grid polish round 3 handoff

## Status

**PASS.** All eight findings in `.factory/review-3.md`, every earlier review finding, and the referenced verification regressions are fixed or reconfirmed. No known gaps remain.

The repaired static game is live at <https://riddle-grid.sociobot.in>. The one-click isolated sample is <https://riddle-grid.sociobot.in/?demo=1>.

## What changed

- Removed the untested 3–5 minute statement and rewrote README privacy text in plain words.
- Correctly renders `1 leaf`, with regression coverage for scores 4 through 0.
- Replaced the nested complementary hint landmark with a labelled section and made Axe tests reject violations at every impact.
- Changed sound controls to result-naming actions: **Turn sound off** and **Turn sound on**.
- Changed the 404 h1 to **Page not found** and every skip link to **Skip to main content**.
- Kept route focus, titles, metadata, real 404 behavior, legal links, first-screen game visibility, mobile targets, and 200% text reflow under regression coverage.
- Aligned `.factory/demo.md` with the visible **Field sheet 05 sample**.
- Updated `.factory/claims.json`, `.factory/copy-audit.md`, and the 67-character verb-first catalog description.
- Added `scripts/live-audit.mjs` for repeatable post-deploy checks.

The complete finding-by-finding record is in `.factory/polish-3.md`.

## Verification

### Clean clone

Clean clone: `/tmp/riddle-grid-polish-3-clean.iPyYpx` at repair commit `749e65d`.

- `npm ci`: passed; 0 vulnerabilities.
- Every exact `.factory/claims.json` command: 15/15 passed separately.
- Each claim id appears in exactly one `@claim:<id>` test.
- `npm test`: 29/29 passed.
- `npm run build`: passed and produced `dist/`.
- Output sizes: JavaScript 21.60 kB raw / 7.95 kB gzip; CSS 16.10 kB raw / 4.48 kB gzip; no web fonts.

### Local browser and performance

- `/opt/fleet/lib/verify-url.sh` passed root and `?demo=1` with no console errors, one title/h1/main, `lang=en`, alt text, and labelled buttons.
- Playwright Axe reports zero violations at any impact on root, demo, privacy, terms, and not-found routes.
- Lighthouse root: performance 99, accessibility 100, best practices 100, SEO 100; LCP 2.0 s, TBT 20 ms, CLS 0.
- Lighthouse demo: 100/100/100/100; LCP 1.0 s, TBT 50 ms, CLS 0.

### Live deployment

- Deployment command: `/opt/fleet/lib/deploy-static.sh riddle-grid /work/repo/dist`.
- Azure Static Web Apps deployment id: `fced2d57-a6d4-4ca7-822c-1e7aa0648ea5`.
- `/`, `/demo`, `/privacy`, and `/terms`: HTTP 200; missing route: HTTP 404.
- All internal links, legal links, the factory link, robots, sitemap, favicon, and social image resolve.
- Root and demo Lighthouse: 100 performance, 100 accessibility, 100 best practices, 100 SEO. Root LCP is 1.5 s; demo LCP is 0.8 s; CLS is 0 on both.
- Fresh production browser audit passed: one-click query demo, persistent banner, reset/exit isolation, complete win, result focus, “1 leaf,” zero Axe violations, zero console errors, no cookies, and only same-origin requests.
- Mobile 390×844: no horizontal overflow, no undersized visible targets, first specimen and grid cell in the first viewport, and no clipping at 200% text.
- Reduced motion: animation and transition durations `0.00001s`.
- Frame-rate samples under 4× CPU throttling: 61.04, 60.02, and 59.97 fps; median 60.02 fps.
- Service worker controlled `/demo` and reloaded it offline.
- CSP contains `frame-ancestors 'none'`; hashed assets are immutable for one year; `sw.js` is `no-cache`.
- Live/local JavaScript and CSS SHA-256 hashes match exactly.

Evidence is under `evidence/polish-3/`, especially `live-audit.json`, the live screenshots, and the four Lighthouse reports.

## Run and verify

```sh
npm ci
npm test
npm run build
node scripts/live-audit.mjs https://riddle-grid.sociobot.in evidence/polish-3
```

## Known gaps and next steps

None.

# Polish round 2 — cumulative finding closure

**Reviewed base:** `c2185c7`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Checked:** 2026-09-02

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Preserved the synchronous post-render focus repair for deterministic keyboard placement. | `@claim:keyboard-controls`; full `npm test` (24 passed); clean-clone claim run. |
| F-1-2 | Preserved the registered `free-to-play` claim for the sole price statement. | `@claim:free-to-play`; `.factory/claims.json`. |
| F-1-3 | Kept the unsupported account, advertising, chat, and submission promise out of landing copy. | `@claim:private-static-game`; cold root copy audit. |
| F-1-4 | Kept repeated free-price copy out of the footer and terms. | `@claim:free-to-play`; live `/terms` check. |
| F-1-5 | Kept the unsupported 3–5 minute estimate out of README copy. | `.factory/copy-audit.md`; README audit. |
| F-1-6 | Preserved the browser privacy test covering cookies, requests, scripts, advertising, analytics, and prohibited controls. | `@claim:private-static-game`; `@claim:no-third-party`. |
| F-1-7 | Kept the decorative landing labels removed. | Cold 390 px root capture: `evidence/polish-2/live-root-390x844.png`. |
| F-1-8 | Preserved the clear “Today’s deduction grid” and “Sample deduction grid” headings. | `routes, metadata, and accessibility have no serious violations`; live root and demo checks. |
| F-1-9 | Preserved shared post-render h1 focus and route announcements for links and browser history. | `Back and Forward focus and announce the new route heading`. |
| F-1-10 | Preserved Apple touch, Open Graph, and Twitter metadata on the HTTP 404 document. | `404 document carries complete product metadata`; live missing-route status check. |
| F-2-1 | Reflowed the phone quick tray to three-plus-one controls at 390 px, removed forced word-internal wrapping, and retained 64 px targets and a visible first grid row. | `390px specimen picker keeps every name intact and labels the hint section`; `evidence/polish-2/live-root-390x844.png`. |
| F-2-2 | Renamed the functional section from “Field notes” to “Hints.” | Same regression test; live root and `/?demo=1` heading checks. |

## Required product checks

- `?demo=1` remains the first-screen action and uses only `demo:riddle-grid:sample`. The persistent banner includes **Reset demo** and **Start for real**. Evidence: `@claim:demo-isolation` and `evidence/polish-2/live-demo-390x844.png`.
- All 15 entries in `.factory/claims.json` pass from a clean clone using their exact commands.
- `npm test` passes 24 tests. `npm run build` produces `dist/` with 21.19 kB JavaScript and 15.95 kB CSS before gzip.
- Playwright axe checks all routes with no serious or critical findings. Lighthouse scores and post-deploy URL checks are recorded in `.factory/handoff.md`.
- The post-deploy cold audit is recorded in `evidence/polish-2/live-audit.json`; live Lighthouse scored 100 in all four categories.

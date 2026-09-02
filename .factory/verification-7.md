# Independent verification 7 — PASS

**Candidate:** `1c39bc39b6c77c7bb51044cde3b879b65649ce2b`  
**Live URL:** <https://riddle-grid.sociobot.in>  
**Verified:** 2026-09-02 UTC  
**Verdict:** **PASS**

This was an independent, claims-first check from a clean checkout. Product code was not changed. The production files served at the URL match this candidate exactly.

## Required first checks

`.factory/claims.json` exists and has 15 entries. After `npm ci` (23 packages, 0 vulnerabilities), I ran every exact command in its `test` field separately against the production-preview demo entry point. All passed.

| Claim | Result | Observed outcome |
| --- | --- | --- |
| `unique-solutions` | PASS | The deterministic solver found exactly one solution for each of the 20 authored daily puzzles. |
| `daily-puzzle` | PASS | A fixed UTC date selected equal puzzle data and a valid ID twice. |
| `sample-complete` | PASS | The shipped sample reached “You found the only layout” at 4/4 leaves. |
| `demo-isolation` | PASS | Demo progress and sound used separate `demo:` keys; reset/exit did not alter seeded daily keys. |
| `restart-reset` | PASS | Restart left zero filled cells and restored the opening instruction. |
| `hint-cost` | PASS | Each hint exposed one exact position and reduced the score through 4, 3, 2, 1, and 0 leaves. |
| `failed-checks` | PASS | Three incorrect complete layouts opened the complete explanation. |
| `sound-setting` | PASS | The sound choice survived reload. |
| `local-progress` | PASS | A placement survived reload in the same browser mode. |
| `keyboard-controls` | PASS | Enter selected/placed and arrows moved through the grid. |
| `phone-60fps` | PASS | The declared 390×844, DPR 2, 4× CPU profile measured within 55–65 fps. |
| `free-to-play` | PASS | The full sample solved without payment, purchase, or subscription controls. |
| `private-static-game` | PASS | A full demo run set no cookie and used no tracker, ad, external script, sign-in, chat, or submission control. |
| `no-third-party` | PASS | The hint-and-placement request log was same-origin only. |
| `offline-reload` | PASS | The service worker controlled `/demo` and the demo reloaded offline after the first visit. |

Cold first-read test on live `/`, at 1440×900: **“Solve one short deduction grid”** says what it does; **“For coffee-break players who want logic without spelling tests”** says who it is for; **“Try it with sample data — Opens a ready sample”** says what to click first. The initial screen also contains the real daily game, a playable cell, and specimen controls, rather than a menu wall. This passes the plain-words and one-click-demo gates.

## Clean-checkout gates

```text
npm ci         PASS — 23 packages installed; 0 vulnerabilities
npm test       PASS — 29/29 Playwright tests
npm run build  PASS — tsc --noEmit and Vite production build; dist/ produced
```

There is no separate lint command. The available type check is included in `npm run build`.

Fresh output is within the static-product budget:

- JavaScript: 21,598 bytes raw / 7,912 bytes gzip.
- CSS: 16,165 bytes raw / 4,462 bytes gzip.
- Largest first-load image: 137,636 bytes (`field-desk.webp`).
- No web fonts or external runtime resources.

Mobile Lighthouse was run three times on live `/`: 86 (530 ms TBT), then 97 and 97 (both 190 ms TBT). The repeatable median is **97 Performance**, with **100 Accessibility / 100 Best Practices / 100 SEO**; root LCP was 1.5–1.6 s and CLS 0. The first outlier is retained here for transparency. Live `/demo` measured **98 / 100 / 100 / 100**, with 0.9 s LCP, 170 ms TBT, and CLS 0. Reports are in `evidence/verification-7/`.

## Live product QA

### Complete, loss, and recovery runs

- One-click sample: `/` → **Try it with sample data** → active play → place Fern R1C3, Acorn R4C2, Berries R3C4, Seed pod R2C1 → **Check layout**. It reached **“You found the only layout”**, showed the score and explanation, and moved focus to the result heading.
- **Restart sample** returned to a blank board (0 filled cells) and “Select a clue card, then choose a grid cell.”
- An incorrect complete layout submitted three times reached **“Here is the only layout”** with the explanation, satisfying the explicit loss/recovery path.
- Boundary paths: Check layout was disabled while incomplete; choosing an empty cell said “That cell is empty. Select a clue card first.”; placing Acorn in Fern’s occupied cell returned Fern to the tray; **Clear layout** left 0 filled cells.
- Daily mode: a daily Fern placement and the muted sound state survived reload. Demo reset removed only the two demo keys and did not touch daily data; **Start for real** left demo mode.
- Keyboard-only play, touch play at 390×844, one-leaf grammar, visible focus, 200% text reflow, reduced-motion styles, and no horizontal overflow passed in the suite and fresh live audit.

### Performance and game loop

Live frame samples at 390×844, DPR 2, and 4× CPU throttling were **59.98, 60.03, 59.99 fps**; median **59.99 fps**. This meets the advertised 60 fps test profile. The game has a daily seed, 20 authored unique-solution layouts, local progress/settings, a genuine loss explanation after three checks, and an immediate end screen/restart.

### Accessibility, privacy, routing, and headers

- Playwright Axe found 0 violations (therefore 0 serious/critical) on `/`, `/demo`, `/privacy`, `/terms`, and the real 404 page. `/opt/fleet/lib/verify-url.sh` passed all four live routes with no console/page errors, a title, `lang="en"`, one h1, one main, alt text, and labels.
- The skip link was the first keyboard stop; focus remained visible, route changes focused the new h1, and no keyboard trap was found.
- Live demo request logging recorded only `https://riddle-grid.sociobot.in`; `document.cookie` was empty. There are no product API, account, payment, or unlock endpoints, so rate-limit, backend-concurrency, persistence-boundary, health, and Entra-tenant checks do not apply.
- Response headers include CSP with `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy`. Hashed JS is `public, max-age=31536000, immutable`; `sw.js` is `no-cache`.
- `robots.txt`, `sitemap.xml`, favicon, social image, service worker, internal routes, and the external factory link all returned 200. The missing route returned 404.

## Deployment identity

Fresh `dist/` bytes and live bytes have matching SHA-256 values:

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `ce015beef0bc058eaa46212220aa57d7f4a5d7132d2d670bd98584f6c6bbe8f4` |
| `assets/app-DD_vB1NW.js` | `0992c0547c07047e1e2e3c0eedaf039b10e026ed3a0a4a3b18a7b89401d68c53` |
| `assets/app-CzIGCEaz.css` | `90bee4ab20475d1ff3b62397ace98f174aaefaff656acb3095f09a9fd3d27023` |

## Defects by severity

### High

None.

### Medium

None.

### Low

None. One initial Lighthouse root run measured 86 Performance, but two immediate cold repeats measured 97; the detailed results are retained above and in the evidence directory.

## Acceptance decision

**PASS.** Candidate `1c39bc39b6c77c7bb51044cde3b879b65649ce2b` is the exact static version served at the production URL and satisfies the browser-game acceptance contract.

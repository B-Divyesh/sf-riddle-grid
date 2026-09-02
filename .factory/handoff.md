# Riddle Grid repair handoff

## Status: deployed and verified

This repair addresses every release-blocking finding in the independent report for candidate `d81a9c0f32c11dfaf043ad1c5e5734b3ff2404e4`, including the controller's repeat of the mobile accessibility evidence.

## Repairs

- Replaced the low-contrast gold keyboard outline with the field-guide dark-brass focus token `#735400`. It is 5.09:1 or higher against every paper and grid surface used by the game.
- Made the home wordmark and every footer link genuine 44×44 px minimum interactive targets. The mobile footer links retain visible spacing and ordinary link affordance.
- Reworked the mobile quick-specimen tray from a fixed four columns to an intrinsic `5rem` grid. It remains four compact controls at ordinary text size and reflows to two wide controls at 390 px with 200% text. `main` no longer clips child overflow.
- Added a Playwright regression that focuses a specimen, calculates the focus/surface contrast, measures every home/footer target, and applies the verifier's exact 390 px + 200% text resize before asserting every specimen label fits within its button and viewport. It also activates Seed pod at that text size.

## Verification

Ran from a clean dependency install on 2026-09-02:

```sh
npm ci
# every one of the 15 exact @claim commands in .factory/claims.json, individually
npm test
npm run build
```

Results:

- All 15 declared claim commands passed individually: unique solutions, dated daily selection, sample completion/isolation/restart, hint and failed-check behavior, local sound/progress, keyboard input, throttled phone frame rate, free play, privacy/network, and offline reload.
- `npm test`: 23/23 passing, including browser desktop, 390 px mobile, keyboard, Axe serious/critical scans, route metadata, real-404/cache policy, privacy request checks, service-worker offline reload, and the new accessibility regression.
- `npm run build`: TypeScript check and Vite production build passed. Output is 21.19 KB JavaScript (7.82 KB gzip) and 15.95 KB CSS (4.48 KB gzip).
- The deterministic shipped sample was rerun to the real end screen: Fern R1C3, Acorn R4C2, Berries R3C4, Seed pod R2C1 produced “You found the only layout” with 4 of 4 leaves; restart reset behavior remains covered by its claim test.
- `/opt/fleet/lib/verify-url.sh` against the production preview passed: HTTP 200, title, `lang=en`, one h1/main, image alt text, labeled buttons, no console/page errors; measured load was 569 ms.
- Direct preview check at 390×844 with `html { font-size: 200% }`: document and main had no overflow; Fern/Acorn/Berries/Seed pod all fit; each target remained inside the viewport. At ordinary mobile text, the home and footer target rule is asserted by the browser regression; at enlarged text the measured target boxes were 210×58, 112×49, 94×49, and 337×49 px.

## Deployment and live verification

Deployed production build `24d6870` to the existing product-owned Static Web App `sf-riddle-grid` on 2026-09-02. The custom domain is live at <https://riddle-grid.sociobot.in>.

- The live root `index.html` SHA-256 is `6d0ea7c148bdc309cb7c97420b9f16a52d55cab789ddc82fb48ebe0991cc0d16`, matching `dist/index.html`.
- The live JavaScript asset `app-D6DHVhWF.js` SHA-256 is `bfd798e00bfdba1cb1d0333eadcb33f4c040286a788dc78c56fb4851afc8c3b6`, matching `dist`.
- Live `verify-url.sh` passed in 693 ms with HTTP 200, one title/h1/main, `lang=en`, alt text, labeled buttons, and no console/page errors.
- The live demo at 390×844 reached “You found the only layout” with “Score: 4 of 4 leaves.” and no console/page errors. Its focused specimen computed the repaired `rgb(115, 84, 0)` outline.
- Live hashed CSS returns `Cache-Control: public, max-age=31536000, immutable`; an unknown route returns HTTP 404 with short revalidation.

## Product notes

The product remains a static Vite TypeScript browser game with local-only browser storage, a same-origin service worker, no analytics, no third-party runtime resources, and no backend or paid feature. `public/staticwebapp.config.json` continues to provide immutable cache policy for hashed assets, `no-cache` service-worker updates, security headers, route rewrites, and the designed real 404 response.

No known product gaps remain.

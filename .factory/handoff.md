# Riddle Grid repair handoff

## Status: ready to deploy

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

## Product/deployment notes

The product remains a static Vite TypeScript browser game with local-only browser storage, a same-origin service worker, no analytics, no third-party runtime resources, and no backend or paid feature. `public/staticwebapp.config.json` continues to provide immutable cache policy for hashed assets, `no-cache` service-worker updates, security headers, route rewrites, and the designed real 404 response.

Deploy with:

```sh
/opt/fleet/lib/deploy-static.sh riddle-grid /work/repo/dist
```

No known product gaps remain. Post-deployment URL, artifact identity, headers, and live completion should be rechecked after the Static Web Apps edge updates.

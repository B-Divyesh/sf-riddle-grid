# Riddle Grid verification handoff

## Status: FAIL

Candidate `d81a9c0f32c11dfaf043ad1c5e5734b3ff2404e4` at <https://riddle-grid.sociobot.in> is not releasable. The full evidence is in `.factory/verification-3.md`.

The game and deployment passed the functional gates: all 15 declared claim commands passed individually; three clean-checkout full-suite runs passed 22/22; TypeScript and the production build passed; the live daily and sample games reached their real end screens; restart, explanation, hints, settings, progress, demo isolation, offline reload, same-origin privacy, and deployment-byte matching passed.

Release is blocked by three accessibility defects:

1. The gold focus outline has only 1.64–2.17:1 contrast on the light surfaces; the requirement is at least 3:1.
2. The mobile home/footer link hit areas are only 20.6–36 px tall; the requirement is at least 44 px.
3. At 390 px with text resized to 200%, all four quick specimen labels overflow their controls and Seed pod is clipped beyond the viewport.

No product code was changed. This verification added the current report and updated this handoff only. The builder's earlier polish report and visual evidence remain in `.factory/polish-1.md` and `.factory/evidence/live/`.

## Reproduce

```sh
npm ci
npm test
npm run build
```

For live retesting, use `/` for the dated game and `/?demo=1` for the isolated sample. After repairing the three defects, rerun the claims first, the full suite, a 390 px touch-target measurement, focus-indicator contrast calculations, a 200% text resize check, axe, Lighthouse, and both deterministic end-to-end game runs.

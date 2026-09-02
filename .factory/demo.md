# Demo sandbox

- URL: `https://riddle-grid.sociobot.in/?demo=1` (local: `http://localhost:5173/?demo=1`; `/demo` is an equivalent route)
- Sample: the fixed Field sheet 05 sample with four clue cards and its validated unique solution.
- Reset: use **Reset demo** in the persistent banner. **Restart sample** also clears the board after an end state.
- Storage namespace: `demo:riddle-grid:sample` for progress and `demo:riddle-grid:muted` for sound. Demo mode never reads or writes daily keys, including `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`.
- Exit: **Reset demo**, **Start for real**, and any in-app route out of demo remove both demo keys before opening non-demo content.

The demo ships inside the static app. The initial visit makes only allowlisted GET requests for the page and its own files. Playing sends no requests or payloads. After the first visit, the page and sample reload without a network connection.

`@claim:private-static-game`, `@claim:no-third-party`, and `@claim:puzzle-choices-local` verify the complete sample from a fresh browser context. They reject request bodies, unexpected query data, non-GET methods, analytics endpoints, and files outside the product’s static allowlist.

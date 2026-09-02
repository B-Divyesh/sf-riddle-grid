# Demo sandbox

- URL: `https://riddle-grid.sociobot.in/?demo=1` (local: `http://localhost:5173/?demo=1`; `/demo` is an equivalent route)
- Sample: the fixed Field sheet 05 sample with four clue cards and its validated unique solution.
- Reset: use **Reset demo** in the persistent banner. **Restart sample** also clears the board after an end state.
- Storage namespace: `demo:riddle-grid:sample` for progress and `demo:riddle-grid:muted` for sound. Demo mode never reads or writes daily keys, including `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`.
- Exit: **Reset demo**, **Start for real**, and any in-app route out of demo remove both demo keys before opening non-demo content.

The demo is bundled into the static app. After the first visit, its shell and sample reload without a network connection.

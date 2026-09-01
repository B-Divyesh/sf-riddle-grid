# Demo sandbox

- URL: `https://riddle-grid.sociobot.in/demo` (local: `http://localhost:5173/demo`)
- Sample: the fixed “Rain ledger” field sheet with four clue cards and its validated unique solution.
- Reset: use **Reset demo** in the persistent banner. **Restart sample** also clears the board after an end state.
- Storage namespace: `demo:riddle-grid:sample`. Demo mode never reads or writes the daily key prefix `riddle-grid:daily:`.
- Exit: **Start for real** removes demo progress before opening today’s puzzle.

The demo is bundled into the static app. After the first visit, its shell and sample reload without a network connection.

# Landing-page copy audit

Checked 2026-09-02 after polish round 3. Word counts treat hyphenated terms, dates, and numeric labels as one word. No line exceeds 22 words or uses a banned marketing word.

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass; accurate on every route |
| Riddle Grid | 2 | Product name |
| Demo | 1 | Navigation label |
| How it works | 3 | Navigation label |
| Privacy | 1 | Navigation label |
| Turn sound off / Turn sound on | 3 each | Pass; each label names the action |
| Solve one short deduction grid | 5 | Pass; the job is clear |
| For coffee-break players who want logic without spelling tests. | 9 | Pass; audience and outcome are clear |
| Try it with sample data | 5 | Pass; opens `?demo=1` in one click |
| Opens a ready sample. | 4 | Pass |
| Free to play. | 3 | Covered by `free-to-play` |
| Offline after one visit. | 4 | Covered by `offline-reload` |
| Saved in this browser. | 4 | Covered by `local-progress` |
| Four pressed plant specimens surround a blank field grid. | 9 | Useful image alternative |
| Today’s clues belong on one field grid. | 7 | Pass |
| Field sheet 19 · 2026-09-02 | 4 | Clear puzzle and date label |
| Today’s deduction grid | 3 | Pass |
| Hints show exact cells but reduce the leaf score. | 9 | Covered by `hint-cost` |
| 4 leaves / 3 leaves / 2 leaves / 1 leaf / 0 leaves | 2 each | Pass; every count has a regression assertion |
| Rule 1 / Rule 2 | 2 each | Rule labels |
| One specimen in each row | 5 | Pass |
| One specimen in each column | 5 | Pass |
| Fern / Acorn / Berries / Seed pod | 1 / 1 / 1 / 2 | Specimen names |
| Clue cards | 2 | Pass |
| Acorn is above Fern. | 4 | Game clue |
| Fern is above Berries. | 4 | Game clue |
| Berries is above Seed pod. | 5 | Game clue |
| Berries is left of Seed pod. | 6 | Game clue |
| Seed pod is left of Fern. | 6 | Game clue |
| Fern is left of Acorn. | 5 | Game clue |
| Place | 1 | Contextual card state; the accessible name includes the specimen and action |
| Hints | 1 | Pass |
| No hints revealed. | 3 | Pass |
| Reveal one position | 3 | Pass; names the result |
| −1 leaf | 2 | Cost label covered by `hint-cost` |
| Select a clue card, then choose a grid cell. | 9 | Pass |
| Clear layout / Check layout | 2 each | Pass; result-naming actions |
| How the grid works | 4 | Pass |
| Read the clue cards. | 4 | Pass |
| Above and left describe each pair. | 6 | Pass |
| Place four specimens. | 3 | Pass |
| Use each row and column once. | 6 | Pass |
| Check the layout. | 3 | Pass |
| See the solved grid and its explanation. | 7 | Pass |
| The game stays on your device | 6 | Covered by storage and privacy claims |
| Your layout and sound setting use browser storage. | 8 | Covered by `local-progress` and `sound-setting` |
| The game sends no personal data. | 6 | Covered by `no-third-party` |
| Read the privacy details | 4 | Pass |
| Riddle Grid is a daily deduction game. | 7 | Covered by `daily-puzzle` |
| Terms | 1 | Legal link |
| Built by Param Factory | 4 | Attribution |
| Original generated field-desk art · v1.0.0 | 5 | Provenance and version |

The first screen can be read in one breath: solve one short deduction grid; it is for coffee-break logic players; open the ready sample first.

## README review

The former untested “3–5 minutes” statement is now “A round is designed for a short break.” The privacy sentence now says “loads no files from other websites.” All README sentences remain at or below 22 words. Quantitative and capability statements map to `.factory/claims.json`.

## Terminology

| Concept | One term |
| --- | --- |
| Illustrated object | specimen |
| Source instruction | clue card |
| 4×4 placement area | grid |
| Extra exact constraint | hint |
| Submitted arrangement | layout |
| Score unit | leaf |
| Fixed try-out | sample |

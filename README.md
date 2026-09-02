# Riddle Grid

Solve a four-specimen daily deduction grid. Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. A round is designed for a short break.

The game selects one shared puzzle for each UTC date. All 20 daily layouts have exactly one solution. The sample lets you solve the grid or view its explanation.

Live site: <https://riddle-grid.sociobot.in>  
One-click demo: <https://riddle-grid.sociobot.in/?demo=1>

## Play

Read the illustrated clue cards. Place each specimen so every row and column contains one specimen and every relation is true. A hint reveals one exact position and costs one score leaf. Three incorrect checks open the explanation.

Use a pointer or touch to select a specimen and then a cell. With a keyboard, use Enter or Space to select and place. Arrow keys move through the grid. Escape returns a placed specimen to the clue cards.

Your progress and puzzle choices stay in this browser. The game loads no files from other websites. It works offline after the first visit.

The game runs at 60 frames per second on the 390×844 mid-range phone test profile. The automated check uses 4× CPU throttling.

## Develop

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/?demo=1` for the fixed verification sandbox. The `/demo` route also opens the sample. Demo progress and sound use `demo:riddle-grid:sample` and `demo:riddle-grid:muted`; daily keys use `riddle-grid:daily:<UTC date>` and `riddle-grid:muted`. Reset demo and Start for real clear both demo keys.

## Test and build

```sh
npm test
npm run build
```

`npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. `npm run build` writes the static deploy to `dist/`, with `index.html` at its root.

## Deploy

Upload `dist/` to the static host. `staticwebapp.config.json` supplies route rewrites, the styled 404 response, security headers, and the content security policy. No backend or environment variables are required.

## Privacy and license

The privacy policy is at `/privacy`; the terms are at `/terms`. The code is available under the [MIT License](LICENSE). Original generated artwork provenance is recorded in [.factory/design.md](.factory/design.md).

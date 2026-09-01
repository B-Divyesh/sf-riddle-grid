# Riddle Grid

Solve a four-specimen daily deduction grid. Riddle Grid is for coffee-break players who want logic without spelling or obscure vocabulary. A round is designed for a 3–5 minute break.

The game selects one shared puzzle for each UTC date. All 20 daily layouts have exactly one solution. The bundled sample reaches the same complete solve and explanation flow.

Live site: <https://riddle-grid.sociobot.in>  
One-click demo: <https://riddle-grid.sociobot.in/demo>

## Play

Read the illustrated clue cards. Place each specimen so every row and column contains one specimen and every relation is true. A hint reveals one exact position and costs one score leaf. Three incorrect checks open the explanation.

Use a pointer or touch to select a specimen and then a cell. With a keyboard, use Enter or Space to select and place. Arrow keys move through the grid. Escape returns a placed specimen to the clue cards.

Progress stays in this browser. The game sends no personal data and loads no third-party runtime resources. It works offline after the first visit.

## Develop

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/demo` for the fixed verification sandbox. Demo progress uses `demo:riddle-grid:sample`; daily progress uses `riddle-grid:daily:<UTC date>`.

## Test and build

```sh
npm test
npm run build
```

`npm test` starts the production preview and runs the deterministic puzzle, complete-game, storage, keyboard, network, offline, accessibility, route, and mobile-width checks. `npm run build` writes the static deploy to `dist/`, with `index.html` at its root.

## Deploy

Upload `dist/` to the static host. `staticwebapp.config.json` supplies SPA fallback, the styled 404 response, security headers, and the content security policy. No backend or environment variables are required.

## Privacy and license

The privacy policy is at `/privacy`; the terms are at `/terms`. The code is available under the [MIT License](LICENSE). Original generated artwork provenance is recorded in [.factory/design.md](.factory/design.md).

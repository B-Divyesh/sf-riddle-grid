# Riddle Grid visual thesis

## Direction

Riddle Grid is a **botanical field guide** turned into a deduction table. The page should feel like a useful specimen notebook: warm paper, dark green ink, measured rules, small handwritten-style annotations, and clipped plant studies. It must not resemble a generic game portal or a card-based software landing page. The puzzle is visible on the first screen and remains the visual centre.

The difficulty curve is gentle and finite. Early puzzles expose direct row and neighbour rules; later puzzles combine relative position, column, and exclusion rules. Every puzzle has four illustrated specimens, a 4×4 field grid, and one verified solution. A round is designed for a short break.

## Palette

Tokens come from pressed leaves, old field paper, graphite, and berry ink:

- `--paper: #f3eddd` — warm page background
- `--paper-deep: #e6dbc0` — ruled and secondary areas
- `--ink: #183a2d` — primary text and outlines
- `--ink-soft: #52645a` — secondary text (verified contrast on paper)
- `--fern: #2d664c` — primary action
- `--berry: #8d3547` — selected state and warning accent
- `--sun: #d6a534` — focus and discovery accent
- `--focus: #735400` — dark brass keyboard focus outline (at least 5.09:1 on every paper surface)
- `--success: #27643f` — correct state
- `--danger: #8b2f35` — error state

This is a deliberately single-mode, daylight field-book treatment. The painted background and surfaces are explicit rather than inheriting browser color preferences.

## Type

- Display: Georgia, `Times New Roman`, serif. It gives specimen labels an editorial, archival character without a font download.
- Body and controls: system UI stack. It keeps rules and interactions quiet and readable.
- Sizes use a 1.2–1.25 scale. Body text never drops below 16px.

No external or downloaded fonts are used.

## Spacing and shape

An 8px base rhythm controls gaps and padding. The readable measure is 68 characters. Puzzle tiles are softly clipped rectangles with fine ink borders, like specimen cards placed onto a ruled page. Corners range from 2px on labels to 18px on large sheets. Large shadows are avoided; hierarchy comes from paper tones, outlines, and overlap.

On phones, the descriptive hero copy becomes compact and the live puzzle occupies the first viewport. The three main navigation links form a ruled second header row instead of disappearing. A four-item specimen tray appears before the grid, while full clue cards remain below it. Supplementary sections stack below the game. Touch targets are at least 44px.

## Interaction grammar

- Tap or press Enter/Space to select a specimen, then choose an empty grid cell.
- Arrow keys move the active grid cell. Enter places or picks up a specimen. Escape returns a placed specimen to the tray.
- A placed specimen moves from tray to field; it is never duplicated.
- Rule checks mark each visible rule as met or not met. Color is paired with text and symbols.
- A hint reveals one hidden constraint and reduces the maximum score by one leaf.
- Check layout is the decisive action. An incorrect full grid is feedback, not an irreversible loss. Three checks are available; after the third, the explanation opens.

## Motion

The signature movement is a short pressed-leaf settle: a specimen moves upward 4px and rotates less than one degree as it lands. UI transitions last 180–240ms and only animate transform or opacity. There is no perpetual motion, parallax, screen shake, or timed input. Under `prefers-reduced-motion: reduce`, all movement is removed and state changes are immediate.

## Illustration plan and prompt sheet

One original generated hero plate establishes the world: an overhead botanical field desk with a blank 4×4 ruled study area, four distinct plant specimens around it, a brass magnifier, pencil annotations without readable text, warm window light, and generous paper negative space. Medium: detailed gouache and colored-pencil editorial illustration. Palette: warm parchment, deep forest green, muted berry, ochre. Avoid people, hands, logos, watermarks, legible words, symbols, UI screenshots, gradients, and photorealistic stock imagery.

The four playable specimen drawings and product marks are hand-authored SVGs made from simple leaf, seed, stone, and shell geometry. This keeps clue identity crisp at small sizes and avoids text inside imagery.

## Asset provenance

- `public/art/field-desk.webp` and social derivatives: generated for this product with the factory Azure image model (`factory-image`) on 2026-09-01 using the prompt sheet above. Source PNG and prompt sidecar live in `assets/src/`.
- Specimen and interface SVGs: original, hand-authored in this repository on 2026-09-01.

Generated imagery is disclosed in the site footer.

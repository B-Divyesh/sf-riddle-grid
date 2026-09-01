export type SpecimenId = 'fern' | 'acorn' | 'berry' | 'pod';

export type Position = { row: number; col: number };

export type Puzzle = {
  id: string;
  title: string;
  note: string;
  solution: Record<SpecimenId, Position>;
};

export const specimens: { id: SpecimenId; name: string }[] = [
  { id: 'fern', name: 'Fern' },
  { id: 'acorn', name: 'Acorn' },
  { id: 'berry', name: 'Berries' },
  { id: 'pod', name: 'Seed pod' },
];

type PuzzleSeed = [string, string, [number, number, number, number], [number, number, number, number]];

// Each seed was authored as two permutations: rows and columns in specimen order.
// validatePuzzles() proves the derived clue chains leave exactly one layout.
const seeds: PuzzleSeed[] = [
  ['First fronds', 'Read the vertical clues before the horizontal clues.', [0, 2, 1, 3], [1, 3, 0, 2]],
  ['Oak shade', 'Start with the specimen that sits highest.', [1, 3, 0, 2], [2, 0, 3, 1]],
  ['Berry path', 'A long chain can be solved from either end.', [2, 0, 3, 1], [3, 1, 0, 2]],
  ['Spiral bed', 'Place one chain, then cross it with the other.', [3, 1, 2, 0], [0, 2, 1, 3]],
  ['Rain ledger', 'Each row and column accepts one specimen.', [0, 3, 2, 1], [2, 1, 3, 0]],
  ['Moss line', 'The same four clues make two ordered chains.', [2, 1, 0, 3], [1, 0, 2, 3]],
  ['Quiet clearing', 'Edges are useful anchors even without a border clue.', [1, 0, 3, 2], [3, 2, 0, 1]],
  ['Pressed page', 'Follow every arrow before checking the grid.', [3, 2, 1, 0], [1, 3, 2, 0]],
  ['Morning plot', 'One specimen never shares a row or column.', [0, 1, 3, 2], [3, 0, 2, 1]],
  ['Pine table', 'The two clue chains cross only once per specimen.', [2, 3, 1, 0], [0, 1, 3, 2]],
  ['Dew marks', 'Use the field rules to turn order into exact cells.', [1, 2, 0, 3], [2, 3, 1, 0]],
  ['Root study', 'Top and left are the starts of separate chains.', [3, 0, 1, 2], [1, 2, 3, 0]],
  ['Amber leaf', 'A complete chain fixes all four positions.', [0, 2, 3, 1], [2, 0, 1, 3]],
  ['Garden index', 'Read relationships, not the order of the cards.', [2, 0, 1, 3], [1, 3, 0, 2]],
  ['Windfall', 'Move a placed specimen again if a later clue disagrees.', [1, 3, 2, 0], [0, 2, 3, 1]],
  ['Copper stem', 'Rows run top to bottom. Columns run left to right.', [3, 1, 0, 2], [2, 0, 1, 3]],
  ['Small orchard', 'Every clue belongs to both a row and a column chain.', [0, 3, 1, 2], [1, 2, 0, 3]],
  ['Field margin', 'An empty cell can help you see the remaining column.', [2, 1, 3, 0], [3, 0, 2, 1]],
  ['Seed record', 'Hints show exact cells but reduce the leaf score.', [1, 0, 2, 3], [2, 3, 0, 1]],
  ['Last light', 'Check only after every specimen is on the field.', [3, 2, 0, 1], [0, 1, 3, 2]],
];

export const puzzles: Puzzle[] = seeds.map(([title, note, rows, cols], index) => ({
  id: String(index + 1).padStart(2, '0'),
  title,
  note,
  solution: Object.fromEntries(specimens.map((specimen, i) => [specimen.id, { row: rows[i], col: cols[i] }])) as Record<SpecimenId, Position>,
}));

export type Relation = { axis: 'row' | 'col'; before: SpecimenId; after: SpecimenId };

export function relationsFor(puzzle: Puzzle): Relation[] {
  return (['row', 'col'] as const).flatMap((axis) => {
    const ordered = [...specimens].sort((a, b) => puzzle.solution[a.id][axis] - puzzle.solution[b.id][axis]);
    return ordered.slice(0, -1).map((entry, index) => ({ axis, before: entry.id, after: ordered[index + 1].id }));
  });
}

export function clueText(relation: Relation): string {
  const before = specimens.find((item) => item.id === relation.before)!.name;
  const after = specimens.find((item) => item.id === relation.after)!.name;
  return relation.axis === 'row' ? `${before} is above ${after}.` : `${before} is left of ${after}.`;
}

const permutations = (values: number[]): number[][] => values.length === 1
  ? [values]
  : values.flatMap((value) => permutations(values.filter((item) => item !== value)).map((rest) => [value, ...rest]));

export function solutionCount(puzzle: Puzzle): number {
  const relations = relationsFor(puzzle);
  const perms = permutations([0, 1, 2, 3]);
  let count = 0;
  for (const rows of perms) {
    for (const cols of perms) {
      const candidate = Object.fromEntries(specimens.map((specimen, index) => [specimen.id, { row: rows[index], col: cols[index] }])) as Record<SpecimenId, Position>;
      if (relations.every((rule) => candidate[rule.before][rule.axis] < candidate[rule.after][rule.axis])) count += 1;
    }
  }
  return count;
}

export function validatePuzzles(): string[] {
  return puzzles.filter((puzzle) => solutionCount(puzzle) !== 1).map((puzzle) => puzzle.id);
}

export function puzzleForDate(dateKey: string): Puzzle {
  const day = Math.floor(Date.parse(`${dateKey}T00:00:00Z`) / 86_400_000);
  return puzzles[((day % puzzles.length) + puzzles.length) % puzzles.length];
}

export const demoPuzzle = puzzles[4];

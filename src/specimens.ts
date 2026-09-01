import type { SpecimenId } from './puzzles';

export function specimenSvg(id: SpecimenId): string {
  const common = 'viewBox="0 0 80 80" aria-hidden="true" focusable="false"';
  if (id === 'fern') return `<svg ${common}><path d="M42 70C40 51 40 32 45 10"/><path d="M42 55C30 51 22 44 16 35M42 47C53 42 60 34 64 24M42 38C32 34 25 28 21 20M44 28C52 24 57 18 60 12"/><ellipse cx="27" cy="46" rx="8" ry="3" transform="rotate(30 27 46)"/><ellipse cx="55" cy="36" rx="8" ry="3" transform="rotate(-38 55 36)"/></svg>`;
  if (id === 'acorn') return `<svg ${common}><path d="M42 20C37 11 29 9 23 12"/><path d="M40 25C51 25 59 34 57 45C55 57 45 67 38 68C30 64 22 54 23 43C24 32 31 25 40 25Z"/><path d="M25 36C31 29 48 28 56 37C47 41 34 42 25 36Z"/><path d="M20 14C30 10 36 16 35 24C26 26 20 21 20 14Z"/></svg>`;
  if (id === 'berry') return `<svg ${common}><path d="M39 64C40 45 39 30 32 17M39 36C50 28 57 22 61 14"/><path d="M31 18C24 11 16 13 13 20C20 25 28 24 31 18ZM59 15C51 9 44 12 42 19C49 24 56 22 59 15Z"/><circle cx="29" cy="44" r="9"/><circle cx="46" cy="43" r="9"/><circle cx="38" cy="56" r="9"/><path d="M28 40l2 3 3-2M45 39l2 3 3-2M37 52l2 3 3-2"/></svg>`;
  return `<svg ${common}><path d="M24 65C39 53 50 38 57 15"/><path d="M53 17C65 19 68 29 61 37C52 36 48 28 53 17ZM41 38C52 39 56 48 50 56C41 55 37 48 41 38ZM27 53C36 54 40 62 35 69C27 68 23 61 27 53Z"/><path d="M58 23l5 8M45 43l6 8M30 57l5 7"/></svg>`;
}

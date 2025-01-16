import { Chunk } from './types';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const directionToArr: Record<Direction, [number, number]> = {
  LEFT: [0, 1],
  DOWN: [1, 0],
  RIGHT: [0, 1],
  UP: [1, 0],
};

/** check if chunk can be applied right next to other chunk */
export function canAppendChunk(
  chunk1: Chunk,
  chunk2: Chunk,
  direction: Direction
): boolean {
  const h = chunk1.length;
  const w = chunk1[0].length;
  const [dx, dy] = directionToArr[direction];

  let row = 0,
    col = 0;

  if (direction === 'LEFT') col = w - 1;
  if (direction === 'DOWN') row = h - 1;

  function oob() {
    return row >= 0 && row < h && col >= 0 && col < w;
  }

  while (oob()) {
    if (chunk1[row][col] && chunk2[row][col]) return true;

    row += dy;
    col += dx;
  }

  return false;
}

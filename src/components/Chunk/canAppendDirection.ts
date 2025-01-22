import { DIRECTION_TO_ARR } from './constants';
import { isOob } from './isOob';
import { Chunk, Direction } from './types';

export function canAppendDirection(
  chunk: Chunk,
  direction: Direction
): boolean {
  const s = chunk.length,
    [dx, dy] = DIRECTION_TO_ARR[direction];
  let y = 0,
    x = 0;

  if (direction === 'LEFT') x = s - 1;
  if (direction === 'DOWN') y = s - 1;

  while (!isOob([x, y], chunk)) {
    if (chunk[y][x] !== 0) return true;
    x += dx;
    y += dy;
  }

  return false;
}

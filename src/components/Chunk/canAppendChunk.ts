import { canAppendDirection } from './canAppendDirection';
import { DIRECTION_TO_ARR } from './constants';
import { convertPos } from './convertPos';
import { isOob } from './isOob';
import { Chunk, Direction } from './types';

/** check if chunk can be applied right next to other chunk */
export function canAppendChunk(
  chunk1: Chunk,
  chunk2: Chunk,
  /**
   * What side chunk2 appended to from chunk1
   *
   * LEFT would be that chunk1 on right and chunk2 on left
   */
  direction: Direction
): boolean {
  if (!canAppendDirection(chunk1, direction)) return false;

  const s = chunk1.length,
    [dx, dy] = DIRECTION_TO_ARR[direction];
  let y = 0,
    x = 0;

  if (direction === 'LEFT') x = s - 1;
  if (direction === 'DOWN') y = s - 1;

  while (!isOob([x, y], chunk1)) {
    const [x2, y2] = convertPos([x, y], s);
    if (chunk1[y][x] && chunk2[s - 1 - y2][s - 1 - x2]) return true;

    y += dy;
    x += dx;
  }

  return false;
}

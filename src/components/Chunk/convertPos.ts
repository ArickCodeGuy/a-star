import { Direction, Position } from './types';

/**
 * Returns position of chunk that is beeing appended and it's corresponding touching position
 */
export function convertPos(
  [x, y]: Position,
  size: number,
  direction: Direction
): Position {
  let nx = x,
    ny = y;

  switch (direction) {
    case 'LEFT':
      nx = 0;
      break;
    case 'RIGHT':
      nx = size - 1;
      break;
    case 'DOWN':
      ny = 0;
      break;
    case 'UP':
      ny = size - 1;
      break;
  }

  // @@TODO
  return [nx, ny];
}

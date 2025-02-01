import { Direction } from '../types';

export const DIRECTION_TO_MOVE_ARR: Record<Direction, [number, number]> = {
  LEFT: [1, 0],
  RIGHT: [-1, 0],
  DOWN: [0, 1],
  UP: [0, -1],
};

export const DIRS = Object.values(DIRECTION_TO_MOVE_ARR);

export const DIRECTION_ARR = Object.keys(DIRECTION_TO_MOVE_ARR) as Direction[];

/** used for appending chunks and checking if they are compatible */
export const DIRECTION_TO_ARR: Record<Direction, [number, number]> = {
  LEFT: [0, 1],
  DOWN: [1, 0],
  RIGHT: [0, 1],
  UP: [1, 0],
};

export const CHUNK_CELL_SIZE = 50;

export const CHUNK_CELL_NAME = 'CHUNK_CELL';

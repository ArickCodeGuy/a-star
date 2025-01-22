import { Direction } from '../types';

export const DIRECTION_TO_ARR: Record<Direction, [number, number]> = {
  LEFT: [0, 1],
  DOWN: [1, 0],
  RIGHT: [0, 1],
  UP: [1, 0],
};

import { DIRS } from '../../Chunk/constants';
import { Position } from '../../Chunk/types';
import { PositionMap } from '../types';

export function getPath(
  [start, end]: Position[],
  map: PositionMap
): Position[] {
  if (!start || !end) return [];

  if (start[0] === end[0] && start[1] === end[1]) return [];
}

import { Position } from '../components/Chunk/types';
import { PositionMap } from '../components/Map/types';
import { getPositionKey } from '../components/Map/utils/getPositionKey';

export function aStar<T>(
  [start, end]: Position[],
  map: PositionMap<T>
): Position[] {
  if (!start || !end) return [];

  if (start[0] === end[0] && start[1] === end[1]) {
    console.warn('Start position is end position');
    return [];
  }

  if (!map[getPositionKey(start)]) {
    console.warn('Start position is invalid');
    return [];
  }

  if (!map[getPositionKey(end)]) {
    console.warn('End position is invalid');
    return [];
  }

  if (getPositionKey(start) === getPositionKey(end)) {
    console.warn('Start position === End position');
    return [start];
  }

  // @@TODO
  return [];
}

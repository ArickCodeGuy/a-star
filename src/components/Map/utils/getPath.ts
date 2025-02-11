import { PriorityQueue } from '../../../utils/PriorityQueue';
import { DIRS } from '../../Chunk/constants';
import { getPositionFilledNeighbors } from '../../Chunk/getNeighbors';
import { Position } from '../../Chunk/types';
import { PositionMap } from '../types';
import { getPositionKey, PositionKey } from './getPositionKey';
import { positionKeyToPosition } from './positionKeyToPosition';

// Manhattan Distance
/** {@link https://www.geeksforgeeks.org/a-search-algorithm/ } */
export function getManhattanDistance([a, b]: Position[]): number {
  const x = Math.abs(b[0] - a[0]),
    y = Math.abs(b[1] - a[1]);

  return x + y;
}

export function getPath<T>(
  [start, end]: Position[],
  map: PositionMap<T>
): Position[] {
  if (!start || !end) return [];

  if (start[0] === end[0] && start[1] === end[1]) return [];

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
    return [];
  }

  const endKey = getPositionKey(end);
  const path: Position[] = [];

  // @@TODO
  function dfs(
    curr: Position = start,
    visited = new Set<PositionKey>()
  ): boolean {
    const key = getPositionKey(curr);
    if (visited.has(key)) return false;
    visited.add(key);
    path.push(curr);
    if (key === endKey) return true;

    for (const next of getPositionFilledNeighbors(getPositionKey(curr), map)
      .map((i) => positionKeyToPosition(i))
      .sort(
        (a, b) =>
          getManhattanDistance([a, end]) - getManhattanDistance([b, end])
      )) {
      if (dfs(next, visited)) return true;
    }

    path.pop();
    return false;
  }
  if (dfs()) return path;

  console.warn(
    `Impossible to reach end: ${getPositionKey(
      end
    )} from start: ${getPositionKey(start)} position`
  );
  return [];
}

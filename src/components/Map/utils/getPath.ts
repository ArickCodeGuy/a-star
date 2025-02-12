import { PriorityQueue } from '../../../utils/PriorityQueue';
import { Position } from '../../Chunk/types';
import { getPositionFilledNeighbors } from '../../Chunk/utils/getNeighbors';
import { PositionMap } from '../types';
import { getPositionKey, PositionKey } from './getPositionKey';
import { positionKeyToPosition } from './positionKeyToPosition';

/**
 * {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan Distance}
 *
 * {@link https://www.geeksforgeeks.org/a-search-algorithm/ geeksforgeeks}
 */
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
    return [start];
  }

  /** graph of optimal path from position to start position */
  const graph: Map<PositionKey, PositionKey> = new Map();
  const endKey = getPositionKey(end);
  const startKey = getPositionKey(start);

  function graphToPositionArray(): Position[] {
    const res: PositionKey[] = [];
    // We go in reverse from end to start
    let curr = endKey;
    while (curr !== startKey) {
      res.push(curr);
      const next = graph.get(curr);
      if (!next || next === curr) {
        console.warn('Invalid graph. Graph should have path from end to start');
        return [];
      }
      curr = next;
    }
    res.push(startKey);
    return res.reverse().map(positionKeyToPosition);
  }

  // May be could be better written
  /** [current postion, previous position] */
  const queue = new PriorityQueue<PositionKey[]>(
    ([a], [b]) =>
      getManhattanDistance([positionKeyToPosition(a), end]) <
      getManhattanDistance([positionKeyToPosition(b), end])
  );
  queue.push([startKey, startKey]);

  while (queue.size()) {
    const [curr, prev] = queue.pop();

    // Visited
    if (graph.has(curr)) continue;
    graph.set(curr, prev);

    // Found path to end
    if (curr === endKey) return graphToPositionArray();

    // Queue new edges
    for (const next of getPositionFilledNeighbors(curr, map)) {
      queue.push([next, curr]);
    }
  }

  console.warn(
    `Impossible to reach end: ${getPositionKey(
      end
    )} from start: ${getPositionKey(start)} position`
  );
  return [];
}

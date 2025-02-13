import { Position } from '../../Chunk/types';
import { getPositionFilledNeighbors } from '../../Chunk/utils/getNeighbors';
import { PositionMap } from '../types';
import { getPositionKey, PositionKey } from './getPositionKey';
import { positionKeyToPosition } from './positionKeyToPosition';

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

  let positions: PositionKey[] = [startKey];
  graph.set(startKey, startKey);

  // @@TODO So what would we do if we have different value per edge
  // Traverse all map to fill graph
  // BFS
  while (positions.length) {
    const nextPositions: PositionKey[] = [];

    for (const position of positions) {
      for (const next of getPositionFilledNeighbors(position, map)) {
        if (graph.has(next)) continue;
        graph.set(next, position);
        nextPositions.push(next);
      }
    }

    positions = nextPositions;
  }

  if (graph.has(endKey)) return graphToPositionArray();

  console.warn(
    `Impossible to reach end: ${getPositionKey(
      end
    )} from start: ${getPositionKey(start)} position`
  );
  return [];
}

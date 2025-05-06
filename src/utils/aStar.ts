import { PriorityQueue } from '@datastructures-js/priority-queue';
import { Position } from '../components/Chunk/types';
import { PositionMap } from '../components/Map/types';
import {
  getPositionKey,
  PositionKey,
} from '../components/Map/utils/getPositionKey';
import { getManhattanDistance } from './getManhattanDistance';
import { getPositionNeighbors } from '../components/Chunk/utils/getNeighbors';
import { positionKeyToPosition } from '../components/Map/utils/positionKeyToPosition';

type XYG = [number, number, number];

function getFGH([x, y, G]: XYG, start: Position, end: Position): number[] {
  const H = getManhattanDistance([[x, y], end]);
  const F = G + H;

  return [F, G, H];
}

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

  // [x, y, G]
  const q = new PriorityQueue<XYG>((a, b) => {
    const A = getFGH(a, start, end);
    const B = getFGH(b, start, end);

    if (A[0] === B[0]) return A[2] - B[2];
    return A[0] - B[0];
  });
  q.push([...start, 0]);

  const visited = new Set<PositionKey>();
  /**
   * Graph of of optimal path from start to current position
   * [current position key]: [x, y, G] of previous position
   */
  const graph = new Map<PositionKey, XYG>();
  while (q.size()) {
    const [x, y, G] = q.pop()!;

    if (x === end[0] && y === end[1]) break;

    const currKey = getPositionKey([x, y]);
    if (visited.has(currKey)) continue;
    visited.add(currKey);

    for (const nextKey of getPositionNeighbors(currKey, map)) {
      if (visited.has(nextKey)) continue;
      const next = positionKeyToPosition(nextKey);
      q.push([...next, G + 1]);

      if (!graph.has(nextKey)) {
        graph.set(nextKey, [x, y, G + 1]);
        continue;
      }

      // We have multiple paths leading to next position
      const A = getFGH(graph.get(nextKey)!, start, end);
      const B = getFGH([x, y, G + 1], start, end);

      if (A[0] <= B[0]) continue;

      // If new found path is better
      graph.set(nextKey, [x, y, G + 1]);
    }
  }

  // No path found
  if (!graph.has(getPositionKey(end))) return [];

  const res: Position[] = [];
  let curr = end;
  while (curr[0] !== start[0] || curr[1] !== start[1]) {
    res.push(curr);
    const [x, y] = graph.get(getPositionKey(curr))!;
    curr = [x, y];
  }
  res.push(start);
  res.reverse();

  return res;
}

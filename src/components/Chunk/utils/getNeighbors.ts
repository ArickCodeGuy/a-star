import { PositionMap } from '../../Map/types';
import { getPositionKey, PositionKey } from '../../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../../Map/utils/positionKeyToPosition';
import { DIRS } from '../constants';

/** Get map all empty neighbors */
export function getEmptyNeighbors<T>(map: PositionMap<T>): PositionKey[] {
  const neighbors = new Set<PositionKey>();

  for (const pos of Object.keys(map) as PositionKey[]) {
    getPositionEmptyNeighbors(pos, map).forEach(neighbors.add);
  }

  return [...neighbors];
}

/** Get only filled position neighbors */
export function getPositionFilledNeighbors<T>(
  pos: PositionKey,
  map: PositionMap<T>
) {
  return getPositionNeighbors(pos, map).filter((key) => Boolean(map[key]));
}

/** Get position empty neighbors */
export function getPositionEmptyNeighbors<T>(
  pos: PositionKey,
  map: PositionMap<T>
): PositionKey[] {
  return getPositionNeighbors(pos, map).filter((p) => !map[p]);
}

/** Get empty and filled position neighbors */
export function getPositionNeighbors<T>(
  pos: PositionKey,
  map: PositionMap<T>
): PositionKey[] {
  if (!map[pos]) return [];

  const [x, y] = positionKeyToPosition(pos);

  let res: PositionKey[] = [];
  for (const [dx, dy] of DIRS) {
    res.push(getPositionKey([x + dx, y + dy]));
  }

  return res;
}

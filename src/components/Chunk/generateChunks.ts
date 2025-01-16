import { getRandomItemFromArray } from '../../utils/getRandomItemFromArray';
import { MapOfChunks } from '../Map/types';
import { getPositionKey, PositionKey } from '../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../Map/utils/positionKeyToPosition';
import { ChunkOptions } from './types';

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export function generateChunks(
  minSize: number,
  range: number,
  chunksArr: ChunkOptions[]
): MapOfChunks {
  const map: MapOfChunks = {};
  const size = minSize + Math.floor(Math.random() * (range + 1));

  function getEmptyNeighbors(map: MapOfChunks): PositionKey[] {
    const set = new Set<PositionKey>();

    for (const key of Object.keys(map)) {
      const { x, y } = positionKeyToPosition(key as PositionKey);

      for (const [dx, dy] of DIRS) {
        const newPositionKey = getPositionKey({ x: x + dx, y: y + dy });
        if (map[newPositionKey]) continue;
        set.add(newPositionKey);
      }
    }

    return [...set];
  }

  for (let i = 0; i < size; i++) {
    let key: PositionKey;

    if (i === 0) {
      key = getPositionKey({ x: 0, y: 0 });
    } else {
      key = getRandomItemFromArray(getEmptyNeighbors(map));
    }
    const chunk = getRandomItemFromArray(chunksArr);

    map[key] = chunk.id;
  }

  return map;
}

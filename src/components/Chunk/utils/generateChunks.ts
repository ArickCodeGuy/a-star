import {
  getRandomIndexFromArray,
  getRandomItemFromArray,
} from '../../../utils/getRandomItemFromArray';
import { MapOfChunks } from '../../Map/types';
import { getPositionKey } from '../../Map/utils/getPositionKey';
import { DIRECTION_ARR } from '../constants';
import { ChunkOptions } from '../types';
import { getAppendableChunksIdxByDirection } from './getAppendableChunksByDirection';
import { getAppendablePositionsByDirection } from './getAppendablePositionsByDirection';
import { getPositionKeyByPositionAndDirection } from './getPositionKeyFromPreviousAndDirection';

export function generateChunks(
  minSize: number,
  range: number,
  chunksArr: ChunkOptions[]
): MapOfChunks {
  const map: MapOfChunks = {};
  let size = minSize + Math.floor(Math.random() * (range + 1));
  console.log('size', size);

  // spawn first cell at center
  map[getPositionKey([0, 0])] = getRandomIndexFromArray(chunksArr);

  for (let i = 1; i < size; i++) {
    // 1. Choose direction
    // 2. Get all possible positions that can append at least one type of chunk
    // 3. Get random position
    // 4. Get random chunk, that we can append, for this position

    // 1.
    const appendDirection = getRandomItemFromArray(DIRECTION_ARR);

    // 2.
    const appendablePositions = getAppendablePositionsByDirection(
      map,
      chunksArr,
      appendDirection
    );

    if (!appendablePositions.length) {
      console.warn(
        'No appendable chunks. Should fix probably',
        map,
        appendDirection
      );
      // @@TODO Fix if we could not append for any direction to any of the chunks
      size = Math.min(10000, size + 1);
      continue;
    }

    // 3.
    const key = getRandomItemFromArray(appendablePositions);
    const originalPosition = getPositionKeyByPositionAndDirection(
      key,
      appendDirection,
      true
    );
    const chunkIdx = map[originalPosition];

    const idx = getRandomItemFromArray(
      getAppendableChunksIdxByDirection(chunkIdx, chunksArr, appendDirection)
    );
    map[key] = idx;
  }

  return map;
}

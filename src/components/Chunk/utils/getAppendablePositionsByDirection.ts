import { PositionMap } from '../../Map/types';
import { getPositionKey, PositionKey } from '../../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../../Map/utils/positionKeyToPosition';
import { canAppendChunk } from './canAppendChunk';
import { DIRECTION_TO_MOVE_ARR } from '../constants';
import { ChunkOptions, Direction } from '../types';

export function getAppendablePositionsByDirection<T>(
  map: PositionMap<T>,
  chunks: ChunkOptions[],
  direction: Direction
): PositionKey[] {
  const res: PositionKey[] = [];

  const [dx, dy] = DIRECTION_TO_MOVE_ARR[direction];

  for (const [pos, id] of Object.entries(map) as [PositionKey, number][]) {
    const [x, y] = positionKeyToPosition(pos);
    const nx = x + dx,
      ny = y + dy;
    const key = getPositionKey([nx, ny]);

    // if chunk already exists
    if (map[key]) continue;

    // check if we can at least append one chunk
    for (const appendableChunk of chunks) {
      if (!canAppendChunk(chunks[id].cells, appendableChunk.cells, direction))
        continue;
      res.push(key);
      break;
    }
  }

  return res;
}

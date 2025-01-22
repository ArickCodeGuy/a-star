import { MapOfCells, MapOfChunks } from '../Map/types';
import { getPositionKey, PositionKey } from '../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../Map/utils/positionKeyToPosition';
import { ChunkOptions } from './types';

export function generateCells(
  chunks: MapOfChunks,
  chunksArr: ChunkOptions[]
): MapOfCells {
  // size of chunks
  const size = chunksArr[0].cells.length;

  const map: MapOfCells = {};
  const chunksMap = chunksArr.reduce<Map<number, ChunkOptions>>(
    (map, i, idx) => {
      map.set(idx, i);
      return map;
    },
    new Map()
  );

  for (const [pos, id] of Object.entries(chunks) as [PositionKey, number][]) {
    const chunk = chunksMap.get(id);
    if (!chunk) throw new Error(`Chunk is not provided. id: ${id}`);

    const { x: chunkX, y: chunkY } = positionKeyToPosition(pos);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const v = chunk.cells[y][x];
        if (!v) continue;
        const key = getPositionKey({
          x: chunkX * size + x,
          y: chunkY * size + y,
        });
        map[key] = v;
      }
    }
  }

  return map;
}

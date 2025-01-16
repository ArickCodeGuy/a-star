import { MapOfCells, MapOfChunks } from '../Map/types';
import { ChunkOptions } from './types';

export function generateCells(
  chunks: MapOfChunks,
  chunksArr: ChunkOptions[]
): MapOfCells {
  const map: MapOfCells = {};
  const chunksMap = chunksArr.reduce<Map<ChunkOptions['id'], ChunkOptions>>(
    (map, i) => {
      map.set(i.id, i);
      return map;
    },
    new Map()
  );

  for (const [pos, id] of Object.entries(chunks)) {
    const chunk = chunksMap.get(id);
    if (!chunk) throw new Error(`Chunk is not provided. id: ${id}`);
  }

  return map;
}

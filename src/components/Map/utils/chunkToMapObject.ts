import { ChunkOptions } from '../../Chunk/types';
import { MapOptions, MapRectObject } from '../types';

const CHUNK_CELL_SIZE = 50;

export const chunkToMapObject = (
  chunk: ChunkOptions,
  position: MapOptions['position']
): MapOptions['objects'] => {
  const objects: MapRectObject[] = [];

  for (let row = 0; row < chunk.size; row++) {
    for (let col = 0; col < chunk.size; col++) {
      if (!chunk.cells[row][col]) continue;

      objects.push({
        type: 'rect',
        x: col * (CHUNK_CELL_SIZE + position.x),
        y: row * (CHUNK_CELL_SIZE + position.y),
        // -1 for gap
        width: CHUNK_CELL_SIZE - 1,
        height: CHUNK_CELL_SIZE - 1,
        color: 'white',
        text: String(chunk.cells[row][col]),
        textColor: 'black',
      });
    }
  }

  return objects;
};

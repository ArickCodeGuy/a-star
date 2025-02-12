import { canAppendChunk } from './canAppendChunk';
import { ChunkOptions, Direction } from '../types';

/** Get all possible chunk idx that can be appended to `chunk` in specific direction */
export function getAppendableChunksIdxByDirection(
  chunkIdx: number,
  chunks: ChunkOptions[],
  direction: Direction
): number[] {
  return chunks.reduce<number[]>((res, chunk2, idx) => {
    if (canAppendChunk(chunks[chunkIdx].cells, chunk2.cells, direction)) {
      res.push(idx);
    }
    return res;
  }, []);
}

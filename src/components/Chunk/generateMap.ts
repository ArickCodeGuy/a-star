import { MapOfCells } from '../Map/types';
import { generateCells } from './generateCells';
import { generateChunks } from './generateChunks';
import { ChunkOptions } from './types';

export function generateMap(
  minSize: number,
  range: number,
  chunksArr: ChunkOptions[]
): MapOfCells {
  return generateCells(generateChunks(minSize, range, chunksArr), chunksArr);
}

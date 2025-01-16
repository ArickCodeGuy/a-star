import { ChunkOptions } from '../types';

export const DEFAULT_3_3_CHUNK_1: ChunkOptions = {
  id: 0,
  size: 3,
  cells: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};
export const DEFAULT_3_3_CHUNK_2: ChunkOptions = {
  id: 1,
  size: 3,
  cells: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
};
export const DEFAULT_3_3_CHUNK_3: ChunkOptions = {
  id: 2,
  size: 3,
  cells: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

export const CHUNKS_3_3 = [
  DEFAULT_3_3_CHUNK_1,
  DEFAULT_3_3_CHUNK_2,
  DEFAULT_3_3_CHUNK_3,
];

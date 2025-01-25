import { ChunkOptions } from '../types';

export const DEFAULT_3_3_CHUNK_1: ChunkOptions = {
  cells: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const DEFAULT_3_3_CHUNK_2: ChunkOptions = {
  cells: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
};

export const DEFAULT_3_3_CHUNK_3: ChunkOptions = {
  cells: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

export const DEFAULT_3_3_CHUNK_4: ChunkOptions = {
  cells: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
  ],
};

export const CHUNKS_3_3 = [
  DEFAULT_3_3_CHUNK_1,
  DEFAULT_3_3_CHUNK_2,
  DEFAULT_3_3_CHUNK_3,
  DEFAULT_3_3_CHUNK_4,
];

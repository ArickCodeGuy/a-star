export type ChunkOptions = {
  cells: Chunk;
};

export type CellValue = number;

export type Chunk = CellValue[][];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Position = [number, number];

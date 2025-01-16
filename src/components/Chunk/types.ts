export type ChunkOptions = {
  id: number;
  size: number;
  cells: Chunk;
};

export type CellValue = number;

export type Chunk = CellValue[][];

import { CellValue, ChunkOptions } from '../Chunk/types';
import { PositionKey } from './utils/getPositionKey';

export type MapRectObject = {
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
  textColor?: string;
};

export type MapCellObject = MapRectObject;

export type MapOptions = {
  size: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
  translate: {
    x: number;
    y: number;
  };
  zoom: number;
  renderDistance: number;
  objects: MapCellObject[];
};

export type MapOfChunks = Record<PositionKey, ChunkOptions['id']>;

export type MapOfCells = Record<PositionKey, CellValue>;

import { CellValue } from '../Chunk/types';
import { PositionKey } from './utils/getPositionKey';

export type MapRectObject = {
  type: 'rect';
  /** For identifying purposes only */
  name?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
  textColor?: string;
};

export type MapRenderObject = MapRectObject;

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
  objects: MapRenderObject[];
  onClick?: (e: MouseEvent, options: MapOptions) => void;
};

export type MapOfChunks = PositionMap;

export type MapOfCells = PositionMap<CellValue>;

export type PositionMap<T = number> = Record<PositionKey, T>;

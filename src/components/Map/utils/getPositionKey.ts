import { Position } from '../../Chunk/types';

export type PositionKey = `${Position[0]},${Position[1]}`;

export function getPositionKey([x, y]: Position): PositionKey {
  return `${x},${y}`;
}

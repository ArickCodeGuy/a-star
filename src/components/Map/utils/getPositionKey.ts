import { MapOptions } from '../types';

export type PositionKey =
  `${MapOptions['position']['x']},${MapOptions['position']['y']}`;

export function getPositionKey(position: MapOptions['position']): PositionKey {
  return `${position.x},${position.y}`;
}

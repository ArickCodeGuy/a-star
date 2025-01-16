import { MapOptions } from '../types';
import { PositionKey } from './getPositionKey';

export function positionKeyToPosition(
  key: PositionKey
): MapOptions['position'] {
  const [x, y] = key.split(',');

  return {
    x: Number(x),
    y: Number(y),
  };
}

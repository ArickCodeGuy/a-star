import { Position } from '../../Chunk/types';
import { PositionKey } from './getPositionKey';

export function positionKeyToPosition(key: PositionKey): Position {
  return key.split(',').map(Number) as Position;
}

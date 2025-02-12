import { PositionKey } from '../../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../../Map/utils/positionKeyToPosition';
import { CHUNK_CELL_SIZE } from '../constants';
import { Position } from '../types';

export function chunkCellPositionToMapPosition(pos: PositionKey): Position {
  return positionKeyToPosition(pos).map((i) => i * CHUNK_CELL_SIZE) as Position;
}

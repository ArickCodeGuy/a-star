import { getPositionKey, PositionKey } from '../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../Map/utils/positionKeyToPosition';
import { DIRECTION_TO_MOVE_ARR } from './constants';
import { Direction } from './types';

export function getPositionKeyByPositionAndDirection(
  position: PositionKey,
  direction: Direction,
  invert?: boolean
): PositionKey {
  let [dx, dy] = DIRECTION_TO_MOVE_ARR[direction];

  const [x, y] = positionKeyToPosition(position);
  if (invert) {
    dx = -dx;
    dy = -dy;
  }

  return getPositionKey([x + dx, y + dy]);
}

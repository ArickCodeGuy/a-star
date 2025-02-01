import { MapOfCells, MapRectObject } from '../Map/types';
import { PositionKey } from '../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../Map/utils/positionKeyToPosition';
import { CHUNK_CELL_NAME, CHUNK_CELL_SIZE } from './constants';
import { CellValue } from './types';

export function mapOfCellsToMapOfObjects(
  map: MapOfCells
): Map<PositionKey, MapRectObject> {
  const objects: ReturnType<typeof mapOfCellsToMapOfObjects> = new Map();

  for (const [pos, id] of Object.entries(map) as [PositionKey, CellValue][]) {
    const [x, y] = positionKeyToPosition(pos);

    objects.set(pos, {
      type: 'rect',
      name: CHUNK_CELL_NAME,
      x: CHUNK_CELL_SIZE * x,
      y: CHUNK_CELL_SIZE * y,
      // -1 for gap
      width: CHUNK_CELL_SIZE - 1,
      height: CHUNK_CELL_SIZE - 1,
      color: 'white',
      text: String(id),
      textColor: 'black',
    });
  }

  return objects;
}

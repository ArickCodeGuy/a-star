import { MapOfCells, MapOptions } from '../Map/types';
import { PositionKey } from '../Map/utils/getPositionKey';
import { positionKeyToPosition } from '../Map/utils/positionKeyToPosition';
import { CellValue } from './types';

const CHUNK_CELL_SIZE = 50;

export function mapOfCellsToMapOfObjects(
  map: MapOfCells
): MapOptions['objects'] {
  const objects: MapOptions['objects'] = [];

  for (const [pos, id] of Object.entries<[PositionKey, CellValue]>(map)) {
    const { x, y } = positionKeyToPosition(pos);

    objects.push({
      type: 'rect',
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

import {
  CHUNK_CELL_NAME,
  CHUNK_CELL_SIZE,
} from '../components/Chunk/mapOfCellsToMapOfObjects';
import { MapOptions } from '../components/Map/types';
import { getPositionKey } from '../components/Map/utils/getPositionKey';
import { isClickWithinRect } from '../components/Map/utils/isClickWithinRect';
import { PathState } from './usePath';

export const useMapClickHandler =
  (path: PathState): MapOptions['onClick'] =>
  (e, options) => {
    const x = e.offsetX - options.translate.x,
      y = e.offsetY - options.translate.y;
    const pos: MapOptions['position'] = { x, y };

    for (const obj of options.objects) {
      if (!isClickWithinRect(pos, obj) || obj.name !== CHUNK_CELL_NAME)
        continue;

      path.select(
        getPositionKey({
          x: Math.floor(x / CHUNK_CELL_SIZE),
          y: Math.floor(y / CHUNK_CELL_SIZE),
        })
      );
    }
  };

import {
  CHUNK_CELL_NAME,
  CHUNK_CELL_SIZE,
} from '../components/Chunk/constants';
import { MapOptions } from '../components/Map/types';
import { getMapAbsolutePosition } from '../components/Map/utils/getMapAbsolutePosition';
import { getPositionKey } from '../components/Map/utils/getPositionKey';
import { isClickWithinRect } from '../components/Map/utils/isClickWithinRect';
import { PathState } from './usePath';

export const useMapClickHandler =
  (path: PathState): MapOptions['onClick'] =>
  (e, options) => {
    const pos = getMapAbsolutePosition([e.offsetX, e.offsetY], options);

    for (const obj of options.objects) {
      if (!isClickWithinRect(pos, obj) || obj.name !== CHUNK_CELL_NAME)
        continue;

      path.select(
        getPositionKey([
          Math.floor(pos[0] / CHUNK_CELL_SIZE),
          Math.floor(pos[1] / CHUNK_CELL_SIZE),
        ])
      );
    }
  };

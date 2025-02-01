import {
  CHUNK_CELL_NAME,
  CHUNK_CELL_SIZE,
} from '../components/Chunk/constants';
import { Position } from '../components/Chunk/types';
import { MapOptions } from '../components/Map/types';
import { getPositionKey } from '../components/Map/utils/getPositionKey';
import { isClickWithinRect } from '../components/Map/utils/isClickWithinRect';
import { PathState } from './usePath';

export const useMapClickHandler =
  (path: PathState): MapOptions['onClick'] =>
  (e, options) => {
    const x = e.offsetX - options.translate[0],
      y = e.offsetY - options.translate[1];
    const pos: Position = [x, y];

    for (const obj of options.objects) {
      if (!isClickWithinRect(pos, obj) || obj.name !== CHUNK_CELL_NAME)
        continue;

      path.select(
        getPositionKey([
          Math.floor(x / CHUNK_CELL_SIZE),
          Math.floor(y / CHUNK_CELL_SIZE),
        ])
      );
    }
  };

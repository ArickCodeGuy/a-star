import { CHUNKS_3_3 } from './components/Chunk/constants/CHUNKS_3_3';
import { generateMap } from './components/Chunk/generateMap';
import {
  CHUNK_CELL_NAME,
  CHUNK_CELL_SIZE,
  mapOfCellsToMapOfObjects,
} from './components/Chunk/mapOfCellsToMapOfObjects';
import { UseMap } from './components/Map/Map';
import { MapOptions } from './components/Map/types';
import { isClickWithinRect } from './components/Map/utils/isClickWithinRect';
import './style.css';

const APP_EL = document.querySelector<HTMLDivElement>('#app')!;

const cells = generateMap(5, 5, CHUNKS_3_3);

const map = UseMap(APP_EL, {
  objects: mapOfCellsToMapOfObjects(cells),
  onClick(e, options) {
    const x = e.offsetX - options.translate.x,
      y = e.offsetY - options.translate.y;
    const pos: MapOptions['position'] = { x, y };
    for (const obj of options.objects) {
      if (!isClickWithinRect(pos, obj) || obj.name !== CHUNK_CELL_NAME)
        continue;
      console.log('isClickWithinRect', obj);
      console.log(
        'actual pos',
        Math.floor(x / CHUNK_CELL_SIZE),
        Math.floor(y / CHUNK_CELL_SIZE)
      );

      obj.color = 'red';
    }
  },
});

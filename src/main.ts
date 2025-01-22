import { CHUNKS_3_3 } from './components/Chunk/constants/CHUNKS_3_3';
import { generateMap } from './components/Chunk/generateMap';
import { mapOfCellsToMapOfObjects } from './components/Chunk/mapOfCellsToMapOfObjects';
import { UseMap } from './components/Map/Map';
import './style.css';

const APP_EL = document.querySelector<HTMLDivElement>('#app')!;

const cells = generateMap(5, 5, CHUNKS_3_3);

const map = UseMap(APP_EL, {
  objects: mapOfCellsToMapOfObjects(cells),
});

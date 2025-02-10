import { CHUNKS_3_3 } from './components/Chunk/constants/CHUNKS_3_3';
import { generateMap } from './components/Chunk/generateMap';
import { mapOfCellsToMapOfObjects } from './components/Chunk/mapOfCellsToMapOfObjects';
import { useMap as useMap } from './components/Map/Map';
import { usePath } from './composables/usePath';
import './style.css';
import { useMapClickHandler } from './composables/useMapClickHandler';

const APP_EL = document.querySelector<HTMLDivElement>('#app')!;

const cells = generateMap(5, 5, CHUNKS_3_3);
const mapOfObjects = mapOfCellsToMapOfObjects(cells);
const path = usePath(mapOfObjects, cells);

const map = useMap(APP_EL, {
  objects: [...mapOfObjects.values()],
  onClick: useMapClickHandler(path),
});

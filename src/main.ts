import { DEFAULT_3_3_CHUNK_1 } from './components/Chunk/constants/CHUNKS_3_3';
import { UseMap } from './components/Map/Map';
import { chunkToMapObject } from './components/Map/utils/chunkToMapObject';
import './style.css';

const APP_EL = document.querySelector<HTMLDivElement>('#app')!;

const map = UseMap();
map.options.objects.push(
  ...chunkToMapObject(DEFAULT_3_3_CHUNK_1, map.options.position)
);

APP_EL.appendChild(map.canvas);

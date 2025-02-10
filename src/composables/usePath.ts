import { mapOfCellsToMapOfObjects } from '../components/Chunk/mapOfCellsToMapOfObjects';
import { MapRectObject, PositionMap } from '../components/Map/types';
import { getPath } from '../components/Map/utils/getPath';
import {
  getPositionKey,
  PositionKey,
} from '../components/Map/utils/getPositionKey';
import { positionKeyToPosition } from '../components/Map/utils/positionKeyToPosition';

export type PathState = {
  select: (pos: PositionKey) => void;
};

/** *Magically* find best path from point "a" to "b" */
export function usePath<T>(
  mapOfObjects: ReturnType<typeof mapOfCellsToMapOfObjects>,
  map: PositionMap<T>
): PathState {
  const selectedPos: PositionKey[] = [];
  // @@TODO
  const path: MapRectObject[] = [];

  const select: PathState['select'] = (pos) => {
    if (selectedPos[0]) {
      mapOfObjects.get(selectedPos[0])!.color = 'white';
      selectedPos[1] = pos;
    } else {
      selectedPos[0] = pos;
    }

    const path = getPath(selectedPos.map(positionKeyToPosition), map);
    console.log(path);
    for (const p of path) {
      mapOfObjects.get(getPositionKey(p))!.color = 'yellow';
    }

    mapOfObjects.get(pos)!.color = 'red';
  };

  return {
    select,
  };
}

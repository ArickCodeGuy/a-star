import { Position } from '../components/Chunk/types';
import { mapOfCellsToMapOfObjects } from '../components/Chunk/utils/mapOfCellsToMapOfObjects';
import { PositionMap } from '../components/Map/types';
import { getPath } from '../components/Map/utils/getPath';
import {
  getPositionKey,
  PositionKey,
} from '../components/Map/utils/getPositionKey';
import { positionKeyToPosition } from '../components/Map/utils/positionKeyToPosition';
import { aStar } from '../utils/aStar';

export type PathState = {
  select: (pos: PositionKey) => void;
};

/** **Magically** find shortest path from point "a" to "b" */
export function usePath<T>(
  mapOfObjects: ReturnType<typeof mapOfCellsToMapOfObjects>,
  map: PositionMap<T>
): PathState {
  const selectedPos: PositionKey[] = [];
  let path: Position[] = [];

  // @@TODO use cell color
  function unmark() {
    for (const p of path) {
      mapOfObjects.get(getPositionKey(p))!.color = 'white';
    }
  }

  function mark() {
    for (const p of path) {
      mapOfObjects.get(getPositionKey(p))!.color = 'yellow';
    }
    mapOfObjects.get(getPositionKey(path[path.length - 1]))!.color = 'red';
    mapOfObjects.get(getPositionKey(path[0]))!.color = 'green';
  }

  const select: PathState['select'] = (pos) => {
    // Unmark previous path
    unmark();

    if (selectedPos[0] && !selectedPos[1]) {
      // If have one selected position then we select second position
      selectedPos.push(pos);
    } else {
      // If have two or none then remove second and assign first one
      selectedPos.pop();
      selectedPos[0] = pos;
    }

    // If choosen 2 positions then search path
    if (selectedPos[1]) {
      const newPath = getPath(selectedPos.map(positionKeyToPosition), map);
      // const newPath = aStar(selectedPos.map(positionKeyToPosition), map);
      if (newPath.length) path = newPath;
      else path = selectedPos.map(positionKeyToPosition);
    } else {
      path = selectedPos.map(positionKeyToPosition);
    }

    // Mark new path
    mark();
  };

  return {
    select,
  };
}

import { mapOfCellsToMapOfObjects } from '../components/Chunk/mapOfCellsToMapOfObjects';
import { MapRectObject } from '../components/Map/types';
import { PositionKey } from '../components/Map/utils/getPositionKey';

export type PathState = {
  select: (pos: PositionKey) => void;
};

/** *Magically* find best path from point "a" to "b" */
export function usePath(
  mapOfObjects: ReturnType<typeof mapOfCellsToMapOfObjects>
): PathState {
  const selectedPos: PositionKey[] = [];
  // @@TODO
  const path: MapRectObject[] = [];

  const select: PathState['select'] = (pos) => {
    if (selectedPos[0]) {
      mapOfObjects.get(selectedPos[0])!.color = 'white';
    }
    selectedPos[0] = pos;
    mapOfObjects.get(pos)!.color = 'red';
  };

  return {
    select,
  };
}

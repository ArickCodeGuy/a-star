import { Position } from '../../Chunk/types';
import { MapOptions } from '../types';

/** Position as absolute x,y coordinates on plain
 * Returns needed translate to center on point
 */
export function getTranslateToCenterOnPosition(
  position: Position,
  options: MapOptions
): MapOptions['translate'] {
  return [
    position[0] - options.size[0] / 2 / options.zoom.current,
    position[1] - options.size[1] / 2 / options.zoom.current,
  ];
}

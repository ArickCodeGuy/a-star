import { Position } from '../../Chunk/types';
import { MapOptions } from '../types';

/**
 * Position on canvas to absolute position on plain
 */
export function getMapAbsolutePosition(
  position: Position,
  options: MapOptions
): Position {
  return [
    options.translate[0] + position[0] / options.zoom.current,
    options.translate[1] + position[1] / options.zoom.current,
  ];
}

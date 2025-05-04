import { Position } from '../components/Chunk/types';

/**
 * {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan Distance}
 *
 * {@link https://www.geeksforgeeks.org/a-search-algorithm/ geeksforgeeks}
 */
export function getManhattanDistance([a, b]: Position[]): number {
  const x = Math.abs(b[0] - a[0]),
    y = Math.abs(b[1] - a[1]);

  return x + y;
}

import { MapOptions, MapRenderObject } from '../types';

export function isClickWithinRect(
  { x, y }: MapOptions['position'],
  rect: MapRenderObject
): boolean {
  switch (rect.type) {
    case 'rect':
      return (
        x >= rect.x &&
        y >= rect.y &&
        x <= rect.x + rect.width &&
        y <= rect.y + rect.height
      );
  }
}

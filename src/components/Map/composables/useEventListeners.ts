import { CHUNK_CELL_NAME } from '../../Chunk/mapOfCellsToMapOfObjects';
import { Position } from '../../Chunk/types';
import { MapOptions, MapRenderObject } from '../types';
import { isClickWithinRect } from '../utils/isClickWithinRect';

export const useEventListeners = (
  canvas: HTMLCanvasElement,
  options: MapOptions
) => {
  let mouseDownX = 0,
    mouseDownY = 0,
    mouseDownTranslateX = 0,
    mouseDownTranslateY = 0,
    choosenRect: MapRenderObject;

  function handleMoveWithinCanvas(e: MouseEvent) {
    // @@TODO fix oob
    const xDiff = e.clientX - mouseDownX;
    const yDiff = e.clientY - mouseDownY;

    options.translate.x = mouseDownTranslateX + xDiff;
    options.translate.y = mouseDownTranslateY + yDiff;
  }

  function handleMousedown(e: MouseEvent) {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    mouseDownTranslateX = options.translate.x;
    mouseDownTranslateY = options.translate.y;

    document.addEventListener('mousemove', handleMoveWithinCanvas);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleMoveWithinCanvas);
      },
      { once: true }
    );
  }

  function handleClick(e: MouseEvent): void {
    options.onClick?.(e, options);
  }

  canvas.addEventListener('dblclick', handleClick);
  canvas.addEventListener('mousedown', handleMousedown);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('dblclick', handleClick);
  }

  return removeEventListeners;
};

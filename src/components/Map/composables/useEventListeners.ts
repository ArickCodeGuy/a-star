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
    const x = e.offsetX - options.translate.x,
      y = e.offsetY - options.translate.y;
    const pos: MapOptions['position'] = { x, y };
    for (const obj of options.objects) {
      if (!isClickWithinRect(pos, obj) || obj.name !== CHUNK_CELL_NAME)
        continue;
      console.log('isClickWithinRect', obj);

      if (choosenRect) {
        choosenRect.color = 'white';
      }

      obj.color = 'red';
      choosenRect = obj;
    }
  }

  canvas.addEventListener('dblclick', handleClick);
  canvas.addEventListener('mousedown', handleMousedown);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('dblclick', handleClick);
  }

  return removeEventListeners;
};

import { Position } from '../../Chunk/types';
import { MapOptions } from '../types';

export const useEventListeners = (
  canvas: HTMLCanvasElement,
  options: MapOptions
) => {
  let mouseDownX = 0,
    mouseDownY = 0,
    mouseDownTranslateX = 0,
    mouseDownTranslateY = 0;

  function handleMoveWithinCanvas(e: MouseEvent) {
    // @@TODO fix oob
    const xDiff = e.offsetX - mouseDownX;
    const yDiff = e.offsetY - mouseDownY;

    options.translate.x = mouseDownTranslateX + xDiff;
    options.translate.y = mouseDownTranslateY + yDiff;
  }

  function handleMousedown(e: MouseEvent) {
    mouseDownX = e.offsetX;
    mouseDownY = e.offsetY;
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
    // const x = e.offsetX,
    //   y = e.offsetY;
    // const pos: MapOptions['position'] = { x, y };
    // console.log(
    //   'click',
    //   e,
    //   options,
    //   x - options.translate.x,
    //   y - options.translate.y
    // );
    // for (const obj of options.objects) {
    //   // checkRect
    // }
  }

  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousedown', handleMousedown);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('click', handleClick);
  }

  return removeEventListeners;
};

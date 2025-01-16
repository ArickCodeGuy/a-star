import { MapOptions } from '../types';

export const useEventListeners = (
  canvas: HTMLCanvasElement,
  options: MapOptions
) => {
  function handleMoveWithinCanvas(e: MouseEvent) {
    options.translate.x += e.movementX;
    options.translate.y += e.movementY;
  }

  function handleMousedown() {
    document.addEventListener('mousemove', handleMoveWithinCanvas);
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', handleMoveWithinCanvas);
      },
      { once: true }
    );
  }

  canvas.addEventListener('mousedown', handleMousedown);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
  }

  return removeEventListeners;
};

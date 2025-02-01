import { MapOptions, MapRenderObject } from '../types';

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
    const xDiff = e.clientX - mouseDownX;
    const yDiff = e.clientY - mouseDownY;

    options.translate = [
      mouseDownTranslateX + xDiff,
      mouseDownTranslateY + yDiff,
    ];
  }

  function handleMousedown(e: MouseEvent) {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    [mouseDownTranslateX, mouseDownTranslateY] = options.translate;

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

  // @@TODO zoom
  function handleScroll(e: Event): void {}

  canvas.addEventListener('dblclick', handleClick);
  canvas.addEventListener('mousedown', handleMousedown);
  canvas.addEventListener('scroll', handleScroll);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('dblclick', handleClick);
    canvas.removeEventListener('scroll', handleScroll);
  }

  return removeEventListeners;
};

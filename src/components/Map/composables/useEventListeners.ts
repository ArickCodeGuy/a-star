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
    const xDiff = (e.clientX - mouseDownX) / options.zoom.current;
    const yDiff = (e.clientY - mouseDownY) / options.zoom.current;

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

  function handleScroll(e: WheelEvent): void {
    e.preventDefault();

    const step = (options.zoom.max - options.zoom.min) / 20;
    const scrollDirection = -Math.sign(e.deltaY);
    const prev = options.zoom.current;

    // options.zoom.current = Math.min(
    //   options.zoom.max,
    //   Math.max(options.zoom.min, options.zoom.current + step * scrollDirection)
    // );
    const diff = options.zoom.current / prev;

    const cursorPosition: Position = [
      e.offsetX + options.translate[0],
      e.offsetY + options.translate[1],
    ];
    const canvasCententerPosition: Position = [
      options.translate[0] + options.size[0] / 2,
      options.translate[1] + options.size[1] / 2,
    ];
    const vector = cursorPosition.map(
      (i, idx) => i - canvasCententerPosition[idx]
    );
    console.log(cursorPosition, canvasCententerPosition, vector);
    // options.translate = [options.translate[0] + ]
  }

  canvas.addEventListener('mousedown', handleMousedown);
  canvas.addEventListener('dblclick', handleClick);
  canvas.addEventListener('wheel', handleScroll);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('dblclick', handleClick);
    canvas.removeEventListener('wheel', handleScroll);
  }

  return removeEventListeners;
};

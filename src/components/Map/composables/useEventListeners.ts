import { Position } from '../../Chunk/types';
import { MapOptions } from '../types';
import { getMapAbsolutePosition } from '../utils/getMapAbsolutePosition';
import { getTranslateToCenterOnPosition } from '../utils/getTranslateToCenterOnPosition';

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
      mouseDownTranslateX - xDiff,
      mouseDownTranslateY - yDiff,
    ];
  }

  function handleMousedown(e: MouseEvent) {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    [mouseDownTranslateX, mouseDownTranslateY] = options.translate;

    console.log(
      getMapAbsolutePosition(
        options.size.map((i) => i / 2) as Position,
        options
      ),
      options.translate
    );

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

  function handleWheel(e: WheelEvent): void {
    e.preventDefault();
    handleZoom(-Math.sign(e.deltaY));
  }

  function handleKeydownZoom(e: KeyboardEvent): void {
    if (e.key !== '=' && e.key !== '-') return;
    e.preventDefault();
    handleZoom(e.key === '=' ? 1 : -1);
  }

  // Zooming into current canvas center position
  function handleZoom(direction: number): void {
    const step = (options.zoom.max - options.zoom.min) / 100;
    const currentCanvasCenterPosition = getMapAbsolutePosition(
      options.size.map((i) => i / 2) as Position,
      options
    );

    const nextZoom = Math.min(
      options.zoom.max,
      Math.max(options.zoom.min, options.zoom.current + step * direction)
    );
    options.zoom.current = nextZoom;
    options.translate = getTranslateToCenterOnPosition(
      currentCanvasCenterPosition,
      options
    );
  }

  canvas.addEventListener('mousedown', handleMousedown);
  canvas.addEventListener('dblclick', handleClick);
  canvas.addEventListener('wheel', handleWheel);
  document.addEventListener('keydown', handleKeydownZoom);

  function removeEventListeners() {
    canvas.removeEventListener('mousedown', handleMousedown);
    canvas.removeEventListener('dblclick', handleClick);
    canvas.removeEventListener('wheel', handleWheel);
    document.addEventListener('keydown', handleKeydownZoom);
  }

  return removeEventListeners;
};

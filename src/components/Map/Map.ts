import { useCtxRender } from './composables/useCtxRender';
import { useEventListeners } from './composables/useEventListeners';
import { MapOptions } from './types';

const SIZE_X = 800;
const SIZE_Y = 500;

const DEFAULT_OPTIONS: MapOptions = {
  position: { x: 0, y: 0 },
  translate: { x: SIZE_X / 2, y: SIZE_Y / 2 },
  zoom: 1,
  size: { x: SIZE_X, y: SIZE_Y },
  renderDistance: 3,
  objects: [],
};

export const useMap = (
  app: HTMLElement,
  partialOptions: Partial<MapOptions> = {}
) => {
  // @@TODO: deep copy
  const options: MapOptions = {
    ...DEFAULT_OPTIONS,
    ...partialOptions,
  };

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const render = useCtxRender(ctx, options);

  canvas.width = options.size.x;
  canvas.height = options.size.y;

  const removeEventListeners = useEventListeners(canvas, options);

  // @@TODO: optimize
  setInterval(() => {
    render();
  }, 1000 / 60);

  app.appendChild(canvas);

  return {
    canvas,
    options,
    removeEventListeners,
  };
};

import { useCtxRender } from './composables/useCtxRender';
import { useEventListeners } from './composables/useEventListeners';
import { MapOptions } from './types';

const SIZE_X = 800;
const SIZE_Y = 500;

const DEFAULT_OPTIONS: MapOptions = {
  translate: [SIZE_X / 2, SIZE_Y / 2],
  size: [SIZE_X, SIZE_Y],
  zoom: {
    min: 0.1,
    max: 10,
    current: 1,
  },
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

  canvas.width = options.size[0];
  canvas.height = options.size[1];

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

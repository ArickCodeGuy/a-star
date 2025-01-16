import { useCtxRender } from './composables/useCtxRender';
import { useEventListeners } from './composables/useEventListeners';
import { MapOptions } from './types';

const DEFAULT_OPTIONS: MapOptions = {
  position: { x: 0, y: 0 },
  translate: { x: 0, y: 0 },
  zoom: 1,
  size: { x: 800, y: 500 },
  renderDistance: 3,
  objects: [],
};

export const UseMap = (partialOptions: Partial<MapOptions> = {}) => {
  // @@TODO: no deep copy
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

  return {
    canvas,
    options,
    removeEventListeners,
  };
};

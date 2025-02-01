import { MapOptions } from '../types';

export const useCtxClear =
  (ctx: CanvasRenderingContext2D, options: MapOptions) => () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, options.size[0], options.size[1]);
  };

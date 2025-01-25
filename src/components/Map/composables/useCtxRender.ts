import { MapOptions, MapRectObject } from '../types';
import { useCtxClear } from './useCtxClear';

function renderRectObj(
  ctx: CanvasRenderingContext2D,
  obj: MapRectObject,
  options: MapOptions
): void {
  ctx.fillStyle = obj.color;
  const x = obj.x + options.translate.x;
  const y = obj.y + options.translate.y;

  ctx.fillRect(x, y, obj.width, obj.height);

  if (obj.text && obj.textColor) {
    ctx.fillStyle = obj.textColor;
    ctx.fillText(obj.text, x + 3, y + 10);
  }
}

export const useCtxRender =
  (ctx: CanvasRenderingContext2D, options: MapOptions) => () => {
    useCtxClear(ctx, options)();

    for (const obj of options.objects) {
      // @@TODO oob check?
      switch (obj.type) {
        case 'rect':
          renderRectObj(ctx, obj, options);
          break;
      }
    }
  };

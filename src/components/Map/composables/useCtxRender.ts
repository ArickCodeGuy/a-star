import { MapOptions, MapRectObject } from '../types';
import { useCtxClear } from './useCtxClear';

function renderRectObj(
  ctx: CanvasRenderingContext2D,
  obj: MapRectObject,
  options: MapOptions
): void {
  ctx.fillStyle = obj.color;
  const x = (obj.x + options.translate[0]) * options.zoom.current;
  const y = (obj.y + options.translate[1]) * options.zoom.current;

  ctx.fillRect(
    x,
    y,
    obj.width * options.zoom.current,
    obj.height * options.zoom.current
  );

  if (obj.text && obj.textColor) {
    ctx.fillStyle = obj.textColor;
    ctx.fillText(obj.text, x + 3, y + 10);
  }
}

export const useCtxRender = (
  ctx: CanvasRenderingContext2D,
  options: MapOptions
) => {
  const clear = useCtxClear(ctx, options);

  return () => {
    clear();

    for (const obj of options.objects) {
      // @@TODO oob check?
      switch (obj.type) {
        case 'rect':
          renderRectObj(ctx, obj, options);
          break;
      }
    }
  };
};

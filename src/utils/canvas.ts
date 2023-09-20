export function getCanvas(): { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } {
  const canvas = document.querySelector<HTMLCanvasElement>("#app");
  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) {
    throw new Error("No canvas");
  }

  return {
    canvas,
    ctx,  
  };
}

export function prepareCanvas(): void {
  const dpr = window.devicePixelRatio;
  const { canvas, ctx } = getCanvas();
  const { innerWidth, innerHeight } = window;

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  
  ctx.scale(dpr, dpr);
  
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
}

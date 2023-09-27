import { getCanvas } from "../utils/canvas";
import { Vector2 } from "../types/vector";
import blockSprite from "../img/blue-block.png";
import { toPixel } from "../utils/isometric";
import store from "../store";

const image = new Image();
image.src = blockSprite;

export default function Block(position: Vector2) {
  const { ctx } = getCanvas();
  let offsetPx = { x: 0, y: 0 };
  
  if (store.mouse.x === position.x && store.mouse.y === position.y) {
    offsetPx = { x: 0, y: 5 };
  }

  ctx.drawImage(image, toPixel(position).x, toPixel(position).y - offsetPx.y);
}
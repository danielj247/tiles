import { isHovered } from "../utils/interaction";
import { toPixel } from "../utils/isometric";
import { getCanvas } from "../utils/canvas";
import { Vector2 } from "../types/vector";
import blockSprite from "../img/grass-block.png";

const sprite = new Image();
sprite.src = blockSprite;

export default function Block(position: Vector2) {
  const { ctx } = getCanvas();
  const hovered = isHovered(position);

  let offsetPx = { x: 0, y: 0 };
  
  if (hovered) {
    offsetPx = { x: 0, y: 5 };
  }

  const x = Math.round(toPixel(position).x - offsetPx.x);
  const y = Math.round(toPixel(position).y - offsetPx.y);

  ctx.drawImage(sprite, x, y);
}
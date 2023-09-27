import { SPRITE_HEIGHT, SPRITE_WIDTH } from "../consts/sprite";
import { isHovered } from "../utils/interaction";
import { toPixel } from "../utils/isometric";
import { getCanvas } from "../utils/canvas";
import { Vector2 } from "../types/vector";
import { Entity } from "../types/entity";

const DEFAULT_SIZE: Vector2 = { x: 1, y: 1 };

interface BlockProps {
  entity: Entity;
}

export default function Block(props: BlockProps) {
  const { entity } = props;
  const { rotation, position, sprite, size } = entity;
  const { ctx } = getCanvas();
  const hovered = isHovered(position);

  let offsetPx = { x: 0, y: 0 };
  
  if (hovered) {
    offsetPx = { x: 0, y: 4 };
  }

  const x = Math.round(toPixel(position).x - offsetPx.x);
  const y = Math.round(toPixel(position).y - offsetPx.y);

  ctx.drawImage(sprite[rotation], x, y, SPRITE_WIDTH * size.x, SPRITE_HEIGHT * size.y);
}
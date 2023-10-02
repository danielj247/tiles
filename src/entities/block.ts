import { isHovered } from "@/utils/interaction";
import { toPixel } from "@/utils/isometric";
import { getCanvas } from "@/utils/canvas";
import { Entity } from "@/types/entity";
import { Tileset } from "@/types/tileset";

interface BlockProps {
  entity: Entity;
  tileset: Tileset;
  opacity?: number;
}

export default function Block(props: BlockProps) {
  const { entity, tileset, opacity } = props;
  const { rotation, position, sprite, size } = entity;
  const { ctx } = getCanvas();
  const hovered = isHovered(position);
  const pixels = toPixel(position, tileset);
  const gAlpha = ctx.globalAlpha;

  let offsetPx = { x: 0, y: 0 };

  if (hovered) {
    offsetPx = { x: 0, y: 4 };
  }

  if (opacity) {
    ctx.globalAlpha = opacity;
  }

  const x = Math.round(pixels.x - offsetPx.x);
  const y = Math.round(pixels.y - offsetPx.y);

  console.log(sprite);

  ctx.drawImage(
    sprite[rotation],
    x,
    y,
    tileset.tile.width * size.x,
    tileset.tile.height * size.y,
  );

  if (opacity) {
    ctx.globalAlpha = gAlpha;
  }
}
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
  const hovered = isHovered(entity);
  const pixels = toPixel(position, tileset);
  const gAlpha = ctx.globalAlpha;
  const gFilter = ctx.filter;

  if (opacity) {
    ctx.globalAlpha = opacity;
  }

  if (hovered) {
    ctx.filter = "brightness(120%)";
  }

  const x = Math.round(pixels.x);
  const y = Math.round(pixels.y);

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

  if (ctx.filter !== gFilter) {
    ctx.filter = gFilter;
  }
}

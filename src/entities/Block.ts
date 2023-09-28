import { isHovered } from "@/utils/interaction";
import { toPixel } from "@/utils/isometric";
import { getCanvas } from "@/utils/canvas";
import { Entity } from "@/types/entity";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "@/consts/sprite";
import { Tileset } from "@/types/tileset";

interface BlockProps {
  entity: Entity;
  tileset: Tileset;
}

export default function Block(props: BlockProps) {
  const { entity, tileset } = props;
  const { rotation, position, sprite, size } = entity;
  const { ctx } = getCanvas();
  const hovered = isHovered(position);
  const pixels = toPixel(position, tileset);

  let offsetPx = { x: 0, y: 0 };

  if (hovered) {
    offsetPx = { x: 0, y: 4 };
  }

  const x = Math.round(pixels.x - offsetPx.x);
  const y = Math.round(pixels.y - offsetPx.y);

  ctx.drawImage(
    sprite[rotation],
    x,
    y,
    tileset.tile.width * size.x,
    tileset.tile.height * size.y,
  );
}

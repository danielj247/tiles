import { isHovered } from "@/utils/interaction";
import { toPixel } from "@/utils/isometric";
import { getCanvas } from "@/utils/canvas";
import { Vector2 } from "@/types/vector";
import { Tileset } from "@/types/tileset";

interface TileProps {
  position: Vector2;
  tileset: Tileset;
}

export default function Tile(props: TileProps) {
  const { position, tileset } = props;
  const { ctx } = getCanvas();
  const hovered = isHovered(position);

  ctx.strokeStyle = hovered
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(255, 255, 255, 0.2)";

  const pixels = toPixel(position, tileset);

  const northPoint = {
    x: Math.round(pixels.x + tileset.tile.width / 2),
    y: Math.round(pixels.y + tileset.tile.height / 1.35),
  };

  const eastPoint = {
    x: Math.round(pixels.x + tileset.tile.width),
    y: Math.round(pixels.y + tileset.tile.height / 1.15),
  };

  const southPoint = {
    x: Math.round(pixels.x + tileset.tile.width / 2),
    y: Math.round(pixels.y + tileset.tile.height),
  };

  const westPoint = {
    x: Math.round(pixels.x),
    y: Math.round(pixels.y + tileset.tile.height / 1.15),
  };

  ctx.beginPath();
  ctx.moveTo(northPoint.x, northPoint.y);
  ctx.lineTo(eastPoint.x, eastPoint.y);
  ctx.lineTo(southPoint.x, southPoint.y);
  ctx.lineTo(westPoint.x, westPoint.y);
  ctx.closePath();
  ctx.stroke();
}

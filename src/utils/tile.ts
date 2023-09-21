import { TILE_SIZE } from "../consts/tile";
import { getCanvas } from "./canvas";

export function pixelToTile(x: number, y: number) {
  return {
    x: Math.floor((x / (TILE_SIZE / 2) + y / (TILE_SIZE / 4)) / 2) + 1,
    y: Math.floor((y / (TILE_SIZE / 4) - x / (TILE_SIZE / 2)) / 2) + 1,
    z: Math.floor((x / (TILE_SIZE / 2) + y / (TILE_SIZE / 4)) / 2) + 1,
  };
}

export function tileToPixel(x: number, y: number, z: number = 0) {
  const { canvas } = getCanvas();

  const screenX = (x - y) * (TILE_SIZE / 2) + canvas.width / 2;
  const screenY = (x + y) * (TILE_SIZE / 4) + canvas.height / 4;

  return {
    x: screenX,
    y: screenY,
  };
}

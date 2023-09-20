import { TILE_SIZE } from "../consts/tile";

export function pixelToIso(x: number, y: number) {
  return {
    x: Math.floor((x / (TILE_SIZE / 2) + y / (TILE_SIZE / 4)) / 2) + 1,
    y: Math.floor((y / (TILE_SIZE / 4) - x / (TILE_SIZE / 2)) / 2) + 1,
  };
}

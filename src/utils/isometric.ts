// https://gist.github.com/jordwest/8a12196436ebcf8df98a2745251915b5

import { Vector2 } from "../types/vector";
import store from "../store";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "../consts/sprite";

const i_x = 1;
const i_y = 0.25;
const j_x = -1;
const j_y = 0.25;

function invertMatrix(a: number, b: number, c: number, d: number) {
  // Determinant
  const det = 1 / (a * d - b * c);

  return {
    a: det * d,
    b: det * -b,
    c: det * -c,
    d: det * a,
  };
}

export function toPixel(grid: Vector2, camera = true) {
  let offset: Vector2 = { x: 0, y: 0 };

  if (camera) {
    offset = store.camera.position;
  }

  return {
    x:
      grid.x * i_x * 0.5 * SPRITE_WIDTH +
      grid.y * j_x * 0.5 * SPRITE_WIDTH +
      offset.x,
    y:
      grid.x * i_y * 0.5 * SPRITE_HEIGHT +
      grid.y * j_y * 0.5 * SPRITE_HEIGHT +
      offset.y,
  };
}

export function toGrid(pixel: Vector2, camera = true) {
  let offset: Vector2 = { x: 0, y: 0 };

  const a = i_x * 0.5 * SPRITE_WIDTH;
  const b = j_x * 0.5 * SPRITE_WIDTH;
  const c = i_y * 0.5 * SPRITE_HEIGHT;
  const d = j_y * 0.5 * SPRITE_HEIGHT;

  const inv = invertMatrix(a, b, c, d);

  if (camera) {
    offset = store.camera.position;
  }

  return {
    x: (pixel.x - offset.x) * inv.a + (pixel.y - offset.y) * inv.b,
    y: (pixel.x - offset.x) * inv.c + (pixel.y - offset.y) * inv.d,
  };
}

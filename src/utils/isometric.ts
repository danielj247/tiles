// Isometric helpers
// https://gist.github.com/jordwest/8a12196436ebcf8df98a2745251915b5

import { getStore } from "@/store";
import { Vector2 } from "@/types/vector";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "@/consts/sprite";
import { Tileset } from "@/types/tileset";

const FALLBACK_MODIFIERS = {
  i_x: 1,
  i_y: 0.25,
  j_x: 0.25,
  j_y: 1,
};

function mods(tileset: Tileset) {
  if (tileset?.tile?.width && tileset?.tile?.height) {
    return calculateModifiers(tileset.tile.width, tileset.tile.height);
  }

  return FALLBACK_MODIFIERS;
}

function calculateModifiers(width: number, height: number) {
  const i_x = 1;
  const i_y = width / height / 2;
  const j_x = -1;
  const j_y = width / height / 2;

  return { i_x, i_y, j_x, j_y };
}

function invertMatrix(a: number, b: number, c: number, d: number) {
  const det = 1 / (a * d - b * c);

  return {
    a: det * d,
    b: det * -b,
    c: det * -c,
    d: det * a,
  };
}

export function toPixel(grid: Vector2, tileset: Tileset, camera = true) {
  const store = getStore();
  const { i_x, i_y, j_x, j_y } = mods(tileset);
  const width = tileset?.tile?.width || SPRITE_WIDTH;
  const height = tileset?.tile?.height || SPRITE_HEIGHT;
  let offset: Vector2 = { x: 0, y: 0 };

  if (camera) {
    offset = store.camera.position;
  }

  return {
    x: grid.x * i_x * 0.5 * width + grid.y * j_x * 0.5 * width + offset.x,
    y: grid.x * i_y * 0.5 * height + grid.y * j_y * 0.5 * height + offset.y,
  };
}

export function toGrid(pixel: Vector2, tileset: Tileset, camera = true) {
  const store = getStore();
  const { i_x, i_y, j_x, j_y } = mods(tileset);
  const width = tileset?.tile?.width || SPRITE_WIDTH;
  const height = tileset?.tile?.height || SPRITE_HEIGHT;
  let offset: Vector2 = { x: 0, y: 0 };

  const a = i_x * 0.5 * width;
  const b = j_x * 0.5 * width;
  const c = i_y * 0.5 * height;
  const d = j_y * 0.5 * height;

  const inv = invertMatrix(a, b, c, d);

  if (camera) {
    offset = store.camera.position;
  }

  return {
    x: (pixel.x - offset.x) * inv.a + (pixel.y - offset.y) * inv.b,
    y: (pixel.x - offset.x) * inv.c + (pixel.y - offset.y) * inv.d,
  };
}

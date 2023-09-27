import store from "../store";
import { Vector2 } from "../types/vector";

export function isHovered(position: Vector2) {
  const x = Math.round(position.x);
  const y = Math.round(position.y);

  if (store.mouse.x === x && store.mouse.y === y) {
    return true;
  }

  return false;
}
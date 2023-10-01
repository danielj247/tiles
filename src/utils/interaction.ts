import { getStore } from "@/store";
import { Vector2 } from "@/types/vector";

export function isHovered(position: Vector2) {
  const store = getStore();
  const x = Math.round(position.x);
  const y = Math.round(position.y);

  if (store.mouse.position.x === x && store.mouse.position.y === y) {
    return true;
  }

  return false;
}

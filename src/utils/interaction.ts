import { getStore } from "@/store";
import { Entity } from "@/types/entity";

export function isHovered(entity: Entity) {
  const store = getStore();

  if (
    !store.editor.toolbar.hoveredEntities ||
    store.editor.toolbar.hoveredEntities.length === 0
  ) {
    return false;
  }

  return store.editor.toolbar.hoveredEntities.some((e) => e.id === entity.id);
}

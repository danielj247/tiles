import { getEditorStore } from "@/stores/editor";
import { Entity } from "@/types/entity";

export function isHovered(entity: Entity) {
  const editorStore = getEditorStore();
  const hoveredEnts = editorStore.toolbar.select.hoveredEntities;

  if (!hoveredEnts || hoveredEnts.length === 0) {
    return false;
  }

  return hoveredEnts.some((e) => e.id === entity.id);
}

import { Sprite } from "@/types/sprite";
import { Vector2 } from "@/types/vector";
import { Rotation } from "@/types/rotation";
import { Entity } from "@/types/entity";

export enum Tool {
  Components = "components",
  Select = "select",
  Delete = "delete",
}

export interface Editor {
  workspace: {
    selectedTile: Vector2 | undefined;
    setSelectedTile: (tile: Vector2 | undefined) => void;
  };

  toolbar: {
    selectedTool: Tool | undefined;
    setSelectedTool: (tool: Tool | undefined) => void;

    // Tool.Components related
    selectedComponent: Sprite | undefined;
    selectedComponentRotation: Rotation | undefined;
    setSelectedComponent: (component: Sprite | undefined) => void;
    setSelectedComponentRotation: (rotation: Rotation | undefined) => void;

    // Tool.Select related
    selectedEntity: Entity | undefined;
    setSelectedEntity: (entity: Entity | undefined) => void;
    hoveredEntities: Entity[] | undefined;
    setHoveredEntities: (entities: Entity[] | undefined) => void;
  };
}

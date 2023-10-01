import { Sprite } from "@/types/sprite";
import { Vector2 } from "@/types/vector";

export enum Tool {
  Components = "components",
}

export interface Editor {
  workspace: {
    selectedTile: Vector2 | undefined;
    setSelectedTile: (tile: Vector2 | undefined) => void;
  };

  toolbar: {
    selectedTool: Tool | undefined;
    setSelectedTool: (tool: Tool | undefined) => void;

    selectedComponent: Sprite | undefined;
    setSelectedComponent: (component: Sprite | undefined) => void;
  };
}

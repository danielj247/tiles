import { create } from "zustand";
import { Vector2 } from "@/types/vector";
import { Entity } from "@/types/entity";
import { Rotation } from "@/types/rotation";
import { Sprite } from "@/types/sprite";
import { Tool } from "@/types/tool";

export interface EditorStore {
  workspace: {
    selectedTile: Vector2 | undefined;
    setSelectedTile: (tile: Vector2 | undefined) => void;
  };

  toolbar: {
    selectedTool: Tool | undefined;
    setSelectedTool: (tool: Tool | undefined) => void;

    select: {
      selectedEntity: Entity | undefined;
      setSelectedEntity: (entity: Entity | undefined) => void;

      selectedVector: Vector2 | undefined;
      setSelectedVector: (vector: Vector2 | undefined) => void;

      hoveredEntities: Entity[] | undefined;
      setHoveredEntities: (entities: Entity[] | undefined) => void;
    };

    components: {
      selectedComponent: Sprite | undefined;
      setSelectedComponent: (component: Sprite | undefined) => void;

      selectedComponentRotation: Rotation | undefined;
      setSelectedComponentRotation: (rotation: Rotation | undefined) => void;
    };
  };
}

const useEditorStore = create<EditorStore>((set) => ({
  workspace: {
    selectedTile: undefined,
    setSelectedTile: (selectedTile) => {
      set((state) => ({
        workspace: {
          ...state.workspace,
          selectedTile,
        },
      }));
    },
  },

  toolbar: {
    selectedTool: Tool.Select,
    setSelectedTool: (selectedTool) => {
      set((state) => ({
        toolbar: {
          ...state.toolbar,
          selectedTool,
        },
      }));
    },

    select: {
      selectedEntity: undefined,
      setSelectedEntity: (selectedEntity) => {
        set((state) => ({
          toolbar: {
            ...state.toolbar,
            select: {
              ...state.toolbar.select,
              selectedEntity,
            },
          },
        }));
      },

      selectedVector: undefined,
      setSelectedVector: (selectedVector) => {
        set((state) => ({
          toolbar: {
            ...state.toolbar,
            select: {
              ...state.toolbar.select,
              selectedVector,
            },
          },
        }));
      },

      hoveredEntities: undefined,
      setHoveredEntities: (hoveredEntities) => {
        set((state) => ({
          toolbar: {
            ...state.toolbar,
            select: {
              ...state.toolbar.select,
              hoveredEntities,
            },
          },
        }));
      },
    },

    components: {
      selectedComponent: undefined,
      setSelectedComponent: (selectedComponent) => {
        set((state) => ({
          toolbar: {
            ...state.toolbar,
            components: {
              ...state.toolbar.components,
              selectedComponent,
            },
          },
        }));
      },

      selectedComponentRotation: Rotation.NORTH,
      setSelectedComponentRotation: (selectedComponentRotation) => {
        set((state) => ({
          toolbar: {
            ...state.toolbar,
            components: {
              ...state.toolbar.components,
              selectedComponentRotation,
            },
          },
        }));
      },
    },
  },
}));

const getEditorStore = useEditorStore.getState;

// useEditorStore for UI, getEditorStore for canvas
export { useEditorStore, getEditorStore };

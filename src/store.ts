import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Map } from "@/types/map";
import { Vector2 } from "@/types/vector";
import { Camera } from "@/types/camera";
import { Editor } from "./types/editor";

export interface Store {
  map: Map | undefined;
  setMap: (map: Map) => void;

  mouse: Vector2;
  setMouse: (mouse: Vector2) => void;

  camera: Camera;
  setCamera: (camera: Camera) => void;
  setCameraPosition: (position: Vector2) => void;
  setCameraTargetPosition: (targetPosition: Vector2) => void;
  setCameraZoom: (zoom: number) => void;
  setCameraPanning: (panning: boolean) => void;

  editor: Editor;
}

const useStore = create<Store>()(
  devtools((set) => ({
    map: undefined,

    setMap: (map: Map) => set({ map }),

    mouse: {
      x: NaN,
      y: NaN,
    },

    setMouse: (mouse: Vector2) => set({ mouse }),

    camera: {
      zoom: 1,
      panning: false,
      position: {
        x: 0,
        y: 0,
      },
      targetPosition: {
        x: 0,
        y: 0,
      },
    },

    setCamera: (camera: Camera) =>
      set((state) => ({
        camera: {
          ...state.camera,
          ...camera,
        },
      })),

    setCameraPosition: (position: Vector2) =>
      set((state) => ({
        camera: {
          ...state.camera,
          position,
        },
      })),

    setCameraTargetPosition: (targetPosition: Vector2) =>
      set((state) => ({
        camera: {
          ...state.camera,
          targetPosition,
        },
      })),

    setCameraZoom: (zoom: number) =>
      set((state) => ({
        camera: {
          ...state.camera,
          zoom,
        },
      })),

    setCameraPanning: (panning: boolean) =>
      set((state) => ({
        camera: {
          ...state.camera,
          panning,
        },
      })),

    editor: {
      workspace: {
        selectedTile: undefined,
        setSelectedTile: (selectedTile: Vector2 | undefined) =>
          set((state) => ({
            editor: {
              ...state.editor,
              workspace: {
                ...state.editor.workspace,
                selectedTile,
              },
            },
          })),
      },

      toolbar: {
        selectedTool: undefined,
        setSelectedTool: (selectedTool: Editor["toolbar"]["selectedTool"]) =>
          set((state) => ({
            editor: {
              ...state.editor,
              toolbar: {
                ...state.editor.toolbar,
                selectedTool,
              },
            },
          })),

        selectedComponent: undefined,
        setSelectedComponent: (
          selectedComponent: Editor["toolbar"]["selectedComponent"],
        ) =>
          set((state) => ({
            editor: {
              ...state.editor,
              toolbar: {
                ...state.editor.toolbar,
                selectedComponent,
              },
            },
          })),
      },
    },
  })),
);

const getStore = useStore.getState;

// useStore for UI, getStore for canvas
export { useStore, getStore };

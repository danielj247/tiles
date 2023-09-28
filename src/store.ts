import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Map } from "@/types/map";
import { Vector2 } from "@/types/vector";
import { Camera } from "@/types/camera";

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
}

const useStore = create<Store>()(
  devtools(
    (set) => ({
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

      setCamera: (camera: Partial<Store["camera"]>) =>
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
    }),
    {
      name: "store",
    },
  ),
);

const getStore = useStore.getState;

// useStore for UI, getStore for canvas
export { useStore, getStore };

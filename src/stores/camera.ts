import { create } from "zustand";
import { Vector2 } from "@/types/vector";

export interface CameraStore {
  position: Vector2;
  setPosition: (position: Vector2) => void;

  targetPosition: Vector2;
  setTargetPosition: (targetPosition: Vector2) => void;
  setTargetY: (y: number) => void;
  setTargetX: (x: number) => void;

  zoom: number;
  setZoom: (zoom: number) => void;

  panning: boolean;
  setPanning: (panning: boolean) => void;
}

const useCameraStore = create<CameraStore>()((set, get) => ({
  position: {
    x: 0,
    y: 0,
  },
  setPosition: (position: Vector2) => set({ position }),

  targetPosition: {
    x: 0,
    y: 0,
  },
  setTargetPosition: (targetPosition: Vector2) => set({ targetPosition }),
  setTargetY: (y: number) => {
    const { position } = get();
    set({ targetPosition: { ...position, y } });
  },
  setTargetX: (x: number) => {
    const { position } = get();
    set({ targetPosition: { ...position, x } });
  },

  zoom: 1,
  setZoom: (zoom: number) => set({ zoom }),

  panning: false,
  setPanning: (panning: boolean) => set({ panning }),
}));

const getCameraStore = useCameraStore.getState;

// useCameraStore for UI, getCameraStore for canvas
export { useCameraStore, getCameraStore };

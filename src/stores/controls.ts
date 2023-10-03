import { create } from "zustand";
import { Vector2 } from "@/types/vector";
import { getMapStore } from "./map";

export interface ControlsStore {
  mouse: {
    position: Vector2;
    inBounds: boolean;
  };
  setMouse: (mouse: Vector2) => void;

  keyboard: {
    [key: KeyboardEvent["key"]]: boolean;
  };
  setKeyboardInput: (key: KeyboardEvent["key"], value: boolean) => void;
}

const useControlsStore = create<ControlsStore>((set, get) => ({
  mouse: {
    position: {
      x: NaN,
      y: NaN,
    },
    inBounds: false,
  },

  setMouse: (position: Vector2) => {
    const mapStore = getMapStore();
    const store = get();

    const inBounds: boolean =
      (mapStore.map &&
        store.mouse.position.x >= 0 &&
        store.mouse.position.y >= 0 &&
        store.mouse.position.x < mapStore.map.width &&
        store.mouse.position.y < mapStore.map.height) ||
      false;

    set({ mouse: { position, inBounds } });
  },

  keyboard: {},

  setKeyboardInput: (key: KeyboardEvent["key"], value: boolean) =>
    set((state) => ({
      keyboard: {
        ...state.keyboard,
        [key]: value,
      },
    })),
}));

const getControlsStore = useControlsStore.getState;

// useControlsStore for UI, getControlsStore for canvas
export { useControlsStore, getControlsStore };

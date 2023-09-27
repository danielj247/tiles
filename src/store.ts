import { Vector2 } from "./types/vector";

export interface Store {
  mouse: Vector2;
  camera: {
    position: Vector2;
    targetPosition: Vector2;
    zoom: number;
    panning: boolean;
  }
}

const store: Store = {
  mouse: {
    x: NaN,
    y: NaN,
  },

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
};

export default store;

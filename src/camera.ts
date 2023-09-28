import store from "./store";
import { Vector2 } from "./types/vector";
import { getCanvas } from "./utils/canvas";
import { lerp } from "./utils/easing";

export function updateCamera() {
  if (store.camera.panning) {
    store.camera.position.x = lerp(store.camera.position.x, store.camera.targetPosition.x, 0.05);
    store.camera.position.y = lerp(store.camera.position.y, store.camera.targetPosition.y, 0.05);
  }

  if (Math.abs(store.camera.position.x - store.camera.targetPosition.x) < 0.1 && Math.abs(store.camera.position.y - store.camera.targetPosition.y) < 0.1) {
    store.camera.panning = false;
  }
}

export function setupCamera() {
  const { canvas } = getCanvas();
  
  const camera: Vector2 = {
    x: Math.round(canvas.width / 2),
    y: Math.round(canvas.height / 2),
  };

  store.camera.position = camera;
  store.camera.targetPosition = {
    x: camera.x - 0.1,
    y: camera.y - 0.1,
  };
}
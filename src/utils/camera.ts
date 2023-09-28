import { getStore } from "../store";
import { Vector2 } from "../types/vector";
import { getCanvas } from "./canvas";
import { lerp } from "./easing";

export function updateCamera() {
  const store = getStore();

  if (store.camera.panning) {
    store.setCameraPosition({
      x: lerp(store.camera.position.x, store.camera.targetPosition.x, 0.05),
      y: lerp(store.camera.position.y, store.camera.targetPosition.y, 0.05),
    });
  }

  if (
    Math.abs(store.camera.position.x - store.camera.targetPosition.x) < 0.1 &&
    Math.abs(store.camera.position.y - store.camera.targetPosition.y) < 0.1
  ) {
    store.setCameraPanning(false);
  }
}

export function setupCamera() {
  const { canvas } = getCanvas();
  const store = getStore();

  const camera: Vector2 = {
    x: Math.round(canvas.width / 2),
    y: Math.round(canvas.height / 4),
  };

  store.setCameraPosition(camera);
  store.setCameraTargetPosition({
    x: camera.x - 0.1,
    y: camera.y - 0.1,
  });
}

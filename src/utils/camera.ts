import { getControlsStore } from "@/stores/controls";
import { getCameraStore } from "@/stores/camera";
import { getCanvas } from "@/utils/canvas";
import { lerp } from "@/utils/easing";
import { Vector2 } from "@/types/vector";

export function updateCamera() {
  const cameraStore = getCameraStore();
  const controlsStore = getControlsStore();

  if (controlsStore.keyboard.w) {
    cameraStore.setTargetY(cameraStore.position.y + 50);
    cameraStore.setPanning(true);
  }

  if (controlsStore.keyboard.s) {
    cameraStore.setTargetY(cameraStore.position.y - 50);
    cameraStore.setPanning(true);
  }

  if (controlsStore.keyboard.a) {
    cameraStore.setTargetX(cameraStore.position.x + 50);
    cameraStore.setPanning(true);
  }

  if (controlsStore.keyboard.d) {
    cameraStore.setTargetX(cameraStore.position.x - 50);
    cameraStore.setPanning(true);
  }

  if (cameraStore.panning) {
    cameraStore.setPosition({
      x: lerp(cameraStore.position.x, cameraStore.targetPosition.x, 0.05),
      y: lerp(cameraStore.position.y, cameraStore.targetPosition.y, 0.05),
    });
  }

  if (
    Math.abs(cameraStore.position.x - cameraStore.targetPosition.x) < 0.1 &&
    Math.abs(cameraStore.position.y - cameraStore.targetPosition.y) < 0.1
  ) {
    cameraStore.setPanning(false);
  }
}

export function setupCamera() {
  const { canvas } = getCanvas();
  const cameraStore = getCameraStore();

  const camera: Vector2 = {
    x: Math.round(canvas.width / 2),
    y: Math.round(canvas.height / 4),
  };

  cameraStore.setPosition(camera);
  cameraStore.setTargetPosition({
    x: camera.x - 0.1,
    y: camera.y - 0.1,
  });
}

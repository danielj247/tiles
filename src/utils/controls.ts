import { getStore } from "../store";
import { getCanvas } from "./canvas";
import { toGrid } from "./isometric";
import { SPRITE_WIDTH, SPRITE_HEIGHT } from "../consts/sprite";

export function registerControls() {
  const { canvas } = getCanvas();
  const store = getStore();

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    const screenVector = {
      x: event.clientX - rect.left - SPRITE_WIDTH / 2,
      y: event.clientY - rect.top - SPRITE_HEIGHT / 1.2,
    };

    const gridVector = toGrid(screenVector);
    const mouse = {
      x: Math.round(gridVector.x),
      y: Math.round(gridVector.y),
    };

    store.setMouse(mouse);
  });

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        store.setCameraTargetPosition({
          x: store.camera.position.x,
          y: store.camera.position.y - 30,
        });
        break;
      case "s":
        store.setCameraTargetPosition({
          x: store.camera.position.x,
          y: store.camera.position.y + 30,
        });
        break;
      case "a":
        store.setCameraTargetPosition({
          x: store.camera.position.x - 30,
          y: store.camera.position.y,
        });
        break;
      case "d":
        store.setCameraTargetPosition({
          x: store.camera.position.x + 30,
          y: store.camera.position.y,
        });
        break;
    }

    store.setCameraPanning(true);
  });
}

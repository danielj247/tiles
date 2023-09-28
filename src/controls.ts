import store from "./store";
import { getCanvas } from "./utils/canvas";
import { toGrid } from "./utils/isometric";
import { SPRITE_WIDTH, SPRITE_HEIGHT } from "./consts/sprite";

export function registerControls() {
  const { canvas } = getCanvas();
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
    
    store.mouse = mouse;
  });
  
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
    case "w":
      store.camera.targetPosition.y -= 30;
      break;
    case "s":
      store.camera.targetPosition.y += 30;
      break;
    case "a":
      store.camera.targetPosition.x -= 30;
      break;
    case "d":
      store.camera.targetPosition.x += 30;
      break;
    }
            
    store.camera.panning = true;
  });
}
import { lerp } from "./utils/easing";
import { toGrid } from "./utils/isometric";
import { getCanvas, prepareCanvas } from "./utils/canvas";
import { SPRITE_WIDTH } from "./consts/sprite";
import { Vector2 } from "./types/vector";
import Block from "./entities/Block";
import store from "./store";
import "./style.css";

function render() {
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      Block({ x, y });
    }
  }

  window.requestAnimationFrame(render);
}

function updateCamera() {
  if (store.camera.panning) {
    store.camera.position.x = lerp(store.camera.position.x, store.camera.targetPosition.x, 0.05);
    store.camera.position.y = lerp(store.camera.position.y, store.camera.targetPosition.y, 0.05);
  }

  if (Math.abs(store.camera.position.x - store.camera.targetPosition.x) < 0.1 && Math.abs(store.camera.position.y - store.camera.targetPosition.y) < 0.1) {
    store.camera.panning = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const { canvas } = getCanvas();

  prepareCanvas();
  
  const camera: Vector2 = {
    x: Math.round(canvas.width / 2),
    y: Math.round(canvas.height / 2),
  };

  store.camera.position = camera;
  store.camera.targetPosition = {
    x: camera.x - 0.1,
    y: camera.y - 0.1,
  };
  
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    
    const screenVector = {
      x: event.clientX - rect.left - SPRITE_WIDTH / 2,
      y: event.clientY - rect.top - SPRITE_WIDTH / 4,
    };
    
    store.mouse = toGrid(screenVector);
  });
  
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
    case "ArrowUp":
    case "w":
      store.camera.targetPosition.y -= 10;
      break;
    case "ArrowDown":
    case "s":
      store.camera.targetPosition.y += 10;
      break;
    case "ArrowLeft":
    case "a":
      store.camera.targetPosition.x -= 10;
      break;
    case "ArrowRight":
    case "d":
      store.camera.targetPosition.x += 10;
      break;
    }
            
    store.camera.panning = true;
  });
          
  window.addEventListener("resize", prepareCanvas);

  render();
});

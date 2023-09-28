import { lerp } from "./utils/easing";
import { toGrid } from "./utils/isometric";
import { getCanvas, prepareCanvas } from "./utils/canvas";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "./consts/sprite";
import { Vector2 } from "./types/vector";
import store from "./store";
import "./style.css";

import testMap from "./maps/test";
import Block from "./entities/Block";
import { Map } from "./types/map";

function render() {
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();
  renderMap(store.map);

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

function renderMap(map: Map) {
  if (!map) {
    return;
  }

  const renderOrder = map.entities.sort((a, b) => {
    const aDepth = a.position.y + a.size.y;
    const bDepth = b.position.y + b.size.y;
    return aDepth - bDepth;
  });

  for (const entity of renderOrder) {
    Block({ entity });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const { canvas } = getCanvas();

  prepareCanvas();

  store.map = testMap;
  
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
          
  window.addEventListener("resize", prepareCanvas);

  render();
});

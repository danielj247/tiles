import { lerp } from "./utils/easing";
import { toGrid } from "./utils/isometric";
import { getCanvas, prepareCanvas } from "./utils/canvas";
import { SPRITE_HEIGHT, SPRITE_WIDTH } from "./consts/sprite";
import { Vector2 } from "./types/vector";
import Tile from "./entities/Tile";
import store from "./store";
import "./style.css";

import floorPNG from "./img/blocks/proto/floor_E.png";
import doorPNG from "./img/blocks/proto/doorOpen_W.png";
import eastWallPNG from "./img/blocks/proto/wall_E.png";
import northWallPNG from "./img/blocks/proto/wall_N.png";
import southWallPNG from "./img/blocks/proto/wall_S.png";
import westWallPNG from "./img/blocks/proto/wall_W.png";

const floorSprite = new Image();
floorSprite.src = floorPNG;

const doorSprite = new Image();
doorSprite.src = doorPNG;

const eastWallSprite = new Image();
eastWallSprite.src = eastWallPNG;

const northWallSprite = new Image();
northWallSprite.src = northWallPNG;

const southWallSprite = new Image();
southWallSprite.src = southWallPNG;

const westWallSprite = new Image();
westWallSprite.src = westWallPNG;

function render() {
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j ++) {
      Tile({
        position: {
          x: i,
          y: j,
        },
        sprite: floorSprite,
      });
    }
  }

  // west wall
  for (let i = 1; i < 9; i++) {
    Tile({
      position: {
        x: 0,
        y: i,
      },
      sprite: westWallSprite,
    });
  }

  // north wall
  for (let i = 1; i < 9; i++) {
    Tile({
      position: {
        x: i,
        y: 1,
      },
      sprite: southWallSprite,
    });
  }

  // south wall
  for (let i = 1; i < 9; i++) {
    Tile({
      position: {
        x: i,
        y: 8,
      },
      sprite: northWallSprite,
    });
  }

  // east wall
  for (let i = 1; i < 9; i++) {
    if (i === 5) {
      Tile({
        position: {
          x: 8,
          y: 5,
        },
        sprite: doorSprite,
      });
      continue;
    }
  
    Tile({
      position: {
        x: 8,
        y: i,
      },
      sprite: westWallSprite,
    });
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

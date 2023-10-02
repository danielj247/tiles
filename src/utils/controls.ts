import { getStore } from "@/store";
import { getCanvas } from "@/utils/canvas";
import { toGrid } from "@/utils/isometric";
import { SPRITE_WIDTH, SPRITE_HEIGHT } from "@/consts/sprite";
import { grid } from "@/tilesets";
import { Rotation } from "@/types/rotation";
import { Tool } from "../types/editor";

export function registerControls() {
  const { canvas } = getCanvas();
  const store = getStore();

  canvas.addEventListener("click", () => {
    const store = getStore();

    if (
      !store.map ||
      store.editor.toolbar.selectedTool !== Tool.Components ||
      !store.editor.toolbar.selectedComponent ||
      !store.mouse.inBounds
    ) {
      return;
    }

    const z = store.map.entities.filter((e) => {
      return (
        e.position.x === store.mouse.position.x &&
        e.position.y === store.mouse.position.y
      );
    }).length;

    store.map?.entities.push({
      id: Math.random().toString(36).substr(2, 9),
      position: {
        x: store.mouse.position.x,
        y: store.mouse.position.y,
        z,
      },
      rotation:
        store.editor.toolbar.selectedComponentRotation ?? Rotation.NORTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      sprite: store.editor.toolbar.selectedComponent,
    });
  });

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    const screenVector = {
      x: event.clientX - rect.left - SPRITE_WIDTH / 2,
      y: event.clientY - rect.top - SPRITE_HEIGHT / 1.2,
      z: 0,
    };

    const gridVector = toGrid(screenVector, grid);
    const mouse = {
      x: Math.round(gridVector.x),
      y: Math.round(gridVector.y),
    };

    store.setMouse(mouse);
  });

  document.addEventListener("keydown", (event) => {
    const store = getStore();

    store.setKeyboardInput(event.key, true);
  });

  document.addEventListener("keyup", (event) => {
    const store = getStore();

    store.setKeyboardInput(event.key, false);
  });
}

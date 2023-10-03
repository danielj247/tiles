import { getStore } from "@/store";
import { grid } from "@/tilesets";
import { Rotation } from "@/types/rotation";
import { getCanvas } from "@/utils/canvas";
import { toGrid } from "@/utils/isometric";
import { Tool } from "@/types/editor";
import { Map } from "@/types/map";
import { SPRITE_WIDTH, SPRITE_HEIGHT } from "@/consts/sprite";

export function registerControls() {
  const { canvas } = getCanvas();

  canvas.addEventListener("click", () => {
    const store = getStore();

    if (store.editor.toolbar.selectedTool === Tool.Delete) {
      const map = {
        ...store.map,
        entities:
          store.map?.entities.filter((e) => {
            return (
              e.position.x !== store.mouse.position.x ||
              e.position.y !== store.mouse.position.y
            );
          }) || [],
      };

      store.setMap(map as Map);

      return;
    }

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
      id: `${store.editor.toolbar.selectedComponent.name}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
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
    const store = getStore();
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

    const zEnts = store?.map?.entities?.filter((e) => {
      return (
        e.position.x === store.mouse.position.x &&
        e.position.y === store.mouse.position.y
      );
    });

    store.editor.toolbar.hoveredEntities = zEnts ?? [];
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

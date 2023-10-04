import { grid } from "@/tilesets";
import { getMapStore } from "@/stores/map";
import { getEditorStore } from "@/stores/editor";
import { getControlsStore } from "@/stores/controls";
import { getCanvas } from "@/utils/canvas";
import { toGrid } from "@/utils/isometric";
import { Map } from "@/types/map";
import { Tool } from "@/types/tool";
import { Rotation } from "@/types/rotation";
import { SPRITE_WIDTH, SPRITE_HEIGHT } from "@/consts/sprite";

export function registerControls() {
  const { canvas } = getCanvas();

  canvas.addEventListener("click", () => {
    const editorStore = getEditorStore();
    const mapStore = getMapStore();
    const controlsStore = getControlsStore();

    if (editorStore.toolbar.selectedTool === Tool.Delete) {
      const map = {
        ...mapStore.map,
        entities:
          mapStore.map?.entities.filter((e) => {
            return e.position.x !== controlsStore.mouse.position.x || e.position.y !== controlsStore.mouse.position.y;
          }) || [],
      };

      mapStore.setMap(map as Map);

      return;
    }

    if (
      !mapStore.map ||
      editorStore.toolbar.selectedTool !== Tool.Components ||
      !editorStore.toolbar.components.selectedComponent ||
      !controlsStore.mouse.inBounds
    ) {
      return;
    }

    const z = mapStore.map.entities.filter((e) => {
      return e.position.x === controlsStore.mouse.position.x && e.position.y === controlsStore.mouse.position.y;
    }).length;

    mapStore.map?.entities.push({
      id: `${editorStore.toolbar.components.selectedComponent.name}-${Math.random().toString(36).substring(2, 9)}`,
      position: {
        x: controlsStore.mouse.position.x,
        y: controlsStore.mouse.position.y,
        z,
      },
      rotation: editorStore.toolbar.components.selectedComponentRotation ?? Rotation.NORTH,
      size: {
        x: 1,
        y: 1,
        z: 1,
      },
      sprite: editorStore.toolbar.components.selectedComponent,
    });
  });

  canvas.addEventListener("mousemove", (event) => {
    const mapStore = getMapStore();
    const editorStore = getEditorStore();
    const controlsStore = getControlsStore();
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

    controlsStore.setMouse(mouse);

    const zEnts = mapStore?.map?.entities?.filter((e) => {
      return e.position.x === controlsStore.mouse.position.x && e.position.y === controlsStore.mouse.position.y;
    });

    editorStore.toolbar.select.hoveredEntities = zEnts ?? [];
  });

  document.addEventListener("keydown", (event) => {
    const controlsStore = getControlsStore();

    controlsStore.setKeyboardInput(event.key, true);
  });

  document.addEventListener("keyup", (event) => {
    const controlsStore = getControlsStore();

    controlsStore.setKeyboardInput(event.key, false);
  });
}

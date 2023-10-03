import { grid } from "@/tilesets";
import { getMapStore } from "@/stores/map";
import { getEditorStore } from "@/stores/editor";
import { getControlsStore } from "@/stores/controls";
import Block from "@/entities/block";
import Tile from "@/entities/tile";
import { updateCamera } from "@/utils/camera";
import { getCanvas } from "@/utils/canvas";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";
import { Tool } from "@/types/tool";

export function render() {
  const mapStore = getMapStore();
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();

  renderMap(mapStore.map);

  renderGhost();

  window.requestAnimationFrame(render);
}

function renderMap(map?: Map) {
  if (!map) {
    return;
  }

  for (let w = 0; w < map.width; w++) {
    for (let h = 0; h < map.height; h++) {
      Tile({
        position: {
          x: w,
          y: h,
        },
        tileset: grid,
      });
    }
  }

  const renderOrder = map.entities.sort((a, b) => {
    const aRange = {
      xMin: a.position.x,
      xMax: a.position.x + a.size.x,
      yMin: a.position.y,
      yMax: a.position.y + a.size.y,
      zMin: a.position.z,
      zMax: a.position.z + a.size.z,
    };

    const bRange = {
      xMin: b.position.x,
      xMax: b.position.x + b.size.x,
      yMin: b.position.y,
      yMax: b.position.y + b.size.y,
      zMin: b.position.z,
      zMax: b.position.z + b.size.z,
    };

    if (aRange.xMin >= bRange.xMax) return 1;

    if (bRange.xMin >= aRange.xMax) return -1;

    if (aRange.yMin >= bRange.yMax) return 1;

    if (bRange.yMin >= aRange.yMax) return -1;

    if (aRange.zMin >= bRange.zMax) return 1;

    if (bRange.zMin >= aRange.zMax) return -1;

    return 0;
  });

  for (const entity of renderOrder) {
    Block({ entity, tileset: map.tileset });
  }
}

function renderGhost() {
  const mapStore = getMapStore();
  const editorStore = getEditorStore();
  const controlsStore = getControlsStore();

  if (!mapStore.map) {
    return;
  }

  const selectedComponent = editorStore?.toolbar.components.selectedComponent;
  const selectedRotation =
    editorStore?.toolbar.components.selectedComponentRotation;
  const tileset = mapStore.map?.tileset;

  if (
    !selectedComponent ||
    !tileset ||
    !controlsStore.mouse.inBounds ||
    editorStore.toolbar.selectedTool !== Tool.Components
  ) {
    return;
  }

  const z = mapStore.map.entities.filter((e) => {
    return (
      e.position.x === controlsStore.mouse.position.x &&
      e.position.y === controlsStore.mouse.position.y
    );
  }).length;

  Block({
    opacity: 0.7,
    tileset,
    entity: {
      id: "ghost",
      position: {
        x: controlsStore.mouse.position.x,
        y: controlsStore.mouse.position.y,
        z,
      },
      size: { x: 1, y: 1, z: 1 },
      rotation: selectedRotation || Rotation.NORTH,
      sprite: selectedComponent,
    },
  });
}

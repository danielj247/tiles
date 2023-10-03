import { getStore } from "@/store";
import { grid } from "@/tilesets";
import Block from "@/entities/block";
import Tile from "@/entities/tile";
import { updateCamera } from "@/utils/camera";
import { getCanvas } from "@/utils/canvas";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";
import { Tool } from "@/types/editor";

export function render() {
  const store = getStore();
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();

  renderMap(store.map);

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
  const store = getStore();

  if (!store.map) {
    return;
  }

  const selectedComponent = store?.editor?.toolbar.selectedComponent;
  const selectedRotation = store?.editor?.toolbar.selectedComponentRotation;
  const tileset = store?.map?.tileset;

  if (
    !selectedComponent ||
    !tileset ||
    !store.mouse.inBounds ||
    store.editor.toolbar.selectedTool !== Tool.Components
  ) {
    return;
  }

  const z = store.map.entities.filter((e) => {
    return (
      e.position.x === store.mouse.position.x &&
      e.position.y === store.mouse.position.y
    );
  }).length;

  Block({
    opacity: 0.7,
    tileset,
    entity: {
      id: "ghost",
      position: {
        x: store.mouse.position.x,
        y: store.mouse.position.y,
        z,
      },
      size: { x: 1, y: 1, z: 1 },
      rotation: selectedRotation || Rotation.NORTH,
      sprite: selectedComponent,
    },
  });
}

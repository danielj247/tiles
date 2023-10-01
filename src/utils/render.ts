import { getStore } from "@/store";
import { grid } from "@/tilesets";
import Block from "@/entities/block";
import Tile from "@/entities/tile";
import { updateCamera } from "@/utils/camera";
import { getCanvas } from "@/utils/canvas";
import { Rotation } from "@/types/rotation";
import { Map } from "@/types/map";

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
    const aDepth = a.position.y + a.size.y;
    const bDepth = b.position.y + b.size.y;
    return aDepth - bDepth;
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

  if (!selectedComponent || !tileset || !store.mouse.inBounds) {
    return;
  }

  Block({
    opacity: 0.7,
    tileset,
    entity: {
      id: "ghost",
      position: store.mouse.position,
      size: { x: 1, y: 1 },
      rotation: selectedRotation || Rotation.NORTH,
      sprite: selectedComponent,
    },
  });
}

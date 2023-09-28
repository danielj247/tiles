import { updateCamera } from "./camera";
import Block from "./entities/Block";
import store from "./store";
import { Map } from "./types/map";
import { getCanvas } from "./utils/canvas";

export function render() {
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updateCamera();
  renderMap(store.map);

  window.requestAnimationFrame(render);
}

function renderMap(map?: Map) {
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

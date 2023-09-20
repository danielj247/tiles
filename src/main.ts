import { getCanvas, prepareCanvas } from "./utils/canvas";
import { pixelToIso } from "./utils/iso";
import Tile from "./entities/Tile";
import store from "./store";
import "./style.css";

function render() {
  const { ctx, canvas } = getCanvas();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      Tile(x, y);
    }
  }

  window.requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", () => {
  const { canvas } = getCanvas();
  
  prepareCanvas();

  window.addEventListener("resize", prepareCanvas);

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left - canvas.width / 2;
    const mouseY = event.clientY - rect.top - canvas.height / 4;
  
    store.mouse = pixelToIso(mouseX, mouseY);
  });

  render();
});

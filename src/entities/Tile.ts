import { getCanvas } from "../utils/canvas";
import { TILE_SIZE } from "../consts/tile";
import store from "../store";

function Tile(x: number, y: number) {
  const { canvas, ctx } = getCanvas();

  const _lineWidth = ctx.lineWidth;

  const screenX = (x - y) * (TILE_SIZE / 2) + canvas.width / 2;
  const screenY = (x + y) * (TILE_SIZE / 4) + canvas.height / 4;

  const isHovered = store.mouse.x === x && store.mouse.y === y;

  ctx.beginPath();
  ctx.moveTo(screenX, screenY);
  ctx.lineTo(screenX + TILE_SIZE / 2, screenY - TILE_SIZE / 4);
  ctx.lineTo(screenX, screenY - TILE_SIZE / 2);
  ctx.lineTo(screenX - TILE_SIZE / 2, screenY - TILE_SIZE / 4);
  ctx.closePath();

  if (isHovered) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "cyan";
  } else {
    ctx.strokeStyle = "white";
  }

  ctx.strokeStyle = isHovered ? "cyan" : "white";
  ctx.stroke();
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fill();

  ctx.lineWidth = _lineWidth;
}

export default Tile;

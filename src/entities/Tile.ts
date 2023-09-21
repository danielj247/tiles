import store from "../store";
import { getCanvas } from "../utils/canvas";
import { TILE_SIZE } from "../consts/tile";
import { HOVER_LINE_WIDTH, LINE_WIDTH } from "../consts/line";
import { tileToPixel } from "../utils/tile";

function Tile(x: number, y: number) {
  const { ctx } = getCanvas();
  const { x: screenX, y: screenY } = tileToPixel(x, y);
  const isHovered = store.mouse.x === x && store.mouse.y === y;

  ctx.beginPath();
  ctx.moveTo(screenX, screenY);
  ctx.lineTo(screenX + TILE_SIZE / 2, screenY - TILE_SIZE / 4);
  ctx.lineTo(screenX, screenY - TILE_SIZE / 2);
  ctx.lineTo(screenX - TILE_SIZE / 2, screenY - TILE_SIZE / 4);
  ctx.closePath();

  if (isHovered) {
    ctx.lineWidth = HOVER_LINE_WIDTH;
    ctx.strokeStyle = "cyan";
  } else {
    ctx.strokeStyle = "white";
  }

  ctx.strokeStyle = isHovered ? "cyan" : "white";
  ctx.stroke();
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fill();

  ctx.lineWidth = LINE_WIDTH;
}

export default Tile;

import { render } from "@/utils/render";
import { setupCamera } from "@/utils/camera";
import { registerControls } from "@/utils/controls";
import { prepareCanvas } from "@/utils/canvas";
import "@/style.css";

document.addEventListener("DOMContentLoaded", async () => {
  // set the canvas size
  prepareCanvas();
  // set initial camera positions
  setupCamera();
  // setup event listeners for mouse and keyboard
  registerControls();

  // dev map - uncomment to use
  await (await import("@/store"))
    .getStore()
    .setMap((await import("@/maps/fort")).default);

  // set the canvas size on window resize
  window.addEventListener("resize", prepareCanvas);

  // finally start the render process
  render();
});

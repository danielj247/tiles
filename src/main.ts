import { getStore } from "@/store";
import { render } from "@/utils/render";
import { setupCamera } from "@/utils/camera";
import { registerControls } from "@/utils/controls";
import { prepareCanvas } from "@/utils/canvas";
import "@/style.css";

import testMap from "@/maps/test";

document.addEventListener("DOMContentLoaded", () => {
  // set the canvas size
  prepareCanvas();
  // set initial camera positions
  setupCamera();
  // setup event listeners for mouse and keyboard
  registerControls();

  // debug map
  getStore().setMap(testMap);

  // set the canvas size on window resize
  window.addEventListener("resize", prepareCanvas);

  // finally start the render process
  render();
});

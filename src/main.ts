import store from "./store";
import { render } from "./render";
import { setupCamera } from "./camera";
import { registerControls } from "./controls";
import { prepareCanvas } from "./utils/canvas";
import "./style.css";

import testMap from "./maps/test";

document.addEventListener("DOMContentLoaded", () => {
  // set the canvas size
  prepareCanvas();
  // set initial camera positions
  setupCamera();
  // setup event listeners for mouse and keyboard
  registerControls();

  // debug map
  store.map = testMap;

  // set the canvas size on window resize
  window.addEventListener("resize", prepareCanvas);

  // finally start the render process
  render();
});

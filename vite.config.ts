import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5151,
  },

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});

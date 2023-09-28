import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5151,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

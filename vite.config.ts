import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log(import.meta.url);
console.log(new URL("./src", import.meta.url).href);

export default defineConfig({
  server: {
    port: 5151,
  },

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(
          process.env.NODE_ENV === "development"
            ? new URL("./src", import.meta.url).href
            : new URL("./", import.meta.url).href,
        ),
      },
    ],
  },

  plugins: [react()],
});

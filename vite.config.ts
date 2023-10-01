import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
            ? new URL("./", import.meta.url)
            : import.meta.url,
        ),
      },
    ],
  },

  plugins: [react()],
});

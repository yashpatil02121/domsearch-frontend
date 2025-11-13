import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/index": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/search": {
        target: "http://localhost:8000",
        changeOrigin: true,
      }
    }
  }
});

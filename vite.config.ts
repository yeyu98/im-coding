import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/index.less";`,
      },
    },
  },
  server: {
    open: true,
    host: true,
  },
});

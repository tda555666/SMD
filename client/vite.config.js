import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        chat: "http://localhost:5002/chat/assets/chatEntry.js",
      },
      shared: ['react', 'react-router-dom'],
    }),
  ],
  build: {
    target: "esnext", // Ensures compatibility with the latest JavaScript features
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
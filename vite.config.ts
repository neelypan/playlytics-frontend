import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: "127.0.0.1",
      port: 5173,
    },
    esbuild:
      mode === "production" ? { drop: ["console", "debugger"] } : undefined, // dev keeps console logs
  };
});

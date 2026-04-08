import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0",
    // Used when VITE_API_URL=/api — forwards browser /api/* to Express on :5000
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    // Provide a global process.env object for libraries like Amadeus that expect it
    "process.env": {
      AMADEUS_CLIENT_ID: JSON.stringify(process.env.VITE_AMADEUS_API_KEY),
      AMADEUS_CLIENT_SECRET: JSON.stringify(
        process.env.VITE_AMADEUS_API_SECRET,
      ),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Node.js global to browser global
      plugins: [],
    },
  },
  resolve: {
    alias: {
      // Add any aliases if needed
    },
  },
});

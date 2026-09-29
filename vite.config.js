import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    // Must come BEFORE react(). It watches src/routes and generates
    // src/routeTree.gen.ts for you. Never edit that file by hand.
    // autoCodeSplitting: every route becomes its own JS chunk automatically,
    // so you no longer need the `.lazy.jsx` files from the course.
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      base: "/food-diary/",
      manifest: {
        name: "FoodDiary",
        short_name: "FoodDiary",
        description: "Дневник питания",
        theme_color: "#FBF1E5",
        icons: [
          {
            src: "/pwa-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: { enabled: true },
    }),
  ],
});

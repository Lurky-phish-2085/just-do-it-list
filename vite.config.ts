import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const INDEX_URL = "/just-do-it-list";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __MY_CONFIG__: JSON.stringify({ INDEX_URL }),
  },
  base: INDEX_URL,
  plugins: [react()],
});

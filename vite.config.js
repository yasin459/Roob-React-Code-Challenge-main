import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {},
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
    },
  },
});

import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias';
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  resolve: {
    alias: {
      "~components": path.resolve(__dirname, "./src/ui/components"),
      "~screens": path.resolve(__dirname, "./src/ui/screens"),
    },
  },
  server: {
    port: 5000,
  },
})

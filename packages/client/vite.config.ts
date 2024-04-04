import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from '@svgr/rollup';
import path from "path";

export default defineConfig({
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    macrosPlugin(),
    svgr(),
  ],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "mocks": path.resolve(__dirname, "./mocks"),
      "@": path.resolve(__dirname, "./@"),
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    host: true,
    strictPort: true,
    port: 8080,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros';
import path from "path";

export default defineConfig({
  plugins: [
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    macrosPlugin()
  ],
  resolve: {
    alias: {
      "~components": path.resolve(__dirname, "./src/ui/components"),
      "~screens": path.resolve(__dirname, "./src/ui/screens"),
      "~config": path.resolve(__dirname, "./src/config"),
      "~utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 5000,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from '@svgr/rollup';
import path from "path";
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig(({ command, mode }) => {
  const port = process.env.VITE_PORT;

  if (!port) {
    throw new Error('VITE_PORT is not defined!');
  }

  return {
      resolve: {
      alias: {
        "src": path.resolve(__dirname, "./src"),
        "mocks": path.resolve(__dirname, "./mocks"),
        "@": path.resolve(__dirname, "./@"),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
      plugins: [
        react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
        macrosPlugin(),
        svgr(),
    ],
    server: {
      host: true,
      strictPort: true,
      port: Number(port),
    },
    
  };
});
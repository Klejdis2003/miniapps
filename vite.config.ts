import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import * as path from 'node:path';
import { ghPages } from 'vite-plugin-gh-pages';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ghPages(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
});

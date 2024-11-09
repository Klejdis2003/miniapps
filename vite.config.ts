import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import TanStackRouterVite from '@tanstack/router-plugin/vite';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  base: '/miscellaneous',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
});

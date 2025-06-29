import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/12-book-store/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {

  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/chat-app/',  // later used for <BrowserRouter basename="/chat-app">
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
  },
});
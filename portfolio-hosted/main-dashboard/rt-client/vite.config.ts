import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true 
  },
  base: './',
  // (server) ignored in the produciton build, for development only
  server: {
    port: 3000,
    proxy: {
			"/api": {
				target: "http://localhost:5000",
        
			},
      
		},
    allowedHosts: [ 'illustrates.info', 'www.illustrates.info', 'localhost' ],
  }, 
  
})

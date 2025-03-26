import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' :{
        target : 'http://localhost:3000',
      secure:false,
      },  
    },
  },
  plugins: [react()],
  cacheDir: './.vite_cache', // Optional: Ensures Vite uses a dedicated cache folder
  optimizeDeps: {
    include: ['swiper', 'swiper/react'], // Optional: Ensure these dependencies are optimized
  },
})

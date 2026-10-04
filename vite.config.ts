import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // three.js lands in its own lazily-loaded chunk (~760 kB raw / ~210 kB gzip); that's expected
    chunkSizeWarningLimit: 800,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // La escena 3D (three.js) se carga aparte y pesa más de 500 kB.
    chunkSizeWarningLimit: 1000,
  },
})

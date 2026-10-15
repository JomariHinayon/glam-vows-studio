import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Backend disabled for now — content lives in src/data/homepage.js.
    // Re-enable to proxy API + media calls to the Django dev server.
    // proxy: {
    //   '/api': 'http://localhost:8000',
    //   '/media': 'http://localhost:8000',
    // },
  },
})

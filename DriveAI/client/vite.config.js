import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration for DriveAI frontend
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 via @tailwindcss/vite plugin
  ],
  server: {
    port: 5173,
    // Proxy API calls to our Express backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

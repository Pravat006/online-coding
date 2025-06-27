import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ['monaco-editor'],
  },
  worker: {
    format: 'es'
  }
})

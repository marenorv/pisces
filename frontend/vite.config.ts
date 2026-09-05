import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.dirname, 'src/components'),
      // @types is reserved, so we need to use @type
      '@type': path.resolve(import.meta.dirname, 'src/types'),
      '@api': path.resolve(import.meta.dirname, 'src/api/index.ts'),
      '@hooks': path.resolve(import.meta.dirname, 'src/hooks'),
    },
  },
  server: {
    port: 5179,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Confernet-UI/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom', 
    globals: true,      
    setupFiles: './vitest.setup.js',
    include: ['__tests__/unitTests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  }
}))

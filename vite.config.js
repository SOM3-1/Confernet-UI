// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Confernet-UI/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true,      
    setupFiles: './vitest.setup.js',
    include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  }
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://ayushsinha0804.github.io/Portfolio/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})

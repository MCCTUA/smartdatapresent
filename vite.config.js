import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import ตัวนี้เพิ่ม

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. ใส่ตัวนี้ใน list ของ plugins
  ],
  base: './',
})

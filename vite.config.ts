import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // server: {
  //   hmr: {
  //     overlay: false,
  //   },
  // },
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/QuickClips/'
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3tsdemo/',
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData:'@import "./src/assets/style/main.scss";'
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

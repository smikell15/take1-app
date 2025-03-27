import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()],
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
})

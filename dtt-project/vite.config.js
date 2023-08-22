import { URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import proxy from 'vite-plugin-proxy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  server: {
    host: 'localhost',
    port: 8080,
  },
});

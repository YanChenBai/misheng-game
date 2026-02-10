import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import autoImport from 'unplugin-auto-import/vite';
import injectPreload from 'unplugin-inject-preload/vite';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    autoImport({
      /* options */
    }),
    components({
      /* options */
    }),
    injectPreload({
      files: [
        {
          outputMatch: /.*\.webp$/,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: './',

  cacheDir: '../../node_modules/.vite/demo-02',

  build: {
    rollupOptions: {
      input: {
        app: './demo-02.html', // default
      },
    },
  },

  server: {
    open: 'demo-02.html',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [checker({ typescript: true }), react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});

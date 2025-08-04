/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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

  plugins: [react()],

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});

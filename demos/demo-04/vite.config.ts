import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        app: './demo-04.html',
      },
    },
  },
  server: {
    open: 'demo-04.html',
  },
});



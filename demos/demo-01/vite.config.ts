import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        app: './demo-01.html', // default
      },
    },
  },

  server: {
    open: 'demo-01.html',
  },
});

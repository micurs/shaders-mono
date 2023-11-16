import { defineConfig } from 'vite';
export default defineConfig({
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

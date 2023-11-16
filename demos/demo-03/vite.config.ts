import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './demo-03.html', // default
      },
    },
  },
  server: {
    open: 'demo-03.html',
  },
});

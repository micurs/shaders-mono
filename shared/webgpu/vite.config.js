// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode

const entryRoot = resolve(__dirname, 'src/index.ts');

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['@shaders-mono/geopro'],
    },
    lib: {
      entry: entryRoot,
      name: 'index',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
  },
  plugins: [
    dts({
      // outDir: ['dist'],
      // staticImport: true,
      rollupTypes: true,
      //declarationOnly: true,
    }),
  ],
});

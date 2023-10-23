// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode

const entryRoot = resolve(__dirname, 'src/index.ts');

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: entryRoot,
      name: 'geopro',
      formats: ['es'],
      fileName: 'geopro',
    },
  },
  plugins: [dts({ rollupTypes: true, entryRoot: 'src' })],
});

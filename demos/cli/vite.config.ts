import { defineConfig } from 'vite';
import nodeResolve  from '@rollup/plugin-node-resolve';

export default defineConfig( {
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        format: 'cjs',
        entryFileNames: 'geopro.js',
        // chunkFileNames: 'assets/[name].js', // This and the next line are added to control chunking
        // manualChunks: {},
        banner: '#!/usr/bin/env node', // Shebang to make the output file executable
      },
      plugins: [
        nodeResolve({
          preferBuiltins: true,
        }),
      ],
      external: [
        'fs',
        'path',
        ...Object.keys(require('./package.json').dependencies || {})
      ], // Exclude built-in modules and dependencies from the bundle
    }
  },
  esbuild: {
    platform: 'node',
  }
});


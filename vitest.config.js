import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.ts', '**/*.test.d.ts', 'tests/**/*.test.ts'],
  },
  coverage: {
    exclude: ['**/*.d.ts', 'tests/**/*.test.ts'],
    provider: 'v8',
  },
});
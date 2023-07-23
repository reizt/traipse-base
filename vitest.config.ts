/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [resolve(__dirname, './src/tasks/dotenv.ts')],
    coverage: {
      provider: 'c8',
    },
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, './src'),
    },
  },
});

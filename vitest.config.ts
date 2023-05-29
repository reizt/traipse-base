/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, './src'),
    },
  },
});

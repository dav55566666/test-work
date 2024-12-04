import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@uikit': path.resolve(__dirname, 'src/uikit'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@svg': path.resolve(__dirname, 'src/svg'),
      '@images': path.resolve(__dirname, 'src/images'),
    },
  },
});
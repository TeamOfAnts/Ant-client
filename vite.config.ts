import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@assets/*': path.resolve(__dirname, 'src/app/repositories'),
      '@libs': path.resolve(__dirname, 'src/app/libs'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@screens': path.resolve(__dirname, 'src/app/screens'),
      '@routes': path.resolve(__dirname, 'src/app/routes'),
      '@models': path.resolve(__dirname, 'src/app/models'),
      '@repositories': path.resolve(__dirname, 'src/app/repositories'),
      '@/*': path.resolve(__dirname, 'src/*'),
    },
  },
});

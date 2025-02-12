import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  server: {
    port: Number(process.env.PORT),
    host: '0.0.0.0',
  },
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@libs': path.resolve(__dirname, 'src/shared/libs'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@repositories': path.resolve(__dirname, 'src/repositories'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@providers': path.resolve(__dirname, 'src/app/providers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

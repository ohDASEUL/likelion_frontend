import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './public', // Vite 서버가 참조할 루트 디렉토리를 지정
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './public/index.html'), // 기본 index.html
      },
    },
  },
});

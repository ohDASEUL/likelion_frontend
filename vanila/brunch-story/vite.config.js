import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './', // Vite 서버가 참조할 루트 디렉토리를 현재 프로젝트 루트로 설정
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'), // index.html 경로를 루트로 설정
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './', // 프로젝트 루트를 Vite의 루트로 설정
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        homepage: resolve(__dirname, './src/features/home/homePage.html'), // 필요한 HTML 파일 추가
      },
    },
  },
  server: {
    fs: {
      allow: [
        '.', // 현재 디렉토리 접근 허용
        './src/assets', // assets 폴더 접근 허용
      ],
    },
  },
});

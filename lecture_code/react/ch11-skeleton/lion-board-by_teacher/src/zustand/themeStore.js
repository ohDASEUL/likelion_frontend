import { create } from "zustand";
import { persist } from "zustand/middleware";

// 테마 스토어 정의
const ThemeStore = (set) => ({
  // 시스템 설정의 다크모드 여부를 초기값으로 사용
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? true
    : false,
  // 다크모드 토글 함수
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
});

// persist 미들웨어를 사용하여 테마 설정을 로컬 스토리지에 저장
const useThemeStore = create(
  persist(ThemeStore, {
    name: "themeStore", // 스토리지 키 이름
  })
);
export default useThemeStore;

import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import useThemeStore from "@zustand/themeStore";

function App() {
  // 테마 스토어에서 현재 다크모드 상태 가져오기
  const { isDarkMode } = useThemeStore();

  // 다크모드 상태에 따라 HTML 요소에 'dark' 클래스 추가/제거
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;

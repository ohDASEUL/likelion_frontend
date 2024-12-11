/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "selector", // 다크모드 적용 방식을 class 기반으로 설정
};

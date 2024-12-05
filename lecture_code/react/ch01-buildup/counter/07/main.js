/**
 * 애플리케이션의 진입점
 * App 컴포넌트와 Yong 라이브러리를 임포트하여
 * 루트 요소에 앱을 마운트하고 초기 렌더링을 수행
 */
import App from "./src/App.js";
import Yong from "./yong.js";

// 루트 요소를 찾아 App 컴포넌트를 렌더링
Yong.createRoot(document.getElementById("root")).render(App);

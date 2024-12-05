/**
 * 최상위 App 컴포넌트
 * 전체 애플리케이션의 구조를 정의하고 하위 컴포넌트들을 조합
 */
import Yong from "../yong.js";
import Counter from "./Counter.js";
import Header from "./Header.js";

function App() {
  return (
    // 앱의 최상위 컨테이너를 생성하고 Header와 Counter 컴포넌트를 배치
    Yong.createElement("div", { id: "app" }, Header, Counter)
  );
}

export default App;

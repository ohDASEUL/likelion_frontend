import { useEffect } from "react";
import Left1 from "@components/Left1";
import Right1 from "@components/Right1";
import { Provider } from "jotai";

function App() {
  useEffect(() => {
    console.log("# App 렌더링.");
  });

  return (
    // Jotai Provider로 앱을 감싸서 전역 상태 관리 활성화
    // SSR(Server Side Rendering)을 위해 필요
    <Provider>
      <h1>전역 상태 관리 - [Jotai]</h1>
      {/* https://jotai.org/ */}
      <div id="container">
        <h1>App</h1>
        <div id="grid">
          <Left1 />
          <Right1 />
        </div>
      </div>
    </Provider>
  );
}

export default App;

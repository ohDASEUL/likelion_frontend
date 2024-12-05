/**
 * 카운터 컴포넌트
 * 상태 관리와 카운터 UI를 담당
 */
import Yong from "../yong.js";

function Counter() {
  // useState 훅을 사용하여 카운터 상태 관리
  // 초기값 10으로 설정
  const [count, setCount] = Yong.useState(10);

  // 카운터 감소 핸들러
  const handleDown = () => {
    setCount(count - 1);
  };

  // 카운터 증가 핸들러
  const handleUp = () => {
    setCount(count + 1);
  };

  // 카운터 리셋 핸들러
  const handleReset = (event) => {
    setCount(0);
  };

  return Yong.createElement(
    "div",
    { id: "counter" },
    // 감소 버튼
    Yong.createElement("button", { type: "button", onclick: handleDown }, "-"),
    // 리셋 버튼
    Yong.createElement(
      "button",
      { type: "button", onclick: (event) => handleReset(event) },
      0
    ),
    // 증가 버튼
    Yong.createElement("button", { type: "button", onclick: handleUp }, "+"),
    // 카운터 값 표시
    Yong.createElement("span", null, count)
  );
}

export default Counter;

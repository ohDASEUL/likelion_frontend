import { useAtom, useSetAtom } from "jotai";
import { countAtom } from "../jotai/atoms";
import { useEffect } from "react";

function Right3() {
  // useAtom은 [값, setter] 배열을 반환하는데,
  // 첫 번째 요소(값)는 사용하지 않고(,) setter 함수만 가져옴
  // 값을 구독하지 않으므로 atom이 업데이트되어도 리렌더링되지 않음
  // const [, setCount] = useAtom(countAtom);

  // atom 값을 변경하는 함수들 정의
  // setCount를 사용하여 atom의 값을 업데이트
  // const countDown = () => setCount((count) => count - 3); // 현재 값에서 3을 뺌
  // const countReset = () => setCount(0);
  // const countUp = () => setCount((count) => count + 2); // 현재 값에 2를 더함

  // 강사님 버전
  // const [count, setCount] = useAtom(countAtom);

  const setCount = useSetAtom(countAtom);

  const countUp = function (step) {
    setCount((count) => count + step);
  };

  const countDown = function (step) {
    setCount((count) => count - step);
  };

  const countReset = function () {
    setCount(0);
  };

  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  return (
    <div>
      <h3>Right3</h3>
      {/* <button onClick={countDown}>-3</button>
      <button onClick={countReset}>0</button>
      <button onClick={countUp}>+2</button> */}
      <button onClick={() => countDown(3)}>-3</button>
      <button onClick={() => countReset()}>0</button>
      <button onClick={() => countUp(2)}>+2</button>
    </div>
  );
}

export default Right3;

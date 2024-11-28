import useCounterState from "@zustand/counter";
import { useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // count를 사용하지 않더라도 자동으로 구독 되기에 count 변경시 리렌더링
  // const { countUp } = useCounterState();

  // 렌더링 최적화를 위해 수동으로 필요한 부분만 지정
  const countUp = useCounterState((state) => state.countUp);

  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          countUp(1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default Right3;

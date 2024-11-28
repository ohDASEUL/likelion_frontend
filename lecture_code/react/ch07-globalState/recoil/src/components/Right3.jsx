import { counterState } from "@recoil/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  const [count, setCount] = useRecoilState(counterState);

  const countUp = (step) => {
    setCount(count + step);
  };

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

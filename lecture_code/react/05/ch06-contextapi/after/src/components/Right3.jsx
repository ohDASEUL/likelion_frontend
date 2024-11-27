import CounterContext from "@context/CounterContext";
import { SimpleContext } from "@context/SimpleContext";
import { useContext, useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  const simple = useContext(SimpleContext);

  // CounterContext 구독함(CounterContext의 상태변경이 리렌더링을 유발함)
  const {
    actions: { countDown, countReset, countUp },
  } = useContext(CounterContext);

  return (
    <div>
      <h3>Right3 - {simple.hello}</h3>
      <button onClick={() => countDown(1)}>-1</button>
      <button onClick={() => countReset()}>0</button>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;

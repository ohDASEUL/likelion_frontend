import counterStore from "@mobx/counterStore";
import { useEffect } from "react";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });
  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => counterStore.countDown(3)}>-3</button>
      <button onClick={() => counterStore.countReset()}>0</button>
      <button onClick={() => counterStore.countUp(2)}>+2</button>
    </div>
  );
}

export default Right3;

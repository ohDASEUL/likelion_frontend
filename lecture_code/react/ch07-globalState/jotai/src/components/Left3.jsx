import { useAtom } from "jotai";
import { countAtom } from "../jotai/atoms";
import { useEffect } from "react";

function Left3() {
  // useAtom을 사용하여 atom의 값을 읽기
  // count만 사용하고 setter는 사용하지 않음 (구독만 하는 컴포넌트)
  const [count] = useAtom(countAtom);

  // atom 값이 변경될 때만 리렌더링됨
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  return (
    <div>
      <h3>Left3</h3>
      {/* atom의 현재 값을 표시 */}
      <span>{count}</span>
    </div>
  );
}

export default Left3;

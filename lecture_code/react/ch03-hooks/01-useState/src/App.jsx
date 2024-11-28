import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <br />
        <span>입력 메세지: {msg}</span>
      </div>
    </>
  );
}

export default App;

function App() {
  return (
    <>
      <h1>05 useMemo - 함수의 반환값을 memoize</h1>
      <div>
        <input type="text" value="GD" />
        가 좋아하는 숫자:
        <input type="number" min="1" max="1000000007" value="17" />
        <div>
          GD가 좋아하는 숫자 17: 소수가{" "}
          <span style={{ color: "blue" }}>맞습니다.</span>
        </div>
      </div>
    </>
  );
}

export default App;

function App() {
  return (
    <>
      <h1>05 회원가입 입력값 상태 관리</h1>
      <form>
        <label htmlFor="name">이름</label>
        <input id="name" name="name" />
        <br />
        <div>검증 실패 메세지</div>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" />
        <br />
        <div>검증 실패 메세지</div>
        <label htmlFor="cellphone">휴대폰</label>
        <input id="cellphone" name="cellphone" />
        <br />
        <div>검증 실패 메세지</div>
        <button type="submit">가입</button>
      </form>
      <p>
        이름: <br />
        이메일: <br />
        휴대폰: <br />
      </p>
    </>
  );
}

export default App;

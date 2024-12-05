/**
 * 헤더 컴포넌트
 * 애플리케이션의 제목과 현재 파일 경로를 표시
 */
import Yong from "../yong.js";

function Header() {
  return Yong.createElement(
    "header",
    null,
    // 제목
    Yong.createElement("h1", null, "Counter - 컴포넌트 모듈화"),
    // 파일 경로 표시
    Yong.createElement(
      "p",
      null,
      "파일 경로: ",
      Yong.createElement(
        "span",
        { id: "filepath" },
        // URL에서 챕터 번호를 추출하여 경로 생성
        `ch${document.URL.split("/ch")[1]}index.html`
      )
    )
  );
}

export default Header;

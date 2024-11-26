import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// TodoAdd 는 XMLHttpRequest 사용
function TodoDetail() {
  // 입력값 검증 - react hook form 사용
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm(); // 기본 설정 유지

  /**
   * 폼 제출 처리하는 함수
   * react-hook-form이 유효성 검사 통과하면 실행됨
   * XMLHttpRequest로 서버에 할일 데이터 전송하고 응답 처리함
   *
   * @param {Object} item - 폼에서 입력받은 데이터
   * @param {string} item.title - 할일 제목
   * @param {string} item.content - 할일 내용
   */
  const onSubmit = (item) => {
    console.log("서버에 전송", item);

    // 요청 시간이 2초 이상 걸리면 자동으로 중단하기 위한 타이머 설정
    // 서버 응답이 오면 clearTimeout으로 취소해야 함
    const timer = setTimeout(() => {
      xhr.abort(); // 2초 후 요청 강제 중단
    }, 2000);

    // XMLHttpRequest 객체로 서버와 HTTP 통신
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // 첫 번째 인자: HTTP 메서드 (POST)
    // 두 번째 인자: 요청 URL
    xhr.open("POST", "https://todo-api.fesp.shop/api/todolist");
    // 테스트용 URL: "/api/todolist?delay=10000000"
    // delay 파라미터로 의도적으로 응답 지연 가능

    // Content-Type 헤더 설정
    // 서버에 JSON 형식의 데이터를 보낸다고 알려줌
    xhr.setRequestHeader("Content-Type", "application/json");

    // 서버 응답 데이터 타입을 JSON으로 설정
    // 자동으로 JSON.parse() 실행되어 객체로 변환됨
    xhr.responseType = "json";

    // 서버 응답 완료 시 실행되는 콜백
    // 정상 응답(2xx)과 에러 응답(4xx, 5xx) 모두 여기서 처리
    xhr.onload = () => {
      clearTimeout(timer); // 응답이 왔으니 타이머 취소

      if (xhr.status >= 200 && xhr.status < 300) {
        // 정상 응답 처리 (2xx)
        console.log("서버 응답:", xhr.response);
        alert("할일이 추가되었습니다.");

        // 폼 초기화
        setFocus("title"); // 먼저 제목 입력란에 포커스
        reset(); // 그 다음 입력값들 초기화
      } else {
        // 서버 에러 응답 처리 (4xx, 5xx)
        console.error("서버 에러:", xhr.status, xhr.response);

        // 서버가 보낸 에러 메시지가 있으면 그걸 보여주고,
        // 없으면 기본 에러 메시지 출력
        alert(xhr.response.error?.message || "할일 추가에 실패했습니다.");
      }
    };

    // 타임아웃으로 요청이 중단됐을 때 실행
    // 2초 이상 서버 응답이 없는 경우 실행됨
    xhr.onabort = () => {
      alert("타임 아웃");
    };

    // 네트워크 에러 발생 시 실행
    // 서버 연결 자체가 실패한 경우 (못 찾거나, 오프라인 등)
    xhr.onerror = () => {
      console.error("네트워크 에러 발생");
      alert("할일 추가에 실패했습니다.");
    };

    // 실제 서버 요청 전송
    // item 객체를 JSON 문자열로 변환해서 전송
    // 서버는 JSON.parse()로 다시 객체로 변환하여 처리
    xhr.send(JSON.stringify(item));
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">제목 :</label>
          <input
            type="text"
            id="title"
            autoFocus
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          {/* error 메시지 출력 */}
          <div className="input-error">{errors.title?.message}</div>
          <br />
          <label htmlFor="content">내용 :</label>
          <textarea
            id="content"
            cols="23"
            rows="5"
            {...register("content", {
              required: "내용을 입력하세요.",
            })}
          />
          <div className="input-error">{errors.content?.message}</div>
          <br />
          <button type="submit">추가</button>
          {/* submit 타입 버튼으로 변경 */}
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoDetail;

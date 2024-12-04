import useAxiosInstance from "@hooks/useAxiosInstance";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function TodoEdit() {
  // Outlet 컨텍스트에서 할일 아이템과 데이터 갱신 함수 추출
  const { item, refetch } = useOutletContext();

  // 페이지 이동할 때 쓸 훅임
  const navigate = useNavigate();

  // react-hook-form 셋팅
  // - register: 폼 입력란 등록하고 검사 규칙
  // - handleSubmit: 폼 제출할 때 검사하고 제출 함수 실행
  // - errors: 입력값 검사해서 문제 있으면 에러 메시지 담는 통
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 기존에 있던 할일 데이터로 폼 채워놓음
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  });

  // axios 인스턴스
  const axios = useAxiosInstance();

  // 수정 작업
  const onSubmit = async (formData) => {
    try {
      // e.preventDefault() 이거 안 써도 됨
      // -> react-hook-form의 handleSubmit이 알아서 처리해줌

      // ⚠️ 이런 방식으로 하면 안 됨 (참고용)
      // useAxios({url: '/todolist', method: 'PATCH', body: {title: '', content: ''}});
      // 이유:
      // 1. 훅은 컴포넌트 최상위에서만 써야됨 (이벤트 핸들러 안에서 못 씀)
      // 2. useAxios/useFetch 같은 데이터 가져오는 훅들은 페이지 처음 로드될 때만 쓸 수 있음
      // 3. 수정/삭제는 사용자가 버튼 누르거나 할 때 실행돼야 해서
      //    이런 훅으로는 처리 못 함

      // 서버에 수정 요청 보냄
      await axios.patch(
        `/todolist/${item._id}`, // 수정할 할일의 ID
        formData // 수정할 내용 (title, content, done)
      );

      // 수정 성공하면 알려줌
      alert("할 일이 수정되었습니다.");

      // 수정 끝나고 상세보기 화면으로 돌아감
      navigate(-1);

      // 목록 새로고침함
      // refetch() 호출하면:
      // 1. 서버에서 최신 데이터 다시 가져옴
      // 2. 상태 업데이트되면서 화면도 같이 바뀜
      // -> 수정된 내용이 바로 반영됨
      refetch();
    } catch (err) {
      // 에러 났을 때:
      // 1. 콘솔에 자세한 에러 내용 기록
      console.log(err);
      // 2. 사용자한테 실패했다고 알려줌
      alert("할 일 수정에 실패하였습니다.");
    }
  };

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        {/* handleSubmit 은 react-hook-form 에서 제공되는 메서드 */}
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
          <label htmlFor="done">완료 :</label>
          <input type="checkbox" id="done" {...register("done")} />
          <br />
          <button type="submit">수정</button>
          <Link to={`/list/${item._id}`}>취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;

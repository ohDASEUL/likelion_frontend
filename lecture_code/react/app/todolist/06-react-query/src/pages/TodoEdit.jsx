import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  const { item, refetch } = useOutletContext();

  // 프로그래밍 방식으로 페이지 이동에 사용
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      content: item.content,
      done: item.done,
    },
  });

  // axios 인스턴스
  const axios = useAxiosInstance();

  const queryClient = useQueryClient();

  // 수정 기능을 React Query로 변경(숙제-강사님 버전)
  // 수정 작업
  const updateItem = useMutation({
    mutationFn: (formData) => axios.patch(`/todolist/${item._id}`, formData),
    onSuccess: () => {
      alert("할일이 수정 되었습니다.");
      // 할일 상세보기로 이동
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["todolist", item._id] });
    },
    onError: () => {},
  });

  return (
    <>
      <h2>할일 수정</h2>
      <div className="todo">
        <form onSubmit={handleSubmit(updateItem.mutate)}>
          <label htmlFor="title">제목 :</label>
          <input
            type="text"
            id="title"
            autoFocus
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
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

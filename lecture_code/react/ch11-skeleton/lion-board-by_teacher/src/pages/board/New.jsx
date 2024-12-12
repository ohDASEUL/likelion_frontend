/**
 * 게시글 작성 페이지 컴포넌트
 * 사용자가 제목과 내용을 입력하여 새로운 게시글을 작성할 수 있는 폼을 제공합니다.
 */
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputError from "@components/InputError";

export default function New() {
  const navigate = useNavigate();

  // react-hook-form의 주요 기능들을 구조 분해 할당으로 가져옴
  const {
    register, // 폼 필드를 등록하고 유효성 검사 규칙을 설정
    handleSubmit, // 폼 제출 시 실행될 함수를 설정
    formState: { errors }, // 폼의 유효성 검사 오류 상태를 관리
  } = useForm();

  const axios = useAxiosInstance(); // 커스텀 axios 인스턴스 사용
  const { type } = useParams(); // URL에서 게시판 타입 파라미터 추출
  const queryClient = useQueryClient(); // React Query의 캐시 관리 클라이언트

  // 게시글 추가를 위한 mutation 설정
  const addItem = useMutation({
    // mutation 함수: 서버에 POST 요청을 보내 새 게시글 생성
    mutationFn: (formData) => {
      const body = {
        title: formData.title,
        content: formData.content,
        type: type,
      };
      return axios.post(`/posts`, body);
    },
    // 성공 시 실행될 콜백
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      // 게시글 목록 쿼리를 무효화하여 새로고침 유도
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`); // 게시글 목록 페이지로 이동
    },
    // 에러 처리
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>

      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(addItem.mutate)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              {...register("title", { required: "제목은 필수입니다." })}
            />
            <InputError target={errors.title} />
          </div>

          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register("content", { required: "내용은 필수입니다." })}
            ></textarea>
            <InputError target={errors.content} />
          </div>

          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              등록
            </button>
            <Link
              to="/info"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

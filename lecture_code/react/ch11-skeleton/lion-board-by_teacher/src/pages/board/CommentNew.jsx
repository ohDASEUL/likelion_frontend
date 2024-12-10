import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function CommentNew() {
  // react-hook-form 설정
  const {
    register, // 폼 입력 필드 등록
    handleSubmit, // 폼 제출 핸들러
    formState: { errors }, // 폼 유효성 검사 에러
    reset, // 폼 초기화 함수
  } = useForm();

  const axios = useAxiosInstance();
  const { _id } = useParams(); // URL에서 게시글 ID 추출
  const queryClient = useQueryClient();

  // 새 댓글 추가를 위한 mutation 설정
  const addItem = useMutation({
    mutationFn: (formData) => axios.post(`/posts/${_id}/replies`, formData),
    onSuccess: () => {
      // 댓글 추가 성공 시 목록 갱신 및 폼 초기화
      queryClient.invalidateQueries({ queryKey: ["posts", _id] });
      reset();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(addItem.mutate)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            {...register("content", { required: "내용은 필수입니다." })}
          />

          <InputError target={errors.content} />
        </div>
        <button
          type="submit"
          className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
}

import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// CommentNew.jsx
export default function CommentNew() {
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  const { type, _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addComment = useMutation({
    mutationFn: async (formData) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      const body = {
        content: formData.content,
        type: type,
      };
      return axios.post(`/posts/${_id}/replies`, body);
    },
    onSuccess: () => {
      alert("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", _id] });
      reset();
    },
    onError: (error) => {
      console.error(error);
      if (error.isAuthError) {
        navigate("/users/login", {
          state: { from: location.pathname },
          replace: true,
        });
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    },
  });

  if (!user) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg">
        <p className="text-center text-red-500 mb-2">
          로그인 후에 댓글을 작성할 수 있습니다.
        </p>
        <div className="text-center">
          <button
            onClick={() =>
              navigate("/users/login", {
                state: { from: location.pathname },
              })
            }
            className="bg-orange-500 py-1 px-4 text-sm text-white font-semibold hover:bg-amber-400 rounded"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(addComment.mutate)}>
        <div className="mb-4">
          <textarea
            {...register("content", { required: "내용은 필수입니다." })}
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
          />
          {errors.content && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
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

import { Link, useParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

export default function CommentListItem({ comment }) {
  const axios = useAxiosInstance();
  const { type, _id } = useParams();
  const queryClient = useQueryClient();

  const deleteComment = useMutation({
    mutationFn: () => axios.delete(`/posts/${_id}/replies/${comment._id}`),
    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries(["comments", _id]);
    },
    onError: (err) => {
      console.error(err);
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment.mutate();
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={
            comment.user?.image ||
            "https://api.fesp.shop/files/00-sample/user-muzi.webp"
          }
          alt={`${comment.user?.name || "사용자"} 프로필 이미지`}
        />
        <Link to="" className="text-orange-400">
          {comment.user?.name || "사용자"}
        </Link>
        <time className="ml-auto text-gray-500" dateTime={comment.createdAt}>
          {new Date(comment.createdAt).toLocaleString()}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <form onSubmit={handleDelete}>
          <pre className="whitespace-pre-wrap text-sm">{comment.content}</pre>
          <button
            type="submit"
            className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isMine: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
};

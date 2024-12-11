import { Link, useParams } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useUserStore from "@zustand/userStore";

export default function CommentListItem({ comment }) {
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  const { _id } = useParams();
  const queryClient = useQueryClient();

  // 사용자 정보를 가져오는 쿼리 추가
  const { data: userData } = useQuery({
    queryKey: ["user", comment.user._id],
    queryFn: async () => {
      const res = await axios.get(`/users/${comment.user._id}`);
      return res.data;
    },
    enabled: !!comment.user?._id,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    cacheTime: 1000 * 60 * 30, // 30분간 캐시 보관
  });

  const deleteComment = useMutation({
    mutationFn: () => axios.delete(`/posts/${_id}/replies/${comment._id}`),
    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", _id] });
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

  const getProfileImageUrl = (userData) => {
    if (!userData?.item) return null;
    if (userData.item.profileImage?.path) {
      return `https://11.fesp.shop${userData.item.profileImage.path}`;
    }
    if (userData.item.image?.path) {
      return `https://11.fesp.shop${userData.item.image.path}`;
    }
    return null;
  };

  const profileImage = getProfileImageUrl(userData);

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        {profileImage && (
          <img
            className="w-8 h-8 mr-2 rounded-full object-cover"
            src={profileImage}
            alt={`${comment.user?.name || "사용자"} 프로필 이미지`}
          />
        )}
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
          {user?._id === comment.user._id && (
            <button
              type="submit"
              className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              삭제
            </button>
          )}
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
    updatedAt: PropTypes.string,
    isMine: PropTypes.bool,
    user: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

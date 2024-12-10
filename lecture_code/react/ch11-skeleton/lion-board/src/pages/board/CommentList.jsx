import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useParams } from "react-router-dom";
import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";

export default function CommentList() {
  const axios = useAxiosInstance();
  const { type, _id } = useParams();

  const { data: commentsData } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axios.get(`/posts/${_id}`);
      console.log("Comments API Response:", res.data);
      return res.data;
    },
  });

  const comments = commentsData?.item?.replies || [];

  console.log("댓글 하나의 데이터 구조:", comments[0]);

  console.log("comments", comments);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {comments.length}개</h4>

      {comments.map((comment) => (
        <CommentListItem key={comment._id} comment={comment} />
      ))}

      <CommentNew />
    </section>
  );
}

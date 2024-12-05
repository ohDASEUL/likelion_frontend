import axios from "axios";
import { useEffect, useState } from "react";

// 게시글과 댓글 목록 조회를 동시에
function fetchData() {
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
}

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
    });
  }, []);

  if (!data) {
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.post.item.title}</h4>
      <Replies replies={data.replies} />
    </>
  );
}

// 댓글 목록 페이지
function Replies({ replies }) {
  if (!replies) {
    return <div>댓글 로딩중...</div>;
  }

  const list = replies.item.map((item) => (
    <li key={item._id}>{item.content}</li>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchThenRender;

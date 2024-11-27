import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);

  const navigate = useNavigate();

  const [data, setData] = useState();

  const axios = useAxiosInstance();

  // API 서버로부터 상세정보를 조회해오는 함수 선언
  const fetchDetail = async () => {
    const res = await axios.get(`/todolist/${_id}`);
    setData(res.data);
  };
  // fetchDetail 은 새로운 정보를 조회하여 data 를 새로운 상태값으로 지정

  // 최초 마운트될 때 fetchDetail 한 번만 호출
  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div id="main">
      <h2>할일 상세 보기</h2>

      {data && (
        <>
          <div className="todo">
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? "완료" : "미완료"}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>

            <Link to="./edit">수정</Link>
            <button type="button" onClick={() => navigate(-1)}>
              목록
            </button>
          </div>

          <Outlet context={{ item: data.item, refetch: fetchDetail }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;

import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);

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
      {data && ( // 조건부 렌더링
        <>
          <div className="todo">
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? "완료" : "미완료"}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            {/* 가능한 절대 주소로 지정하는 것이 좋음 */}
            <Link to="./edit">수정</Link>
            <Link to="/list">목록</Link>
          </div>
          {/* 하위 컴포넌트에게 fetchDetail 함수를 context 로 전달 */}
          <Outlet context={{ item: data.item, refetch: fetchDetail }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;

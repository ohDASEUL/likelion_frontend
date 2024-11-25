// import { Link, useParams } from "react-router-dom";

// function TodoDetail() {
//   const { id } = useParams();

//   const todo = {
//     1: {
//       title: "잠자기",
//       content: "주말에 수업 끝나면 잠이나 실컷 자야지",
//       status: "미완료",
//       createdAt: "2024.11.25 12:23:45",
//       updatedAt: "2024.11.25 13:45:12",
//     },
//     2: {
//       title: "자바스크립트 복습",
//       content: "자바스크립트 기초 복습하기",
//       status: "미완료",
//       createdAt: "2024.11.25 14:00:00",
//       updatedAt: "2024.11.25 14:00:00",
//     },
//     3: {
//       title: "리액트 과제 하기",
//       content: "리액트 라우터 실습 과제 완성하기",
//       status: "완료",
//       createdAt: "2024.11.25 10:00:00",
//       updatedAt: "2024.11.25 11:30:00",
//     },
//   }[id];

//   return (
//     <div id="main">
//       <h2>할일 상세 보기</h2>
//       <div className="todo">
//         <div>제목 : {todo.title}</div>
//         <div>내용 : {todo.content}</div>
//         <div>상태 : {todo.status}</div>
//         <div>작성일 : {todo.createdAt}</div>
//         <div>수정일 : {todo.updatedAt}</div>
//         <Link to="edit">수정</Link>
//         <Link to="/list">목록</Link>
//       </div>
//     </div>
//   );
// }

// export default TodoDetail;

import { useParams } from "react-router-dom";

function TodoDetail() {
  const { _id } = useParams();
  console.log(_id);
  return (
    <div id="main">
      <h2>할일 상세 보기</h2>
      <div className="todo">
        <div>제목 : 잠자기</div>
        <div>내용 : 주말에 수업 끝나면 잠이나 실컷 자야지</div>
        <div>상태 : 미완료</div>
        <div>작성일 : 2024.11.25 12:23:45</div>
        <div>수정일 : 2024.11.25 13:45:12</div>
        <a href="./todoedit.html">수정</a>
        <a href="./todolist.html">목록</a>
      </div>
    </div>
  );
}

export default TodoDetail;

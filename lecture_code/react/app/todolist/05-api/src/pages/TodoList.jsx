import useFetch from "@hooks/useFetch";
import TodoListItem from "@pages/TodoListItem";
import { Link, Outlet } from "react-router-dom";

// fetchAPI 사용
function TodoList() {
  // API 서버에서 목록 조회
  const { data } = useFetch({ url: "/todolist" }); // useFetch 커스텀 훅을 사용, url 을 추가한 이후, data 만 추출

  // axios 인스턴스
  const axios = useAxiosInstance();

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: API 서버에 삭제 요청
      await axios.delete(`/todolist/${_id}`);
      alert("할일이 삭제 되었습니다.");

      // TODO: 목록을 다시 조회
    } catch (err) {
      console.error(err);
      alert("할일 삭제에 실패했습니다.");
    }
  };

  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br />
        <form className="search">
          <input type="text" autoFocus />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>

      <Outlet />
    </div>
  );
}

export default TodoList;

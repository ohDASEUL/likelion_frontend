import useAxiosInstance from "@hooks/useAxiosInstance";
import TodoListItem from "@pages/TodoListItem";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Pagination.css";
import Pagination from "@components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";

function TodoList() {
  const searchRef = useRef("");

  // 쿼리 스트링 정보를 읽거나 설정
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get("keyword") || "",
    page: searchParams.get("page") || 1,
    limit: 5,
  };

  // axios 인스턴스
  const axios = useAxiosInstance();

  const { data, refetch } = useQuery({
    queryKey: ["todolist", params],
    queryFn: () => axios.get("/todolist", { params }),
    select: (res) => res.data,
    staleTime: 1000 * 60, // fresh => stale 전환되는데 걸리는 시간
    gcTime: 1000 * 60 * 5, // 캐시 제거
  });

  // 삭제 작업
  const deleteItem = useMutation({
    mutationFn: (_id) => {
      axios.delete(`/todolist/${_id}`);
    },
    onSuccess: () => {
      alert("할 일이 삭제되었습니다.");
      refetch();
    },
    onError: (err) => {
      console.error(err);
      alert("할일 삭제 실패 했습니다.");
    },
  });

  const itemList = data?.items.map((item) => (
    <TodoListItem
      key={item._id}
      item={item}
      handleDelete={() => deleteItem.mutate(item._id)}
    />
  ));

  // 검색
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
  };

  return (
    <div id="main">
      <h2>할일 목록</h2>
      <div className="todo">
        <Link to="/list/add">추가</Link>
        <br />
        <form className="search" onSubmit={handleSearch}>
          <input
            type="text"
            autoFocus
            defaultValue={params.keyword}
            ref={searchRef}
          />
          <button type="submit">검색</button>
        </form>
        <ul className="todolist">{itemList}</ul>
      </div>

      {data && (
        <Pagination
          totalPages={data.pagination.totalPages}
          current={data.pagination.page}
        />
      )}
    </div>
  );
}

export default TodoList;

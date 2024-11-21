import Todo from "@pages/Todo";
import TodoReducer from "@pages/TodoReducer";
import { useCallback, useReducer, useRef } from "react";

function TodoContainer() {
  // 샘플 목록
  const sampleItemList = [
    { _id: 1, title: "두부", done: true },
    { _id: 2, title: "계란", done: false },
    { _id: 3, title: "라면", done: true },
    { _id: 4, title: "김치", done: true },
  ];

  const [itemList, itemListDispatch] = useReducer(TodoReducer, sampleItemList);

  const nextId = useRef(sampleItemList.length + 1);

  // 할일 추가
  const addItem = (title) => {
    itemListDispatch({
      type: "ADD",
      value: { _id: nextId.current, title, done: false },
    });

    nextId.current += 1;
  };

  // 할일 완료/미완료 처리
  // TODO: 2.useCallback으로 함수를 메모이제이션
  const toggleDone = useCallback((_id) => {
    itemListDispatch({ type: "TOGGLE", value: { _id } });
  }, []);

  // 할일 삭제
  // TODO: 2.useCallback으로 함수를 메모이제이션

  const deleteItem = useCallback((_id) => {
    itemListDispatch({ type: "DELETE", value: { _id } });
  }, []);

  return (
    <Todo
      itemList={itemList}
      addItem={addItem}
      toggleDone={toggleDone}
      deleteItem={deleteItem}
    />
  );
}

export default TodoContainer;

import { produce } from "immer";

function TodoReducer(state, action) {
  const targetIndex = state.findIndex((item) => item._id === action.value._id);
  let newState = [...state];
  switch (action.type) {
    case "ADD":
      newState = produce(state, (draft) => {
        draft.push(action.value);
      });
      break;
    case "TOGGLE":
      newState = produce(state, (draft) => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;
    case "DELETE":
      newState = produce(state, (draft) => {
        draft.splice(targetIndex, 1);
      });

      break;
    default:
  }
  return newState;
}

export default TodoReducer;

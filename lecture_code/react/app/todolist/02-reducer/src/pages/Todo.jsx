import TodoInput from "@pages/TodoInput";
import TodoList from "@pages/TodoList";
import PropTypes from "prop-types";

function Todo(props) {
  return (
    <div id="main">
      <div id="container">
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={props.addItem} />
            <TodoList
              itemList={props.itemList}
              toggleDone={props.toggleDone}
              deleteItem={props.deleteItem}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

// Todo.propTypes = {
//   itemList: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       done: PropTypes.bool,
//     })
//   ).isRequired,
//   addItem: PropTypes.func.isRequired,
//   toggleDone: PropTypes.func.isRequired,
//   deleteItem: PropTypes.func.isRequired,
// };

// 강사님 버전
Todo.propTypes = {
  itemList: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Todo;

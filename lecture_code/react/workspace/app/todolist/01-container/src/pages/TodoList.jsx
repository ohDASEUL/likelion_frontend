import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const list = props.itemList.map((item) => (
    <TodoItem
      key={item._id}
      item={item}
      toggleDone={props.toggleDone}
      deleteItem={props.deleteItem}
    />
  ));

  return <ul className="todolist">{list}</ul>;
}

TodoList.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool,
    })
  ).isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

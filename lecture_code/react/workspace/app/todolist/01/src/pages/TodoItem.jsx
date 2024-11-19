import PropTypes from "prop-types";

export default function TodoItem({ item, toggleDone, deleteItem }) {
  return (
    <li>
      <span>{item._id}</span>
      <span onClick={() => toggleDone(item._id)}>
        {item.done ? <s>{item.title}</s> : item.title}
      </span>
      <button type="button" onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

TodoItem.prototype = {
  // item: PropTypes.object.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }),
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

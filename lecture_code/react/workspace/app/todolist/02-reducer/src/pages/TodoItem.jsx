import PropTypes from "prop-types";

export default function TodoItem(props) {
  return (
    <li>
      <span>{props.item._id}</span>
      <span onClick={() => props.toggleDone(props.item._id)}>
        {props.item.done ? <s>{props.item.title}</s> : props.item.title}
      </span>
      <button type="button" onClick={() => props.deleteItem(props.item._id)}>
        삭제
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }).isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

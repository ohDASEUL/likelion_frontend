// PropTypes 및 라우팅을 위한 의존성 import
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// TodoListItem 컴포넌트의 Props 타입 정의
TodoListItem.propTypes = {
  // item: 할일 항목 데이터 객체
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool, // done 의 proptype 은 필수가 아니도록 지정(있으면 true, undefined 면 그냥 false)
  }),
  // handleDelete: 삭제 기능 구현을 위한 콜백 함수
  handleDelete: PropTypes.func.isRequired,
};

/**
 * TodoListItem 컴포넌트: 개별 할일 항목을 표시하는 컴포넌트
 * @param {Object} item - 할일 항목 데이터 ({_id, title, done})
 * @param {Function} handleDelete - 항목 삭제 핸들러 함수
 * @returns {JSX.Element} 할일 항목 UI를 렌더링
 */
function TodoListItem({ item, handleDelete }) {
  // TodoList (부모 컴포넌트)로부터 item 객체를 props 로 전달 받음
  return (
    <li>
      {/* 할일 항목의 ID 표시 */}
      <span>{item._id}</span>

      {/* 할일 상세 페이지로의 링크 및 완료 상태에 따른 제목 스타일링 */}
      <Link to={`/list/${item._id}`}>
        {item.done ? <s>{item.title}</s> : item.title}
      </Link>

      {/* 모든 a 태그의 url 이 동일한 경우, 어떤 항목의 상세인지 확인하기 어려움, 따라서 각 항목에 대한 id 가 필요 */}
      <button type="button" onClick={() => handleDelete(item._id)}>
        삭제
      </button>
    </li>
  );
}

export default TodoListItem;

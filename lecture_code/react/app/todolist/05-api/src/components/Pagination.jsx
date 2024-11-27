import { Link, useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages, current = 1 }) {
  let pageList = [];

  const [searchParams] = useSearchParams();

  for (let page = 1; page <= totalPages; page++) {
    searchParams.set("page", page);

    let search = searchParams.toString();

    pageList.push(
      <li key={page} className={current === page ? "active" : ""}>
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }

  return (
    <div className="pagination">
      <ul>{pageList}</ul>
    </div>
  );
}

import ListItem from "@pages/board/ListItem";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function List() {
  const axios = useAxiosInstance();
  const { type } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", type],
    queryFn: async () => {
      const response = await axios.get("/posts", { params: { type } });
      console.log("API Response Data:", response.data);

      return response.data.item.filter((item) => {
        if (
          !item ||
          !item.title ||
          !item._id ||
          !item.user ||
          !item.user.name
        ) {
          return false;
        }

        // user.image가 객체인 경우 url 필드를 사용하거나, 없는 경우 null로 설정
        if (item.user.image && typeof item.user.image === "object") {
          item.user.image = item.user.image.url || null;
        }

        return true;
      });
    },
    staleTime: 1000 * 10,
  });

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">로딩중...</div>
      </div>
    );
  }

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <form action="#">
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form>

        <Link
          to="new"
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          글작성
        </Link>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <ListItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
        <hr />

        <div>
          <ul className="flex justify-center gap-3 m-4">
            <li className="font-bold text-blue-700">
              <Link to={`/${type}?page=1`}>1</Link>
            </li>
            <li>
              <Link to={`/${type}?page=2`}>2</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

import useFetch from "@hooks/useFetch";
import { PacmanLoader } from "react-spinners";

function App() {
  const { data, error, isLoading } = useFetch({ url: "/todolist?delay=2000" });
  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>
      {isLoading && (
        <PacmanLoader color="#8be6f6" size={20} speedMultiplier={2} />
      )}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

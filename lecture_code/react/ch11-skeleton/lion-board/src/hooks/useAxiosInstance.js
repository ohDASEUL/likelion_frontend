import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-brunch",
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // config.headers[
    //   "Authorization"
    // ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQ2LCJ0eXBlIjoidXNlciIsIm5hbWUiOiLrsKnquIjqsIDsnoXtlbTrhpPqs6DquYzrqLnsnYDrsJTrs7TsnoXri4jri6QiLCJlbWFpbCI6ImJhYm9AYmFiby5jb20iLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTczMzc5NzI2MSwiZXhwIjoxNzMzODgzNjYxLCJpc3MiOiJGRVNQIn0.OnBFxwtirn67XlYtiu3V6-qLK4lLllSFeGwfNw0uxjc`;
    // config.headers[
    //   "Authorization"
    // ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMzLCJ0eXBlIjoidXNlciIsIm5hbWUiOiLrtpXslrTrubXsgqzri6zrnbwiLCJlbWFpbCI6ImJ1bmdlb2JiYW5nQHNhZG9sbGEuY29tIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzM3OTkwMzYsImV4cCI6MTczMzg4NTQzNiwiaXNzIjoiRkVTUCJ9.s8ey9cS0VzII_dsYiq0eOoiqkgcU_82qO-BKA2mbWkk`;
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjg2LCJ0eXBlIjoidXNlciIsIm5hbWUiOiLsmKTri6TsiqwiLCJlbWFpbCI6ImNvbWVzZXVsMzEyQGdtYWlsLmNvbSIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzMzODA2OTE4LCJleHAiOjE3MzM4OTMzMTgsImlzcyI6IkZFU1AifQ.37dCZTSAnZG6zJ9bdSs-PbnxgaSUCxm6sxpwAA1XPLg`;

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;

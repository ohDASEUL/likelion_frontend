import useUserStore from "@zustand/userStore";
import axios from "axios";

/**
 * 커스텀 axios 인스턴스를 생성하고 설정하는 훅 함수
 * 기본 설정, 인터셉터 등을 포함한 axios 인스턴스를 반환함
 * @returns {AxiosInstance} 생성된 axios 인스턴스
 */

function useAxiosInstance() {
  // Zustand store에서 현재 로그인된 사용자 정보를 가져옴
  const { user } = useUserStore();

  // axios  인스턴스 생성 및 기본 설정
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // 요청 본문 타입을 JSON으로 설정
      accept: "application/json", // 응답 타입을 JSON으로 설정
      "client-id": "00-branch", // 클라이언트 식별자
    },
  });

  // 요청 인터셉터 설정
  instance.interceptors.request.use((config) => {
    // 사용자가 로그인된 경우, Authorization 헤더에 엑세스 토큰 추가
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }

    // 모든 요청에 500ms의 지연 시간 파라미터 추가
    // 기존 파라미터가 있다면 덮어쓰지 않고 합침
    config.params = {
      delay: 500,
      ...config.params,
    };
    return config;
  });

  // 응답 인터셉터 설정
  instance.interceptors.response.use(
    // 정상 응답 처리
    (response) => {
      return response;
    },
    // 에러 응답 처리
    (error) => {
      console.error("인터셉터", error); // 에러 로깅
      return Promise.reject(error); // 에러를 다시 throw하여 호출자가 처리하도록 함
    }
  );
  return instance; // 설정이 완료된 axios 인스턴스 반환
}

export default useAxiosInstance;

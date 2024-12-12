import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// access token 재발급 URL
const REFRESH_URL = "/auth/refresh";

/**
 * 커스텀 axios 인스턴스를 생성하고 설정하는 훅 함수
 * - 토큰 기반 인증 관리
 * - 토큰 만료 시 자동 갱신
 * - 공통 에러 처리 로직
 */
function useAxiosInstance() {
  // Zustand store에서 사용자 정보 조회/수정 함수 가져오기
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

  // axios 인스턴스 생성 및 기본 설정
  const instance = axios.create({
    baseURL: "https://11.fesp.shop", // API 서버 주소
    timeout: 1000 * 15, // 15초 타임아웃
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-board", // 클라이언트 식별자
    },
  });

  // 요청 인터셉터 - 모든 HTTP 요청 전에 실행
  instance.interceptors.request.use((config) => {
    // refresh 요청이 아니고 로그인된 경우 access token 추가
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 모든 요청에 지연시간 파라미터 추가
    config.params = {
      delay: 500, // API 응답 시뮬레이션을 위한 지연
      ...config.params, // 기존 쿼리스트링 유지
    };
    return config;
  });

  // 응답 인터셉터 - 모든 HTTP 응답에 대해 실행
  instance.interceptors.response.use(
    // 정상 응답(2xx) 처리
    (response) => {
      return response;
    },
    // 에러 응답 처리
    async (error) => {
      console.error("인터셉터", error);
      const { config, response } = error;

      // 401 인증 에러 처리
      if (response?.status === 401) {
        if (config.url === REFRESH_URL) {
          // refresh token도 만료된 경우
          navigateLogin();
        } else if (user) {
          // access token만 만료된 경우
          try {
            // refresh token으로 새 access token 발급 요청
            const {
              data: { accessToken },
            } = await instance.get(REFRESH_URL, {
              headers: {
                Authorization: `Bearer ${user.refreshToken}`,
              },
            });
            // 새 토큰으로 사용자 정보 업데이트
            setUser({ ...user, accessToken });

            // 실패했던 원래 요청 재시도
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          } catch (err) {
            // refresh token 요청 실패 시
            navigateLogin();
          }
        } else {
          // 로그인하지 않은 경우
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  /**
   * 로그인 페이지 이동 함수
   * 사용자 확인 후 현재 페이지 정보와 함께 로그인 페이지로 이동
   */
  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    gotoLogin &&
      navigate("/users/login", { state: { from: location.pathname } });
  }

  return instance;
}

export default useAxiosInstance;

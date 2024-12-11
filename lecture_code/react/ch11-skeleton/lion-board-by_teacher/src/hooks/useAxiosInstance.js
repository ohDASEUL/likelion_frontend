import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 커스텀 axios 인스턴스를 생성하고 설정하는 훅 함수
 * 기본 설정, 인터셉터 등을 포함한 axios 인스턴스를 반환함
 * - 토큰 기반 인증 처리
 * - 토큰 만료 시 자동 재발급
 * - API 요청 지연 시간 설정
 * @returns {AxiosInstance} 설정된 axios 인스턴스
 */

// 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받는 엔드포인트
const REFRESH_URL = "/auth/refresh";

function useAxiosInstance() {
  // Zustand store에서 사용자 정보와 업데이트 함수를 가져옴
  const { user, setUser } = useUserStore();

  // 페이지 이동을 위한 네비게이션 훅
  const navigate = useNavigate();
  // 현재 페이지 위치 정보를 가져오는 훅
  const location = useLocation();

  // axios 인스턴스 생성 및 기본 설정
  const instance = axios.create({
    baseURL: "https://11.fesp.shop", // API 서버 기본 URL
    timeout: 1000 * 15, // 요청 타임아웃 15초
    headers: {
      "Content-Type": "application/json", // 요청 본문 타입을 JSON으로 설정
      accept: "application/json", // 응답 타입을 JSON으로 설정
      "client-id": "00-board", // 클라이언트 식별자
    },
  });

  // 요청 인터셉터 설정 - 모든 요청이 서버로 가기 전에 실행됨
  instance.interceptors.request.use((config) => {
    // 로그인된 사용자의 경우 토큰 추가
    if (user) {
      // 리프레시 토큰 요청인 경우 리프레시 토큰을, 그 외에는 액세스 토큰을 사용
      let token = user.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.refreshToken;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // API 응답 시간 시뮬레이션을 위한 지연 시간 추가
    config.params = {
      delay: 500,
      ...config.params,
    };
    return config;
  });

  // 응답 인터셉터 설정 - 서버로부터의 응답을 처리하기 전에 실행됨
  instance.interceptors.response.use(
    // 정상 응답(2xx) 처리
    (response) => {
      return response;
    },
    // 에러 응답 처리 (4xx, 5xx)
    async (error) => {
      console.error("인터셉터", error);

      const { config, response } = error;

      // 401 에러(인증 실패) 처리
      if (response?.status === 401) {
        // 리프레시 토큰으로의 요청도 실패한 경우 (완전 인증 실패)
        if (config.url === REFRESH_URL) {
          // 로그인 페이지 이동 여부 확인
          const gotoLogin = confirm(
            "로그인 후에 이용 가능합니다.\n 로그인 페이지로 이동하시겠습니까?"
          );
          // 확인 시 현재 페이지 정보와 함께 로그인 페이지로 이동
          gotoLogin &&
            navigate("/users/login", { state: { from: location.pathname } });
        } else {
          // 액세스 토큰 만료 시 리프레시 토큰으로 재발급 시도
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            // 새로운 액세스 토큰으로 원래 요청 재시도
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }
      } else {
        // 401 외 다른 에러는 그대로 전파
        return Promise.reject(error);
      }
    }
  );

  /**
   * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받는 함수
   * @param {AxiosInstance} instance - axios 인스턴스
   * @returns {Promise<string|null>} 새로운 액세스 토큰 또는 null
   */
  async function getAccessToken(instance) {
    try {
      // 리프레시 토큰으로 새로운 액세스 토큰 요청
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      // 새로운 액세스 토큰으로 사용자 정보 업데이트
      setUser({ ...user, accessToken });
      return accessToken;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return instance;
}

export default useAxiosInstance;

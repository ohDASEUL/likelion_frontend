import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const REFRESH_URL = "/auth/refresh";

function useAxiosInstance() {
  const { user, setUser, resetUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "client-id": "00-board",
    },
  });

  instance.interceptors.request.use(async (config) => {
    if (!user) return config;

    // 리프레시 토큰 요청인 경우
    if (config.url === REFRESH_URL) {
      config.headers["Authorization"] = `Bearer ${user.refreshToken}`;
      return config;
    }

    try {
      const newToken = await getAccessToken(instance);
      if (!newToken) {
        resetUser();
        const error = new Error("로그인이 만료되었습니다.");
        error.isAuthError = true;
        throw error;
      }
      config.headers["Authorization"] = `Bearer ${newToken}`;
      return config;
    } catch (error) {
      resetUser();
      throw error;
    }
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.isAuthError) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/users/login", { state: { from: location.pathname } });
      }
      return Promise.reject(error);
    }
  );

  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      const tokenExpiry = new Date().getTime() + 8000; // 8초로 설정 (서버 만료시간 10초보다 조금 짧게)
      setUser({ ...user, accessToken, tokenExpiry });
      return accessToken;
    } catch (err) {
      console.error("토큰 재발급 실패:", err);
      return null;
    }
  }

  return instance;
}

export default useAxiosInstance;

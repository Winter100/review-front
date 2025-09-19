import { refreshTokenApi } from "@/service/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const baseURL = "http://localhost:8080/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 요청 인터셉터 (토큰 첨부)
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러(토큰 만료)이고, 재시도한 요청이 아닐 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 재발급이 진행 중이라면, 이 요청은 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((accessToken) => {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return api(originalRequest); // 새 토큰으로 원래 요청 재시도
        });
      }

      originalRequest._retry = true; // 재시도 플래그 설정
      isRefreshing = true;

      try {
        // 1. 토큰 재발급 API 호출
        const { accessToken, user } = await refreshTokenApi();
        console.log("재발급", accessToken);

        // 2. Zustand store의 액세스 토큰 업데이트
        useAuthStore.getState().setAuth(accessToken, user);

        // 3. 새로운 토큰으로 기본 헤더 설정
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // 4. 큐에 쌓여있던 모든 요청들을 새로운 토큰으로 재실행
        processQueue(null, accessToken);

        // 5. 실패했던 원래 요청도 새로운 토큰으로 재실행
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료되는 등 재발급 자체에 실패한 경우
        useAuthStore.getState().clearAuth(); // 사용자 정보 초기화 (로그아웃 처리)
        processQueue(refreshError as AxiosError, null); // 큐에 쌓인 요청들 모두 에러 처리

        // 로그인 페이지로 리다이렉트 등의 후처리
        // window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 401 에러가 아니거나 다른 종류의 에러는 그대로 반환
    return Promise.reject(error);
  },
);

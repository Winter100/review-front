import { refreshTokenApi } from "@/service/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useMe = () => {
  // Todo: 새로고침 시 유저 데이터 가져와야함.

  const { setAuth, clearAuth, isInitialized } = useAuthStore();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: refreshTokenApi,
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setAuth(data.accessToken, data.user);
    }

    if (isError) {
      clearAuth();
    }
  }, [data, isError, setAuth, clearAuth]);

  return {
    isLoading: isLoading && !isInitialized,
    data,
  };
};

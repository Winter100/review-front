import { signIn } from "@/service/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: signIn,
    onSuccess: (data) => {
      {
        /*
        Todo
        1. 성공시 로컬스토리지 또는 쿠키에 유저 데이터 저장하기
        2. Home으로 리다이렉트?
         */
      }
    },
    onError: (error, variables, context) => {
      {
        /*
        Todo
        1. 에러 핸들링
        2. 토스트로 에러 알려주기?
         */
      }
    },
  });
};

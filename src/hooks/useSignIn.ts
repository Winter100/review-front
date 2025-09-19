import { SignInSchema, SignInType } from "@/lib/validators/auth";
import { signIn } from "@/service/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { SignDto } from "@/types/sign-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSignIn = () => {
  // 로그인 성공시 홈페이지로 이동
  const router = useRouter();

  // 패스워드 <-> 평문 전환
  const [showPassword, setShowPassword] = useState(false);

  // 리액트 훅 폼
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 로그인 API 및 유저, 토큰 Zustand 저장
  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signIn,
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.accessToken, data.user);
      router.replace("/");
    },

    onError: (error: SignDto) => {
      switch (error.statusCode) {
        case 401:
          form.setError("root", {
            type: "custom",
            message: "이메일 또는 비밀번호가 올바르지 않습니다.",
          });
          break;

        default:
          toast.error("잠시 후 다시 시도해주세요.");
          break;
      }
    },
  });

  // 커스텀 에러 메시지를 위한 코드 (이메일 비밀번호 관련,)
  const {
    formState: { errors },
    watch,
    clearErrors,
  } = form;

  // 이메일, 비밀번호 값 변경 시 커스텀 에러 메시지 삭제를 위한 코드
  const { email: watchEmail, password: watchPassword } = watch();

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    mutate(data);
  };

  // 커스텀 에러 메시지 제거
  useEffect(() => {
    if (errors.root) {
      clearErrors("root");
    }
  }, [watchEmail, watchPassword, errors, clearErrors]);

  return {
    isPending,
    onSubmit,
    showPassword,
    setShowPassword,
    form,
    errors,
  };
};

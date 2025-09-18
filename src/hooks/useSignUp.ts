import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp } from "@/service/api/auth";
import { SignUpSchema, SignUpType } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignDto } from "@/types/sign-type";
import axios from "axios";

export const useSignUp = () => {
  // 가입 성공 시 signin 페이지로 이동 하기 위한 훅
  const router = useRouter();

  // 비밀번호 <-> 평문 전환
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 리액트 훅 폼 (onChage로 값 변경시 마다 체크)
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // 회원 가입 API 및 커스텀 에러
  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: () => {
      router.replace("/auth/signin");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as SignDto;
        switch (data.statusCode) {
          case 409:
            form.setError("email", {
              type: "server",
              message: data.message || "이미 존재하는 이메일 입니다.",
            });
            break;
          default:
            toast.error("잠시 후 다시 시도해주세요.");
            break;
        }
      }

      // axios Error가 아닌 다른 에러일 경우
      return;
    },
  });

  // 비밀번호 확인 제거 후 가입 요청
  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...result } = data;
    mutate({ ...result });
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    form,
    onSubmit,
    isPending,
  };
};

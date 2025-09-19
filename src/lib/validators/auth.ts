import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ error: "이메일 형식을 입력해주세요." }),
  password: z.string().min(6, { error: "6글자 이상으로 입력해주세요." }),
});

export const SignUpSchema = z
  .object({
    email: z.email({ error: "이메일 형식을 입력해주세요." }),
    nickname: z.string().min(3, { error: "최소 3자가 필요합니다." }),
    password: z.string().min(6, { error: "최소 6자가 필요합니다." }),
    confirmPassword: z.string().min(6, { error: "최소 6자가 필요합니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export const SignUpPayloadSchema = SignUpSchema.omit({ confirmPassword: true });

export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignupPayloadType = z.infer<typeof SignUpPayloadSchema>;

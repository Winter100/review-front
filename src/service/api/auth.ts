import { api } from "@/lib/apiClient";
import { SignInType, SignupPayloadType } from "@/lib/validators/auth";
import { SignInResponseType } from "@/types/sign-type";

export const signIn = async (data: SignInType): Promise<SignInResponseType> => {
  const response = await api.post("/auth/signin", data);

  return response.data;
};

export const signUp = async (data: SignupPayloadType) => {
  const response = await api.post("/auth/signup", data);

  return response.data;
};

export const refreshTokenApi = async (): Promise<SignInResponseType> => {
  const response = await api.get(`/auth/refresh`);

  return response.data;
};

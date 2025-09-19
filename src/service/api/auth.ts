import { api, baseURL } from "@/lib/apiClient";
import { SignInType, SignupPayloadType } from "@/lib/validators/auth";
import { SignInResponseType } from "@/types/sign-type";

export const signIn = async (data: SignInType): Promise<SignInResponseType> => {
  try {
    const response = await fetch(`${baseURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const signUp = async (data: SignupPayloadType) => {
  const response = await api.post("/auth/signup", data);

  return response.data;
};

export const refreshTokenApi = async (): Promise<SignInResponseType> => {
  const response = await api.get(`/auth/refresh`);

  return response.data;
};

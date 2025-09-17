import { SignInType, SignupPayloadType } from "@/lib/validators/auth";
import { SignInResponseType } from "@/types/sign-type";

const basicUrl = "http://localhost:8080";

export const signIn = async (data: SignInType): Promise<SignInResponseType> => {
  try {
    const response = await fetch(`${basicUrl}/auth/signin`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
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
  try {
    const response = await fetch(`${basicUrl}/auth/signup`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await fetch(`${basicUrl}/auth/check?email=${email}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });

    return response.json();
  } catch (e) {
    throw e;
  }
};

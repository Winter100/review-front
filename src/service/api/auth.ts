import { SignInType, SignUpType } from "@/lib/validators/auth";

const basicUrl = "http://localhost:8080";

export const signIn = async (data: SignInType): Promise<string> => {
  const response = await fetch(`${basicUrl}/auth/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const signUp = async (data: SignUpType) => {
  const response = await fetch(`${basicUrl}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

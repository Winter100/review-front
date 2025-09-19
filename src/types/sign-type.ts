export interface SignDto {
  message: string;
  statusCode: number;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  introduction: string | null;
}
export interface SignInResponseType {
  user: User;
  accessToken: string;
}

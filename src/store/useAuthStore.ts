import { User } from "@/types/sign-type";
import { create } from "zustand";

type State = {
  user: User | null;
  accessToken: string | null;
  isInitialized: boolean;
};
type Actions = {
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  setInitialized: () => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setInitialized: () => set({ isInitialized: true }),
}));

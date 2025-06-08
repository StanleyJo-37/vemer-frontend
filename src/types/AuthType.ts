import { UserType } from "./UserType";

export interface AuthContextType {
  user?: UserType;
  setUser?: (user: UserType) => void;
  isAuthLoading?: boolean;
  isAuthenticated?: boolean;
  isAuth?: boolean;
  setIsAuth: (newAuth: boolean) => void;
  logout: () => Promise<void>;
}

export type SocialiteProvider = "google" | "linkedin-openid";

export interface RegisterRequestType {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequestType {
  email: string;
  password: string;
}

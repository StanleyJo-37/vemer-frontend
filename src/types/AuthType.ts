import { UserType } from "./UserType";

export interface AuthContextType {
    user?: UserType;
    setUser?: (user: UserType) => void;
    loading?: boolean;
    isAuthenticated?: boolean;
};

export type SocialiteProvider = "google" | "linkedin-openid";

export interface RegisterRequestType {
    email: string;
    password: string;
    username: string
}

export interface LoginRequestType {
    email: string;
    password: string;
}
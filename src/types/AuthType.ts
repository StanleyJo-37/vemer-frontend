export interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
}

export interface AuthContextType {
    user?: User;
    setUser?: (user: User) => void;
    loading?: boolean;
    isAuthenticated?: boolean;
};

export type SocialiteProvider = "google" | "linkedin-openid";
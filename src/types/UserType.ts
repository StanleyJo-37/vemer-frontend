export interface UserType {
    id: number;
    email: string;
    profile: ProfileType;
}

export interface ProfileType {
    profile_picture: string;
    username: string;
    interest: InterestType[];
    completion: number;
}

export type InterestType = "Experience" | "E-Certificate" | "Volunteering" | "SAT Point" | "Community Service Hours";
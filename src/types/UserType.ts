export interface UserType {
    id: number;
    email: string;
    name: string;
    profile_photo_path:string
    is_publisher:boolean
}


export type InterestType = "Experience" | "E-Certificate" | "Volunteering" | "SAT Point" | "Community Service Hours";
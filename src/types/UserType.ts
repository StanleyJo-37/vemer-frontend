export type RoleType = "volunteer" | "publisher";

export interface UserType {
  id: number;
  email: string;
  name: string;
  profile_photo_path: string;
  role: RoleType;
  is_publisher: boolean;
  profile_completion: boolean;
}

export type InterestType =
  | "Experience"
  | "E-Certificate"
  | "Volunteering"
  | "SAT Point"
  | "Community Service Hours";

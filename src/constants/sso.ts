import { SocialiteProvider } from "@/types/AuthType";

const sso: {
  label: string;
  provider: SocialiteProvider;
}[] = [
  {
    label: "Google",
    provider: "google",
  },
  {
    label: "LinkedIn",
    provider: "linkedin-openid",
  },
];

export default sso;

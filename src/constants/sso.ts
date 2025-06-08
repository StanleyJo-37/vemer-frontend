import { SocialiteProvider } from "@/types/AuthType";
import { icons } from "lucide-react";

const sso: {
  label: string;
  provider: SocialiteProvider;
  iconName: keyof typeof icons;
}[] = [
  {
    label: "Google",
    provider: "google",
    iconName: "Mail",
  },
  // {
  //   label: "LinkedIn",
  //   provider: "linkedin-openid",
  //   iconName: "Linkedin",
  // },
];

export default sso;

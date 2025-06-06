import {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LucideIcon from "./lucide-icon";

export default function ProfilePicture({
  profilePicturePath,
  avatarProps,
  avatarImageProps,
  avatarFallbackProps,
}: {
  profilePicturePath: string;
  avatarProps?: AvatarProps;
  avatarImageProps?: AvatarImageProps;
  avatarFallbackProps?: AvatarFallbackProps;
}) {
  return (
    <Avatar {...avatarProps}>
      <AvatarImage
        {...avatarImageProps}
        src={profilePicturePath}
        alt="Profile Picture"
      />
      <AvatarFallback {...avatarFallbackProps}>
        <LucideIcon icon="UserRoundMinus" />
      </AvatarFallback>
    </Avatar>
  );
}

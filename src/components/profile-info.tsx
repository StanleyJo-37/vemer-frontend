import { UserType } from "@/types/UserType";
import ProfilePicture from "./profile-picture";
import { Button } from "./ui/button";
import LucideIcon from "./lucide-icon";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function ProfileInfo({ user }: { user: UserType }) {
  const { logout, isLoadingLogout } = useAuth();

  return (
    <div className="relative">
      <div className="group cursor-pointer inline-block">
        <div className="flex flex-row space-x-4 items-center">
          <ProfilePicture profilePicturePath={user.profile_photo_path} />
          <p>{user.name}</p>
        </div>
        <div className="w-full absolute hidden group-hover:flex justify-center bg-white">
          <Button
            variant="ghost"
            className="w-full flex flex-row justify-center items-center hover:bg-gray-400 text-red-600"
            disabled={isLoadingLogout}
            onClick={logout}
          >
            <LucideIcon icon="PowerOff" />
            <p>Log out</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

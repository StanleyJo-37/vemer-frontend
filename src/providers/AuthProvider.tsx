"use client";

import ProfileAPI from "@/api/ProfileAPI";
import AuthContext from "@/context/AuthContext";
import verifyAuth from "@/lib/verify-auth";
import { UserType } from "@/types/UserType";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

export default function AuthProvider({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isAuth] = useState<boolean>(authenticated);

  useEffect(() => {
    setIsAuthLoading(true);

    const savedUserProfile = localStorage.getItem("user");

    if (isAuth) {
      if (savedUserProfile) {
        setUser(JSON.parse(savedUserProfile) as UserType);
      } else {
        ProfileAPI.me()
          .then((res) => {
            setUser(res.data as UserType);
            localStorage.setItem("user", JSON.stringify(res.data));
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              if (err.status === 403) setUser(undefined);
            }
          })
          .finally(() => setIsAuthLoading(false));
      }
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthLoading,
        isAuthenticated: !!user,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

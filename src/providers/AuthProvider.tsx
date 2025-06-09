"use client";

import AuthAPI from "@/api/AuthAPI";
import ProfileAPI from "@/api/ProfileAPI";
import AuthContext from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import verifyAuth from "@/lib/verify-auth";
import { UserType } from "@/types/UserType";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
  const [isAuth, setIsAuth] = useState<boolean>(authenticated);
  const router = useRouter();

  const fetchUser = () => {
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
  };

  useEffect(() => {
    setIsAuthLoading(true);

    const savedUserProfile = localStorage.getItem("user");

    if (isAuth) {
      if (savedUserProfile) {
        setUser(JSON.parse(savedUserProfile) as UserType);
      } else {
        fetchUser();
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuth]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user) {
      if (storedUser) setUser(JSON.parse(storedUser) as UserType);
      else {
        fetchUser();
      }
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const { toast } = useToast();

  const logout = async () => {
    setIsLoadingLogout(true);
    try {
      const resp = AuthAPI.logout();

      localStorage.removeItem("user");
      router.push("/auth/login");
      setIsAuth(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message || err.message);
      }
    } finally {
      setIsLoadingLogout(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthLoading,
        isAuthenticated: !!user,
        isAuth,
        setIsAuth,
        logout,
        isLoadingLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

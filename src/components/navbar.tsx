"use client";
import useAuth from "@/hooks/useAuth";

import {
  NavBar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import ProfilePicture from "./profile-picture";

export interface NavbarProps {
  role: "user" | "unregistered" | "publisher";
}

export type RoleType = NavbarProps["role"];

export const Navbar = () => {
  const { user, isAuth } = useAuth();

  const navItems = [
    {
      name: "About",
      link: "/",
    },
    {
      name: "Activities",
      link: "/activities",
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
    },
    {
      name: "Dashboard",
      link:
        user?.role === "volunteer"
          ? "/user-dashboard"
          : user?.role === "publisher"
          ? "/publisher-dashboard"
          : "/auth/login",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <NavBar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {isAuth && user ? (
              <>
                <ProfilePicture profilePicturePath={user.profile_photo_path} />
                <p>{user.name}</p>
              </>
            ) : (
              <>
                <NavbarButton
                  variant="dark"
                  href="/auth/login"
                  className="bg-sky-600"
                >
                  Login
                </NavbarButton>
                <NavbarButton variant="secondary" href="/auth/register">
                  Register
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {isAuth && user ? (
                <>
                  <ProfilePicture
                    profilePicturePath={user.profile_photo_path}
                  />
                  <p>{user.name}</p>
                </>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="dark"
                    className="w-full bg-sky-600"
                    href="/auth/login"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    href="/auth/register"
                  >
                    Register
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavBar>
    </div>
  );
};

"use client";

import API from "@/api/axios";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // This single API call tells us if the user is logged in AND their role.
        const response = await API.AuthenticatedAPI.get("/is-publisher");

        // This is the core logic for this layout:
        if (response.data.is_publisher) {
          // If the user IS a publisher, they don't belong here.
          // Redirect them to their correct dashboard.
          router.replace("/publisher-dashboard");
        } else {
          // If they are NOT a publisher, they are an authorized regular user.
          // Grant them access to see the content.
          setIsAuthorized(true);
        }
      } catch (error) {
        // This catch block will trigger if the session is invalid (e.g., a 401 error).
        // This means the user is not logged in at all.
        console.error("User dashboard auth check failed:", error);
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [router]);

  return (
    <>
      <Navbar />
      <main> {/* Add padding-top to offset fixed navbar height */}
        {/*
          This block conditionally renders the content based on the auth state.
        */}
        {isLoading ? (
          <div className="container mx-auto p-4 text-center">Loading Dashboard...</div>
        ) : isAuthorized ? (
          children // If authorized, render the actual page content.
        ) : (
          <div className="container mx-auto p-4 text-center">Redirecting...</div>
        )}
      </main>
    </>
  );
}

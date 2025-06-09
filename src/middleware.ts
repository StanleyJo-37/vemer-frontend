// src/middleware.ts (The New, Simpler Version)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Combine all routes that require a user to be logged in.
const allProtectedRoutes = ["/user-dashboard", "/publisher-dashboard"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("vemer_token")?.value;

  // 1. If user is trying to access ANY protected route
  if (allProtectedRoutes.some((route) => pathname.startsWith(route))) {
    // And they are NOT logged in, redirect them to login.
    if (!sessionToken) {
      const loginUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If user IS logged in and tries to see the login page, redirect them.
  if (sessionToken && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/user-dashboard", request.url)); // Redirect to a generic default
  }

  // If neither of the above, allow the request to proceed.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
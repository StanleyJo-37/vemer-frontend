import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PublisherDashboardAPI from "./api/PublisherDashboardAPI";

// Define your protected routes
const protectedRoutes = ["/user-dashboard"]; // Add any other routes that need authentication
const publisherRoutes = ["/publisher-dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("vemer_token")?.value;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (publisherRoutes.some((route) => pathname.startsWith(route))) {
    const response = await PublisherDashboardAPI.isPublisher();

    if (!response.data) {
      const notfoundUrl = new URL("/404notfound", request.url);
      notfoundUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(notfoundUrl);
    }
  }

  if (
    authToken &&
    (pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/publisher-dashboard", request.url)); // Or your main authenticated page
  }

  return NextResponse.next();
}

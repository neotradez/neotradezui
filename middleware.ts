import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/terms",
  "/privacy",
  "/contact",
  "/marketplace",
  "/explore",
]

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true"
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's an API route, let it through (API routes handle their own auth)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // If it's a public route, let it through
  if (isPublicRoute) {
    // If user is already logged in and trying to access sign-in or sign-up, redirect to dashboard
    if (isLoggedIn && (pathname === "/sign-in" || pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // If it's a protected route and user is not logged in, redirect to sign in
  if (!isLoggedIn) {
    const url = new URL("/sign-in", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Otherwise, let the request through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

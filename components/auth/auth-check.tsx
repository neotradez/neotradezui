"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const needsProfileCompletion = localStorage.getItem("needsProfileCompletion") === "true"

    // Public routes that don't require authentication
    const publicRoutes = [
      "/",
      "/sign-in",
      "/sign-up",
      "/forgot-password",
      "/reset-password",
      "/email-confirmation",
      "/about",
      "/terms",
      "/privacy",
      "/contact",
    ]

    // Routes that require authentication but don't require profile completion
    const authRoutes = ["/complete-profile"]

    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))
    const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to sign in if not authenticated and not on a public route
      router.push("/sign-in")
    } else if (isAuthenticated && needsProfileCompletion && !isPublicRoute && !isAuthRoute) {
      // Redirect to complete profile if authenticated but profile not completed
      router.push("/complete-profile")
    }

    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useApp } from "@/context/app-context"
import { Loader2 } from "lucide-react"

interface RouteGuardProps {
  children: React.ReactNode
}

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

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useApp()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check if route requires authentication
    const requiresAuth = !publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    // If authentication is still loading, wait
    if (isLoading) return

    // If route requires auth and user is not authenticated, redirect to login
    if (requiresAuth && !isAuthenticated) {
      router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
      setAuthorized(false)
    } else {
      setAuthorized(true)
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authorized, don't render children
  if (!authorized) {
    return null
  }

  // If authorized, render children
  return <>{children}</>
}

"use client"

import { useContext } from "react"
import { AppContext } from "@/context/app-context"

export function useAuth() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAuth must be used within an AppProvider")
  }

  // Extract authentication-related state and methods from the context
  const { user, isAuthenticated } = context

  return {
    user,
    isAuthenticated: !!user, // Ensure this returns a boolean based on user existence
  }
}

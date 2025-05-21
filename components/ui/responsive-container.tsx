"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  breakpoints?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    "2xl"?: string
  }
  defaultClassName?: string
}

export function ResponsiveContainer({
  children,
  className,
  breakpoints = {
    sm: "max-w-[640px]",
    md: "max-w-[768px]",
    lg: "max-w-[1024px]",
    xl: "max-w-[1280px]",
    "2xl": "max-w-[1536px]",
  },
  defaultClassName = "w-full mx-auto px-4",
}: ResponsiveContainerProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth)

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine which breakpoint to use
  const getBreakpointClass = () => {
    if (windowWidth >= 1536 && breakpoints["2xl"]) {
      return breakpoints["2xl"]
    } else if (windowWidth >= 1280 && breakpoints.xl) {
      return breakpoints.xl
    } else if (windowWidth >= 1024 && breakpoints.lg) {
      return breakpoints.lg
    } else if (windowWidth >= 768 && breakpoints.md) {
      return breakpoints.md
    } else if (windowWidth >= 640 && breakpoints.sm) {
      return breakpoints.sm
    }
    return ""
  }

  return <div className={cn(defaultClassName, getBreakpointClass(), className)}>{children}</div>
}

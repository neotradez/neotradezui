"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SkipToContentProps {
  contentId: string
  className?: string
}

export function SkipToContent({ contentId, className }: SkipToContentProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const contentElement = document.getElementById(contentId)
    if (contentElement) {
      contentElement.tabIndex = -1
      contentElement.focus()
      contentElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <a
      href={`#${contentId}`}
      onClick={handleClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "fixed left-4 top-4 z-50 -translate-y-full transform rounded-md bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0",
        isFocused && "translate-y-0",
        className,
      )}
    >
      Skip to content
    </a>
  )
}

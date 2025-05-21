"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  homeHref?: string
  className?: string
  separator?: React.ReactNode
}

export function Breadcrumbs({
  homeHref = "/",
  className,
  separator = <ChevronRight className="h-4 w-4" />,
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Skip rendering breadcrumbs on the home page
  if (pathname === "/") return null

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      // Convert kebab-case to Title Case for display
      const title = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return {
        title,
        href: `/${segment}`,
        segment,
      }
    })

  // Build the breadcrumb paths
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments
      .slice(0, index + 1)
      .map((s) => s.segment)
      .join("/")}`
    return { ...segment, href }
  })

  return (
    <nav aria-label="Breadcrumbs" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href={homeHref}
            className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <span className="mx-1 text-muted-foreground">{separator}</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {breadcrumb.title}
              </span>
            ) : (
              <Link href={breadcrumb.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {breadcrumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

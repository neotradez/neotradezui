"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useApp } from "@/context/app-context"
import { ROUTES } from "@/lib/routes"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const { isAuthenticated } = useApp()

  // Define navigation items - base items for all users
  const baseNavItems = [
    { href: ROUTES.HOME, label: "Home" },
    { href: ROUTES.MARKETPLACE, label: "Marketplace" },
    { href: ROUTES.MAP, label: "Map" },
    { href: ROUTES.ABOUT, label: "About" },
    // Removed "Explore" from navigation as requested
  ]

  // Additional items for authenticated users
  const authNavItems = [
    { href: ROUTES.DASHBOARD, label: "Dashboard" },
    { href: ROUTES.INVENTORY, label: "Inventory" },
    { href: ROUTES.MY_TRADES, label: "My Trades" },
    { href: ROUTES.MESSAGES, label: "Messages" },
    { href: ROUTES.NETWORK, label: "Network" }, // Added Network to ensure visibility
  ]

  // Combine the navigation items based on authentication status and deduplicate by href
  const combinedItems = isAuthenticated ? [...baseNavItems, ...authNavItems] : baseNavItems
  // Remove duplicate items by href
  const navItems = combinedItems.filter((item, index, self) => index === self.findIndex((t) => t.href === item.href))

  return (
    <nav className={cn("hidden md:flex md:gap-6 lg:gap-8", className)} {...props}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              isActive ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.label}
            {isActive && (
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D084] to-[#3B82F6]"
                layoutId="navbar-indicator"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

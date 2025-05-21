"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useApp } from "@/context/app-context"
import {
  Home,
  Search,
  Map,
  Package,
  MessageSquare,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  PlusCircle,
  Bookmark,
  Bell,
  LayoutDashboard,
  ArrowLeftRight,
  LogIn,
  UserPlus,
} from "lucide-react"

export function MobileNavigation() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      icon: <Search className="h-5 w-5" />,
    },
    {
      href: "/map",
      label: "Map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      href: "/inventory",
      label: "Inventory",
      icon: <Package className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/my-trades",
      label: "My Trades",
      icon: <ArrowLeftRight className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/saved-trades",
      label: "Saved Trades",
      icon: <Bookmark className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      requiresAuth: true,
    },
  ]

  const filteredNavItems = navItems.filter((item) => !item.requiresAuth || isAuthenticated)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-3/4 bg-background shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                    <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                      <span className="font-bold">NT</span>
                    </div>
                  </div>
                  <span className="font-heading text-xl font-bold">NeoTradez</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="px-4 py-6">
                <nav className="space-y-4">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted",
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}

                  {isAuthenticated ? (
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setIsOpen(false)
                        logout()
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                      <Link
                        href="/sign-up"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>

                {isAuthenticated && (
                  <div className="mt-8">
                    <Button asChild className="w-full gap-2">
                      <Link href="/inventory/add">
                        <PlusCircle className="h-5 w-5" />
                        Add New Item
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

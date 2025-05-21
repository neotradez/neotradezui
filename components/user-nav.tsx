"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/context/app-context"
import { ROUTES } from "@/lib/routes"
import {
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Bookmark,
  Shield,
  Bell,
  MessageSquare,
  Package,
  Calendar,
} from "lucide-react"

export function UserNav() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useApp()

  // If not authenticated, render the sign-in button with redirect parameter
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link href={ROUTES.SIGN_IN}>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href={ROUTES.SIGN_UP}>
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-[#00D084] to-[#3B82F6] hover:from-[#00C078] hover:to-[#3070E0] text-white"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    )
  }

  const menuItems = [
    { label: "Profile", icon: User, href: ROUTES.PROFILE, shortcut: "⌘P" },
    { label: "Inventory", icon: Package, href: ROUTES.INVENTORY, shortcut: "⌘I" },
    { label: "Dashboard", icon: LayoutDashboard, href: ROUTES.DASHBOARD, shortcut: "⌘D" },
    { label: "Saved Items", icon: Bookmark, href: ROUTES.SAVED_TRADES, shortcut: "⌘S" },
    { label: "My Trades", icon: Package, href: ROUTES.MY_TRADES, shortcut: "⌘T" },
    // Added Meetups to the profile dropdown
    { label: "Meetups", icon: Calendar, href: "/profile/meetups", shortcut: "⌘M" },
    { label: "Messages", icon: MessageSquare, href: ROUTES.MESSAGES, shortcut: "⌘M" },
    { label: "Notifications", icon: Bell, href: ROUTES.NOTIFICATIONS, shortcut: "⌘N" },
    { label: "Settings", icon: Settings, href: ROUTES.SETTINGS, shortcut: "⌘," },
    { label: "Security", icon: Shield, href: ROUTES.SECURITY, shortcut: "" },
  ]

  // If authenticated, render the user dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.label} onClick={() => router.push(item.href)}>
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              <span>{item.label}</span>
              {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

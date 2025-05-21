"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import { api } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

// Types
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AppContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  savedItems: string[]
  notifications: any[]
  unreadNotificationsCount: number
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  updateProfile: (profileData: any) => Promise<boolean>
  saveItem: (itemId: string) => void
  unsaveItem: (itemId: string) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [savedItems, setSavedItems] = useState<string[]>([])
  const [notifications, setNotifications] = useState<any[]>([])

  // Initialize app state
  useEffect(() => {
    const initializeApp = async () => {
      // Check for stored auth
      const storedAuth = localStorage.getItem("isAuthenticated")
      const storedUserData = localStorage.getItem("userData")

      if (storedAuth === "true" && storedUserData) {
        try {
          // Restore user from localStorage
          const userData = JSON.parse(storedUserData)
          setUser(userData)

          // Load saved items
          const storedSavedItems = localStorage.getItem("savedItems")
          if (storedSavedItems) {
            setSavedItems(JSON.parse(storedSavedItems))
          }

          // Load notifications (mock for now)
          setNotifications([
            {
              id: "notif1",
              type: "trade_proposal",
              title: "New Trade Proposal",
              message: "Alex has proposed a trade for your vintage camera",
              isRead: false,
              timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
              data: { tradeId: "trade123" },
            },
            {
              id: "notif2",
              type: "message",
              title: "New Message",
              message: "You have a new message from Sarah",
              isRead: false,
              timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
              data: { conversationId: "conv123" },
            },
            {
              id: "notif3",
              type: "trade_accepted",
              title: "Trade Accepted",
              message: "Michael accepted your trade proposal",
              isRead: true,
              timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
              data: { tradeId: "trade456" },
            },
            {
              id: "notif4",
              type: "review",
              title: "New Review",
              message: "Sarah gave you a 5-star rating",
              isRead: true,
              timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
              data: { reviewId: "review123" },
            },
            {
              id: "notif5",
              type: "meetup",
              title: "Meetup Reminder",
              message: "Your meetup with Jessica is tomorrow at 2:00 PM",
              isRead: true,
              timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
              data: { meetupId: "meetup123" },
            },
          ])
        } catch (error) {
          console.error("Error initializing app:", error)
          localStorage.removeItem("isAuthenticated")
          localStorage.removeItem("userData")
        }
      }

      setIsLoading(false)
    }

    initializeApp()
  }, [])

  // Save items to localStorage when they change
  useEffect(() => {
    if (savedItems.length > 0) {
      localStorage.setItem("savedItems", JSON.stringify(savedItems))
    }
  }, [savedItems])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await api.login(email, password)

      if (response.data) {
        setUser(response.data.user as User)

        // Set cookie for authentication
        document.cookie = "isLoggedIn=true; path=/; max-age=86400"

        // Store in localStorage as well for persistence
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userData", JSON.stringify(response.data.user))

        setIsLoading(false)
        return true
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Invalid credentials",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")

    // Clear the authentication cookie
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    router.push(ROUTES.HOME)
  }

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await api.register(name, email, password)

      if (response.data) {
        // In a real app, we might not log the user in immediately
        // and instead redirect to email verification
        localStorage.setItem("pendingRegistration", email)
        setIsLoading(false)
        return true
      } else {
        toast({
          title: "Registration failed",
          description: response.error || "Could not create account",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  // Update profile function
  const updateProfile = async (profileData: any): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await api.updateProfile(profileData)

      if (response.data) {
        setUser((prev) => (prev ? { ...prev, ...response.data } : null))
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        })
        setIsLoading(false)
        return true
      } else {
        toast({
          title: "Update failed",
          description: response.error || "Could not update profile",
          variant: "destructive",
        })
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Update failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsLoading(false)
      return false
    }
  }

  // Save item function
  const saveItem = (itemId: string) => {
    if (!savedItems.includes(itemId)) {
      setSavedItems((prev) => [...prev, itemId])
      toast({
        title: "Item saved",
        description: "Item has been added to your saved items",
      })
    }
  }

  // Unsave item function
  const unsaveItem = (itemId: string) => {
    setSavedItems((prev) => prev.filter((id) => id !== itemId))
    toast({
      title: "Item removed",
      description: "Item has been removed from your saved items",
    })
  }

  // Mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)))
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length

  // Context value
  const contextValue: AppContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    savedItems,
    notifications,
    unreadNotificationsCount,
    login,
    logout,
    register,
    updateProfile,
    saveItem,
    unsaveItem,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }

  return context
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface NetworkStatusProps {
  className?: string
}

export function NetworkStatus({ className }: NetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return

    // Set initial status
    setIsOnline(navigator.onLine)

    // Add event listeners
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      // Hide the status after 3 seconds
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Don't render anything if we're online and not showing status
  if (isOnline && !showStatus) return null

  return (
    <AnimatePresence>
      {(showStatus || !isOnline) && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full px-4 py-2 shadow-lg",
            isOnline
              ? "bg-[#00D084]/90 text-white dark:bg-[#00D084]/80"
              : "bg-destructive/90 text-white dark:bg-destructive/80",
            className,
          )}
        >
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span className="text-sm font-medium">Back online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span className="text-sm font-medium">You are offline</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

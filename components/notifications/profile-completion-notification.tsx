"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { UserCircle, X } from "lucide-react"

export function ProfileCompletionNotification() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user needs to complete profile
    const needsProfileCompletion = localStorage.getItem("needsProfileCompletion") === "true"
    const profileNotificationDismissed = localStorage.getItem("profileNotificationDismissed") === "true"

    setIsVisible(needsProfileCompletion && !profileNotificationDismissed)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("profileNotificationDismissed", "true")
    setIsVisible(false)
  }

  const handleCompleteProfile = () => {
    router.push("/complete-profile")
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed left-1/2 top-20 z-50 w-full max-w-md -translate-x-1/2 rounded-lg border border-border/40 bg-background/95 p-4 shadow-lg backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/95"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00D084]/20">
          <UserCircle className="h-5 w-5 text-[#00D084]" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-medium">Complete Your Profile</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">
            Your profile is incomplete. Complete your profile to unlock all features and start trading.
          </p>
          <Button
            size="sm"
            className="gap-1 bg-[#00D084] text-white hover:bg-[#00D084]/90"
            onClick={handleCompleteProfile}
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

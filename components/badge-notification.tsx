"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Award, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BadgeNotificationProps {
  badge: {
    id: string
    name: string
    description: string
    icon?: React.ReactNode
    color?: string
  }
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

export function BadgeNotification({ badge, onClose, autoClose = true, autoCloseDelay = 8000 }: BadgeNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) setTimeout(onClose, 300) // Allow animation to complete
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) setTimeout(onClose, 300) // Allow animation to complete
  }

  const getIconColor = () => {
    switch (badge.color) {
      case "green":
        return "text-green-500"
      case "blue":
        return "text-blue-500"
      case "amber":
        return "text-amber-500"
      case "violet":
        return "text-violet-500"
      case "pink":
        return "text-pink-500"
      case "orange":
        return "text-orange-500"
      case "indigo":
        return "text-indigo-500"
      default:
        return "text-emerald-500"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-emerald-500 dark:border-emerald-700 shadow-lg">
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="inline-block p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    {badge.icon || <Award className={`h-5 w-5 ${getIconColor()}`} />}
                  </span>
                  New Badge Unlocked!
                </CardTitle>
                <CardDescription>You've earned a new achievement</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="py-2 flex items-center justify-center">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-6 rounded-full">
                  {badge.icon || <Award className={`h-12 w-12 ${getIconColor()}`} />}
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="font-semibold text-lg">{badge.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleClose}>
                View All Badges
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BadgeNotification

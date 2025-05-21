"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface InterstitialAdProps {
  destination: string
  onComplete?: () => void
}

export function InterstitialAd({ destination, onComplete }: InterstitialAdProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (onComplete) {
      onComplete()
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative mx-4 max-w-lg rounded-lg bg-background p-1 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="absolute right-2 top-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleClose}
              disabled={countdown > 0}
            >
              <X className="h-4 w-4" />
              {countdown > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {countdown}
                </span>
              )}
            </Button>
          </div>

          <div className="overflow-hidden rounded-md">
            <div className="relative flex h-[400px] w-[600px] max-w-full flex-col items-center justify-between bg-muted p-6 text-center">
              <div>
                <span className="block text-sm text-muted-foreground">Advertisement</span>
                <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed p-8 h-[280px]">
                  <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold">Ad Placeholder</h3>
                    <p className="mb-4 text-muted-foreground">This is where an advertisement would appear</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 w-full">
                {countdown > 0 ? (
                  <Button disabled className="min-w-[120px] w-full">
                    Wait {countdown}s
                  </Button>
                ) : (
                  <Button onClick={handleClose} className="min-w-[120px] w-full">
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

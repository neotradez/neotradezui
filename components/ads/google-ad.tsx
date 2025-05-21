"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface GoogleAdProps {
  type: "banner" | "sidebar" | "inline" | "premium"
  className?: string
}

export function GoogleAd({ type, className = "" }: GoogleAdProps) {
  const [dismissed, setDismissed] = useState(false)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setAdLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (dismissed) {
    return null
  }

  // Determine ad dimensions based on type
  const getAdDimensions = () => {
    switch (type) {
      case "banner":
        return "h-[90px] w-full"
      case "sidebar":
        return "h-[250px] w-[300px]"
      case "inline":
        return "h-[250px] w-full"
      case "premium":
        return "h-[120px] w-full"
      default:
        return "h-[90px] w-full"
    }
  }

  return (
    <Card className={`overflow-hidden ${getAdDimensions()} ${className}`}>
      <CardContent className="relative flex h-full items-center justify-center p-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 z-10 h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => setDismissed(true)}
        >
          <X className="h-3 w-3" />
        </Button>
        <div className="flex h-full w-full flex-col items-center justify-center bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground">Ad Placeholder</p>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, InfoIcon } from "lucide-react"

interface PageInfoAlertProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function PageInfoAlert({
  title,
  description,
  icon = <InfoIcon className="h-4 w-4 text-blue-500" />,
}: PageInfoAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="mb-6 border-blue-500/20 bg-blue-500/10">
      <div className="flex items-start justify-between w-full">
        <div className="flex gap-2">
          {icon}
          <div>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground">{description}</AlertDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-6 w-6 -mt-1">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

interface LocationPermissionRequestProps {
  onPermissionGranted: (position: GeolocationPosition) => void
  onPermissionDenied: () => void
  onError: () => void
}

export function LocationPermissionRequest({
  onPermissionGranted,
  onPermissionDenied,
  onError,
}: LocationPermissionRequestProps) {
  const [isRequesting, setIsRequesting] = useState(false)
  const [showDefaultOption, setShowDefaultOption] = useState(false)

  // Check if geolocation is supported
  const isGeolocationSupported = typeof navigator !== "undefined" && "geolocation" in navigator

  useEffect(() => {
    // After 5 seconds, show the default location option
    const timer = setTimeout(() => {
      setShowDefaultOption(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleRequestPermission = () => {
    if (!isGeolocationSupported) {
      onError()
      return
    }

    setIsRequesting(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsRequesting(false)
        onPermissionGranted(position)
      },
      (error) => {
        console.error("Geolocation error:", error)
        setIsRequesting(false)
        onPermissionDenied()
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const handleUseDefaultLocation = () => {
    // Create a mock position object with default coordinates (New York City)
    const defaultPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        accuracy: 100,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    } as GeolocationPosition

    onPermissionGranted(defaultPosition)
  }

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="mx-4 max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location Access
          </CardTitle>
          <CardDescription>
            NeoTradez needs your location to show you nearby trades and provide accurate distance information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                  <Navigation className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Find trades near you</p>
                  <p className="text-xs text-muted-foreground">
                    See trades within your preferred distance and get accurate meetup locations
                  </p>
                </div>
              </div>
            </div>

            {!isGeolocationSupported && (
              <div className="rounded-lg bg-amber-100 p-3 dark:bg-amber-900/20">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    Your browser doesn't support geolocation. You can still use the app with a default location.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          {isGeolocationSupported && (
            <Button className="w-full" onClick={handleRequestPermission} disabled={isRequesting}>
              {isRequesting ? "Requesting Access..." : "Allow Location Access"}
            </Button>
          )}

          {(showDefaultOption || !isGeolocationSupported) && (
            <Button variant="outline" className="w-full" onClick={handleUseDefaultLocation}>
              Continue with Default Location
            </Button>
          )}

          <Button variant="ghost" className="w-full" onClick={onPermissionDenied}>
            Not Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

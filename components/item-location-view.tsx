"use client"

import { useState, useEffect } from "react"
import { LeafletMap } from "@/components/map/leaflet-map"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface ItemLocationViewProps {
  itemId: string
  itemTitle: string
  location: {
    address: string
    lat: number
    lng: number
  }
  distance: string
  itemImage?: string
  itemCategory?: string
}

export function ItemLocationView({
  itemId,
  itemTitle,
  location,
  distance,
  itemImage,
  itemCategory,
}: ItemLocationViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    // For demo purposes, we'll use a fixed user location
    // In a real app, you would get this from the browser's geolocation API
    setUserLocation({
      lat: location.lat - 0.01, // Slightly offset from the item location for demo
      lng: location.lng - 0.01,
      address: "Your Current Location",
    })

    // Set map ready after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [location])

  if (!location) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No location information available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">{location.address}</h3>
              <p className="text-sm text-muted-foreground">Approximately {distance} from your location</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-[300px] overflow-hidden rounded-lg border">
        {userLocation && isMapReady ? (
          <LeafletMap
            center={[location.lat, location.lng]}
            zoom={14}
            markerPosition={[location.lat, location.lng]}
            markerTitle={itemTitle}
            markerDescription={`Located in ${location.address}`}
            markerImage={itemImage}
            markerCategory={itemCategory}
            height="300px"
            userLocation={userLocation}
            singleItemMode={true}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          <Navigation className="h-4 w-4" />
          <span>
            This is an approximate location. The exact meeting point will be arranged with the seller if you decide to
            trade.
          </span>
        </p>
      </div>
    </div>
  )
}

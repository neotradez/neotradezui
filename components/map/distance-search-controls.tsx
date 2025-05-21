"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Navigation } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DistanceSearchControlsProps {
  initialDistance?: number
  maxDistance?: number
  onDistanceChange: (distance: number) => void
  onLocationChange: (location: { lat: number; lng: number; address: string }) => void
  onIncludeWorldwideChange?: (include: boolean) => void
  userLocation?: { lat: number; lng: number; address: string }
}

export function DistanceSearchControls({
  initialDistance = 50,
  maxDistance = 100,
  onDistanceChange,
  onLocationChange,
  onIncludeWorldwideChange,
  userLocation,
}: DistanceSearchControlsProps) {
  const { toast } = useToast()
  const [distance, setDistance] = useState(initialDistance)
  const [locationInput, setLocationInput] = useState(userLocation?.address || "")
  const [includeWorldwide, setIncludeWorldwide] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleDistanceChange = (value: number[]) => {
    const newDistance = value[0]
    setDistance(newDistance)
    onDistanceChange(newDistance)
  }

  const handleLocationSearch = async () => {
    if (!locationInput.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter a city, address, or zip code to search for trades.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      // In a real app, you would use a geocoding service like Google Maps Geocoding API
      // For this demo, we'll simulate a successful geocode with a slight delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock geocoding result - in a real app this would come from the API
      const mockLocation = {
        lat: 40.7128,
        lng: -74.006,
        address: locationInput,
      }

      onLocationChange(mockLocation)
      toast({
        title: "Location updated",
        description: `Showing trades within ${distance} miles of ${locationInput}`,
      })
    } catch (error) {
      console.error("Error geocoding location:", error)
      toast({
        title: "Location error",
        description: "Unable to find that location. Please try a different search.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleIncludeWorldwideChange = (checked: boolean) => {
    setIncludeWorldwide(checked)
    if (onIncludeWorldwideChange) {
      onIncludeWorldwideChange(checked)
    }
  }

  const handleGetCurrentLocation = () => {
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            // In a real app, you would use reverse geocoding to get the address
            // For this demo, we'll use a mock address
            const mockAddress = "Your Current Location"

            const newLocation = {
              lat: latitude,
              lng: longitude,
              address: mockAddress,
            }

            setLocationInput(mockAddress)
            onLocationChange(newLocation)

            toast({
              title: "Using your current location",
              description: `Showing trades within ${distance} miles of your location`,
            })
          } catch (error) {
            console.error("Error with reverse geocoding:", error)
            toast({
              title: "Location error",
              description: "Unable to determine your address. Using coordinates only.",
              variant: "destructive",
            })
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          toast({
            title: "Location access denied",
            description: "Please enter your location manually or enable location access.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, address, or zip code"
              className="pl-8"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLocationSearch()
                }
              }}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleGetCurrentLocation} title="Use current location">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button onClick={handleLocationSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="distance">Distance ({distance} miles)</Label>
          <span className="text-xs text-muted-foreground">
            {distance} of {maxDistance} miles
          </span>
        </div>
        <Slider
          id="distance"
          min={1}
          max={maxDistance}
          step={1}
          value={[distance]}
          onValueChange={handleDistanceChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="worldwide" checked={includeWorldwide} onCheckedChange={handleIncludeWorldwideChange} />
        <Label htmlFor="worldwide" className="text-sm">
          Include items without location data (worldwide)
        </Label>
      </div>

      {userLocation && (
        <div className="rounded-md bg-muted p-2 text-xs">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-primary" />
            <span className="font-medium">Current search location:</span>
          </div>
          <p className="ml-4.5 mt-1 text-muted-foreground">{userLocation.address}</p>
        </div>
      )}
    </div>
  )
}

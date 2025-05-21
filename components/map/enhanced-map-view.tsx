"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Navigation,
  Locate,
  Layers,
  MapPin,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { LocationPermissionRequest } from "@/components/map/location-permission-request"
import { DistanceSearchControls } from "@/components/map/distance-search-controls"
import { useToast } from "@/hooks/use-toast"

// Declare google variable
declare global {
  interface Window {
    google?: any
  }
}

interface MarketplaceItem {
  id: number
  title: string
  description: string
  category: string
  condition: string
  estimatedValue: number
  image: string
  owner: {
    id: number
    name: string
    avatar: string
    rating: number
  }
  location: string
  coordinates: { lat: number; lng: number }
  lookingFor: string[]
  distance?: number
}

interface EnhancedMapViewProps {
  initialItems?: MarketplaceItem[]
  initialLocation?: { lat: number; lng: number; address: string }
  initialDistance?: number
  onItemSelect?: (item: MarketplaceItem) => void
  onLocationChange?: (location: { lat: number; lng: number; address: string }) => void
  onDistanceChange?: (distance: number) => void
  className?: string
  draggableMarker?: boolean
  onMarkerDrag?: (location: { lat: number; lng: number }) => void
}

export function EnhancedMapView({
  initialItems = [],
  initialLocation,
  initialDistance = 50,
  onItemSelect,
  onLocationChange,
  onDistanceChange,
  className = "",
  draggableMarker,
  onMarkerDrag,
}: EnhancedMapViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [mapType, setMapType] = useState<string>("roadmap")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(
    initialLocation || null,
  )
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [distance, setDistance] = useState(initialDistance)
  const [items, setItems] = useState<MarketplaceItem[]>(initialItems)
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([])
  const [includeWorldwide, setIncludeWorldwide] = useState(false)
  const [showPermissionRequest, setShowPermissionRequest] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<"unknown" | "granted" | "denied">("unknown")
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileItemList, setShowMobileItemList] = useState(false)
  const [mapInitialized, setMapInitialized] = useState(false)

  // Check if window is defined (client-side)
  const isClient = typeof window !== "undefined"

  // Initialize Google Maps
  useEffect(() => {
    if (!isClient || mapInitialized) return

    // Check if the Google Maps script is already loaded
    if (!window.google || !window.google.maps) {
      // For demo purposes, we'll simulate the map loading
      // In a real app, you would load the Google Maps script here
      setTimeout(() => {
        setMapLoaded(true)
        setMapInitialized(true)
        initializeMap()
      }, 1000)
    } else {
      setMapLoaded(true)
      setMapInitialized(true)
      initializeMap()
    }

    return () => {
      // Clean up markers when component unmounts
      if (markers.length > 0) {
        markers.forEach((marker) => marker.setMap(null))
      }
    }
  }, [isClient, mapInitialized])

  // Check for location permission on mount
  useEffect(() => {
    if (!isClient) return

    // Check if permission was already granted
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            setPermissionStatus("granted")
            if (!userLocation) {
              getCurrentLocation()
            }
          } else if (permissionStatus.state === "denied") {
            setPermissionStatus("denied")
            setShowPermissionRequest(true)
          } else {
            setPermissionStatus("unknown")
            setShowPermissionRequest(true)
          }
        })
        .catch(() => {
          setPermissionStatus("unknown")
          setShowPermissionRequest(true)
        })
    } else {
      // Permissions API not supported, we'll show the request UI
      setShowPermissionRequest(true)
    }
  }, [isClient])

  // Filter items based on distance
  useEffect(() => {
    if (!userLocation) return

    // Get unique categories from all items
    const categories = [...new Set(items.map((item) => item.category))]

    // First, calculate distances for all items
    const itemsWithDistance = items.map((item) => {
      const itemDistance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        item.coordinates.lat,
        item.coordinates.lng,
      )
      return { ...item, distance: Math.round(itemDistance) }
    })

    // Filter items based on distance and worldwide setting
    let filtered = itemsWithDistance.filter(
      (item) => includeWorldwide || (item.distance !== undefined && item.distance <= distance),
    )

    // If we're filtering by distance, ensure at least one item from each category is included
    if (!includeWorldwide && filtered.length > 0) {
      // For each category, if no items are in the filtered list, add the closest one
      categories.forEach((category) => {
        const categoryItems = itemsWithDistance.filter((item) => item.category === category)
        const filteredCategoryItems = filtered.filter((item) => item.category === category)

        if (categoryItems.length > 0 && filteredCategoryItems.length === 0) {
          // Sort by distance and add the closest one
          const closestItem = [...categoryItems].sort(
            (a, b) => (a.distance || Number.POSITIVE_INFINITY) - (b.distance || Number.POSITIVE_INFINITY),
          )[0]

          filtered.push(closestItem)
        }
      })
    }

    // Sort by distance
    filtered = filtered.sort(
      (a, b) => (a.distance || Number.POSITIVE_INFINITY) - (b.distance || Number.POSITIVE_INFINITY),
    )

    setFilteredItems(filtered)

    // Update markers on the map
    if (map) {
      updateMapMarkers(filtered, map)
    }
  }, [userLocation, distance, includeWorldwide, items, map])

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !isClient) return

    // Create a mock map implementation that doesn't rely on Google Maps API
    const mockMap = {
      setCenter: () => {},
      setZoom: () => {},
      setMapTypeId: () => {},
      getZoom: () => 10,
      getBounds: () => ({
        contains: () => true,
      }),
    } as any // Use 'any' type to avoid TypeScript errors

    setMap(mockMap)
    setIsLoading(false)

    // If we have user location, center the map there
    if (userLocation) {
      // In a real implementation, this would center the map
      console.log("Centering map at:", userLocation)
    }

    // Add markers for items
    if (items.length > 0 && userLocation) {
      updateMapMarkers(items, mockMap)
    }
  }, [isClient, items, userLocation])

  // Update markers on the map
  const updateMapMarkers = (items: MarketplaceItem[], mapInstance: any) => {
    // Clear existing markers
    markers.forEach((marker) => {
      if (marker && typeof marker.setMap === "function") {
        marker.setMap(null)
      }
    })

    // In a real app with Google Maps, we would create actual markers here
    // For now, we'll just simulate markers with a mock implementation
    const newMarkers: any[] = items.map((item) => ({
      setMap: () => {},
      getPosition: () => item.coordinates,
      addListener: () => {},
    }))

    setMarkers(newMarkers)
  }

  // Get current location
  const getCurrentLocation = () => {
    if (!isClient || !navigator.geolocation) return

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newLocation = {
          lat: latitude,
          lng: longitude,
          address: "Your Location",
        }
        setUserLocation(newLocation)
        if (onLocationChange) {
          onLocationChange(newLocation)
        }
        if (map) {
          map.setCenter(newLocation)
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsLoading(false)
        toast({
          title: "Location Error",
          description: "Unable to get your current location. Please enter it manually.",
          variant: "destructive",
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased from default to 15 seconds
        maximumAge: 0,
      },
    )
  }

  // Calculate distance between two coordinates in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8 // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  // Handle distance change
  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance)
    if (onDistanceChange) {
      onDistanceChange(newDistance)
    }
  }

  // Handle location change
  const handleLocationChange = (location: { lat: number; lng: number; address: string }) => {
    setUserLocation(location)
    if (onLocationChange) {
      onLocationChange(location)
    }
    if (map) {
      map.setCenter(location)
    }
  }

  // Handle item selection
  const handleItemClick = (item: MarketplaceItem) => {
    setSelectedItem(item)
    if (onItemSelect) {
      onItemSelect(item)
    }
  }

  // Handle view item details
  const handleViewItemDetails = (itemId: number) => {
    router.push(`/marketplace/${itemId}`)
  }

  // Handle propose trade
  const handleProposeTrade = (itemId: number) => {
    router.push(`/marketplace/propose-trade/${itemId}`)
  }

  // Handle map type change
  const handleMapTypeChange = (type: string) => {
    setMapType(type)
    if (map) {
      // In a real implementation with Google Maps:
      // map.setMapTypeId(type);
      console.log("Setting map type to:", type)
    }
  }

  // Handle zoom in
  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1)
    }
  }

  // Handle zoom out
  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1)
    }
  }

  // Handle permission granted
  const handlePermissionGranted = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    const newLocation = {
      lat: latitude,
      lng: longitude,
      address: "Your Location",
    }
    setUserLocation(newLocation)
    if (onLocationChange) {
      onLocationChange(newLocation)
    }
    if (map) {
      map.setCenter(newLocation)
    }
    setPermissionStatus("granted")
    setShowPermissionRequest(false)
  }

  // Handle permission denied
  const handlePermissionDenied = () => {
    setPermissionStatus("denied")
    setShowPermissionRequest(false)
    toast({
      title: "Location Access Denied",
      description: "You've denied location access. Some features may be limited.",
      variant: "destructive",
    })
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40 transition-all duration-500 ${
        expanded ? "h-[calc(100vh-200px)]" : "h-[500px]"
      } ${className}`}
    >
      {/* Map container */}
      <div className="absolute inset-0 z-10">
        <div className="relative h-full w-full">
          {/* Placeholder map image for demo */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-19%20222427-Wf3kS1GJErT8BS5ar2qwQVgwhNExuI.png"
            alt="Map view"
            fill
            className="object-cover"
            onLoad={() => setMapLoaded(true)}
          />

          {/* Map container for actual Google Maps */}
          <div ref={mapRef} className="absolute inset-0" />

          {draggableMarker && initialLocation && (
            <div
              className="absolute cursor-move"
              style={{
                left: `50%`,
                top: `50%`,
                transform: "translate(-50%, -50%)",
              }}
              draggable={true}
              onDragEnd={(e) => {
                if (onMarkerDrag) {
                  // Calculate new position based on drag
                  const rect = mapRef.current.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top

                  // Convert to lat/lng (simplified)
                  const newLat = initialLocation.lat + (y - rect.height / 2) * 0.001
                  const newLng = initialLocation.lng + (x - rect.width / 2) * 0.001

                  onMarkerDrag({ lat: newLat, lng: newLng })
                }
              }}
            >
              <div className="w-8 h-8 -ml-4 -mt-4">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <p className="text-sm">Loading map...</p>
              </div>
            </motion.div>
          )}

          {/* Map controls */}
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                      onClick={getCurrentLocation}
                      aria-label="Go to your location"
                    >
                      <Locate className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to your location</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                      onClick={handleZoomIn}
                      aria-label="Zoom in"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                      onClick={handleZoomOut}
                      aria-label="Zoom out"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                      onClick={() => setShowControls(!showControls)}
                      aria-label={showControls ? "Hide controls" : "Show controls"}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showControls ? "Hide controls" : "Show controls"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile item list toggle */}
          <div className="absolute bottom-20 right-4 z-20 md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 rounded-full bg-background/80 px-3 backdrop-blur-sm dark:bg-[#121212]/80"
              onClick={() => setShowMobileItemList(!showMobileItemList)}
            >
              {showMobileItemList ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              <span>{showMobileItemList ? "Hide List" : "Show List"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
        <Badge className="bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00D084]"></div>
            <span>Your Location</span>
          </div>
        </Badge>
        <motion.div
          whileHover={{ scale: 1.1, rotate: expanded ? -90 : 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
            aria-label={expanded ? "Minimize map" : "Maximize map"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={expanded ? "minimize" : "maximize"}
                initial={{ opacity: 0, rotate: expanded ? 90 : -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: expanded ? -90 : 90 }}
                transition={{ duration: 0.2 }}
              >
                {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Location info */}
      <motion.div
        className="absolute left-4 top-4 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="rounded-lg bg-background/80 p-2 backdrop-blur-sm dark:bg-[#121212]/80">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#00D084]" />
            <div>
              <div className="text-xs font-medium">{userLocation ? userLocation.address : "Location not set"}</div>
              <div className="text-xs text-muted-foreground">
                {userLocation ? `Items within ${distance} miles are shown` : "Set your location to see nearby items"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Side controls panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-4 top-16 z-20 w-72 overflow-y-auto rounded-lg border border-border/40 bg-background/90 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/90 md:w-80"
          >
            <div className="flex items-center justify-between border-b border-border/40 p-3 dark:border-border/20">
              <h3 className="text-sm font-medium">Map Controls</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowControls(false)}
                aria-label="Close controls"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3">
              <DistanceSearchControls
                initialDistance={distance}
                maxDistance={100}
                onDistanceChange={handleDistanceChange}
                onLocationChange={handleLocationChange}
                onIncludeWorldwideChange={setIncludeWorldwide}
                userLocation={userLocation || undefined}
              />
            </div>
            <div className="border-t border-border/40 p-3 dark:border-border/20">
              <h3 className="mb-2 text-sm font-medium">Nearby Items ({filteredItems.length})</h3>
              <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted/50"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          ${item.estimatedValue} • {item.distance} miles
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-20 items-center justify-center text-center text-sm text-muted-foreground">
                    No items found within {distance} miles
                    {!includeWorldwide && (
                      <Button
                        variant="link"
                        className="h-auto p-0 pl-1 text-sm"
                        onClick={() => setIncludeWorldwide(true)}
                      >
                        Include worldwide?
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile item list */}
      <AnimatePresence>
        {showMobileItemList && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-4 top-16 z-20 w-72 overflow-y-auto rounded-lg border border-border/40 bg-background/90 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/90 md:hidden"
          >
            <div className="flex items-center justify-between border-b border-border/40 p-3 dark:border-border/20">
              <h3 className="text-sm font-medium">Nearby Items ({filteredItems.length})</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowMobileItemList(false)}
                aria-label="Close item list"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-full space-y-2 overflow-y-auto p-3 pr-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted/50"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="truncate text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        ${item.estimatedValue} • {item.distance} miles
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-20 items-center justify-center text-center text-sm text-muted-foreground">
                  No items found within {distance} miles
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected item details */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-4 right-4 z-30 mx-auto max-w-2xl rounded-lg border border-border/40 bg-background/90 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/90"
          >
            <Card className="border-0 bg-transparent shadow-none">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 text-muted-foreground"
                onClick={() => setSelectedItem(null)}
                aria-label="Close item details"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
                    <Image
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-medium">{selectedItem.title}</h3>
                      <Badge className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground line-clamp-2">{selectedItem.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="relative h-5 w-5 overflow-hidden rounded-full">
                          <Image
                            src={selectedItem.owner.avatar || "/placeholder.svg"}
                            alt={selectedItem.owner.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{selectedItem.owner.name}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedItem.location}
                          {selectedItem.distance && ` (${selectedItem.distance} miles)`}
                        </span>
                      </div>
                      <span className="text-sm font-medium">~${selectedItem.estimatedValue}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleViewItemDetails(selectedItem.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1 bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                    onClick={() => handleProposeTrade(selectedItem.id)}
                  >
                    Propose Trade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location permission request */}
      {showPermissionRequest && (
        <LocationPermissionRequest
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
          onError={() => setShowPermissionRequest(false)}
        />
      )}
    </div>
  )
}

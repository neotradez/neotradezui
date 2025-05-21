"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

// Define types for map items
interface MapItem {
  id: string
  title: string
  category?: string
  description?: string
  image?: string
  price?: string
  condition?: string
  location?: {
    lat: number
    lng: number
  }
  owner?: {
    id: string
    name: string
    avatar: string
  }
}

interface MapCluster {
  count: number
  location: {
    lat: number
    lng: number
  }
  items: MapItem[]
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

interface GoogleMapProps {
  singleItemMode?: boolean
  viewOnly?: boolean
  initialLocation?: {
    lat: number
    lng: number
    address?: string
  }
  itemDetails?: {
    id: string
    title: string
    location: string
  }
  onLocationChange?: (location: {
    lat: number
    lng: number
    address: string
  }) => void
}

export function GoogleMap({
  singleItemMode,
  viewOnly = false,
  initialLocation,
  itemDetails,
  onLocationChange,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null,
  )
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mapItems, setMapItems] = useState<MapItem[]>(singleItemMode ? [] : mapItems)
  const [mapClusters, setMapClusters] = useState<MapCluster[]>([])
  const [singleItemLocation, setSingleItemLocation] = useState<{ lat: number; lng: number } | null>(
    initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : null,
  )

  // Load Google Maps API
  useEffect(() => {
    // In a real app, you would load the Google Maps API here
    // For this example, we'll simulate the loading
    const loadGoogleMaps = async () => {
      try {
        setIsLoading(true)
        // Simulate API loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data if not in single item mode
        if (!singleItemMode) {
          setMapItems(mapItems)

          // Create mock clusters
          const clusters: MapCluster[] = [
            {
              count: 3,
              location: { lat: 40.7128, lng: -74.006 },
              items: mapItems.slice(0, 3),
            },
            {
              count: 2,
              location: { lat: 40.7328, lng: -73.986 },
              items: mapItems.slice(3, 5),
            },
          ]
          setMapClusters(clusters)
        }

        // Get user location or use initial location
        if (initialLocation) {
          setUserLocation({
            lat: initialLocation.lat,
            lng: initialLocation.lng,
          })
          setSingleItemLocation({
            lat: initialLocation.lat,
            lng: initialLocation.lng,
          })
        } else if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const newLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
              setUserLocation(newLocation)
              if (singleItemMode) {
                setSingleItemLocation(newLocation)
                if (onLocationChange) {
                  onLocationChange({
                    lat: newLocation.lat,
                    lng: newLocation.lng,
                    address: "Your current location",
                  })
                }
              }
            },
            () => {
              // Default to New York if geolocation is denied
              const defaultLocation = { lat: 40.7128, lng: -74.006 }
              setUserLocation(defaultLocation)
              if (singleItemMode) {
                setSingleItemLocation(defaultLocation)
                if (onLocationChange) {
                  onLocationChange({
                    lat: defaultLocation.lat,
                    lng: defaultLocation.lng,
                    address: "New York, NY",
                  })
                }
              }
            },
          )
        } else {
          // Default to New York if geolocation is not available
          const defaultLocation = { lat: 40.7128, lng: -74.006 }
          setUserLocation(defaultLocation)
          if (singleItemMode) {
            setSingleItemLocation(defaultLocation)
            if (onLocationChange) {
              onLocationChange({
                lat: defaultLocation.lat,
                lng: defaultLocation.lng,
                address: "New York, NY",
              })
            }
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading map:", error)
        setIsLoading(false)
      }
    }

    loadGoogleMaps()
  }, [singleItemMode, initialLocation, onLocationChange])

  // Initialize map when user location is available
  useEffect(() => {
    if (!userLocation || !mapRef.current || isLoading) return

    // Create map
    const initMap = () => {
      // In a real app, you would initialize the Google Map here
      // For this example, we'll simulate the map with a div

      // Create info window
      infoWindowRef.current = {} as google.maps.InfoWindow

      if (!singleItemMode) {
        // Add markers for individual items
        mapItems.forEach((item) => {
          // In a real app, you would create actual Google Maps markers
          // For this example, we'll just store them in the ref
          markersRef.current.push({} as google.maps.Marker)
        })

        // Add markers for clusters
        mapClusters.forEach((cluster) => {
          // In a real app, you would create actual Google Maps markers
          // For this example, we'll just store them in the ref
          markersRef.current.push({} as google.maps.Marker)
        })
      } else if (singleItemLocation) {
        // In singleItemMode, we only add one marker for the specific item
        markersRef.current = [] // Clear any existing markers
        markersRef.current.push({} as google.maps.Marker)
      }
    }

    initMap()
  }, [userLocation, isLoading, mapItems, mapClusters, singleItemMode, singleItemLocation])

  // Handle item click
  const handleItemClick = useCallback(
    (itemId: string) => {
      router.push(`/marketplace/${itemId}`)
    },
    [router],
  )

  // Handle map click for single item mode
  const handleMapClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!singleItemMode || viewOnly || !mapRef.current) return

      // Get click coordinates relative to the map container
      const rect = mapRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Convert to lat/lng (simplified for demo)
      // In a real app, you would use the Google Maps API to get the actual coordinates
      const newLat = userLocation!.lat + (rect.height / 2 - y) * 0.0001
      const newLng = userLocation!.lng + (x - rect.width / 2) * 0.0001

      setSingleItemLocation({ lat: newLat, lng: newLng })

      if (onLocationChange) {
        onLocationChange({
          lat: newLat,
          lng: newLng,
          address: `Location (${newLat.toFixed(6)}, ${newLng.toFixed(6)})`,
        })
      }
    },
    [singleItemMode, viewOnly, userLocation, onLocationChange],
  )

  // Render map items
  const renderMapItems = () => {
    if (singleItemMode) return null

    return mapItems.map((item) => (
      <div
        key={item.id}
        className={cn(
          "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200",
          hoveredItem === item.id ? "z-20 scale-125" : "z-10",
        )}
        style={{
          // Random positions for demonstration
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => handleItemClick(item.id)}
      >
        <div
          className={cn(
            "rounded-full p-1",
            hoveredItem === item.id
              ? "bg-[#00D084]"
              : item.category === "electronics"
                ? "bg-[#3B82F6]"
                : item.category === "clothing"
                  ? "bg-[#F59E0B]"
                  : "bg-[#EC4899]",
          )}
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-medium">
            {item.category?.charAt(0).toUpperCase() || "I"}
          </div>
        </div>

        {hoveredItem === item.id && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-48 z-30">
            <div className="relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <div className="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs font-medium">
                {item.condition}
              </div>
            </div>
            <h3 className="font-medium text-sm truncate">{item.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            <div className="flex items-center mt-2 gap-1">
              <img
                src={item.owner?.avatar || "/placeholder.svg"}
                alt={item.owner?.name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-xs">{item.owner?.name}</span>
            </div>
          </div>
        )}
      </div>
    ))
  }

  // Render map clusters
  const renderMapClusters = () => {
    if (singleItemMode) return null

    return mapClusters.map((cluster, index) => (
      <div
        key={`cluster-${index}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
        style={{
          // Random positions for demonstration
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
        }}
      >
        <div className="rounded-full bg-[#3B82F6] p-1">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm font-medium text-[#3B82F6]">
            {cluster.count}
          </div>
        </div>
      </div>
    ))
  }

  // Render single item marker
  const renderSingleItemMarker = () => {
    if (!singleItemMode || !singleItemLocation) return null

    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-full z-20"
        style={{
          left: "50%",
          top: "50%",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <MapPin className="h-10 w-10 text-primary drop-shadow-lg" />
            <div className="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full animate-ping opacity-30 bg-primary/30"></div>
          </div>
          {itemDetails && (
            <div className="mt-2 rounded-md bg-background/95 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm max-w-[250px] border border-border/50">
              <div className="font-medium truncate">{itemDetails.title}</div>
              <div className="text-muted-foreground text-xs mt-1">{itemDetails.location}</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const mapHeight = viewOnly ? "h-full" : "h-[calc(100vh-4rem)]"

  if (isLoading) {
    return (
      <div className={`flex ${mapHeight} items-center justify-center`}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading map...</span>
      </div>
    )
  }

  return (
    <div className={`relative ${mapHeight} w-full overflow-hidden`}>
      {/* Map controls - only show if not in view only mode */}
      {!viewOnly && (
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full shadow-md"
            onClick={() => {
              // Toggle map layers
              console.log("Toggle layers")
            }}
          >
            <Layers className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* User location indicator - only show if not in view only mode and not in single item mode */}
      {!viewOnly && !singleItemMode && (
        <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-background/90 p-3 shadow-md backdrop-blur-sm dark:bg-gray-800/90">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">Your Location</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Items within 50 miles are shown</p>
        </div>
      )}

      {/* Map container */}
      <div
        ref={mapRef}
        className="h-full w-full bg-[#f2f2f2] dark:bg-[#1a1a1a] relative"
        style={{
          backgroundImage: singleItemMode
            ? undefined
            : `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20XJMP2oiLL27f7q8QkpsbqXCFdwd4.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleMapClick}
      >
        {/* Interactive map background for single item mode */}
        {singleItemMode && (
          <div className="absolute inset-0 bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-opacity-50 bg-gray-100 dark:bg-opacity-50 dark:bg-gray-800">
              {/* Map grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                `,
                  backgroundSize: "50px 50px",
                }}
              ></div>

              {/* Map roads */}
              <div className="absolute left-0 right-0 top-1/2 h-4 bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute left-0 right-0 top-[40%] h-2 bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute left-0 right-0 top-[60%] h-2 bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute bottom-0 left-1/4 top-0 w-4 bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute bottom-0 left-3/4 top-0 w-4 bg-gray-200 dark:bg-gray-700"></div>

              {/* Map areas */}
              <div className="absolute bottom-[20%] left-[10%] right-[60%] top-[30%] rounded-lg bg-green-100 dark:bg-green-900 dark:bg-opacity-20"></div>
              <div className="absolute bottom-[40%] left-[70%] right-[10%] top-[10%] rounded-lg bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"></div>
            </div>
          </div>
        )}

        {/* Render map items and clusters */}
        {renderMapItems()}
        {renderMapClusters()}
        {renderSingleItemMarker()}

        {/* User location marker - only show if not in single item mode */}
        {!singleItemMode && !viewOnly && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full border-4 border-green-500/30 animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Interactive map controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <div className="flex flex-col rounded-lg bg-background/90 shadow-md backdrop-blur-sm overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none border-b border-border/50"
              onClick={() => {
                // Zoom in functionality
                console.log("Zoom in")
              }}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => {
                // Zoom out functionality
                console.log("Zoom out")
              }}
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Single item mode instructions - only show if in single item mode and not view only */}
        {singleItemMode && !viewOnly && (
          <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-background/90 p-3 shadow-md backdrop-blur-sm dark:bg-gray-800/90">
            <p className="text-xs text-muted-foreground">Click anywhere on the map to set the item location</p>
          </div>
        )}

        {/* Google Maps attribution */}
        <div className="absolute bottom-0 right-0 bg-white/80 dark:bg-gray-800/80 px-2 py-1 text-xs">
          Map data ©2025 Google
        </div>
      </div>
    </div>
  )
}

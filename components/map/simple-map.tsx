"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Plus, Minus } from "lucide-react"

// Define the MarketplaceItem interface
interface MarketplaceItem {
  id: number
  title: string
  description: string
  category: string
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

// Define the category colors
const CATEGORY_COLORS = {
  electronics: "#00D084",
  furniture: "#8ED1FC",
  clothing: "#FCB900",
  sports: "#FF6900",
  collectibles: "#7BDCB5",
  books: "#ABB8C3",
  music: "#9900EF",
  art: "#EB144C",
  tools: "#F78DA7",
}

interface SimpleMapProps {
  items: MarketplaceItem[]
  userLocation: { lat: number; lng: number; address: string }
  onItemSelect?: (item: MarketplaceItem) => void
  searchRadius?: number
  className?: string
}

export function SimpleMap({
  items = [],
  userLocation,
  onItemSelect,
  searchRadius = 25,
  className = "",
}: SimpleMapProps) {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(13)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: userLocation.lat, lng: userLocation.lng })
  const [mapBounds, setMapBounds] = useState({
    north: userLocation.lat + 0.02,
    south: userLocation.lat - 0.02,
    east: userLocation.lng + 0.02,
    west: userLocation.lng - 0.02,
  })

  // Update map bounds when zoom or center changes
  useEffect(() => {
    const zoomFactor = Math.pow(0.8, zoom - 13) // Base zoom is 13
    setMapBounds({
      north: mapCenter.lat + 0.02 * zoomFactor,
      south: mapCenter.lat - 0.02 * zoomFactor,
      east: mapCenter.lng + 0.02 * zoomFactor,
      west: mapCenter.lng - 0.02 * zoomFactor,
    })
  }, [zoom, mapCenter])

  // Handle item click
  const handleItemClick = (item: MarketplaceItem) => {
    setSelectedItem(item)
    if (onItemSelect) {
      onItemSelect(item)
    }
  }

  // Handle view details click
  const handleViewDetails = (itemId: number) => {
    router.push(`/marketplace/${itemId}`)
  }

  // Handle propose trade click
  const handleProposeTrade = (itemId: number) => {
    router.push(`/marketplace/propose-trade/${itemId}`)
  }

  // Check if a point is within the current map bounds
  const isInBounds = (point: { lat: number; lng: number }) => {
    return (
      point.lat <= mapBounds.north &&
      point.lat >= mapBounds.south &&
      point.lng <= mapBounds.east &&
      point.lng >= mapBounds.west
    )
  }

  // Convert geo coordinates to pixel positions on the map
  const geoToPixel = (lat: number, lng: number) => {
    const mapWidth = mapRef.current?.clientWidth || 1000
    const mapHeight = mapRef.current?.clientHeight || 800

    const latRange = mapBounds.north - mapBounds.south
    const lngRange = mapBounds.east - mapBounds.west

    const x = ((lng - mapBounds.west) / lngRange) * mapWidth
    const y = ((mapBounds.north - lat) / latRange) * mapHeight

    return { x, y }
  }

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 8))
  }

  // Handle center map
  const handleCenterMap = () => {
    setMapCenter({ lat: userLocation.lat, lng: userLocation.lng })
  }

  // Calculate map scale based on zoom
  const mapScale = Math.pow(1.2, zoom - 13)

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-lg ${className}`}>
      {/* Map container */}
      <div ref={mapRef} className="relative h-full w-full cursor-grab active:cursor-grabbing">
        {/* Map background with zoom effect */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${mapScale})`,
            transformOrigin: "center",
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-19%20222427-Wf3kS1GJErT8BS5ar2qwQVgwhNExuI.png"
            alt="Map view"
            fill
            className="object-cover"
          />
        </div>

        {/* User location marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform z-20">
          <div className="relative">
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            <div className="absolute -inset-1 animate-ping rounded-full bg-blue-400 opacity-75"></div>
          </div>
        </div>

        {/* Search radius circle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform z-10 rounded-full border-2 border-blue-500 opacity-20"
          style={{
            width: `${searchRadius * 40}px`,
            height: `${searchRadius * 40}px`,
            backgroundColor: "#3B82F6",
          }}
        ></div>

        {/* Item markers */}
        {items.map((item) => {
          // Only render pins that are within the current map bounds
          if (!isInBounds(item.coordinates)) return null

          const position = geoToPixel(item.coordinates.lat, item.coordinates.lng)

          return (
            <div
              key={item.id}
              className="absolute cursor-pointer z-30"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleItemClick(item)}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg"
                style={{ backgroundColor: CATEGORY_COLORS[item.category] || "#808080" }}
              >
                <MapPin className="h-5 w-5" />
              </div>

              {/* Selected item popup */}
              {selectedItem?.id === item.id && (
                <Card className="absolute left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] w-64 z-40">
                  <CardContent className="p-3">
                    <div className="flex gap-2">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs font-medium">${item.estimatedValue}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{item.distance} miles away</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewDetails(item.id)
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 w-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProposeTrade(item.id)
                        }}
                      >
                        Propose Trade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )
        })}
      </div>

      {/* Map controls */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleZoomIn}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleZoomOut}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleCenterMap}
        >
          <Navigation className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

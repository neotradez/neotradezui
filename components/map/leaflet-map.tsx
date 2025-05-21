"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, ZoomControl } from "react-leaflet"
import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Navigation } from "lucide-react"
import Image from "next/image"
import { getCategoryIcon } from "@/lib/category-utils"

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

// Define the MarketplaceItem interface
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
  photography: "#9C27B0",
  gaming: "#2196F3",
  jewelry: "#FFC107",
  kitchen: "#FF5722",
}

// Get icon SVG path based on category
const getCategoryIconPath = (category: string): string => {
  const lowerCategory = category.toLowerCase()

  switch (lowerCategory) {
    case "electronics":
      return '<path d="M2 4v16h20V4H2zm18 14H4V6h16v12z"></path><path d="M6 8h12v2H6z"></path>'
    case "photography":
    case "camera":
      return '<circle cx="12" cy="12" r="3"></circle><path d="M20 4h-3.17l-1.24-1.35A1.99 1.99 0 0 0 14.12 2H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>'
    case "music":
      return '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>'
    case "books":
      return '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'
    case "clothing":
      return '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>'
    case "art":
      return '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>'
    case "tools":
      return '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'
    case "sports":
      return '<path d="M6.5 6.5h11v11h-11z"></path><path d="m3.34 19.66 16.97-16.97"></path><path d="M14 14v2.5"></path><path d="M14 7.5V10"></path><path d="M10 14v2.5"></path><path d="M10 7.5V10"></path><path d="M7.5 10h2.5"></path><path d="M14 10h2.5"></path><path d="M7.5 14h2.5"></path><path d="M14 14h2.5"></path>'
    case "furniture":
      return '<path d="M20 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"></path><path d="M4 10v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><path d="M12 22v-4"></path><path d="M2 10h20"></path>'
    case "collectibles":
      return '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line>'
    case "gaming":
      return '<line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><circle cx="15" cy="13" r="1"></circle><circle cx="18" cy="11" r="1"></circle><rect x="2" y="6" width="20" height="12" rx="2"></rect>'
    case "jewelry":
      return '<path d="M8 21h8"></path><path d="M12 21v-4"></path><path d="M12 13V8"></path><path d="M9 5h6"></path><path d="m6 12 6-4 6 4"></path>'
    case "kitchen":
      return '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2"></path><path d="M18 15V2"></path><path d="M21 15a3 3 0 1 1-6 0"></path>'
    default:
      return '<circle cx="12" cy="12" r="10"></circle>'
  }
}

// Custom marker icon function
const createCustomIcon = (category: string) => {
  const color = CATEGORY_COLORS[category.toLowerCase()] || "#808080"
  const IconComponent = getCategoryIcon(category)

  return L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div style="background-color: ${color}; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          ${getIconPath(category)}
        </svg>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  })
}

// Helper function to get the SVG path for a category icon
const getIconPath = (category: string): string => {
  const lowerCategory = category.toLowerCase()

  // Return SVG path based on category
  // This should match the icons used in getCategoryIcon
  switch (lowerCategory) {
    case "electronics":
      return '<rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="9" x2="15" y2="9" />'
    case "photography":
      return '<circle cx="12" cy="12" r="3" /><path d="M20 4h-3.17l-1.24-1.35A2 2 0 0 0 14.12 2H9.88a2 2 0 0 0-1.47.65L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />'
    case "gaming":
      return '<line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><circle cx="15" cy="13" r="1" /><circle cx="18" cy="11" r="1" /><rect x="2" y="6" width="20" height="12" rx="2" />'
    case "music":
      return '<path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />'
    case "books":
      return '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />'
    case "sports":
      return '<circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" />'
    case "collectibles":
      return '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" />'
    case "furniture":
      return '<path d="M20 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" /><path d="M4 10v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><path d="M12 22v-4" /><path d="M2 10h20" />'
    case "clothing":
      return '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />'
    case "jewelry":
      return '<path d="M8 21h8" /><path d="M12 21v-4" /><path d="M12 13V8" /><path d="M9 5h6" /><path d="m6 12 6-4 6 4" />'
    case "tools":
      return '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />'
    case "art":
      return '<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />'
    case "kitchen":
      return '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2" /><path d="M18 15V2" /><path d="M21 15a3 3 0 1 1-6 0" />'
    default:
      return '<circle cx="12" cy="12" r="10" />'
  }
}

// User location marker icon
const userLocationIcon = L.divIcon({
  className: "user-location-icon",
  html: `<div style="background-color: #3B82F6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

// Map center control component
function MapCenterControl({ center }: { center: [number, number] }) {
  const map = useMap()

  const handleCenterMap = () => {
    map.flyTo(center, map.getZoom())
  }

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: "60px" }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleCenterMap}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-foreground shadow-md"
          title="Center map"
        >
          <Navigation className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface LeafletMapProps {
  center: [number, number]
  zoom?: number
  markerPosition?: [number, number]
  markerTitle?: string
  markerDescription?: string
  markerImage?: string
  markerCategory?: string
  interactive?: boolean
  height?: string
  items?: MarketplaceItem[]
  userLocation?: { lat: number; lng: number; address: string }
  onItemSelect?: (item: MarketplaceItem) => void
  searchRadius?: number
  className?: string
  onMapClick?: (coords: { lat: number; lng: number }) => void
  draggableMarker?: boolean
  singleItemMode?: boolean
  filteredCategories?: string[]
}

export function LeafletMap({
  center,
  zoom = 13,
  markerPosition,
  markerTitle,
  markerDescription,
  markerImage,
  markerCategory = "electronics",
  interactive = true,
  height = "400px",
  items = [],
  userLocation,
  onItemSelect,
  searchRadius = 25,
  className = "",
  onMapClick,
  draggableMarker,
  singleItemMode,
  filteredCategories = [],
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [mapReady, setMapReady] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [hoveredCluster, setHoveredCluster] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Handle item click
  const handleItemClick = (item: MarketplaceItem) => {
    setSelectedItem(item)
    if (onItemSelect) {
      onItemSelect(item)
    }
  }

  // Handle view details click
  const handleViewDetails = (itemId: number) => {
    router.push(`/marketplace/item-${itemId}`)
  }

  // Handle propose trade click
  const handleProposeTrade = (itemId: number) => {
    router.push(`/marketplace/propose-trade/${itemId}`)
  }

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Initialize map if it doesn't exist yet
    if (!leafletMapRef.current && mapRef.current) {
      try {
        // Fix Leaflet icon issues
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        })

        // Create map
        const map = L.map(mapRef.current, {
          center: center || [40.7128, -74.006], // Default to New York if no center provided
          zoom: zoom || 13,
          zoomControl: interactive,
          dragging: interactive,
          scrollWheelZoom: interactive,
          doubleClickZoom: interactive,
          boxZoom: interactive,
          keyboard: interactive,
          tap: interactive,
          touchZoom: interactive,
        })

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add marker if position is provided
        if (markerPosition) {
          const customIcon = L.divIcon({
            className: "custom-marker-icon",
            html: `
              <div class="relative">
                <div class="absolute -top-6 -left-2">
                  <div class="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-white">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full animate-ping opacity-30 bg-primary/30"></div>
                </div>
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })

          const marker = L.marker(markerPosition, { icon: customIcon }).addTo(map)
          markerRef.current = marker

          // Add popup if title is provided
          if (markerTitle) {
            const imageHtml = markerImage
              ? `<div class="w-full h-16 overflow-hidden rounded-t-md mb-2">
                  <img src="${markerImage}" alt="${markerTitle}" class="w-full h-full object-cover" />
                 </div>`
              : ""

            const popupContent = `
              <div class="p-2 min-w-[150px] max-w-[200px]">
                ${imageHtml}
                <div class="font-medium text-sm">${markerTitle}</div>
                ${markerDescription ? `<div class="text-xs text-gray-500 mt-1">${markerDescription}</div>` : ""}
                <div class="mt-2">
                  <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    ${markerCategory}
                  </span>
                </div>
              </div>
            `
            marker
              .bindPopup(popupContent, {
                closeButton: false,
                className: "custom-popup",
                maxWidth: 200,
              })
              .openPopup()
          }
        }

        leafletMapRef.current = map
        setIsLoading(false)

        // Cleanup
        return () => {
          map.remove()
          leafletMapRef.current = null
        }
      } catch (error) {
        console.error("Error initializing map:", error)
        setIsLoading(false)
      }
    } else {
      // If map is already initialized or mapRef is not available, still set loading to false
      setIsLoading(false)
    }
  }, [center, zoom, markerPosition, markerTitle, markerDescription, markerImage, markerCategory, interactive])

  // Update map center and marker position if they change
  useEffect(() => {
    if (!leafletMapRef.current) return

    // Update center
    leafletMapRef.current.setView(center, zoom)

    // Update marker position
    if (markerPosition && markerRef.current) {
      markerRef.current.setLatLng(markerPosition)

      // Update popup content if title changed
      if (markerTitle) {
        const imageHtml = markerImage
          ? `<div class="w-full h-16 overflow-hidden rounded-t-md mb-2">
              <img src="${markerImage}" alt="${markerTitle}" class="w-full h-full object-cover" />
             </div>`
          : ""

        const popupContent = `
          <div class="p-2 min-w-[150px] max-w-[200px]">
            ${imageHtml}
            <div class="font-medium text-sm">${markerTitle}</div>
            ${markerDescription ? `<div class="text-xs text-gray-500 mt-1">${markerDescription}</div>` : ""}
            <div class="mt-2">
              <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                ${markerCategory}
              </span>
            </div>
          </div>
        `
        markerRef.current
          .bindPopup(popupContent, {
            closeButton: false,
            className: "custom-popup",
            maxWidth: 200,
          })
          .openPopup()
      }
    }
  }, [center, zoom, markerPosition, markerTitle, markerDescription, markerImage, markerCategory])

  // Set map as ready after component mounts
  useEffect(() => {
    setMapReady(true)

    // Don't try to create a new map instance here - we already have one
    // The error was caused by trying to create multiple map instances with the same ID

    // Add map click handler if provided
    if (mapReady && onMapClick && leafletMapRef.current) {
      leafletMapRef.current.on("click", (e) => {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng })
      })

      // Clean up event listener
      return () => {
        if (leafletMapRef.current) {
          leafletMapRef.current.off("click")
        }
      }
    }
  }, [mapReady, onMapClick])

  if (!userLocation && !markerPosition) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading map...</p>
      </div>
    )
  }

  if (markerPosition) {
    return (
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        <div ref={mapRef} className="h-full w-full" />
        <style jsx global>{`
          .custom-popup .leaflet-popup-content-wrapper {
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .custom-popup .leaflet-popup-content {
            margin: 0;
            min-width: 150px;
            max-width: 200px;
          }
          .custom-popup .leaflet-popup-tip {
            background-color: white;
          }
        `}</style>
      </div>
    )
  }

  // Filter items based on selected categories
  const displayItems =
    filteredCategories.length > 0 ? items.filter((item) => filteredCategories.includes(item.category)) : items

  // Handle cluster click to zoom in
  const handleClusterClick = (cluster) => {
    const map = leafletMapRef.current
    if (map) {
      const bounds = L.latLngBounds(cluster.getAllChildMarkers().map((marker) => marker.getLatLng()))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-lg ${className}`}>
      {mapReady && userLocation && (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          id="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <MapCenterControl center={[userLocation.lat, userLocation.lng]} />

          {/* User location marker with accuracy circle */}
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
                <p className="text-xs">{userLocation.address}</p>
              </div>
            </Popup>
          </Marker>
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={searchRadius * 1609.34} // Convert miles to meters
            pathOptions={{ color: "#3B82F6", fillColor: "#3B82F6", fillOpacity: 0.1, weight: 1 }}
          />

          {/* Item markers with clustering */}
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={(cluster) => {
              return L.divIcon({
                html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
                className: "custom-cluster-icon",
                iconSize: L.point(30, 30),
              })
            }}
            eventHandlers={{
              click: (cluster) => handleClusterClick(cluster),
            }}
          >
            {(() => {
              // Get unique categories
              const categories = [...new Set(items.map((item) => item.category))]

              // Get one representative item from each category
              const categoryRepresentatives = categories
                .map((category) => {
                  return items.find((item) => item.category === category)
                })
                .filter(Boolean)

              // Get IDs of representative items
              const representativeIds = categoryRepresentatives.map((item) => item.id)

              // Return all items, but ensure category representatives are rendered
              return displayItems.map((item) => (
                <Marker
                  key={item.id}
                  position={[item.coordinates.lat, item.coordinates.lng]}
                  icon={createCustomIcon(item.category)}
                  eventHandlers={{
                    click: () => handleItemClick(item),
                  }}
                >
                  <Popup>
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-2">
                        <div className="flex gap-2">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xs font-medium">{item.title}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                                {item.category}
                              </Badge>
                              <span className="text-[10px] font-medium">${item.estimatedValue}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                              <MapPin className="h-2 w-2" />
                              <span>{item.distance || "2.5"} miles away</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-full text-[10px]"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewDetails(item.id)
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="h-6 w-full text-[10px]"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProposeTrade(item.id)
                            }}
                          >
                            Trade
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Popup>
                </Marker>
              ))
            })()}
          </MarkerClusterGroup>
        </MapContainer>
      )}

      {/* Custom CSS for Leaflet */}
      <style jsx global>{`
        .custom-cluster-icon {
          background-color: #3B82F6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        
        .cluster-icon {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
        }
        
        .leaflet-popup-content {
          margin: 0;
          width: auto !important;
          max-width: 200px;
        }
        
        .leaflet-container {
          font-family: inherit;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          min-width: 150px;
          max-width: 200px;
        }
        .custom-popup .leaflet-popup-tip {
          background-color: white;
        }
      `}</style>
    </div>
  )
}

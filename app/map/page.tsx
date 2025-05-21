"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import mapItems from "@/mock/map-data"
import { LeafletMap } from "@/components/map/leaflet-map"
import { AreaSearchControls } from "@/components/map/area-search-controls"
import { ItemsList } from "@/components/map/items-list"
import { LocationPermissionRequest } from "@/components/map/location-permission-request"
import { InterstitialAd } from "@/components/ads/interstitial-ad"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  SplitIcon as SplitScreen,
  List,
  Map,
  ArrowLeft,
  X,
  Grip,
  ChevronUp,
  ChevronDown,
  Filter,
  RotateCcw,
} from "lucide-react"
import { getCategoryIcon } from "@/lib/category-utils"

export default function MapPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [view, setView] = useState<"map" | "split" | "list">("map")
  const [showSidebar, setShowSidebar] = useState(false)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState(mapItems)
  const [filteredItems, setFilteredItems] = useState(mapItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPanelPosition, setFilterPanelPosition] = useState({ x: window.innerWidth - 320, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFilterPanelMinimized, setIsFilterPanelMinimized] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(true)
  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false)
  const [suggestedSearches] = useState([
    "Vintage Camera",
    "Mountain Bike",
    "Gaming Console",
    "Vinyl Records",
    "Mechanical Keyboard",
  ])
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showInterstitialAd, setShowInterstitialAd] = useState(true)

  // User location state - initializing with a default location
  const [userLocation, setUserLocation] = useState({
    lat: 40.7128, // New York City coordinates
    lng: -74.006,
    address: "Default location (New York, NY)",
  })

  const filterPanelRef = useRef(null)

  const handleAdComplete = () => {
    setShowInterstitialAd(false)
  }

  // Apply filters function
  const applyFilters = useCallback(() => {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      let result = [...mapItems]

      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query),
        )
      }

      // Apply category filters
      if (selectedCategories.length > 0) {
        result = result.filter((item) => selectedCategories.includes(item.category))
      }

      // Apply distance filter
      if (selectedDistance) {
        result = result.filter((item) => {
          return item.distance && item.distance <= selectedDistance
        })
      }

      // Apply location filters
      if (selectedLocations.length > 0) {
        result = result.filter((item) => {
          // This is a simplified check - in a real app, you'd check if the item's location
          // contains any of the selected locations
          return selectedLocations.some((location) => item.location.toLowerCase().includes(location.toLowerCase()))
        })
      }

      setFilteredItems(result)
      setIsLoading(false)

      // Show toast notification
      toast({
        title: `${result.length} items found`,
        description:
          result.length === 0
            ? "No items match your filters. Try adjusting your criteria."
            : "Filters applied successfully",
        variant: result.length === 0 ? "destructive" : "default",
      })
    }, 800)
  }, [searchQuery, selectedCategories, selectedDistance, selectedLocations, toast])

  // Filter items based on search query and selected categories
  useEffect(() => {
    // We don't want to auto-apply filters on every change
    // Instead, we'll let the user click "Apply Filters" or "Reset Filters"
    // This is just for initial load
    if (searchQuery === "" && selectedCategories.length === 0 && !selectedDistance && selectedLocations.length === 0) {
      setFilteredItems(mapItems)
    }
  }, [searchQuery, selectedCategories, selectedDistance, selectedLocations])

  useEffect(() => {
    // Set the filter panel position to the right side on initial load
    setFilterPanelPosition({ x: 20, y: 80 })
  }, [])

  const handleLocationPermission = (status: "granted" | "denied") => {
    setLocationPermission(status)

    // Whether permission is granted or denied, we're using the same default location
    setUserLocation({
      lat: 40.7128,
      lng: -74.006,
      address: status === "granted" ? "Default location (New York, NY)" : "Location access denied (New York, NY)",
    })

    setIsLoading(false)
  }

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
  }

  const handleItemView = (itemId) => {
    router.push(`/marketplace/${itemId}`)
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
    setSelectedDistance(null)
    setSelectedLocations([])
    setFilteredItems(mapItems)

    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
    })
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrag = (e, info) => {
    // Use requestAnimationFrame to optimize performance
    requestAnimationFrame(() => {
      setFilterPanelPosition({
        x: filterPanelPosition.x + info.delta.x,
        y: filterPanelPosition.y + info.delta.y,
      })
    })
  }

  const toggleFilterPanelMinimize = () => {
    setIsFilterPanelMinimized(!isFilterPanelMinimized)
  }

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel)
  }

  const collapseFilterPanel = () => {
    setIsFilterPanelCollapsed(true)
    setShowFilterPanel(false)
  }

  const expandFilterPanel = () => {
    setIsFilterPanelCollapsed(false)
    setShowFilterPanel(true)
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleDistanceSelect = (distance: number) => {
    setSelectedDistance((prev) => (prev === distance ? null : distance))
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocations((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location)
      } else {
        return [...prev, location]
      }
    })
  }

  // Make sure the filter panel is visible when in map view
  useEffect(() => {
    if (view === "map" && !showFilterPanel && !isFilterPanelCollapsed) {
      // Show either the full panel or the collapsed version
      if (isFilterPanelCollapsed) {
        setIsFilterPanelCollapsed(true)
      } else {
        setShowFilterPanel(true)
      }
    }
  }, [view, showFilterPanel, isFilterPanelCollapsed])

  if (locationPermission === "pending") {
    return (
      <LocationPermissionRequest
        onPermissionGranted={(position) => {
          handleLocationPermission("granted")
        }}
        onPermissionDenied={() => {
          handleLocationPermission("denied")
        }}
        onError={() => {
          // Fallback to denied with a default location
          handleLocationPermission("denied")
        }}
      />
    )
  }

  return (
    <>
      {showInterstitialAd && <InterstitialAd destination="/map" onComplete={handleAdComplete} />}

      <div className="flex h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackClick} aria-label="Back" className="cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Explore Trades</h1>
            <div className="hidden md:flex items-center gap-2 border-l pl-4 dark:border-gray-800">
              <Button
                variant={view === "map" ? "default" : "ghost"}
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={() => setView("map")}
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Map</span>
              </Button>
              <Button
                variant={view === "split" ? "default" : "ghost"}
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={() => setView("split")}
                title="Split view shows both map and list side by side"
              >
                <SplitScreen className="h-4 w-4" />
                <span className="hidden sm:inline">Split</span>
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => {
                if (isFilterPanelCollapsed) {
                  expandFilterPanel()
                } else if (!showFilterPanel) {
                  setShowFilterPanel(true)
                } else {
                  collapseFilterPanel()
                }
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex flex-1 overflow-hidden">
            {/* List view */}
            {(view === "list" || view === "split") && (
              <div className={`${view === "list" ? "w-full" : "w-1/2 border-r"} bg-background overflow-hidden`}>
                <div className="p-4">
                  <AreaSearchControls onSearch={({ query }) => handleSearch(query)} />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {suggestedSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ItemsList
                  items={filteredItems}
                  selectedItem={selectedItem}
                  onItemSelect={handleItemSelect}
                  onItemView={(itemId) => router.push(`/marketplace/${itemId}`)}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Map view */}
            {(view === "map" || view === "split") && (
              <div className={view === "split" ? "w-1/2" : "w-full"}>
                <div className="relative h-full">
                  <LeafletMap
                    center={[userLocation.lat, userLocation.lng]}
                    items={filteredItems}
                    userLocation={userLocation}
                    onItemSelect={handleItemSelect}
                    searchRadius={selectedDistance || 25}
                    isLoading={isLoading}
                    filteredCategories={selectedCategories}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filter panel (positioned absolutely so it stays visible regardless of zoom/scroll) */}
          <AnimatePresence>
            {showFilterPanel && (
              <motion.div
                ref={filterPanelRef}
                initial={{ opacity: 0, scale: 0.9, x: 20, y: 80 }} // Start from left side
                animate={{ opacity: 1, scale: 1, x: filterPanelPosition.x, y: filterPanelPosition.y }}
                exit={{ opacity: 0, scale: 0.9 }}
                drag
                dragConstraints={{ left: 0, right: window.innerWidth - 280, top: 0, bottom: window.innerHeight - 100 }}
                dragElastic={0}
                dragMomentum={false}
                dragTransition={{ power: 0, timeConstant: 0 }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                className="fixed z-[9999] w-64 rounded-lg border bg-black/90 backdrop-blur-sm shadow-lg text-white"
                style={{ touchAction: "none" }}
              >
                <div className="flex items-center justify-between border-b border-gray-700 p-3">
                  <div className="flex items-center gap-2">
                    <Grip className="h-4 w-4 cursor-move text-gray-400" />
                    <h3 className="text-sm font-medium">Filters</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 cursor-pointer text-white hover:bg-gray-800"
                      onClick={toggleFilterPanelMinimize}
                      aria-label={isFilterPanelMinimized ? "Expand" : "Minimize"}
                    >
                      {isFilterPanelMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 cursor-pointer text-white hover:bg-gray-800"
                      onClick={collapseFilterPanel}
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!isFilterPanelMinimized && (
                  <CardContent className="p-3 overflow-auto max-h-[calc(100vh-150px)]">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-200">Categories</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(
                            mapItems.reduce((acc, item) => {
                              acc[item.category] = true
                              return acc
                            }, {}),
                          ).map((category) => {
                            const IconComponent = getCategoryIcon(category)
                            return (
                              <Badge
                                key={category}
                                variant={selectedCategories.includes(category) ? "default" : "outline"}
                                className={`flex cursor-pointer items-center gap-1 py-1 ${
                                  selectedCategories.includes(category)
                                    ? "bg-white/20 hover:bg-white/30 text-white"
                                    : "bg-transparent text-gray-300 hover:bg-white/10"
                                }`}
                                onClick={() => {
                                  if (selectedCategories.includes(category)) {
                                    setSelectedCategories(selectedCategories.filter((c) => c !== category))
                                  } else {
                                    setSelectedCategories([...selectedCategories, category])
                                  }
                                }}
                              >
                                <IconComponent className="h-3.5 w-3.5" />
                                <span className="capitalize">{category}</span>
                              </Badge>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-200">Distance</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {[5, 10, 25].map((distance) => (
                            <Badge
                              key={distance}
                              variant={selectedDistance === distance ? "default" : "outline"}
                              className={`cursor-pointer text-center ${
                                selectedDistance === distance
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "text-gray-300 hover:bg-white/10"
                              }`}
                              onClick={() => handleDistanceSelect(distance)}
                            >
                              {distance} miles
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-200">Location</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {["Manhattan", "Brooklyn", "Queens", "Bronx"].map((location) => (
                            <Badge
                              key={location}
                              variant={selectedLocations.includes(location) ? "default" : "outline"}
                              className={`cursor-pointer text-center ${
                                selectedLocations.includes(location)
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "text-gray-300 hover:bg-white/10"
                              }`}
                              onClick={() => handleLocationSelect(location)}
                            >
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer bg-transparent border-gray-600 text-gray-200 hover:bg-white/10 hover:text-white"
                          onClick={handleResetFilters}
                        >
                          <RotateCcw className="mr-2 h-3 w-3" />
                          Reset
                        </Button>

                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 cursor-pointer"
                          onClick={applyFilters}
                          disabled={isLoading}
                        >
                          {isLoading ? "Applying..." : "Apply Filters"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed filter tab */}
          <AnimatePresence>
            {isFilterPanelCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: filterPanelPosition.x, y: filterPanelPosition.y }}
                animate={{ opacity: 1, x: filterPanelPosition.x, y: filterPanelPosition.y }}
                exit={{ opacity: 0 }}
                drag
                dragConstraints={{ left: 0, right: window.innerWidth - 100, top: 0, bottom: window.innerHeight - 50 }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
                className="fixed z-[9999] cursor-pointer rounded-lg border border-gray-700 bg-black/90 backdrop-blur-sm px-3 py-2 shadow-lg text-white"
                onClick={expandFilterPanel}
                style={{ touchAction: "none" }}
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters</span>
                  {(selectedCategories.length > 0 || selectedDistance || selectedLocations.length > 0) && (
                    <Badge variant="default" className="bg-primary h-5 w-5 p-0 flex items-center justify-center">
                      {selectedCategories.length + (selectedDistance ? 1 : 0) + selectedLocations.length}
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile view controls */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-[9998]">
            <div className="flex items-center gap-1 rounded-full bg-black/90 backdrop-blur-sm p-1 shadow-lg">
              <Button
                variant={view === "map" ? "default" : "ghost"}
                size="icon"
                className={`h-10 w-10 rounded-full cursor-pointer ${
                  view === "map" ? "bg-white text-black" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setView("map")}
              >
                <Map className="h-5 w-5" />
              </Button>
              <Button
                variant={view === "split" ? "default" : "ghost"}
                size="icon"
                className={`h-10 w-10 rounded-full cursor-pointer ${
                  view === "split" ? "bg-white text-black" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setView("split")}
              >
                <SplitScreen className="h-5 w-5" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className={`h-10 w-10 rounded-full cursor-pointer ${
                  view === "list" ? "bg-white text-black" : "text-white hover:bg-white/10"
                }`}
                onClick={() => setView("list")}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

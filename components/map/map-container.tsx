"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { TradePin } from "./trade-pin"
import { TradePopup } from "./trade-popup"
import { UserLocationPin } from "./user-location-pin"
import { PinCluster } from "./pin-cluster"
import { useRouter } from "next/navigation"

export function MapContainer({
  userLocation,
  trades,
  selectedTrade,
  onTradeSelect,
  onTradeView,
  onClosePopup,
  zoom = 12,
  isLoading = false,
  showClusters = true,
  showIndividualPins = true,
  filteredCategories = [],
  searchParams,
}) {
  // At the top of the component, add these parameters to the existing ones
  const showOnly = searchParams?.get("showOnly")
  const hideFilters = searchParams?.get("hideFilters") === "true"

  const mapRef = useRef(null)
  const [clusters, setClusters] = useState([])
  const [visibleTrades, setVisibleTrades] = useState([])
  const router = useRouter()

  // Calculate clusters based on zoom level and trade proximity
  useEffect(() => {
    if (!trades || trades.length === 0) return

    // Filter trades by selected categories if any are selected
    const filteredTrades =
      filteredCategories.length > 0 ? trades.filter((trade) => filteredCategories.includes(trade.category)) : trades

    // In the data filtering logic, add a condition to filter for a specific item if showOnly is provided
    const finalTrades = showOnly ? trades.filter((item) => item.id === showOnly) : filteredTrades

    // Get unique categories from filtered trades
    const categories = [...new Set(finalTrades.map((trade) => trade.category))]

    // Simple clustering algorithm
    // In a real app, this would be more sophisticated
    const clusterRadius = 20 / zoom // Adjust based on zoom level
    const newClusters = []
    const processedTrades = new Set()
    const categoryRepresentatives = {}

    // Ensure we have at least one item from each category
    categories.forEach((category) => {
      const categoryItems = finalTrades.filter((trade) => trade.category === category)
      if (categoryItems.length > 0) {
        // Select one item from each category to always show
        categoryRepresentatives[category] = categoryItems[0].id
      }
    })

    if (showClusters) {
      finalTrades.forEach((trade, i) => {
        if (processedTrades.has(trade.id)) return

        const cluster = [trade]
        processedTrades.add(trade.id)

        finalTrades.forEach((otherTrade, j) => {
          if (i === j || processedTrades.has(otherTrade.id)) return

          // Don't cluster category representatives
          if (categoryRepresentatives[otherTrade.category] === otherTrade.id) return

          const distance = calculateDistance(
            trade.coordinates.lat,
            trade.coordinates.lng,
            otherTrade.coordinates.lat,
            otherTrade.coordinates.lng,
          )

          if (distance < clusterRadius) {
            cluster.push(otherTrade)
            processedTrades.add(otherTrade.id)
          }
        })

        if (cluster.length > 1) {
          // Calculate average position for cluster
          const avgLat = cluster.reduce((sum, t) => sum + t.coordinates.lat, 0) / cluster.length
          const avgLng = cluster.reduce((sum, t) => sum + t.coordinates.lng, 0) / cluster.length

          newClusters.push({
            id: `cluster-${i}`,
            coordinates: { lat: avgLat, lng: avgLng },
            count: cluster.length,
            trades: cluster,
            category: cluster[0].category, // Use the first item's category for the cluster
          })
        }
      })
    }

    // Set individual trades that aren't in clusters or all trades if showIndividualPins is true
    let newVisibleTrades = []

    if (showIndividualPins) {
      if (showClusters) {
        // Show trades that aren't in clusters
        newVisibleTrades = finalTrades.filter(
          (trade) => !processedTrades.has(trade.id) || Object.values(categoryRepresentatives).includes(trade.id),
        )
      } else {
        // Show all trades
        newVisibleTrades = finalTrades
      }
    } else {
      // Even if individual pins are disabled, still show category representatives
      newVisibleTrades = finalTrades.filter((trade) => Object.values(categoryRepresentatives).includes(trade.id))
    }

    setClusters(newClusters)
    setVisibleTrades(newVisibleTrades)
  }, [trades, zoom, showClusters, showIndividualPins, filteredCategories, showOnly])

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  // Convert geo coordinates to pixel positions on the map
  // This is a simplified version - in a real app with Google Maps,
  // we would use the Maps API to handle this
  const geoToPixel = (lat, lng) => {
    // Simple linear mapping for demonstration
    // In a real app, this would use proper Mercator projection
    const mapWidth = mapRef.current?.clientWidth || 1000
    const mapHeight = mapRef.current?.clientHeight || 800

    const latRange = 0.1 // Approximate degrees visible in the map
    const lngRange = 0.1 * (mapWidth / mapHeight)

    const x = ((lng - (userLocation.lng - lngRange / 2)) / lngRange) * mapWidth
    const y = ((userLocation.lat + latRange / 2 - lat) / latRange) * mapHeight

    return { x, y }
  }

  // Handle cluster click
  const handleClusterClick = (cluster) => {
    // In a real app, we might zoom in or show a list of trades
    // For now, just select the first trade in the cluster
    if (cluster.trades && cluster.trades.length > 0) {
      onTradeSelect(cluster.trades[0])
    }
  }

  return (
    <div ref={mapRef} className="relative h-full w-full overflow-hidden">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Google Maps-like background */}
          <div className="absolute inset-0">
            {/* Base map layer */}
            <div className="h-full w-full bg-[#f8f9fa] dark:bg-[#242f3e]">
              {/* City blocks */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`col-${i}`} className="border-r border-[#e0e0e0] dark:border-[#3a4a5c] opacity-40" />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`row-${i}`} className="border-b border-[#e0e0e0] dark:border-[#3a4a5c] opacity-40" />
                ))}
              </div>

              {/* Major roads */}
              <div className="absolute inset-0">
                <div className="absolute left-[10%] top-0 h-full w-[1.5%] bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
                <div className="absolute left-[30%] top-0 h-full w-[2.5%] bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
                <div className="absolute left-[70%] top-0 h-full w-[1.5%] bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
                <div className="absolute left-0 top-[20%] h-[1.5%] w-full bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
                <div className="absolute left-0 top-[50%] h-[2.5%] w-full bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
                <div className="absolute left-0 top-[80%] h-[1.5%] w-full bg-[#ffffff] dark:bg-[#3a4a5c]"></div>
              </div>

              {/* Minor roads */}
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 h-full w-[0.5%]"
                    style={{
                      left: `${(i * 5) % 100}%`,
                      backgroundColor: "#ffffff",
                      opacity: 0.3,
                    }}
                  ></div>
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 h-[0.5%] w-full"
                    style={{
                      top: `${(i * 5) % 100}%`,
                      backgroundColor: "#ffffff",
                      opacity: 0.3,
                    }}
                  ></div>
                ))}
              </div>

              {/* Water features */}
              <div className="absolute left-[60%] top-[30%] h-[20%] w-[25%] rounded-full bg-[#c6dde7] dark:bg-[#17263c] opacity-70"></div>
              <div className="absolute left-[10%] top-[70%] h-[15%] w-[30%] rounded-lg bg-[#c6dde7] dark:bg-[#17263c] opacity-70"></div>

              {/* Parks/green areas */}
              <div className="absolute left-[20%] top-[20%] h-[15%] w-[15%] rounded-lg bg-[#d4e6cc] dark:bg-[#2c3e2e] opacity-70"></div>
              <div className="absolute left-[70%] top-[60%] h-[10%] w-[20%] rounded-lg bg-[#d4e6cc] dark:bg-[#2c3e2e] opacity-70"></div>

              {/* Buildings */}
              <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => {
                  const size = Math.random() * 5 + 2
                  const left = Math.random() * 90 + 5
                  const top = Math.random() * 90 + 5
                  const opacity = Math.random() * 0.3 + 0.1
                  return (
                    <div
                      key={`building-${i}`}
                      className="absolute rounded-sm bg-[#d1d1d1] dark:bg-[#3a4a5c]"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        width: `${size}%`,
                        height: `${size}%`,
                        opacity,
                      }}
                    ></div>
                  )
                })}
              </div>

              {/* Map labels - street names */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[30%] top-[51%] transform -translate-x-1/2 -translate-y-1/2 rotate-90">
                  <span className="text-[8px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-nowrap">Main Street</span>
                </div>
                <div className="absolute left-[51%] top-[20%] transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-[8px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-nowrap">Broadway Ave</span>
                </div>
                <div className="absolute left-[70%] top-[51%] transform -translate-x-1/2 -translate-y-1/2 rotate-90">
                  <span className="text-[8px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-nowrap">Park Road</span>
                </div>
                <div className="absolute left-[51%] top-[80%] transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-[8px] text-[#5f6368] dark:text-[#9aa0a6] whitespace-nowrap">River Drive</span>
                </div>
              </div>
            </div>
          </div>

          {/* User location pin */}
          <UserLocationPin position={geoToPixel(userLocation.lat, userLocation.lng)} />

          {/* Trade pins */}
          {visibleTrades.map((trade) => (
            <TradePin
              key={trade.id}
              trade={trade}
              position={geoToPixel(trade.coordinates.lat, trade.coordinates.lng)}
              isSelected={selectedTrade?.id === trade.id}
              onClick={() => router.push(`/map/item/${trade.id}`)}
              category={trade.category}
            />
          ))}

          {/* Clusters */}
          {clusters.map((cluster) => (
            <PinCluster
              key={cluster.id}
              cluster={cluster}
              position={geoToPixel(cluster.coordinates.lat, cluster.coordinates.lng)}
              onClick={() => handleClusterClick(cluster)}
            />
          ))}

          {/* Trade popup */}
          <AnimatePresence>
            {selectedTrade && (
              <TradePopup
                trade={selectedTrade}
                position={geoToPixel(selectedTrade.coordinates.lat, selectedTrade.coordinates.lng)}
                onClose={onClosePopup}
                onView={() => onTradeView(selectedTrade.id)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

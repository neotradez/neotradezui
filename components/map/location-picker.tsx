"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, MapPin, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { GoogleMap } from "@/components/map/google-map"

export function LocationPicker({ initialLocation, onSelect, onCancel }) {
  const [location, setLocation] = useState(
    initialLocation || {
      lat: 40.7128,
      lng: -74.006,
      address: "New York, NY",
    },
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock suggestions based on search query
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Mock location search results
    const mockSuggestions = [
      { address: "New York, NY", lat: 40.7128, lng: -74.006 },
      { address: "Brooklyn, NY", lat: 40.6782, lng: -73.9442 },
      { address: "Queens, NY", lat: 40.7282, lng: -73.7949 },
      { address: "Manhattan, NY", lat: 40.7831, lng: -73.9712 },
      { address: "Jersey City, NJ", lat: 40.7178, lng: -74.0431 },
    ].filter((item) => item.address.toLowerCase().includes(searchQuery.toLowerCase()))

    setSuggestions(mockSuggestions)
    setShowSuggestions(mockSuggestions.length > 0)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would call a geocoding API
    console.log("Searching for location:", searchQuery)
  }

  const handleSuggestionSelect = (suggestion) => {
    setLocation(suggestion)
    setSearchQuery(suggestion.address)
    setShowSuggestions(false)
  }

  const handleMapClick = (e) => {
    // In a real app, this would get coordinates from the map click event
    // and reverse geocode to get the address
    console.log("Map clicked")

    // For now, just set a random location near the current one
    const newLat = location.lat + (Math.random() - 0.5) * 0.02
    const newLng = location.lng + (Math.random() - 0.5) * 0.02

    setLocation({
      lat: newLat,
      lng: newLng,
      address: `Custom Location (${newLat.toFixed(4)}, ${newLng.toFixed(4)})`,
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-4xl p-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Set Item Location</CardTitle>
              <Button variant="ghost" size="icon" onClick={onCancel}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for a location..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {showSuggestions && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto rounded-md border bg-background shadow-md">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center px-3 py-2 hover:bg-accent"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{suggestion.address}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Selected Location:</div>
              <div className="flex items-center gap-2 rounded-md border border-border p-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{location.address}</span>
              </div>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden rounded-md border">
              <div className="h-full w-full">
                <GoogleMap singleItemMode={true} initialLocation={location} onLocationChange={setLocation} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={() => onSelect(location)}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Location
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

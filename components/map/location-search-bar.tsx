"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface LocationSearchBarProps {
  onSearch: (query: string, location?: string) => void
  className?: string
}

export function LocationSearchBar({ onSearch, className = "" }: LocationSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [isLocationSearch, setIsLocationSearch] = useState(false)
  const [recentLocations, setRecentLocations] = useState([
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Seattle, WA",
  ])
  const [recentSearches, setRecentSearches] = useState([
    "Vintage Camera",
    "Nintendo Switch",
    "Mountain Bike",
    "Mechanical Keyboard",
  ])

  const handleSearch = () => {
    if (!searchQuery.trim() && !locationQuery.trim()) return

    onSearch(searchQuery, isLocationSearch ? locationQuery : undefined)

    // Save recent searches
    if (searchQuery.trim()) {
      setRecentSearches((prev) => {
        const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)]
        return updated.slice(0, 5)
      })
    }

    // Save recent locations
    if (locationQuery.trim()) {
      setRecentLocations((prev) => {
        const updated = [locationQuery, ...prev.filter((l) => l !== locationQuery)]
        return updated.slice(0, 5)
      })
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setLocationQuery("")
    setIsLocationSearch(false)
    onSearch("", undefined)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={isLocationSearch ? "Search items in a specific area..." : "Search for items..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10 h-12 text-base"
            aria-label="Search"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isLocationSearch ? "default" : "outline"}
              size="icon"
              className="h-12 w-12 flex-shrink-0"
              aria-label="Location search options"
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setIsLocationSearch(!isLocationSearch)}>
              {isLocationSearch ? "Disable" : "Enable"} location search
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.geolocation.getCurrentPosition((position) => {
                  setLocationQuery("Current Location")
                  setIsLocationSearch(true)
                })
              }
            >
              Use my current location
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleSearch} className="h-12">
          Search
        </Button>
      </div>

      {isLocationSearch && (
        <div className="flex items-center gap-2 mt-1">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter location (city, zip code, area)..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-10"
              aria-label="Location search"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>
      )}

      {/* Recent searches and locations */}
      <div className="flex flex-wrap gap-2 mt-1">
        {searchQuery &&
          recentSearches
            .filter(
              (s) =>
                s.toLowerCase().includes(searchQuery.toLowerCase()) && s.toLowerCase() !== searchQuery.toLowerCase(),
            )
            .slice(0, 3)
            .map((search, i) => (
              <Badge
                key={`search-${i}`}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}

        {isLocationSearch &&
          locationQuery &&
          recentLocations
            .filter(
              (l) =>
                l.toLowerCase().includes(locationQuery.toLowerCase()) &&
                l.toLowerCase() !== locationQuery.toLowerCase(),
            )
            .slice(0, 3)
            .map((location, i) => (
              <Badge
                key={`location-${i}`}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => setLocationQuery(location)}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </Badge>
            ))}
      </div>
    </div>
  )
}

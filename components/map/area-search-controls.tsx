"use client"

import { useState } from "react"
import { Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { LocationSearchBar } from "./location-search-bar"

interface AreaSearchControlsProps {
  onSearch: (params: {
    query: string
    location?: string
    radius?: number
    categories?: string[]
  }) => void
}

export function AreaSearchControls({ onSearch }: AreaSearchControlsProps) {
  const [searchParams, setSearchParams] = useState({
    query: "",
    location: "",
    radius: 10,
    categories: [] as string[],
  })

  const [availableCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Furniture",
    "Collectibles",
    "Sports",
    "Toys",
    "Tools",
    "Art",
  ])

  const handleSearch = (query: string, location?: string) => {
    setSearchParams((prev) => ({
      ...prev,
      query,
      location: location || prev.location,
    }))

    onSearch({
      ...searchParams,
      query,
      location: location || searchParams.location,
    })
  }

  const handleRadiusChange = (value: number[]) => {
    const radius = value[0]
    setSearchParams((prev) => ({ ...prev, radius }))
  }

  const handleCategoryToggle = (category: string) => {
    setSearchParams((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]

      return { ...prev, categories }
    })
  }

  const applyFilters = () => {
    onSearch(searchParams)
  }

  return (
    <div className="w-full space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-md">
      <LocationSearchBar onSearch={handleSearch} className="w-full" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {searchParams.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {searchParams.categories.map((category) => (
                <span key={category} className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Sliders className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Search Filters</SheetTitle>
              <SheetDescription>Refine your search to find exactly what you're looking for.</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Search Radius</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[searchParams.radius]}
                    max={50}
                    min={1}
                    step={1}
                    onValueChange={handleRadiusChange}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">1 mile</span>
                    <span className="text-sm font-medium">{searchParams.radius} miles</span>
                    <span className="text-sm text-muted-foreground">50 miles</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((category) => (
                    <Button
                      key={category}
                      variant={searchParams.categories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryToggle(category)}
                      className="justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

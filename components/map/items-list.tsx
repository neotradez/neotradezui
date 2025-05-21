"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, MapPin, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCategoryColor, getCategoryIcon } from "@/lib/category-utils"
import Image from "next/image"

export function ItemsList({ items = [], selectedItem, onItemSelect, onItemView, isLoading = false }) {
  const [sortBy, setSortBy] = useState("distance")
  const [showSortOptions, setShowSortOptions] = useState(false)

  // Sort items based on selected sort option
  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return (a.distance || 0) - (b.distance || 0)
      case "price-low":
        return a.estimatedValue - b.estimatedValue
      case "price-high":
        return b.estimatedValue - a.estimatedValue
      case "rating":
        return b.owner.rating - a.owner.rating
      default:
        return (a.distance || 0) - (b.distance || 0)
    }
  })

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions)
  }

  const handleSortChange = (option) => {
    setSortBy(option)
    setShowSortOptions(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col bg-background border-l border-border/40 dark:border-border/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 p-4 dark:border-border/20">
        <h2 className="text-lg font-semibold">Available Items ({items.length})</h2>
        <div className="relative">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleSortOptions}>
            Sort by
            <ChevronDown className="h-4 w-4" />
          </Button>
          <AnimatePresence>
            {showSortOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full z-10 mt-1 w-40 rounded-md border border-border bg-background shadow-lg"
              >
                <div className="py-1">
                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-muted ${
                      sortBy === "distance" ? "bg-muted/50 font-medium" : ""
                    }`}
                    onClick={() => handleSortChange("distance")}
                  >
                    Nearest first
                  </button>
                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-muted ${
                      sortBy === "price-low" ? "bg-muted/50 font-medium" : ""
                    }`}
                    onClick={() => handleSortChange("price-low")}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-muted ${
                      sortBy === "price-high" ? "bg-muted/50 font-medium" : ""
                    }`}
                    onClick={() => handleSortChange("price-high")}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-muted ${
                      sortBy === "rating" ? "bg-muted/50 font-medium" : ""
                    }`}
                    onClick={() => handleSortChange("rating")}
                  >
                    Highest rated
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Items list */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {sortedItems.length === 0 ? (
            <div className="flex h-40 w-full items-center justify-center">
              <p className="text-muted-foreground">No items found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {sortedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={() => onItemSelect(item)}
                  onView={() => onItemView(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function ItemCard({ item, isSelected, onSelect, onView }) {
  const categoryColor = getCategoryColor(item.category)
  const CategoryIcon = getCategoryIcon(item.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={onSelect}
    >
      <Card
        className={`overflow-hidden transition-all ${
          isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md"
        }`}
      >
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative h-32 w-32 flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg?height=128&width=128"}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div
                className="absolute bottom-0 left-0 flex items-center gap-1 rounded-tr-md px-2 py-1"
                style={{ backgroundColor: `${categoryColor}CC` }}
              >
                {/* Render the CategoryIcon component properly */}
                <div className="text-white">{CategoryIcon && <CategoryIcon className="h-4 w-4" />}</div>
                <span className="text-xs font-medium text-white">{item.category}</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <span className="font-medium text-primary">${item.estimatedValue}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.distance || "2.5"} miles away</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-muted-foreground">{item.owner.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.lookingFor.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.lookingFor.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.lookingFor.length - 2} more
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onView()
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

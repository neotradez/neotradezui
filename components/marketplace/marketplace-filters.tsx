"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Filter, X, Loader2 } from "lucide-react"
import { useMarketplace } from "@/context/marketplace-context"
import { useState } from "react"

export function MarketplaceFilters() {
  const { filters, setFilters, resetFilters, loading } = useMarketplace()
  const [localLoading, setLocalLoading] = useState(false)

  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Sports",
    "Collectibles",
    "Books",
    "Music",
    "Art",
    "Tools",
    "Vehicles",
  ]

  const conditions = ["New", "Like New", "Excellent", "Good", "Fair", "Poor"]
  const ratings = ["5+ Stars", "4+ Stars", "3+ Stars", "Any Rating"]

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    setFilters({ categories: newCategories })
  }

  const toggleCondition = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition]

    setFilters({ conditions: newConditions })
  }

  const toggleRating = (rating: string) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating]

    setFilters({ ratings: newRatings })
  }

  const handleValueRangeChange = (values: number[]) => {
    setFilters({ minValue: values[0], maxValue: values[1] })
  }

  const handleDistanceChange = (values: number[]) => {
    setFilters({ distance: values[0] })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ location: e.target.value })
  }

  const toggleWorldwide = (checked: boolean) => {
    setFilters({ includeWorldwide: checked })
  }

  const clearFilters = () => {
    resetFilters()
  }

  const handleApplyFilters = () => {
    setLocalLoading(true)
    // The actual filtering will be handled by the context
    // Just simulate a loading state for better UX
    setTimeout(() => {
      setLocalLoading(false)
    }, 800)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.conditions.length > 0 ||
    filters.ratings.length > 0 ||
    filters.minValue > 0 ||
    filters.maxValue < 1000 ||
    filters.distance !== 50 ||
    filters.location !== "" ||
    filters.includeWorldwide

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-border/40 bg-background/40 p-5 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
      drag
      dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Filter className="h-4 w-4 text-[#00D084]" />
          Filters
          <span className="ml-2 text-xs text-muted-foreground">(Drag to move)</span>
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {filters.categories.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-sm font-medium">Active filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1 pr-1">
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleCategory(category)}
                  className="h-4 w-4 rounded-full p-0 hover:bg-transparent hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {category} filter</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["location", "categories", "value"]} className="w-full">
        <AccordionItem value="location" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location" className="mb-1.5 block text-xs">
                  Your location
                </Label>
                <Input
                  id="location"
                  placeholder="City, State or Zip"
                  value={filters.location}
                  onChange={handleLocationChange}
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label htmlFor="distance" className="text-xs">
                    Distance
                  </Label>
                  <span className="text-xs text-muted-foreground">{filters.distance} miles</span>
                </div>
                <Slider
                  id="distance"
                  min={5}
                  max={100}
                  step={5}
                  value={[filters.distance]}
                  onValueChange={handleDistanceChange}
                  className="py-1.5"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="worldwide"
                  checked={filters.includeWorldwide}
                  onCheckedChange={(checked) => toggleWorldwide(checked as boolean)}
                />
                <Label htmlFor="worldwide" className="text-sm font-normal">
                  Include worldwide shipping
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rarity" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Rarity</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Common", "Uncommon", "Rare", "Very Rare", "Unique"].map((rarity) => (
                <div key={rarity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rarity-${rarity}`}
                    checked={filters.rarities?.includes(rarity) || false}
                    onCheckedChange={() => {
                      const newRarities = filters.rarities?.includes(rarity)
                        ? filters.rarities.filter((r) => r !== rarity)
                        : [...(filters.rarities || []), rarity]
                      setFilters({ rarities: newRarities })
                    }}
                  />
                  <Label htmlFor={`rarity-${rarity}`} className="text-sm font-normal">
                    {rarity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`condition-${condition}`}
                    checked={filters.conditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                  />
                  <Label htmlFor={`condition-${condition}`} className="text-sm font-normal">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trader" className="border-b-0">
          <AccordionTrigger className="py-3 text-sm font-medium">Trader Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.ratings.includes(rating)}
                    onCheckedChange={() => toggleRating(rating)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal">
                    {rating}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="mt-6 w-full group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
        onClick={handleApplyFilters}
        disabled={localLoading || loading}
      >
        {localLoading || loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="relative z-10">Applying Filters...</span>
          </>
        ) : (
          <>
            <span className="relative z-10">Apply Filters</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </>
        )}
      </Button>
    </motion.div>
  )
}

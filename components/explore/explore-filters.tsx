"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { useState } from "react"

export function ExploreFilters() {
  const [valueRange, setValueRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [distance, setDistance] = useState(50)

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

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const clearFilters = () => {
    setValueRange([0, 1000])
    setSelectedCategories([])
    setDistance(50)
  }

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
        {(selectedCategories.length > 0 || valueRange[0] > 0 || valueRange[1] < 1000 || distance !== 50) && (
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

      {selectedCategories.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-sm font-medium">Active filters:</div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
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
                <Input id="location" placeholder="City, State or Zip" />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <Label htmlFor="distance" className="text-xs">
                    Distance
                  </Label>
                  <span className="text-xs text-muted-foreground">{distance} miles</span>
                </div>
                <Slider
                  id="distance"
                  min={5}
                  max={100}
                  step={5}
                  value={[distance]}
                  onValueChange={(value) => setDistance(value[0])}
                  className="py-1.5"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="worldwide" />
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
                    checked={selectedCategories.includes(category)}
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

        <AccordionItem value="value" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Estimated Value</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">${valueRange[0]}</span>
                <span className="text-xs text-muted-foreground">${valueRange[1]}</span>
              </div>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={valueRange}
                onValueChange={setValueRange}
                className="py-1.5"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={valueRange[1]}
                  value={valueRange[0]}
                  onChange={(e) => setValueRange([Number.parseInt(e.target.value), valueRange[1]])}
                  className="h-8"
                />
                <span className="text-sm text-muted-foreground">to</span>
                <Input
                  type="number"
                  min={valueRange[0]}
                  max={1000}
                  value={valueRange[1]}
                  onChange={(e) => setValueRange([valueRange[0], Number.parseInt(e.target.value)])}
                  className="h-8"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition" className="border-b border-border/40 dark:border-border/20">
          <AccordionTrigger className="py-3 text-sm font-medium">Condition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["New", "Like New", "Good", "Fair", "Poor"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox id={`condition-${condition}`} />
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
              {["5+ Stars", "4+ Stars", "3+ Stars", "Any Rating"].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal">
                    {rating}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="mt-6 w-full group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
        <span className="relative z-10">Apply Filters</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
      </Button>
    </motion.div>
  )
}

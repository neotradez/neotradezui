"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Maximize2, Minimize2, X, Grip, ChevronUp, ChevronDown, Filter, RotateCcw } from "lucide-react"
import Image from "next/image"
import { getCategoryIcon } from "@/lib/category-utils"
import { mockTradeData } from "@/mock/map-data"

export function ExploreMap() {
  const [expanded, setExpanded] = useState(false)
  const [filterPanelPosition, setFilterPanelPosition] = useState({ x: 20, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFilterPanelMinimized, setIsFilterPanelMinimized] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(true)
  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filterPanelRef = useRef(null)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrag = (e, info) => {
    setFilterPanelPosition({
      x: filterPanelPosition.x + info.delta.x,
      y: filterPanelPosition.y + info.delta.y,
    })
  }

  const toggleFilterPanelMinimize = () => {
    setIsFilterPanelMinimized(!isFilterPanelMinimized)
  }

  const collapseFilterPanel = () => {
    setIsFilterPanelCollapsed(true)
    setShowFilterPanel(false)
  }

  const expandFilterPanel = () => {
    setIsFilterPanelCollapsed(false)
    setShowFilterPanel(true)
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40 transition-all duration-500 ${
        expanded ? "h-[600px]" : "h-[300px]"
      }`}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Map view"
            fill
            className="object-cover opacity-80 transition-opacity duration-300"
          />

          {/* Empty state overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="rounded-lg bg-background/80 p-6 text-center backdrop-blur-sm dark:bg-[#121212]/80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.7,
              }}
            >
              <h3 className="mb-2 text-lg font-medium">No trades in this area</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Try adjusting your location or expanding your search radius
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
                  <span className="relative z-10">Adjust Filters</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Draggable filter panel - Increased z-index to ensure visibility */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            ref={filterPanelRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, x: filterPanelPosition.x, y: filterPanelPosition.y }}
            exit={{ opacity: 0, scale: 0.9 }}
            drag
            dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            className="absolute z-[9999] w-64 rounded-lg border bg-background shadow-lg"
            style={{ touchAction: "none" }}
          >
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-2">
                <Grip className="h-4 w-4 cursor-move text-muted-foreground" />
                <h3 className="text-sm font-medium">Filters</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={toggleFilterPanelMinimize}
                  aria-label={isFilterPanelMinimized ? "Expand" : "Minimize"}
                >
                  {isFilterPanelMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={collapseFilterPanel}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isFilterPanelMinimized && (
              <CardContent className="p-3">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(
                        mockTradeData.reduce((acc, item) => {
                          acc[item.category] = true
                          return acc
                        }, {}),
                      ).map((category) => {
                        const CategoryIcon = getCategoryIcon(category)
                        return (
                          <Badge
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                            className="flex cursor-pointer items-center gap-1 py-1"
                            onClick={() => {
                              if (selectedCategories.includes(category)) {
                                setSelectedCategories(selectedCategories.filter((c) => c !== category))
                              } else {
                                setSelectedCategories([...selectedCategories, category])
                              }
                            }}
                          >
                            {CategoryIcon}
                            <span className="capitalize">{category}</span>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium">Distance</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[5, 10, 25].map((distance) => (
                        <Badge key={distance} variant="outline" className="cursor-pointer text-center">
                          {distance} miles
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium">Location</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Manhattan", "Brooklyn", "Queens", "Bronx"].map((location) => (
                        <Badge key={location} variant="outline" className="cursor-pointer text-center">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" onClick={handleResetFilters}>
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset Filters
                  </Button>
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
            dragConstraints={{ left: 0, right: 200, top: 0, bottom: 200 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            className="absolute z-[9999] cursor-pointer rounded-lg border bg-background px-3 py-2 shadow-lg"
            onClick={expandFilterPanel}
            style={{ touchAction: "none" }}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
        <Badge className="bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">No trades found in your area</Badge>
        <motion.div
          whileHover={{ scale: 1.1, rotate: expanded ? -90 : 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={expanded ? "minimize" : "maximize"}
                initial={{ opacity: 0, rotate: expanded ? 90 : -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: expanded ? -90 : 90 }}
                transition={{ duration: 0.2 }}
              >
                {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-4 top-4 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="rounded-lg bg-background/80 p-2 backdrop-blur-sm dark:bg-[#121212]/80">
          <div className="text-xs font-medium">Your Location</div>
          <div className="text-xs text-muted-foreground">New York, NY</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

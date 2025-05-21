"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, List, Grid3X3 } from "lucide-react"
import { useState } from "react"

export function ExploreHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Explore Trades</h1>
          <p className="mt-1 text-muted-foreground">Discover items available for trade in your area or worldwide</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for items..."
              className="w-full pl-9 sm:w-[260px] md:w-[300px] transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,208,132,0.3)]"
            />
          </motion.div>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                <MapPin className="h-4 w-4" />
                <span className="sr-only">Location</span>
              </Button>
            </motion.div>
            <div className="flex rounded-md border border-border/40 p-1 dark:border-border/20">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

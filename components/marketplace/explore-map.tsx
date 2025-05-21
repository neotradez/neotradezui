"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2, Plus, Minus, Navigation, Locate } from "lucide-react"
import Image from "next/image"

export function ExploreMap() {
  const [expanded, setExpanded] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40 transition-all duration-500 ${
        expanded ? "h-[600px]" : "h-[400px]"
      }`}
    >
      <div className="absolute inset-0 z-10">
        <div className="relative h-full w-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-19%20222427-Wf3kS1GJErT8BS5ar2qwQVgwhNExuI.png"
            alt="Map view"
            fill
            className="object-cover"
            onLoad={() => setMapLoaded(true)}
          />

          {!mapLoaded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
              initial={{ opacity: 1 }}
              animate={{ opacity: mapLoaded ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <p className="text-sm">Loading map...</p>
              </div>
            </motion.div>
          )}

          {/* Map controls */}
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
              >
                <Locate className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
        <Badge className="bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00D084]"></div>
            <span>Your Location</span>
          </div>
        </Badge>
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
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-[#00D084]" />
            <div>
              <div className="text-xs font-medium">Your Location</div>
              <div className="text-xs text-muted-foreground">New York, NY</div>
            </div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Items within 50 miles are shown</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

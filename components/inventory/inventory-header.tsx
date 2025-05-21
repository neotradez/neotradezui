"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Filter, Grid, List } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function InventoryHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="mb-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">My Inventory</h1>
          <p className="mt-1 text-muted-foreground">Manage your items available for trade</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="w-full pl-9 sm:w-[260px] md:w-[300px] transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,208,132,0.3)]"
            />
          </motion.div>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
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
                  <Grid className="h-4 w-4" />
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                onClick={() => router.push("/inventory/add")}
                type="button"
                aria-label="Add new item to inventory"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 180] }}
                    transition={{ duration: 0.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </motion.div>
                  Add Item
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

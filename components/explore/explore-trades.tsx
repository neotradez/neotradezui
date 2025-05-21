"use client"

import { motion } from "framer-motion"
import { TradeCard } from "@/components/trade-card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Search } from "lucide-react"

export function ExploreTrades() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "electronics", name: "Electronics" },
    { id: "furniture", name: "Furniture" },
    { id: "clothing", name: "Clothing" },
    { id: "sports", name: "Sports" },
    { id: "collectibles", name: "Collectibles" },
  ]

  // Replace the trades array with an empty array
  const trades = []

  const filteredTrades =
    selectedCategory === "all" ? trades : trades.filter((trade) => trade.category.toLowerCase() === selectedCategory)

  // Update the filteredTrades section to show an empty state when no trades exist
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084] hover:to-[#3B82F6]"
                  : "border-border/40 bg-background/40 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {filteredTrades.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TradeCard trade={trade} onClick={() => {}} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No trades found</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            There are no trades available in this category. Try selecting a different category or check back later.
          </p>
          <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
            <span className="relative z-10">Create a Trade</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

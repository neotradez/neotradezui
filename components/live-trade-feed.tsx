"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search, ArrowLeftRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TradeCard } from "@/components/trade-card"
import { TradeModal } from "@/components/trade-modal"

export function LiveTradeFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  const openTradeModal = (trade) => {
    setSelectedTrade(trade)
    setIsModalOpen(true)
  }

  const trades = []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2,
      },
    },
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Live Trade Feed</h2>
          <p className="text-muted-foreground">Discover the latest items available for trade</p>
        </div>
        <div className="flex gap-2">
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search trades..."
              className="w-full min-w-[200px] pl-8 sm:w-[200px] md:w-[300px] transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,208,132,0.3)]"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
            {["all", "electronics", "furniture", "clothing", "sports", "other"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="min-w-[100px] transition-all duration-300"
                onClick={() => setActiveTab(tab)}
              >
                <motion.span
                  initial={false}
                  animate={activeTab === tab ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === "all" ? "Trades" : ""}
                </motion.span>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="all" className="mt-0">
              {trades.length > 0 ? (
                <motion.div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {trades.map((trade, index) => (
                    <motion.div key={trade.id} variants={itemVariants} custom={index}>
                      <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40"
                  variants={emptyStateVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="mb-4 rounded-full bg-muted/50 p-3"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
                  </motion.div>
                  <h3 className="mb-2 text-lg font-medium">No trades available</h3>
                  <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
                    There are no trades available at the moment. Be the first to list an item for trade!
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
                      <span className="relative z-10">Create a Trade</span>
                      <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="electronics" className="mt-0">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {trades
                  .filter((trade) => trade.category === "Electronics")
                  .map((trade, index) => (
                    <motion.div key={trade.id} variants={itemVariants} custom={index}>
                      <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>

            {/* Other tab contents would follow the same pattern */}
            <TabsContent value="furniture" className="mt-0">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {trades
                  .filter((trade) => trade.category === "Furniture")
                  .map((trade, index) => (
                    <motion.div key={trade.id} variants={itemVariants} custom={index}>
                      <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {trades.length > 0 && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-[#3B82F6]/20 dark:bg-background/10"
            >
              Load More Trades
            </Button>
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && selectedTrade && <TradeModal trade={selectedTrade} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

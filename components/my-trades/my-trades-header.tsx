"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { NewTradeModal } from "@/components/my-trades/new-trade-modal"
import { AnimatePresence } from "framer-motion"

export function MyTradesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
    >
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">My Trades</h1>
        <p className="mt-1 text-muted-foreground">Manage your active listings, trade requests, and trade history</p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 180] }}
              transition={{ duration: 0.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
            >
              <PlusCircle className="h-4 w-4" />
            </motion.div>
            List New Item
          </span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
        </Button>
      </motion.div>

      <AnimatePresence>{isModalOpen && <NewTradeModal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </motion.div>
  )
}

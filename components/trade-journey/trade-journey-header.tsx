"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, History, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function TradeJourneyHeader() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Your Trade Journey</h1>
            <p className="text-muted-foreground">Track your trading history and milestones</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Journey
          </Button>
          <Button className="gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
            <span className="relative z-10 flex items-center gap-2">
              <History className="h-4 w-4" />
              View Stats
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

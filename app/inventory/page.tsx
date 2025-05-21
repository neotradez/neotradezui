"use client"

import Link from "next/link"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryGrid } from "@/components/inventory/inventory-grid"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Plus, HelpCircle } from "lucide-react"

export default function InventoryPage() {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true)

  // Check if this is the first visit (in a real app, this would be stored in a database)
  useEffect(() => {
    const hasVisitedInventory = localStorage.getItem("hasVisitedInventory")
    if (hasVisitedInventory) {
      setShowIntro(false)
    } else {
      setShowIntro(true)
      // In a real app, you'd want to set this only after user dismisses the intro
      // localStorage.setItem("hasVisitedInventory", "true")
    }
  }, [])

  const dismissIntro = () => {
    setShowIntro(false)
    localStorage.setItem("hasVisitedInventory", "true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        {showIntro && (
          <motion.div
            className="mb-8 rounded-xl border border-[#00D084]/30 bg-[#00D084]/5 p-6 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              onClick={dismissIntro}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 bg-[#00D084]/10 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-[#00D084]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Welcome to Your Inventory!</h2>
                <p className="text-muted-foreground mb-4">
                  This is where you'll manage all your items for trading. Your inventory is currently empty, but you can
                  start adding items right away.
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-[#00D084]/20 text-[#00D084] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <p>Add items you want to trade by clicking the "Add Item" button</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-[#00D084]/20 text-[#00D084] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <p>Take multiple photos and provide detailed descriptions to attract more traders</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-[#00D084]/20 text-[#00D084] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <p>List your items on the marketplace to start receiving trade offers</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/inventory/add">
                    <Button className="gap-2 bg-[#00D084] hover:bg-[#00D084]/90">
                      <Plus className="h-4 w-4" />
                      Add Your First Item
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={dismissIntro}>
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <InventoryHeader />
        <InventoryGrid />
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Terms
              </motion.span>
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Privacy
              </motion.span>
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Contact
              </motion.span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

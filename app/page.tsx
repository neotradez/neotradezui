"use client"

import Link from "next/link"
import { RecommendedTrades } from "@/components/recommended-trades"
import { HeroSection } from "@/components/hero-section"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useApp } from "@/context/app-context"

export default function Home() {
  const { isAuthenticated } = useApp()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80"></header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <HeroSection />

        {!isAuthenticated && (
          <section className="my-12">
            <div className="rounded-xl bg-gradient-to-br from-background/80 to-background/40 p-6 shadow-lg backdrop-blur-sm dark:from-[#1a1a1a] dark:to-[#121212]/80 border border-border/40 dark:border-border/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00D084] to-[#3B82F6]">
                    Discover Trades Near You
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Explore items available for trade in your neighborhood. Our interactive map shows you exactly what's
                    available nearby, making it easy to find the perfect trade.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-[#00D084]/10 px-3 py-1 text-sm font-medium text-[#00D084]">
                      <MapPin className="mr-1 h-3 w-3" /> Local Trades
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#3B82F6]/10 px-3 py-1 text-sm font-medium text-[#3B82F6]">
                      No Shipping Required
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#9333EA]/10 px-3 py-1 text-sm font-medium text-[#9333EA]">
                      Meet & Exchange
                    </span>
                  </div>
                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      className="border-[#00D084]/30 hover:border-[#00D084]/60 hover:bg-[#00D084]/5"
                    >
                      Join our community
                    </Button>
                  </Link>
                </div>
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20XJMP2oiLL27f7q8QkpsbqXCFdwd4.png"
                    alt="Interactive map showing trade items near you"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <RecommendedTrades />
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Terms
              </motion.span>
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Privacy
              </motion.span>
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
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

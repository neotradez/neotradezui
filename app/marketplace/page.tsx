"use client"

import { useState } from "react"
import Link from "next/link"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { GoogleAd } from "@/components/ads/google-ad"
import { InterstitialAd } from "@/components/ads/interstitial-ad"
import { motion } from "framer-motion"
import { MarketplaceProvider } from "@/context/marketplace-context"

export default function MarketplacePage() {
  const [showInterstitialAd, setShowInterstitialAd] = useState(true) // Changed back to true
  const [showFilters, setShowFilters] = useState(true)

  const handleAdComplete = () => {
    setShowInterstitialAd(false)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <MarketplaceProvider>
      {showInterstitialAd && <InterstitialAd destination="/marketplace" onComplete={handleAdComplete} />}

      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80"></header>
        <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
          <MarketplaceHeader />

          {/* Banner Ad - This is an ad component */}
          <GoogleAd
            type="banner"
            title="Upgrade Your Trading Experience with NeoTradez Premium"
            description="Get priority access to exclusive trades, enhanced security features, and premium support."
            link="https://neotradez.com/premium"
            linkText="Learn More About Premium"
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div>
              <MarketplaceFilters />

              {/* Sidebar Ad - This is an ad component */}
              <div className="mt-6">
                <GoogleAd
                  type="sidebar"
                  title="Protect Your Trades"
                  description="Trade insurance starting at just $4.99/month. Cover up to $1000 in value."
                  link="https://neotradez.com/insurance"
                  linkText="Get Protected"
                />
              </div>
            </div>

            <div>
              <MarketplaceGrid />
            </div>
          </div>
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
    </MarketplaceProvider>
  )
}

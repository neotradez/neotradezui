"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { TradeDetails } from "@/components/trades/trade-details"
import { motion } from "framer-motion"

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 10,
                  }}
                >
                  <span className="font-bold">NT</span>
                </motion.div>
              </motion.div>
              <motion.span
                className="hidden font-heading text-xl font-bold sm:inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #00D084, #3B82F6, #00D084)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NeoTradez
              </motion.span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <TradeDetails />
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

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { TradeJourneyHeader } from "@/components/trade-journey/trade-journey-header"
import { TradeJourneyTimeline } from "@/components/trade-journey/trade-journey-timeline"
import { TradeJourneyStats } from "@/components/trade-journey/trade-journey-stats"
import { mockUserProfiles } from "@/mock/user-profiles"
import { PageInfoAlert } from "@/components/page-info-alert"

export default function TradeJourneyPage() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUser = async () => {
      setLoading(true)
      try {
        // Find user in mock data or use current user if no ID provided
        const userId = params.id || "current-user"
        const foundUser =
          userId === "current-user"
            ? mockUserProfiles[0] // Assume first user is current user for demo
            : mockUserProfiles.find((u) => u.id.toString() === userId)

        if (foundUser) {
          setUser(foundUser)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
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
          <div className="flex animate-pulse flex-col items-center justify-center py-20">
            <div className="h-8 w-64 rounded-md bg-muted"></div>
            <div className="mt-2 h-4 w-48 rounded-md bg-muted"></div>
            <div className="mt-8 h-64 w-full max-w-3xl rounded-lg bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
      <TradeJourneyHeader />

      <PageInfoAlert
        title="Trade Journey"
        description="Your trade journey shows your trading history, milestones, and progress. See how far you've come and what you've accomplished!"
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <TradeJourneyTimeline user={user} />
        </div>
        <div>
          <TradeJourneyStats user={user} />
        </div>
      </div>
    </div>
  )
}

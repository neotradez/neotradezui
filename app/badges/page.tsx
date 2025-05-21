"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Star,
  ShieldCheck,
  Zap,
  MapPin,
  MessageSquare,
  ThumbsUp,
  Package,
  Sparkles,
  Search,
  Clock,
  TrendingUp,
  Heart,
  Users,
  Repeat,
  CheckCircle,
  Trophy,
} from "lucide-react"

export default function BadgesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const badgeCategories = [
    { id: "all", name: "All Badges" },
    { id: "trading", name: "Trading" },
    { id: "community", name: "Community" },
    { id: "achievement", name: "Achievement" },
    { id: "special", name: "Special" },
  ]

  const badges = [
    {
      id: 1,
      name: "First Trade",
      description: "Complete your first trade",
      category: "trading",
      icon: <Package className="h-6 w-6" />,
      color: "#00D084",
      requirements: "Complete 1 trade",
      progress: 100,
      earned: true,
      earnedDate: "March 15, 2025",
    },
    {
      id: 2,
      name: "Trade Master",
      description: "Complete 10 successful trades",
      category: "trading",
      icon: <Award className="h-6 w-6" />,
      color: "#3B82F6",
      requirements: "Complete 10 trades",
      progress: 70,
      currentProgress: "7/10 trades",
      earned: false,
    },
    {
      id: 3,
      name: "Perfect Rating",
      description: "Maintain a 5-star rating for 5 consecutive trades",
      category: "trading",
      icon: <Star className="h-6 w-6" />,
      color: "#F59E0B",
      requirements: "5 consecutive 5-star ratings",
      progress: 60,
      currentProgress: "3/5 five-star ratings",
      earned: false,
    },
    {
      id: 4,
      name: "Verified Trader",
      description: "Verify your identity and complete profile",
      category: "community",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "#10B981",
      requirements: "Complete profile verification",
      progress: 100,
      earned: true,
      earnedDate: "February 28, 2025",
    },
    {
      id: 5,
      name: "Quick Responder",
      description: "Respond to trade messages within 2 hours (average)",
      category: "community",
      icon: <Zap className="h-6 w-6" />,
      color: "#F43F5E",
      requirements: "Maintain 2-hour response time for 2 weeks",
      progress: 85,
      currentProgress: "Average response time: 2.3 hours",
      earned: false,
    },
    {
      id: 6,
      name: "Local Explorer",
      description: "Complete trades in 5 different neighborhoods",
      category: "achievement",
      icon: <MapPin className="h-6 w-6" />,
      color: "#8B5CF6",
      requirements: "Trade in 5 different neighborhoods",
      progress: 60,
      currentProgress: "3/5 neighborhoods",
      earned: false,
    },
    {
      id: 7,
      name: "Community Helper",
      description: "Help 5 new users with their first trade",
      category: "community",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "#EC4899",
      requirements: "Trade with 5 new users",
      progress: 20,
      currentProgress: "1/5 new users",
      earned: false,
    },
    {
      id: 8,
      name: "Positive Feedback",
      description: "Receive 10 positive reviews",
      category: "community",
      icon: <ThumbsUp className="h-6 w-6" />,
      color: "#06B6D4",
      requirements: "10 positive reviews",
      progress: 40,
      currentProgress: "4/10 positive reviews",
      earned: false,
    },
    {
      id: 9,
      name: "Rare Collector",
      description: "Trade items in the 'Rare' category",
      category: "achievement",
      icon: <Sparkles className="h-6 w-6" />,
      color: "#F59E0B",
      requirements: "Trade 3 rare items",
      progress: 33,
      currentProgress: "1/3 rare items",
      earned: false,
    },
    {
      id: 10,
      name: "Deal Finder",
      description: "Find and trade items with significant value difference",
      category: "achievement",
      icon: <Search className="h-6 w-6" />,
      color: "#3B82F6",
      requirements: "Complete 3 trades with >20% value difference",
      progress: 0,
      currentProgress: "0/3 value difference trades",
      earned: false,
    },
    {
      id: 11,
      name: "Punctual Trader",
      description: "Always arrive on time for meetups",
      category: "trading",
      icon: <Clock className="h-6 w-6" />,
      color: "#10B981",
      requirements: "On-time for 5 consecutive meetups",
      progress: 80,
      currentProgress: "4/5 on-time meetups",
      earned: false,
    },
    {
      id: 12,
      name: "Rising Star",
      description: "Complete 5 trades in your first month",
      category: "achievement",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "#F43F5E",
      requirements: "5 trades in 30 days from signup",
      progress: 100,
      earned: true,
      earnedDate: "March 20, 2025",
    },
    {
      id: 13,
      name: "Favorite Trader",
      description: "Get added to 10 users' favorite traders list",
      category: "community",
      icon: <Heart className="h-6 w-6" />,
      color: "#EC4899",
      requirements: "Added as favorite by 10 users",
      progress: 30,
      currentProgress: "3/10 favorites",
      earned: false,
    },
    {
      id: 14,
      name: "Community Event",
      description: "Participate in a NeoTradez community event",
      category: "special",
      icon: <Users className="h-6 w-6" />,
      color: "#8B5CF6",
      requirements: "Attend 1 community event",
      progress: 0,
      currentProgress: "0/1 events",
      earned: false,
    },
    {
      id: 15,
      name: "Sustainable Trader",
      description: "Complete 10 trades in the 'Upcycled' category",
      category: "special",
      icon: <Repeat className="h-6 w-6" />,
      color: "#10B981",
      requirements: "10 trades with upcycled items",
      progress: 10,
      currentProgress: "1/10 upcycled trades",
      earned: false,
    },
    {
      id: 16,
      name: "Perfect Record",
      description: "Complete 20 trades with no cancellations",
      category: "achievement",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "#3B82F6",
      requirements: "20 trades, 0 cancellations",
      progress: 25,
      currentProgress: "5/20 trades, 0 cancellations",
      earned: false,
    },
    {
      id: 17,
      name: "Platinum Trader",
      description: "Achieve all trading badges",
      category: "special",
      icon: <Trophy className="h-6 w-6" />,
      color: "#9333EA",
      requirements: "Earn all trading category badges",
      progress: 40,
      currentProgress: "2/5 trading badges",
      earned: false,
    },
  ]

  const filteredBadges = activeTab === "all" ? badges : badges.filter((badge) => badge.category === activeTab)

  const earnedBadges = filteredBadges.filter((badge) => badge.earned)
  const inProgressBadges = filteredBadges.filter((badge) => !badge.earned)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="mb-2 font-heading text-3xl font-bold">Badges & Achievements</h1>
          <p className="text-muted-foreground">
            Track your progress and earn badges as you become a trusted trader in the NeoTradez community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
              {badgeCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="min-w-[120px]">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="mb-6 text-2xl font-semibold">Earned Badges ({earnedBadges.length})</h2>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {earnedBadges.map((badge) => (
                <motion.div key={badge.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <div className="text-[#00D084]" style={{ color: badge.color }}>
                            {badge.icon}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="font-medium">{badge.name}</h3>
                            <Badge variant="outline" className="bg-[#00D084]/10 text-[#00D084]">
                              Earned
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{badge.description}</p>
                          <p className="mt-2 text-xs text-muted-foreground">Earned on {badge.earnedDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {inProgressBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-6 text-2xl font-semibold">Badges in Progress ({inProgressBadges.length})</h2>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {inProgressBadges.map((badge) => (
                <motion.div key={badge.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${badge.color}20` }}
                        >
                          <div style={{ color: badge.color }}>{badge.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 font-medium">{badge.name}</h3>
                          <p className="mb-3 text-sm text-muted-foreground">{badge.description}</p>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-2" />
                          <p className="mt-2 text-xs text-muted-foreground">
                            <span className="font-medium">Requirement:</span> {badge.requirements}
                          </p>
                          {badge.currentProgress && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              <span className="font-medium">Current:</span> {badge.currentProgress}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
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

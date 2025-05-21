"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Check, ArrowLeftRight, ThumbsUp, Calendar } from "lucide-react"

export default function SubmitReviewPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock trade data - in a real app, this would be fetched based on the ID
  const trade = {
    id: "trade-123",
    date: "April 25, 2025",
    completed: true,
    trader: {
      id: "user-456",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
    },
    given: {
      title: "Vintage Camera",
      image: "/placeholder.svg?height=120&width=120",
      value: 120,
    },
    received: {
      title: "Mechanical Keyboard",
      image: "/placeholder.svg?height=120&width=120",
      value: 150,
    },
  }

  const handleRatingClick = (value) => {
    setRating(value)
  }

  const handleSubmit = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  const handleBack = () => {
    router.back()
  }

  const handleViewProfile = () => {
    router.push(`/profile/${trade.trader.id}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            {submitted ? "Review Submitted" : "Rate Your Trading Experience"}
          </h1>
        </div>

        {submitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#00D084]/20">
              <Check className="h-10 w-10 text-[#00D084]" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Thank You for Your Review!</h2>
            <p className="mb-8 max-w-md text-muted-foreground">
              Your feedback helps build trust in our community and improves the trading experience for everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={handleViewProfile}>
                View {trade.trader.name}'s Profile
              </Button>
              <Button
                onClick={() => router.push("/my-trades")}
                className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
              >
                <span className="relative z-10">Back to My Trades</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Card className="mb-8 overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium">Trade with {trade.trader.name}</h3>
                        <Badge variant="outline" className="bg-[#00D084]/10 text-[#00D084]">
                          Completed
                        </Badge>
                      </div>

                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{trade.date}</span>
                      </div>

                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.given.image || "/placeholder.svg"}
                              alt={trade.given.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.given.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.given.value}</p>
                          </div>
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                        </div>

                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.received.image || "/placeholder.svg"}
                              alt={trade.received.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.received.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.received.value}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 md:items-end">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={trade.trader.avatar || "/placeholder.svg"}
                          alt={trade.trader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-medium">{trade.trader.name}</h4>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span>{trade.trader.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">How was your experience?</h2>
              <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <motion.button
                      key={value}
                      className="relative"
                      onClick={() => handleRatingClick(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        className={`h-10 w-10 ${
                          value <= (hoverRating || rating)
                            ? "fill-amber-500 text-amber-500"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                <p className="mb-4 text-center text-lg font-medium">
                  {rating === 0
                    ? "Select a rating"
                    : rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Fair"
                        : rating === 3
                          ? "Good"
                          : rating === 4
                            ? "Very Good"
                            : "Excellent"}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Write a review (optional)</h2>
              <Textarea
                placeholder="Share your experience trading with this person. Was the item as described? Was the trader punctual and communicative?"
                className="min-h-[120px] resize-none"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Quick Feedback</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Item was as described",
                  "On time for meetup",
                  "Good communication",
                  "Friendly",
                  "Fair negotiation",
                  "Would trade again",
                ].map((tag) => (
                  <Button key={tag} variant="outline" size="sm" className="gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {tag}
                  </Button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={rating === 0 || loading}
                className={`group relative overflow-hidden ${
                  rating === 0
                    ? "bg-muted text-muted-foreground"
                    : "bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                }`}
              >
                <span className="relative z-10">{loading ? "Submitting..." : "Submit Review"}</span>
                {rating > 0 && (
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                )}
              </Button>
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

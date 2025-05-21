"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Calendar, Check, Clock, MessageSquare, Share2, X, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function TradeDetailsPage({ params }) {
  const router = useRouter()
  const { id } = params
  const [activeTab, setActiveTab] = useState("description")

  // Mock data for the trade details
  const trade = {
    id: id,
    title: "Vintage Camera",
    status: "Pending",
    lastUpdated: "2025-05-16T10:15:00",
    description:
      "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors. Includes original leather case and strap. The mechanics are in excellent working condition with only minor cosmetic wear.",
    category: "Electronics",
    condition: "Good",
    estimatedValue: 120,
    image: "/placeholder.svg?height=400&width=400",
    owner: {
      id: "user-101",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 24,
      memberSince: "2023-01-15",
      location: "Seattle, WA",
    },
    lookingFor: [
      { name: "Mechanical Keyboard", value: "~$150" },
      { name: "Headphones", value: "~$100-200" },
      { name: "Audio Equipment", value: "~$100-300" },
    ],
    stats: {
      views: 42,
      interested: 5,
    },
    history: [
      {
        type: "proposed",
        date: "2025-05-15T14:30:00",
        description: "You proposed a trade with your Mechanical Keyboard.",
      },
      {
        type: "accepted",
        date: "2025-05-16T10:15:00",
        description: "Alex Chen accepted your trade proposal.",
      },
      {
        type: "messages",
        date: "2025-05-16T11:45:00",
        description: "You exchanged 5 messages with Alex Chen.",
      },
      {
        type: "meeting",
        date: "2025-05-20T09:00:00",
        description: "Meeting scheduled for May 20 at Coffee Shop Downtown.",
        upcoming: true,
      },
    ],
    similarItems: [
      {
        id: "similar-1",
        title: "Similar Item #1",
        value: 100,
        condition: "Good",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "similar-2",
        title: "Similar Item #2",
        value: 130,
        condition: "Good",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "similar-3",
        title: "Similar Item #3",
        value: 110,
        condition: "Good",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    reviews: [
      {
        id: "review-1",
        user: {
          id: "user-201",
          name: "Jordan Lee",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "2025-04-28",
        rating: 5,
        text: "Great trader! The item was exactly as described and Alex was very punctual for our meeting. Would definitely trade with again.",
        helpful: 12,
        notHelpful: 1,
      },
      {
        id: "review-2",
        user: {
          id: "user-202",
          name: "Taylor Wong",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "2025-03-15",
        rating: 4,
        text: "Good experience overall. The item had a small scratch that wasn't mentioned in the description, but Alex was honest about it when we met and offered a fair adjustment to the trade.",
        helpful: 8,
        notHelpful: 2,
      },
      {
        id: "review-3",
        user: {
          id: "user-203",
          name: "Casey Rivera",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        date: "2025-01-02",
        rating: 5,
        text: "Excellent trader! Very responsive in messages and flexible with meeting time and location. The item was in perfect condition.",
        helpful: 15,
        notHelpful: 0,
      },
    ],
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleUserClick = (userId) => {
    router.push(`/profile/${userId}`)
  }

  const handleSimilarItemClick = (itemId) => {
    router.push(`/marketplace/${itemId}`)
  }

  const handleReviewUserClick = (userId, event) => {
    event.stopPropagation()
    router.push(`/profile/${userId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        {/* Replace back button with just the title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Trade Details
          </h1>
          <p className="text-muted-foreground mt-1">View and manage this trade</p>
        </div>

        <div className="mb-4 flex items-center">
          <Badge
            className={`
            ${trade.status === "Pending" ? "bg-[#3B82F6]/20 text-[#3B82F6]" : ""}
            ${trade.status === "Completed" ? "bg-[#00D084]/20 text-[#00D084]" : ""}
            ${trade.status === "Cancelled" ? "bg-destructive/20 text-destructive" : ""}
          `}
          >
            {trade.status}
          </Badge>
          <span className="ml-4 text-sm text-muted-foreground">
            Last updated: {new Date(trade.lastUpdated).toLocaleString()}
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <div className="relative aspect-square w-full">
                  <Image src={trade.image || "/placeholder.svg"} alt={trade.title} fill className="object-contain" />
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4 space-y-4">
                  <p className="text-muted-foreground">{trade.description}</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                      <p>{trade.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Condition</h3>
                      <p>{trade.condition}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Estimated Value</h3>
                      <p>${trade.estimatedValue}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{trade.owner.location}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Looking For</h2>
                <div className="space-y-2">
                  {trade.lookingFor.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border border-border/40 bg-background/40 p-3 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                          <ArrowLeftRight className="h-3 w-3" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  The owner is specifically looking for these items, but may consider other offers as well.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Trade History</h2>
                <div className="space-y-4">
                  {trade.history.map((event, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            event.type === "proposed"
                              ? "bg-[#3B82F6]/20"
                              : event.type === "accepted"
                                ? "bg-[#00D084]/20"
                                : event.type === "messages"
                                  ? "bg-purple-500/20"
                                  : event.type === "meeting"
                                    ? "bg-amber-500/20"
                                    : event.type === "completed"
                                      ? "bg-[#00D084]/20"
                                      : "bg-muted"
                          }`}
                        >
                          {event.type === "proposed" && <ArrowLeftRight className="h-4 w-4 text-[#3B82F6]" />}
                          {event.type === "accepted" && <Check className="h-4 w-4 text-[#00D084]" />}
                          {event.type === "messages" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                          {event.type === "meeting" && <Calendar className="h-4 w-4 text-amber-500" />}
                          {event.type === "completed" && <Check className="h-4 w-4 text-[#00D084]" />}
                        </div>
                        {index < trade.history.length - 1 && (
                          <div className="h-full w-0.5 bg-border/60 dark:bg-border/40"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium capitalize">
                            {event.type} {event.upcoming ? "(Upcoming)" : ""}
                          </h3>
                          <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString()}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">User Reviews</h2>
                <div className="space-y-6">
                  {trade.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="space-y-2 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="relative h-8 w-8 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-[#00D084]"
                            onClick={(e) => handleReviewUserClick(review.user.id, e)}
                          >
                            <Image
                              src={review.user.avatar || "/placeholder.svg"}
                              alt={review.user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <span
                                className="cursor-pointer hover:text-[#00D084]"
                                onClick={(e) => handleReviewUserClick(review.user.id, e)}
                              >
                                {review.user.name}
                              </span>
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-amber-500" : "fill-muted stroke-muted"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.text}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Helpful ({review.helpful})</span>
                        <span>Not helpful ({review.notHelpful})</span>
                        <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs">
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Reviews
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <div className="flex items-center gap-4">
                  <div
                    className="relative h-12 w-12 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-[#00D084]"
                    onClick={() => handleUserClick(trade.owner.id)}
                  >
                    <Image
                      src={trade.owner.avatar || "/placeholder.svg"}
                      alt={trade.owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-medium cursor-pointer hover:text-[#00D084]"
                      onClick={() => handleUserClick(trade.owner.id)}
                    >
                      {trade.owner.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ★ {trade.owner.rating} • {trade.owner.trades} trades
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Member since {new Date(trade.owner.memberSince).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{trade.owner.location}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    className="w-full bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                    onClick={() => router.push(`/marketplace/propose-trade/${trade.owner.id}?itemId=${trade.id}`)}
                  >
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Propose Trade
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Store the user we want to message in session storage
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem(
                          "messageUser",
                          JSON.stringify({
                            id: trade.owner.id,
                            name: trade.owner.name,
                            avatar: trade.owner.avatar,
                          }),
                        )
                      }
                      router.push(`/messages?user=${trade.owner.id}`)
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <h3 className="mb-4 font-medium">Trade Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-[#00D084]">{trade.stats.views}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-[#3B82F6]">{trade.stats.interested}</p>
                    <p className="text-xs text-muted-foreground">Interested</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <h3 className="mb-4 font-medium">Similar Items</h3>
                <div className="space-y-3">
                  {trade.similarItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted/50"
                      onClick={() => handleSimilarItemClick(item.id)}
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          ${item.value} • {item.condition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-between"
            >
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Report
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

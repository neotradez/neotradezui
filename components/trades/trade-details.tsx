"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeftRight,
  Calendar,
  MessageSquare,
  Share,
  Flag,
  Save,
  Star,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react"
import { TradeProposalModal } from "@/components/trades/trade-proposal-modal"

export function TradeDetails() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false)

  // Sample trade data
  const trade = {
    id: 1,
    title: "Vintage Camera",
    status: "pending",
    lastUpdated: "May 19, 2025 at 10:15 AM",
    description:
      "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors. Includes original leather case and strap. The mechanics are in excellent working condition with only minor cosmetic wear.",
    category: "Electronics",
    condition: "Good",
    image: "/placeholder.svg?height=400&width=400",
    owner: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 24,
      memberSince: "Jan 2023",
      location: "Seattle, WA",
    },
    lookingFor: ["Mechanical Keyboard", "Headphones", "Audio Equipment"],
    stats: {
      views: 42,
      interested: 5,
    },
    similarItems: [
      { id: 1, title: "Similar Item #1", price: 100, condition: "Good", image: "/placeholder.svg?height=80&width=80" },
      { id: 2, title: "Similar Item #2", price: 100, condition: "Good", image: "/placeholder.svg?height=80&width=80" },
      { id: 3, title: "Similar Item #3", price: 100, condition: "Good", image: "/placeholder.svg?height=80&width=80" },
    ],
    tradeHistory: [
      {
        id: 1,
        type: "proposed",
        date: "May 15, 2025 at 2:30 PM",
        description: "You proposed a trade with your Mechanical Keyboard.",
      },
      {
        id: 2,
        type: "accepted",
        date: "May 18, 2025 at 10:15 AM",
        description: "Alex Chen accepted your trade proposal.",
      },
      {
        id: 3,
        type: "messages",
        date: "May 18, 2025 at 11:45 AM",
        description: "You exchanged 5 messages with Alex Chen.",
      },
      {
        id: 4,
        type: "meeting",
        date: "May 19, 2025 at 9:00 AM",
        description: "Meeting scheduled for May 20 at Coffee Shop Downtown.",
      },
      {
        id: 5,
        type: "completed",
        date: "May 20, 2025 at 3:15 PM",
        description: "Trade was successfully completed.",
      },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "Jordan Lee",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "July 24, 2025",
        },
        rating: 5,
        comment:
          "Great trader! The item was exactly as described and Alex was very punctual for our meeting. Would definitely trade with again.",
      },
      {
        id: 2,
        user: {
          name: "Taylor Wong",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "March 15, 2025",
        },
        rating: 4,
        comment:
          "Good experience overall. The item had a small scratch that wasn't mentioned in the description, but Alex was honest about it when we met and offered a fair adjustment to the trade.",
      },
      {
        id: 3,
        user: {
          name: "Casey Rivera",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "February 2, 2025",
        },
        rating: 5,
        comment:
          "Excellent trader! Very responsive in messages and flexible with meeting time and location. The item was in perfect condition.",
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 text-sm text-muted-foreground"
          onClick={() => window.history.back()}
        >
          <span>←</span> Back
        </motion.button>
        <h1 className="font-heading text-3xl font-bold">{trade.title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
          Pending
        </Badge>
        <span className="text-sm text-muted-foreground">Last updated: {trade.lastUpdated}</span>
        <span className="text-sm text-muted-foreground">Waiting for the owner to respond to your trade proposal.</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-8">
          {/* Main image */}
          <div className="overflow-hidden rounded-lg border border-border/40 bg-background/40 dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <div className="relative aspect-square w-full">
              <Image src={trade.image || "/placeholder.svg"} alt={trade.title} fill className="object-contain p-4" />
            </div>
          </div>

          {/* Category and actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                {trade.category}
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                {trade.condition} Condition
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Flag className="h-4 w-4" />
                Report
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Description */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b border-border/40 bg-transparent p-0 dark:border-border/20">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00D084] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00D084] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <p className="text-muted-foreground">{trade.description}</p>
              </TabsContent>
              <TabsContent value="details" className="p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Condition</h3>
                      <p className="text-sm text-muted-foreground">{trade.condition}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Category</h3>
                      <p className="text-sm text-muted-foreground">{trade.category}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Looking For */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Looking For</h2>
              <div className="space-y-2">
                {trade.lookingFor.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border/40 p-3 dark:border-border/20"
                  >
                    <span>{item}</span>
                    <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                  </div>
                ))}
                <p className="mt-4 text-sm text-muted-foreground">
                  The owner is specifically looking for these items, but may consider other offers as well.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trade History */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Trade History</h2>
              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:content-['']">
                {trade.tradeHistory.map((event) => (
                  <div key={event.id} className="relative pl-10">
                    <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background dark:border-border/20 dark:bg-[#1a1a1a]">
                      {event.type === "proposed" && <ArrowLeftRight className="h-5 w-5 text-[#00D084]" />}
                      {event.type === "accepted" && <CheckCircle className="h-5 w-5 text-[#00D084]" />}
                      {event.type === "messages" && <MessageSquare className="h-5 w-5 text-[#3B82F6]" />}
                      {event.type === "meeting" && <Calendar className="h-5 w-5 text-amber-500" />}
                      {event.type === "completed" && <CheckCircle className="h-5 w-5 text-[#00D084]" />}
                    </span>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Reviews */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">User Reviews</h2>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4.8 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-amber-500">4.8</span>
                  <span className="text-sm text-muted-foreground">({trade.reviews.length} reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {trade.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-border/40 p-4 dark:border-border/20">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={review.user.avatar || "/placeholder.svg"}
                            alt={review.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{review.user.name}</div>
                          <div className="text-xs text-muted-foreground">{review.user.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <span>👍</span> Helpful (22)
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <span>👎</span> Not helpful (1)
                      </button>
                      <button className="ml-auto text-xs text-muted-foreground hover:text-foreground">Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Owner info */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={trade.owner.avatar || "/placeholder.svg"}
                    alt={trade.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">{trade.owner.name}</h3>
                <div className="mb-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium">{trade.owner.rating}</span>
                  <span className="text-sm text-muted-foreground">• {trade.owner.trades} trades</span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Member since {trade.owner.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{trade.owner.location}</span>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-2">
                  <Button
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                    onClick={() => setIsProposalModalOpen(true)}
                  >
                    <span className="relative z-10">Propose Trade</span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trade stats */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <h3 className="mb-3 font-medium">Trade Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-lg border border-border/40 p-3 dark:border-border/20">
                  <span className="text-2xl font-bold text-[#00D084]">{trade.stats.views}</span>
                  <span className="text-sm text-muted-foreground">Views</span>
                </div>
                <div className="flex flex-col items-center rounded-lg border border-border/40 p-3 dark:border-border/20">
                  <span className="text-2xl font-bold text-[#3B82F6]">{trade.stats.interested}</span>
                  <span className="text-sm text-muted-foreground">Interested</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar items */}
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4">
              <h3 className="mb-3 font-medium">Similar Items</h3>
              <div className="space-y-3">
                {trade.similarItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-border/40 p-2 dark:border-border/20"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          ${item.price} • {item.condition} condition
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isProposalModalOpen && <TradeProposalModal trade={trade} onClose={() => setIsProposalModalOpen(false)} />}
    </div>
  )
}

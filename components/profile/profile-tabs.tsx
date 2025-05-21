"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftRight,
  Star,
  MessageSquare,
  Calendar,
  Package,
  ThumbsUp,
  User,
  Clock,
  CalendarClock,
  MapPin,
  CheckCircle,
} from "lucide-react"

export default function ProfileTabs({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("trades")

  // Sample data
  const completedTrades = [
    {
      id: 1,
      title: "Vintage Camera for Mechanical Keyboard",
      date: "March 10, 2025",
      with: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      given: {
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100",
        value: 120,
      },
      received: {
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100",
        value: 150,
      },
      rating: 5,
      review: "Great trader, smooth transaction!",
    },
    {
      id: 2,
      title: "Drone for Mountain Bike",
      date: "February 15, 2025",
      with: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      given: {
        title: "Drone",
        image: "/placeholder.svg?height=100&width=100",
        value: 300,
      },
      received: {
        title: "Mountain Bike",
        image: "/placeholder.svg?height=100&width=100",
        value: 350,
      },
      rating: 4,
      review: "Good trade, item was as described.",
    },
  ]

  const listedItems = [
    {
      id: 1,
      title: "Leather Jacket",
      description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
      category: "Clothing",
      condition: "Excellent",
      estimatedValue: 200,
      image: "/placeholder.svg?height=300&width=300",
      dateAdded: "March 5, 2025",
      views: 45,
      offers: 2,
    },
    {
      id: 2,
      title: "Wireless Headphones",
      description: "Premium wireless headphones with noise cancellation. Great sound quality and battery life.",
      category: "Electronics",
      condition: "Like New",
      estimatedValue: 180,
      image: "/placeholder.svg?height=300&width=300",
      dateAdded: "March 1, 2025",
      views: 78,
      offers: 5,
    },
    {
      id: 3,
      title: "Camping Tent",
      description: "4-person camping tent, waterproof and easy to set up. Used only twice.",
      category: "Outdoors",
      condition: "Good",
      estimatedValue: 150,
      image: "/placeholder.svg?height=300&width=300",
      dateAdded: "February 20, 2025",
      views: 32,
      offers: 1,
    },
  ]

  const reviews = [
    {
      id: 1,
      user: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "March 10, 2025",
      text: "Alex was a pleasure to trade with. The item was exactly as described and the exchange was smooth. Would definitely trade with again!",
      trade: "Vintage Camera for Mechanical Keyboard",
    },
    {
      id: 2,
      user: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "February 15, 2025",
      text: "Good trader, communicated well and was on time for the meetup. The drone was in great condition as promised.",
      trade: "Drone for Mountain Bike",
    },
    {
      id: 3,
      user: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "January 22, 2025",
      text: "Excellent trader! Very responsive and the item was even better than the photos showed. Highly recommend!",
      trade: "Fitness Watch for Bluetooth Speaker",
    },
  ]

  // Sample meetings data
  const meetings = [
    {
      id: 1,
      title: "Trade Vintage Camera for Mechanical Keyboard",
      date: "March 15, 2025",
      time: "2:00 PM",
      location: "Central Park, near the fountain",
      with: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "upcoming",
      items: [
        {
          title: "Vintage Camera",
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          title: "Mechanical Keyboard",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    {
      id: 2,
      title: "Trade Headphones for Bluetooth Speaker",
      date: "March 20, 2025",
      time: "4:30 PM",
      location: "Coffee Shop on Main St",
      with: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "upcoming",
      items: [
        {
          title: "Wireless Headphones",
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          title: "Bluetooth Speaker",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    {
      id: 3,
      title: "Trade Drone for Mountain Bike",
      date: "February 15, 2025",
      time: "10:00 AM",
      location: "City Park",
      with: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      status: "completed",
      items: [
        {
          title: "Drone",
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          title: "Mountain Bike",
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
  ]

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
    <Tabs defaultValue="trades" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
          <TabsTrigger value="trades" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              Completed Trades
            </span>
          </TabsTrigger>
          <TabsTrigger value="items" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Listed Items
            </span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </span>
          </TabsTrigger>
          <TabsTrigger value="meetings" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Meetings
            </span>
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="trades" className="mt-0">
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {completedTrades.map((trade) => (
                <motion.div
                  key={trade.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">{trade.title}</h3>
                            <Badge variant="outline" className="bg-[#00D084]/10 text-[#00D084]">
                              Completed
                            </Badge>
                          </div>

                          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{trade.date}</span>
                            <span className="mx-1">•</span>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>Traded with {trade.with.name}</span>
                            </div>
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
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < trade.rating ? "fill-amber-500" : "fill-muted stroke-muted"}`}
                                />
                              ))}
                          </div>
                          <p className="text-sm text-muted-foreground">"{trade.review}"</p>
                          <Button variant="outline" size="sm" className="mt-2 gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            Contact Trader
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="items" className="mt-0">
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {listedItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 25px rgba(0, 208, 132, 0.2)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-0">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3 backdrop-blur-sm dark:from-[#121212]/80">
                          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                          <div className="text-sm font-medium text-muted-foreground">~${item.estimatedValue}</div>
                        </div>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Badge variant="secondary" className="bg-muted/50">
                              {item.condition}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.dateAdded}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{item.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{item.offers} offers</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                            <ArrowLeftRight className="h-3 w-3" />
                            View Offers
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex items-start gap-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={review.user.avatar || "/placeholder.svg"}
                              alt={review.user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{review.user.name}</h3>
                              <span className="text-xs text-muted-foreground">• {review.date}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-amber-500">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < review.rating ? "fill-amber-500" : "fill-muted stroke-muted"}`}
                                  />
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm">{review.text}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                              <ArrowLeftRight className="mr-1 h-3 w-3 text-[#00D084]" />
                              {review.trade}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="meetings" className="mt-0">
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {meetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">{meeting.title}</h3>
                            <Badge
                              variant="outline"
                              className={
                                meeting.status === "upcoming"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-[#00D084]/10 text-[#00D084]"
                              }
                            >
                              {meeting.status === "upcoming" ? "Upcoming" : "Completed"}
                            </Badge>
                          </div>

                          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {meeting.date}, {meeting.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{meeting.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>Meeting with {meeting.with.name}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            {meeting.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 rounded-lg border p-2">
                                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-sm">{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {meeting.status === "upcoming" ? (
                            <>
                              <Button size="sm" className="gap-1">
                                <MessageSquare className="h-3.5 w-3.5" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm" className="gap-1">
                              <CheckCircle className="h-3.5 w-3.5 text-[#00D084]" />
                              Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Calendar, Star, MessageSquare, Award, History } from "lucide-react"
import { useState } from "react"

export function TradeJourneyTimeline() {
  const [activeTab, setActiveTab] = useState("all")

  // Sample trade history data
  const tradeHistory = [
    {
      id: 1,
      date: "March 10, 2025",
      title: "Vintage Camera for Mechanical Keyboard",
      type: "exchange",
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
      milestone: false,
    },
    {
      id: 2,
      date: "February 15, 2025",
      title: "Drone for Mountain Bike",
      type: "exchange",
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
      milestone: false,
    },
    {
      id: 3,
      date: "January 22, 2025",
      title: "Reached Expert Trader Status",
      type: "milestone",
      description: "Completed 25 successful trades with an average rating of 4.8 stars.",
      icon: Award,
      color: "#8B5CF6",
      milestone: true,
    },
    {
      id: 4,
      date: "January 5, 2025",
      title: "Fitness Watch for Bluetooth Speaker",
      type: "exchange",
      with: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      given: {
        title: "Fitness Watch",
        image: "/placeholder.svg?height=100&width=100",
        value: 180,
      },
      received: {
        title: "Bluetooth Speaker",
        image: "/placeholder.svg?height=100&width=100",
        value: 160,
      },
      rating: 5,
      review: "Excellent trader! Very responsive and the item was even better than the photos showed.",
      milestone: false,
    },
  ]

  const milestones = tradeHistory.filter((item) => item.milestone)
  const exchanges = tradeHistory.filter((item) => item.type === "exchange")

  const getFilteredHistory = () => {
    switch (activeTab) {
      case "milestones":
        return milestones
      case "exchanges":
        return exchanges
      default:
        return tradeHistory
    }
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
    <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="h-5 w-5 text-[#3B82F6]" />
          <span>Your Trading Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <TabsList className="mb-6 w-full justify-start overflow-auto sm:w-auto">
              <TabsTrigger value="all" className="min-w-[100px]">
                All Activity
              </TabsTrigger>
              <TabsTrigger value="exchanges" className="min-w-[100px]">
                Exchanges
              </TabsTrigger>
              <TabsTrigger value="milestones" className="min-w-[100px]">
                Milestones
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:content-[''] md:before:ml-9"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {getFilteredHistory().map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} className="relative pl-8 md:pl-12">
                  <span className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background dark:border-border/20 dark:bg-[#1a1a1a]">
                    {item.type === "milestone" ? (
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    ) : (
                      <ArrowLeftRight className="h-5 w-5 text-[#00D084]" />
                    )}
                  </span>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                        <Calendar className="mr-1 h-3 w-3" />
                        {item.date}
                      </Badge>
                      {item.milestone && <Badge className="bg-[#8B5CF6]/20 text-[#8B5CF6]">Milestone</Badge>}
                    </div>

                    <h3 className="text-lg font-medium">{item.title}</h3>

                    {item.type === "milestone" ? (
                      <div className="rounded-lg border border-border/40 bg-background/60 p-4 dark:border-border/20 dark:bg-[#1a1a1a]/60">
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-border/40 bg-background/60 p-4 dark:border-border/20 dark:bg-[#1a1a1a]/60">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="relative h-6 w-6 overflow-hidden rounded-full">
                            <Image
                              src={item.with.avatar || "/placeholder.svg"}
                              alt={item.with.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm">Traded with {item.with.name}</span>
                          <div className="ml-auto flex items-center gap-1 text-amber-500">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < item.rating ? "fill-amber-500" : "fill-muted stroke-muted"}`}
                                />
                              ))}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/80 p-3 dark:border-border/20 dark:bg-[#121212]/80 sm:w-auto sm:min-w-[150px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={item.given.image || "/placeholder.svg"}
                                alt={item.given.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{item.given.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${item.given.value}</p>
                            </div>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                          </div>

                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/80 p-3 dark:border-border/20 dark:bg-[#121212]/80 sm:w-auto sm:min-w-[150px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={item.received.image || "/placeholder.svg"}
                                alt={item.received.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{item.received.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${item.received.value}</p>
                            </div>
                          </div>
                        </div>

                        {item.review && (
                          <div className="mt-3 border-t border-border/40 pt-3 dark:border-border/20">
                            <p className="text-sm italic text-muted-foreground">"{item.review}"</p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.type === "exchange" && (
                      <Button variant="outline" size="sm" className="ml-auto w-auto gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Contact Trader
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

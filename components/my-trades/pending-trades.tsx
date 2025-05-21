"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Check, Clock, MessageSquare, X, CheckCircle } from "lucide-react"

export function PendingTrades() {
  const router = useRouter()

  const incomingTrades = [
    {
      id: "inc-1",
      title: "Leather Jacket Trade",
      date: "2025-05-16T08:20:00",
      from: {
        id: "user-103",
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      offering: {
        id: "item-301",
        title: "Winter Coat",
        image: "/placeholder.svg?height=100&width=100",
        value: 180,
      },
      requesting: {
        id: "item-204",
        title: "Leather Jacket",
        image: "/placeholder.svg?height=100&width=100",
        value: 200,
      },
      lastUpdated: "2025-05-16T08:20:00",
    },
    {
      id: "inc-2",
      title: "Mountain Bike Trade",
      date: "2025-05-15T16:45:00",
      from: {
        id: "user-104",
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      offering: {
        id: "item-302",
        title: "Camping Gear Set",
        image: "/placeholder.svg?height=100&width=100",
        value: 320,
      },
      requesting: {
        id: "item-205",
        title: "Mountain Bike",
        image: "/placeholder.svg?height=100&width=100",
        value: 350,
      },
      lastUpdated: "2025-05-15T16:45:00",
    },
  ]

  const outgoingTrades = []

  const handleTradeClick = (tradeId) => {
    router.push(`/my-trades/${tradeId}`)
  }

  const handleUserClick = (userId, event) => {
    event.stopPropagation()
    router.push(`/profile/${userId}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="incoming" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Incoming
              <Badge variant="secondary" className="ml-1 bg-[#00D084]/20 text-[#00D084]">
                {incomingTrades.length}
              </Badge>
            </span>
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Outgoing
              <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
                {outgoingTrades.length}
              </Badge>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="mt-0 space-y-4">
          {incomingTrades.length > 0 ? (
            incomingTrades.map((trade, index) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleTradeClick(trade.id)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="relative h-8 w-8 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-[#00D084]"
                            onClick={(e) => handleUserClick(trade.from.id, e)}
                          >
                            <Image
                              src={trade.from.avatar || "/placeholder.svg"}
                              alt={trade.from.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <span
                                className="cursor-pointer hover:text-[#00D084]"
                                onClick={(e) => handleUserClick(trade.from.id, e)}
                              >
                                {trade.from.name}
                              </span>
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              <Clock className="mr-1 inline-block h-3 w-3" />
                              Requested {new Date(trade.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={trade.offering.image || "/placeholder.svg"}
                                alt={trade.offering.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{trade.offering.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${trade.offering.value}</p>
                            </div>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                          </div>

                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={trade.requesting.image || "/placeholder.svg"}
                                alt={trade.requesting.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{trade.requesting.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${trade.requesting.value}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row gap-2 sm:flex-col md:flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/messages/${trade.from.id}`)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Message
                        </Button>
                        <div className="flex flex-1 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1 border-destructive/30 bg-background/50 text-destructive backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive dark:border-destructive/20 dark:bg-background/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Decline trade logic would go here
                            }}
                          >
                            <X className="h-4 w-4" />
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-1 bg-[#00D084] text-white hover:bg-[#00D084]/90"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Accept trade logic would go here
                            }}
                          >
                            <Check className="h-4 w-4" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
              <div className="mb-4 rounded-full bg-muted/50 p-3">
                <CheckCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No incoming trade requests</h3>
              <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
                You don't have any incoming trade requests at the moment. When someone wants to trade with you, it will
                appear here.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="mt-0 space-y-4">
          {outgoingTrades.length > 0 ? (
            outgoingTrades.map((trade, index) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleTradeClick(trade.id)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="relative h-8 w-8 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-[#00D084]"
                            onClick={(e) => handleUserClick(trade.to.id, e)}
                          >
                            <Image
                              src={trade.to.avatar || "/placeholder.svg"}
                              alt={trade.to.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              To:{" "}
                              <span
                                className="cursor-pointer hover:text-[#00D084]"
                                onClick={(e) => handleUserClick(trade.to.id, e)}
                              >
                                {trade.to.name}
                              </span>
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              <Clock className="mr-1 inline-block h-3 w-3" />
                              Sent {new Date(trade.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={trade.offering.image || "/placeholder.svg"}
                                alt={trade.offering.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{trade.offering.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${trade.offering.value}</p>
                            </div>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <ArrowLeftRight className="h-4 w-4 text-[#3B82F6]" />
                          </div>

                          <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={trade.requesting.image || "/placeholder.svg"}
                                alt={trade.requesting.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{trade.requesting.title}</p>
                              <p className="text-xs text-muted-foreground">Value: ${trade.requesting.value}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/messages/${trade.to.id}`)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Message
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 border-destructive/30 bg-background/50 text-destructive backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive dark:border-destructive/20 dark:bg-background/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Cancel trade logic would go here
                          }}
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
              <div className="mb-4 rounded-full bg-muted/50 p-3">
                <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No outgoing trade requests</h3>
              <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
                You haven't sent any trade requests yet. Browse items and propose trades to get started.
              </p>
              <Button
                variant="outline"
                className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                onClick={() => router.push("/marketplace")}
              >
                Explore Trades
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

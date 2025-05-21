"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Calendar, MessageSquare, X } from "lucide-react"

export function ProposedTrades() {
  const router = useRouter()

  const proposedTrades = [
    {
      id: "prop-1",
      title: "Vintage Camera Trade",
      date: "2025-05-15T14:30:00",
      status: "Pending",
      to: {
        id: "user-101",
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      offering: {
        id: "item-201",
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100",
        value: 150,
      },
      requesting: {
        id: "item-101",
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100",
        value: 120,
      },
      lastUpdated: "2025-05-16T10:15:00",
    },
    {
      id: "prop-2",
      title: "Gaming Console Trade",
      date: "2025-05-14T09:45:00",
      status: "Pending",
      to: {
        id: "user-102",
        name: "Pat Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      offering: {
        id: "item-202",
        title: "Gaming Monitor",
        image: "/placeholder.svg?height=100&width=100",
        value: 300,
      },
      requesting: {
        id: "item-102",
        title: "Gaming Console",
        image: "/placeholder.svg?height=100&width=100",
        value: 450,
      },
      lastUpdated: "2025-05-14T16:20:00",
    },
    {
      id: "prop-3",
      title: "Acoustic Guitar Trade",
      date: "2025-05-13T11:15:00",
      status: "Pending",
      to: {
        id: "user-103",
        name: "Chris Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      offering: {
        id: "item-203",
        title: "Electric Guitar",
        image: "/placeholder.svg?height=100&width=100",
        value: 450,
      },
      requesting: {
        id: "item-103",
        title: "Acoustic Guitar",
        image: "/placeholder.svg?height=100&width=100",
        value: 400,
      },
      lastUpdated: "2025-05-13T18:45:00",
    },
  ]

  const handleTradeClick = (tradeId) => {
    router.push(`/my-trades/${tradeId}`)
  }

  const handleUserClick = (userId, event) => {
    event.stopPropagation()
    router.push(`/profile/${userId}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      {proposedTrades.length > 0 ? (
        proposedTrades.map((trade, index) => (
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
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                            <Calendar className="mr-1 inline-block h-3 w-3" />
                            Sent {new Date(trade.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-[#3B82F6]/20 text-[#3B82F6]">{trade.status}</Badge>
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

                    <div className="mt-4 text-xs text-muted-foreground">
                      <p>Last updated: {new Date(trade.lastUpdated).toLocaleString()}</p>
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
          <h3 className="mb-2 text-lg font-medium">No proposed trades</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            You haven't proposed any trades yet. Browse the marketplace to find items you're interested in.
          </p>
          <Button
            variant="outline"
            className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
            onClick={() => router.push("/marketplace")}
          >
            Browse Marketplace
          </Button>
        </div>
      )}
    </motion.div>
  )
}

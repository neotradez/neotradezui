"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Calendar, MessageSquare, Star } from "lucide-react"

export function CompletedTrades() {
  const router = useRouter()

  const completedTrades = [
    {
      id: "comp-1",
      title: "Vintage Vinyl Records Trade",
      date: "2025-05-10T14:30:00",
      withUser: {
        id: "user-105",
        name: "Jamie Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      given: {
        id: "item-206",
        title: "Audio Receiver",
        image: "/placeholder.svg?height=100&width=100",
        value: 200,
      },
      received: {
        id: "item-105",
        title: "Vintage Vinyl Records",
        image: "/placeholder.svg?height=100&width=100",
        value: 180,
      },
      rating: 5,
      completedDate: "2025-05-10T14:30:00",
    },
    {
      id: "comp-2",
      title: "Smartphone Trade",
      date: "2025-05-05T11:15:00",
      withUser: {
        id: "user-106",
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      given: {
        id: "item-207",
        title: "Tablet",
        image: "/placeholder.svg?height=100&width=100",
        value: 350,
      },
      received: {
        id: "item-106",
        title: "Smartphone",
        image: "/placeholder.svg?height=100&width=100",
        value: 400,
      },
      rating: 4,
      completedDate: "2025-05-05T11:15:00",
    },
    {
      id: "comp-3",
      title: "Camping Tent Trade",
      date: "2025-04-28T09:45:00",
      withUser: {
        id: "user-107",
        name: "Robin Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      given: {
        id: "item-208",
        title: "Hiking Boots",
        image: "/placeholder.svg?height=100&width=100",
        value: 120,
      },
      received: {
        id: "item-107",
        title: "Camping Tent",
        image: "/placeholder.svg?height=100&width=100",
        value: 150,
      },
      rating: 5,
      completedDate: "2025-04-28T09:45:00",
    },
    {
      id: "comp-4",
      title: "Gaming Monitor Trade",
      date: "2025-04-20T15:30:00",
      withUser: {
        id: "user-108",
        name: "Pat Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      given: {
        id: "item-209",
        title: "Gaming Laptop",
        image: "/placeholder.svg?height=100&width=100",
        value: 900,
      },
      received: {
        id: "item-108",
        title: "Gaming Monitor",
        image: "/placeholder.svg?height=100&width=100",
        value: 450,
      },
      rating: 4,
      completedDate: "2025-04-20T15:30:00",
    },
    {
      id: "comp-5",
      title: "Electric Guitar Trade",
      date: "2025-04-15T13:00:00",
      withUser: {
        id: "user-109",
        name: "Chris Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      given: {
        id: "item-210",
        title: "Audio Interface",
        image: "/placeholder.svg?height=100&width=100",
        value: 200,
      },
      received: {
        id: "item-109",
        title: "Electric Guitar",
        image: "/placeholder.svg?height=100&width=100",
        value: 450,
      },
      rating: 5,
      completedDate: "2025-04-15T13:00:00",
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
      {completedTrades.length > 0 ? (
        completedTrades.map((trade, index) => (
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
                          onClick={(e) => handleUserClick(trade.withUser.id, e)}
                        >
                          <Image
                            src={trade.withUser.avatar || "/placeholder.svg"}
                            alt={trade.withUser.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <span
                              className="cursor-pointer hover:text-[#00D084]"
                              onClick={(e) => handleUserClick(trade.withUser.id, e)}
                            >
                              {trade.withUser.name}
                            </span>
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            <Calendar className="mr-1 inline-block h-3 w-3" />
                            Completed {new Date(trade.completedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-[#00D084]/20 text-[#00D084]">Completed</Badge>
                    </div>

                    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
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

                  <div className="flex flex-col gap-2">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/messages/${trade.withUser.id}`)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Message
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
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No completed trades</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            You haven't completed any trades yet. Once you complete a trade, it will appear here.
          </p>
        </div>
      )}
    </motion.div>
  )
}

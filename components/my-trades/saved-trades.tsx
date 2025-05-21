"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Bookmark, MapPin, MessageSquare } from "lucide-react"

export function SavedTrades() {
  const router = useRouter()

  const savedTrades = [
    {
      id: "saved-1",
      title: "Professional DSLR Camera",
      description:
        "Professional-grade DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.",
      category: "Electronics",
      condition: "Like New",
      estimatedValue: 800,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: "user-106",
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      location: "New York, NY",
      lookingFor: ["Laptop", "Tablet", "Smart Home Devices"],
      savedDate: "2025-05-16T09:15:00",
    },
    {
      id: "saved-2",
      title: "Acoustic Guitar",
      description: "Beautiful acoustic guitar with solid spruce top. Rich, warm tone and excellent playability.",
      category: "Music",
      condition: "Excellent",
      estimatedValue: 400,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: "user-107",
        name: "Chris Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      location: "Nashville, TN",
      lookingFor: ["Electric Guitar", "Audio Equipment", "Headphones"],
      savedDate: "2025-05-15T14:30:00",
    },
  ]

  const handleTradeClick = (tradeId) => {
    router.push(`/marketplace/${tradeId}`)
  }

  const handleUserClick = (userId, event) => {
    event.stopPropagation()
    router.push(`/profile/${userId}`)
  }

  const handleMessageClick = (userId, event) => {
    event.stopPropagation()
    router.push(`/messages/${userId}`)
  }

  const handleUnsaveClick = (tradeId, event) => {
    event.stopPropagation()
    // Unsave trade logic would go here
    console.log(`Unsave trade ${tradeId}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {savedTrades.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedTrades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleTradeClick(trade.id)}
              className="cursor-pointer"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={trade.image || "/placeholder.svg"}
                        alt={trade.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute right-3 top-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUnsaveClick(trade.id, e)
                        }}
                      >
                        <Bookmark className="h-4 w-4 fill-[#00D084]" />
                      </Button>
                    </div>
                    <Badge className="absolute left-3 top-3 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">
                      {trade.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">{trade.title}</h3>
                      <div className="text-sm font-medium text-muted-foreground">~${trade.estimatedValue}</div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{trade.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div
                        className="relative h-6 w-6 overflow-hidden rounded-full cursor-pointer hover:ring-2 hover:ring-[#00D084]"
                        onClick={(e) => handleUserClick(trade.owner.id, e)}
                      >
                        <Image
                          src={trade.owner.avatar || "/placeholder.svg"}
                          alt={trade.owner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span
                        className="cursor-pointer hover:text-[#00D084]"
                        onClick={(e) => handleUserClick(trade.owner.id, e)}
                      >
                        {trade.owner.name}
                      </span>
                      <span className="ml-auto flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {trade.location}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                        <span className="text-xs font-medium">
                          Looking for: {trade.lookingFor[0]}
                          {trade.lookingFor.length > 1 ? "..." : ""}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMessageClick(trade.owner.id, e)
                        }}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <Bookmark className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No saved trades</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            You haven't saved any trades yet. Browse the marketplace and save items you're interested in.
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

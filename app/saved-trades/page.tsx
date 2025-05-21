"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TradeCard } from "@/components/trade-card"
import { Heart, Search, SlidersHorizontal, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/lib/routes"
import { motion } from "framer-motion"

export default function SavedTradesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock saved trades data
  const savedTrades = [
    {
      id: "trade1",
      title: "Vintage Camera Collection",
      description: "A collection of vintage cameras from the 1950s-1970s in excellent condition.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      location: "Brooklyn, NY",
      owner: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      lookingFor: ["Film Equipment", "Audio Gear", "Vintage Electronics"],
    },
    {
      id: "trade2",
      title: "Mountain Bike - Trek Fuel EX 8",
      description: "Trek Fuel EX 8 mountain bike, size large. Great condition with recent tune-up.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Sports",
      location: "Denver, CO",
      owner: {
        id: "user2",
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      lookingFor: ["Road Bike", "Camping Gear", "Kayak"],
    },
    {
      id: "trade3",
      title: "Leather Jacket - Vintage Motorcycle Style",
      description: "Genuine leather motorcycle jacket, size medium. Classic style, broken in perfectly.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      location: "Austin, TX",
      owner: {
        id: "user3",
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      lookingFor: ["Winter Coat", "Boots (Size 10)", "Denim Jacket"],
    },
    {
      id: "trade4",
      title: "Gaming Console Bundle",
      description: "PlayStation 5 with extra controller and 5 games. All in excellent condition.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Gaming",
      location: "Seattle, WA",
      owner: {
        id: "user4",
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      lookingFor: ["Gaming PC", "Nintendo Switch", "VR Headset"],
    },
  ]

  // Mock saved searches data
  const savedSearches = [
    {
      id: "search1",
      name: "Vintage Cameras in NYC",
      query: "vintage camera",
      location: "New York, NY",
      radius: "10 miles",
      categories: ["Electronics", "Photography"],
    },
    {
      id: "search2",
      name: "Mountain Bikes",
      query: "mountain bike",
      location: "Any",
      radius: "50 miles",
      categories: ["Sports", "Outdoor"],
    },
    {
      id: "search3",
      name: "Leather Jackets",
      query: "leather jacket",
      location: "Austin, TX",
      radius: "25 miles",
      categories: ["Clothing", "Accessories"],
    },
  ]

  const filteredTrades = savedTrades.filter((trade) => trade.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleTradeClick = (tradeId) => {
    router.push(`${ROUTES.MARKETPLACE}/${tradeId}`)
  }

  const handleOwnerClick = (ownerId) => {
    router.push(`/user/${ownerId}`)
  }

  const handleSearchClick = (searchId) => {
    // In a real app, this would apply the saved search parameters
    router.push(`${ROUTES.MARKETPLACE}?search=${searchId}`)
  }

  return (
    <div className="container max-w-6xl py-8">
      <motion.div
        className="flex items-center justify-between mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Saved Items</h1>
        </div>
      </motion.div>

      <motion.div
        className="relative mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search saved items..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      <Tabs defaultValue="trades">
        <TabsList className="mb-6">
          <TabsTrigger value="trades">Saved Trades</TabsTrigger>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
        </TabsList>

        <TabsContent value="trades" className="space-y-6">
          {filteredTrades.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No saved trades found</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                {searchQuery
                  ? "No saved trades match your search query."
                  : "You haven't saved any trades yet. Browse the marketplace to find items you're interested in."}
              </p>
              <Button onClick={() => router.push(ROUTES.MARKETPLACE)}>Browse Marketplace</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTrades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                  onClick={() => handleTradeClick(trade.id)}
                  onOwnerClick={() => handleOwnerClick(trade.owner.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="searches" className="space-y-6">
          {savedSearches.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No saved searches</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Save your search parameters to get notified when new matching items are listed.
              </p>
              <Button onClick={() => router.push(ROUTES.MARKETPLACE)}>Browse Marketplace</Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {savedSearches.map((search) => (
                <motion.div
                  key={search.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200"
                  onClick={() => handleSearchClick(search.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <h3 className="font-medium">{search.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <span>Query: "{search.query}"</span>
                      <span>Location: {search.location}</span>
                      <span>Radius: {search.radius}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {search.categories.map((category, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-secondary rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

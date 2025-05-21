"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradeModal } from "@/components/trade-modal"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { BookmarkIcon, MapPin } from "lucide-react"
import Link from "next/link"

export function RecommendedTrades() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState(null)
  const [activeTab, setActiveTab] = useState("recommended")
  const [savedItems, setSavedItems] = useState(new Set())
  const router = useRouter()

  const openTradeModal = (trade) => {
    setSelectedTrade(trade)
    setIsModalOpen(true)
  }

  const handleSaveItem = (itemId, event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setSavedItems((prev) => {
      const newSaved = new Set(prev)
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId)
      } else {
        newSaved.add(itemId)
      }
      return newSaved
    })
  }

  // Sample recommended trades based on user preferences and history
  const recommendedTrades = [
    {
      id: 1,
      title: "Vintage Camera",
      description:
        "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors.",
      category: "Electronics",
      condition: "Good",
      rarity: "Common",
      image: "/images/vintage-camera.jpeg",
      owner: {
        id: 101,
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      location: "Seattle, WA",
      lookingFor: ["Mechanical Keyboard", "Headphones", "Audio Equipment"],
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      description:
        "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
      category: "Electronics",
      condition: "Like New",
      rarity: "Uncommon",
      image: "/images/mechanical-keyboard.jpeg",
      owner: {
        id: 102,
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      location: "Portland, OR",
      lookingFor: ["Camera Gear", "Smartphone", "Tablet"],
    },
    {
      id: 3,
      title: "Leather Jacket",
      description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
      category: "Clothing",
      condition: "Excellent",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 103,
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      location: "San Francisco, CA",
      lookingFor: ["Winter Gear", "Outdoor Equipment", "Boots"],
    },
  ]

  // Sample trending trades
  const trendingTrades = [
    {
      id: 4,
      title: "Mountain Bike",
      description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
      category: "Sports",
      condition: "Good",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 104,
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      location: "Denver, CO",
      lookingFor: ["Camping Gear", "Fitness Equipment", "Electronics"],
    },
    {
      id: 5,
      title: "Vintage Vinyl Records",
      description:
        "Collection of classic rock vinyl records from the 70s and 80s. All in great condition with original sleeves.",
      category: "Music",
      condition: "Good",
      rarity: "Uncommon",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 105,
        name: "Jamie Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      location: "Austin, TX",
      lookingFor: ["Audio Equipment", "Musical Instruments", "Books"],
    },
    {
      id: 6,
      title: "Professional DSLR Camera",
      description:
        "Professional-grade DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.",
      category: "Electronics",
      condition: "Like New",
      rarity: "Rare",
      image: "/images/drone.webp",
      owner: {
        id: 106,
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      location: "New York, NY",
      lookingFor: ["Laptop", "Tablet", "Smart Home Devices"],
    },
  ]

  // Sample nearby trades
  const nearbyTrades = [
    {
      id: 7,
      title: "Acoustic Guitar",
      description: "Beautiful acoustic guitar with solid spruce top. Rich, warm tone and excellent playability.",
      category: "Music",
      condition: "Excellent",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 107,
        name: "Chris Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      location: "Seattle, WA",
      lookingFor: ["Electric Guitar", "Audio Equipment", "Headphones"],
    },
    {
      id: 8,
      title: "Gaming Console",
      description: "Latest generation gaming console with two controllers and five games. Perfect condition.",
      category: "Electronics",
      condition: "Like New",
      rarity: "Uncommon",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 108,
        name: "Pat Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      location: "Bellevue, WA",
      lookingFor: ["Gaming Laptop", "Gaming Monitor", "VR Headset"],
    },
    {
      id: 9,
      title: "Camping Tent",
      description: "4-person camping tent, waterproof and easy to set up. Used only twice.",
      category: "Sports",
      condition: "Good",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 109,
        name: "Robin Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      location: "Redmond, WA",
      lookingFor: ["Hiking Gear", "Camping Stove", "Sleeping Bag"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const handleTradeClick = (trade) => {
    router.push(`/marketplace/${trade.id}`)
  }

  const handleViewAllClick = () => {
    router.push("/marketplace")
  }

  const handleOwnerClick = (ownerId, event) => {
    if (event && typeof event.stopPropagation === "function") {
      event.stopPropagation()
    }
    router.push(`/user/${ownerId}`)
  }

  // Function to render trade items in the marketplace style
  const renderTradeItems = (items) => {
    return items.map((item) => (
      <motion.div key={item.id} variants={itemVariants} className="group">
        <Link href={`/marketplace/${item.id}`} className="block transition-transform hover:scale-[1.03] duration-300">
          <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-sm hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.image || "/placeholder.svg?height=300&width=300"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {item.featured && (
                <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  Featured
                </div>
              )}
              <Badge variant="secondary" className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
                {item.category}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleSaveItem(item.id, e)}
              >
                <BookmarkIcon className={`h-4 w-4 ${savedItems.has(item.id) ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">{savedItems.has(item.id) ? "Unsave" : "Save"} item</span>
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium line-clamp-2">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-primary">{item.rarity}</span>
                </div>
              </div>

              {item.lookingFor && item.lookingFor.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.lookingFor.slice(0, 2).map((lookingFor, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {lookingFor}
                    </Badge>
                  ))}
                  {item.lookingFor.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.lookingFor.length - 2} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleOwnerClick(item.owner.id, e)
                  }}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.owner.avatar || "/placeholder.svg"} alt={item.owner.name} />
                    <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate text-sm max-w-[120px]">{item.owner.name}</span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-muted-foreground truncate text-sm max-w-[100px]">{item.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    ))
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Recommended for You</h2>
          <p className="text-muted-foreground">Discover trades that match your interests and preferences</p>
        </div>
      </motion.div>

      <Tabs defaultValue="recommended" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
            <TabsTrigger
              value="recommended"
              className="min-w-[100px] transition-all duration-300"
              onClick={() => setActiveTab("recommended")}
            >
              <motion.span
                initial={false}
                animate={activeTab === "recommended" ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Recommended
              </motion.span>
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="min-w-[100px] transition-all duration-300"
              onClick={() => setActiveTab("trending")}
            >
              <motion.span
                initial={false}
                animate={activeTab === "trending" ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Trending
              </motion.span>
            </TabsTrigger>
            <TabsTrigger
              value="nearby"
              className="min-w-[100px] transition-all duration-300"
              onClick={() => setActiveTab("nearby")}
            >
              <motion.span
                initial={false}
                animate={activeTab === "nearby" ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Nearby
              </motion.span>
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
            <TabsContent value="recommended" className="mt-0">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {renderTradeItems(recommendedTrades)}
              </motion.div>
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {renderTradeItems(trendingTrades)}
              </motion.div>
            </TabsContent>

            <TabsContent value="nearby" className="mt-0">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {renderTradeItems(nearbyTrades)}
              </motion.div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-[#3B82F6]/20 dark:bg-background/10"
            onClick={handleViewAllClick}
          >
            View All in Marketplace
          </Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && selectedTrade && <TradeModal trade={selectedTrade} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}

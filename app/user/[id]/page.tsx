"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import {
  ArrowLeft,
  Star,
  MessageSquare,
  UserPlus,
  Package,
  MapPin,
  Calendar,
  ShieldCheck,
  Clock,
  CheckCircle,
  Flag,
  Share2,
} from "lucide-react"
import { mockUserProfiles } from "@/mock/user-profiles"
import { motion } from "framer-motion"

export default function UserProfilePage({ params }) {
  const router = useRouter()
  const userId = Number.parseInt(params.id)
  const user = mockUserProfiles.find((u) => u.id === userId)

  const [activeTab, setActiveTab] = useState("inventory")

  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case "shield-check":
        return <ShieldCheck className="h-4 w-4" />
      case "clock":
        return <Clock className="h-4 w-4" />
      case "check-circle":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-muted/50 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="mt-4">{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{user.bio}</p>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.location}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-lg font-bold">{user.completedTrades}</p>
                  <p className="text-xs text-muted-foreground">Trades</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-lg font-bold">{user.reviewCount}</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-lg font-bold">{user.inventory.filter((item) => item.isListed).length}</p>
                  <p className="text-xs text-muted-foreground">Listings</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Badges:</p>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <Badge key={badge.id} variant="secondary" className="flex items-center gap-1">
                      {getBadgeIcon(badge.icon)}
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <div className="flex w-full gap-2 mt-2">
                <Button variant="outline" size="icon" className="flex-1">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1 text-destructive hover:text-destructive">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 bg-muted/60 p-1 rounded-full">
              <TabsTrigger value="inventory" className="rounded-full">
                <Package className="h-4 w-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {user.inventory.map((item) => (
                  <InventoryItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-4">
                <ReviewCard
                  reviewer={{
                    name: "Jamie Wilson",
                    avatar: "/placeholder.svg?height=50&width=50&text=JW",
                  }}
                  rating={5}
                  date="Apr 15, 2025"
                  comment="Great trader! The item was exactly as described and the meetup was smooth."
                />
                <ReviewCard
                  reviewer={{
                    name: "Morgan Chen",
                    avatar: "/placeholder.svg?height=50&width=50&text=MC",
                  }}
                  rating={4}
                  date="Apr 10, 2025"
                  comment="Good experience overall. Communication was prompt and the trade was fair."
                />
                <ReviewCard
                  reviewer={{
                    name: "Sam Rivera",
                    avatar: "/placeholder.svg?height=50&width=50&text=SR",
                  }}
                  rating={3}
                  date="Apr 01, 2025"
                  comment="The trade went well, but the item had a minor scratch that wasn't disclosed."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function InventoryItemCard({ item }) {
  return (
    <motion.div
      className="group"
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        z: 10,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-sm hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={item.image || "/placeholder.svg?height=300&width=300"}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {item.isListed && (
            <div className="absolute left-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
              Listed
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">{item.name}</h3>
            <Badge variant="outline">{item.condition || "Used"}</Badge>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={item.isListed ? "default" : "outline"} className="capitalize">
                {item.isListed ? "Active" : "Draft"}
              </Badge>
            </div>
            <div className="text-sm font-medium">${item.price}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ReviewCard({ reviewer, rating, date, comment }) {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
          <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{reviewer.name}</CardTitle>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment}</p>
        <p className="text-sm text-muted-foreground mt-2">{date}</p>
      </CardContent>
    </Card>
  )
}

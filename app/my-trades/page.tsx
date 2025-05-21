"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  Package,
  MapPin,
  ArrowLeft,
  Plus,
  Flag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function MyTradesPage() {
  const router = useRouter()
  const pathname = usePathname()
  const showBackButton = pathname !== "/my-trades"

  return (
    <div className="container max-w-7xl py-8 perspective-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 transform hover:scale-[1.01] transition-transform duration-300 hover:shadow-lg rounded-lg p-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              My Trades
            </h1>
            <p className="text-muted-foreground mt-1">Manage your trade proposals, listings, and history</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search trades..." className="pl-8 w-full" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => router.push("/inventory/add")}>
            <Plus className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 mb-8 shadow-lg transform hover:translate-y-[-5px] transition-all duration-300 preserve-3d">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Trade Activity Overview
            </h2>
            <p className="text-muted-foreground">You have 2 active proposals and 2 active listings</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm min-w-[120px] text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</p>
              <p className="text-sm text-muted-foreground">Proposed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm min-w-[120px] text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">1</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm min-w-[120px] text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">2</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm min-w-[120px] text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">1</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="proposed" className="w-full">
        <TabsList className="mb-6 bg-muted/60 p-1 rounded-full">
          <TabsTrigger value="proposed" className="rounded-full">
            Proposed
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-full">
            Pending
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-full">
            Active Listings
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-full">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proposed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposedTrades.map((trade) => (
              <TradeProposalCard key={trade.id} trade={trade} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTrades.map((trade) => (
              <PendingTradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeListings.map((listing) => (
              <ActiveListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTrades.map((trade) => (
              <CompletedTradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </TabsContent>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => {
              // Previous page logic
              console.log("Previous page")
            }}
            disabled={true}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 px-2">
            <Button variant="default" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0">
              3
            </Button>
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => {
              // Next page logic
              console.log("Next page")
            }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Tabs>
    </div>
  )
}

function TradeProposalCard({ trade }) {
  const router = useRouter()
  const { toast } = useToast()

  // Prevent event propagation to avoid triggering the Link
  const handleButtonClick = (e, action) => {
    e.preventDefault()
    e.stopPropagation()

    if (action === "message") {
      router.push(`/messages?user=${trade.owner.name.toLowerCase().replace(" ", "-")}`)
    } else if (action === "report") {
      router.push(`/report?trade=${trade.id}`)
    } else if (action === "details") {
      router.push(`/my-trades/${trade.id}`)
    }
  }

  return (
    <Card
      className="h-full hover:shadow-xl transition-all overflow-hidden transform hover:translate-y-[-10px] hover:scale-[1.03] duration-300 preserve-3d will-change-transform"
      onClick={() => router.push(`/my-trades/${trade.id}`)}
    >
      <div className="bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 border-b relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-yellow-300 after:to-yellow-500">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
            Proposed
          </Badge>
          <p className="text-sm text-muted-foreground">{trade.date}</p>
        </div>
      </div>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <CardTitle className="text-lg">{trade.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Awaiting response
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.yourItem.image || "/placeholder.svg"}
              alt={trade.yourItem.title}
              className="object-cover h-full w-full"
            />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.theirItem.image || "/placeholder.svg"}
              alt={trade.theirItem.title}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={trade.owner.avatar || "/placeholder.svg"} />
              <AvatarFallback>{trade.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{trade.owner.name}</span>
          </div>
          {trade.location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {trade.location}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 grid grid-cols-3 gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "message")}
        >
          <MessageCircle className="h-4 w-4 mr-1" /> Message
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "report")}
        >
          <Flag className="h-4 w-4 mr-1" /> Report
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "details")}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function PendingTradeCard({ trade }) {
  const router = useRouter()

  // Prevent event propagation to avoid triggering the Link
  const handleButtonClick = (e, action) => {
    e.preventDefault()
    e.stopPropagation()

    if (action === "message") {
      router.push(`/messages?user=${trade.owner.name.toLowerCase().replace(" ", "-")}`)
    } else if (action === "report") {
      router.push(`/report?trade=${trade.id}`)
    } else if (action === "details") {
      router.push(`/my-trades/${trade.id}`)
    }
  }

  return (
    <Card
      className="h-full hover:shadow-xl transition-all overflow-hidden transform hover:translate-y-[-10px] hover:scale-[1.03] duration-300 preserve-3d will-change-transform"
      onClick={() => router.push(`/my-trades/${trade.id}`)}
    >
      <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-blue-300 after:to-blue-500">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
            Pending
          </Badge>
          <p className="text-sm text-muted-foreground">{trade.date}</p>
        </div>
      </div>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <CardTitle className="text-lg">{trade.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {trade.status}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.yourItem.image || "/placeholder.svg"}
              alt={trade.yourItem.title}
              className="object-cover h-full w-full"
            />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.theirItem.image || "/placeholder.svg"}
              alt={trade.theirItem.title}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={trade.owner.avatar || "/placeholder.svg"} />
              <AvatarFallback>{trade.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{trade.owner.name}</span>
          </div>
          {trade.location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {trade.location}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-muted/20 grid grid-cols-3 gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "message")}
        >
          <MessageCircle className="h-4 w-4 mr-1" /> Message
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "report")}
        >
          <Flag className="h-4 w-4 mr-1" /> Report
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "details")}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function ActiveListingCard({ listing }) {
  const router = useRouter()

  // Prevent event propagation to avoid triggering the Link
  const handleButtonClick = (e, action) => {
    e.preventDefault()
    e.stopPropagation()

    if (action === "proposals") {
      router.push(`/marketplace/propose-trade/${listing.id}`)
    } else if (action === "edit") {
      router.push(`/inventory/edit/${listing.id}`)
    } else if (action === "details") {
      router.push(`/my-trades/${listing.id}`)
    }
  }

  return (
    <Card
      className="h-full hover:shadow-xl transition-all overflow-hidden transform hover:translate-y-[-10px] hover:scale-[1.03] duration-300 preserve-3d will-change-transform"
      onClick={() => router.push(`/my-trades/${listing.id}`)}
    >
      <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 border-b relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-green-300 after:to-green-500">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
            Active
          </Badge>
          <p className="text-sm text-muted-foreground">{listing.date}</p>
        </div>
      </div>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${listing.id}`)}>
        <CardTitle className="text-lg">{listing.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Package className="h-3 w-3" /> {listing.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${listing.id}`)}>
        <div className="relative h-40 w-full rounded-md overflow-hidden border mb-4 shadow-inner transform hover:scale-[1.02] transition-transform duration-300">
          <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="object-cover h-full w-full" />
        </div>
        <div className="flex justify-between text-sm">
          <span>Views: {listing.views}</span>
          <span>Offers: {listing.offers}</span>
        </div>
        {listing.location && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {listing.location}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 bg-muted/20 grid grid-cols-3 gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "proposals")}
        >
          <Package className="h-4 w-4 mr-1" /> Proposals
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "edit")}
        >
          Edit Listing
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "details")}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function CompletedTradeCard({ trade }) {
  const router = useRouter()

  // Prevent event propagation to avoid triggering the Link
  const handleButtonClick = (e, action) => {
    e.preventDefault()
    e.stopPropagation()

    if (action === "review") {
      router.push(`/reviews/submit/${trade.id}`)
    } else if (action === "details") {
      router.push(`/my-trades/${trade.id}`)
    }
  }

  return (
    <Card
      className="h-full hover:shadow-xl transition-all overflow-hidden transform hover:translate-y-[-10px] hover:scale-[1.03] duration-300 preserve-3d will-change-transform"
      onClick={() => router.push(`/my-trades/${trade.id}`)}
    >
      <div className="bg-gray-50 dark:bg-gray-800/40 px-4 py-2 border-b relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-gray-300 after:to-gray-400">
        <div className="flex justify-between items-center">
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            Completed
          </Badge>
          <p className="text-sm text-muted-foreground">{trade.date}</p>
        </div>
      </div>
      <CardHeader className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <CardTitle className="text-lg">{trade.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Completed on {trade.completedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 cursor-pointer" onClick={() => router.push(`/my-trades/${trade.id}`)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.yourItem.image || "/placeholder.svg"}
              alt={trade.yourItem.title}
              className="object-cover h-full w-full"
            />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="relative h-16 w-16 rounded-md overflow-hidden border transform hover:scale-105 transition-transform duration-300">
            <img
              src={trade.theirItem.image || "/placeholder.svg"}
              alt={trade.theirItem.title}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={trade.owner.avatar || "/placeholder.svg"} />
              <AvatarFallback>{trade.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{trade.owner.name}</span>
          </div>
          {trade.meetupLocation && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {trade.meetupLocation}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 bg-muted/20 grid grid-cols-2 gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "review")}
        >
          Leave Review
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center"
          onClick={(e) => handleButtonClick(e, "details")}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// Mock data
const proposedTrades = [
  {
    id: "1",
    title: "Vintage Camera for Gaming Console",
    date: "Apr 23, 2025",
    yourItem: {
      title: "Vintage Camera",
      image: "/placeholder.svg?height=100&width=100&text=Camera",
      rarity: "Rare",
    },
    theirItem: {
      title: "Gaming Console",
      image: "/placeholder.svg?height=100&width=100&text=Console",
      rarity: "Common",
    },
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50&text=AJ",
    },
    location: "Brooklyn, NY",
  },
  {
    id: "2",
    title: "Mechanical Keyboard for Vinyl Records",
    date: "Apr 22, 2025",
    yourItem: {
      title: "Mechanical Keyboard",
      image: "/placeholder.svg?height=100&width=100&text=Keyboard",
      rarity: "Uncommon",
    },
    theirItem: {
      title: "Vinyl Records",
      image: "/placeholder.svg?height=100&width=100&text=Vinyl",
      rarity: "Rare",
    },
    owner: {
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=50&width=50&text=SW",
    },
    location: "Manhattan, NY",
  },
]

const pendingTrades = [
  {
    id: "3",
    title: "Mountain Bike for Designer Sunglasses",
    date: "Apr 21, 2025",
    status: "Awaiting meetup confirmation",
    yourItem: {
      title: "Mountain Bike",
      image: "/placeholder.svg?height=100&width=100&text=Bike",
      rarity: "Common",
    },
    theirItem: {
      title: "Designer Sunglasses",
      image: "/placeholder.svg?height=100&width=100&text=Sunglasses",
      rarity: "Uncommon",
    },
    owner: {
      name: "Jamie Lee",
      avatar: "/placeholder.svg?height=50&width=50&text=JL",
    },
    location: "Queens, NY",
  },
]

const activeListings = [
  {
    id: "4",
    title: "Vintage Film Camera",
    date: "Apr 20, 2025",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200&text=Camera",
    views: 42,
    offers: 3,
    location: "Brooklyn, NY",
    rarity: "Rare",
  },
  {
    id: "5",
    title: "Mechanical Keyboard",
    date: "Apr 19, 2025",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=200&text=Keyboard",
    views: 28,
    offers: 1,
    location: "Manhattan, NY",
    rarity: "Uncommon",
  },
]

const completedTrades = [
  {
    id: "6",
    title: "Headphones for Smart Watch",
    date: "Apr 15, 2025",
    completedDate: "Apr 18, 2025",
    yourItem: {
      title: "Headphones",
      image: "/placeholder.svg?height=100&width=100&text=Headphones",
      rarity: "Common",
    },
    theirItem: {
      title: "Smart Watch",
      image: "/placeholder.svg?height=100&width=100&text=Watch",
      rarity: "Uncommon",
    },
    owner: {
      name: "Taylor Reed",
      avatar: "/placeholder.svg?height=50&width=50&text=TR",
    },
    meetupLocation: "Central Park, NY",
  },
]

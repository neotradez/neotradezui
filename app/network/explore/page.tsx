"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Users, ArrowLeft, UserPlus, Search, Filter, Clock, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExplorePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [traders, setTraders] = useState([])
  const [filteredTraders, setFilteredTraders] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [categoryFilters, setCategoryFilters] = useState([])
  const [trustFilters, setTrustFilters] = useState({
    trusted: true,
    verified: true,
    new: true,
  })
  const [sortOption, setSortOption] = useState("recommended")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Available categories
  const categories = [
    "Electronics",
    "Collectibles",
    "Books",
    "Music",
    "Clothing",
    "Sports",
    "Outdoors",
    "Home",
    "Art",
    "Vintage",
  ]

  // Mock data for traders
  const mockTraders = [
    {
      id: "user-201",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 37,
      mutualConnections: 5,
      categories: ["Electronics", "Collectibles"],
      status: "Trusted",
      connectionStatus: "none",
    },
    {
      id: "user-202",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 24,
      mutualConnections: 3,
      categories: ["Books", "Music"],
      status: "Verified",
      connectionStatus: "none",
    },
    {
      id: "user-203",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 42,
      mutualConnections: 7,
      categories: ["Clothing", "Home"],
      status: "Trusted",
      connectionStatus: "none",
    },
    {
      id: "user-204",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 18,
      mutualConnections: 2,
      categories: ["Sports", "Outdoors"],
      status: "Verified",
      connectionStatus: "none",
    },
    {
      id: "user-205",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      trades: 7,
      mutualConnections: 2,
      categories: ["Art", "Collectibles"],
      status: "New",
      connectionStatus: "none",
    },
    {
      id: "user-206",
      name: "Noah Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 15,
      mutualConnections: 4,
      categories: ["Music", "Vintage"],
      status: "Verified",
      connectionStatus: "none",
    },
    {
      id: "user-207",
      name: "Ava Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 22,
      mutualConnections: 3,
      categories: ["Electronics", "Home"],
      status: "Trusted",
      connectionStatus: "none",
    },
    {
      id: "user-208",
      name: "Ethan Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 12,
      mutualConnections: 2,
      categories: ["Books", "Art"],
      status: "Verified",
      connectionStatus: "none",
    },
    {
      id: "user-209",
      name: "Isabella Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 31,
      mutualConnections: 6,
      categories: ["Clothing", "Vintage"],
      status: "Trusted",
      connectionStatus: "none",
    },
    {
      id: "user-210",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.3,
      trades: 5,
      mutualConnections: 1,
      categories: ["Sports", "Outdoors"],
      status: "New",
      connectionStatus: "none",
    },
  ]

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be API calls
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setTraders(mockTraders)
        setFilteredTraders(mockTraders)
      } catch (error) {
        console.error("Error fetching traders:", error)
        toast({
          title: "Error",
          description: "Failed to load traders. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter traders based on search, categories, and trust filters
  useEffect(() => {
    if (traders.length === 0) return

    let filtered = [...traders]

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter((trader) => trader.name.toLowerCase().includes(searchLower))
    }

    // Apply category filters
    if (categoryFilters.length > 0) {
      filtered = filtered.filter((trader) => trader.categories.some((category) => categoryFilters.includes(category)))
    }

    // Apply trust filters
    filtered = filtered.filter((trader) => {
      if (trader.status === "Trusted" && trustFilters.trusted) return true
      if (trader.status === "Verified" && trustFilters.verified) return true
      if (trader.status === "New" && trustFilters.new) return true
      return false
    })

    // Apply sorting
    if (sortOption === "recommended") {
      // Sort by mutual connections (highest first)
      filtered.sort((a, b) => b.mutualConnections - a.mutualConnections)
    } else if (sortOption === "rating") {
      // Sort by rating (highest first)
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "trades") {
      // Sort by number of trades (highest first)
      filtered.sort((a, b) => b.trades - a.trades)
    } else if (sortOption === "name") {
      // Sort alphabetically by name
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredTraders(filtered)
  }, [traders, searchValue, categoryFilters, trustFilters, sortOption])

  // Handle view trader profile
  const handleViewTraderProfile = (userId) => {
    router.push(`/profile/${userId}`)
  }

  // Handle connect with trader
  const handleConnectWithTrader = (userId) => {
    // Update the connection status in the traders list
    setTraders((prev) =>
      prev.map((trader) => (trader.id === userId ? { ...trader, connectionStatus: "pending" } : trader)),
    )

    toast({
      title: "Connection request sent",
      description: "Your connection request has been sent.",
    })
  }

  // Handle filter dialog open
  const handleOpenFilterDialog = () => {
    setShowFilterDialog(true)
  }

  // Handle filter apply
  const handleApplyFilters = () => {
    setShowFilterDialog(false)
    toast({
      title: "Filters applied",
      description: "Your trader list has been filtered.",
    })
  }

  // Handle category filter toggle
  const handleCategoryToggle = (category) => {
    setCategoryFilters((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Handle load more traders
  const handleLoadMore = async () => {
    if (!hasMore) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would fetch the next page of traders
      // For demo, we'll just add more mock data
      const newTraders = mockTraders.map((trader) => ({
        ...trader,
        id: `${trader.id}-page-${page}`,
        name: `${trader.name} (${page})`,
      }))

      setTraders((prev) => [...prev, ...newTraders])
      setPage((prev) => prev + 1)

      // For demo purposes, stop after page 3
      if (page >= 3) {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more traders:", error)
      toast({
        title: "Error",
        description: "Failed to load more traders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/marketplace?category=${encodeURIComponent(category)}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Find Traders</h1>
        <p className="text-muted-foreground">Discover new traders to connect with based on your interests</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search traders by name..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="trades">Most Trades</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleOpenFilterDialog}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={categoryFilters.includes(category) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {isLoading && filteredTraders.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-[220px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>
      ) : filteredTraders.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTraders.map((trader) => (
              <TraderCard
                key={trader.id}
                trader={trader}
                onViewProfile={() => handleViewTraderProfile(trader.id)}
                onConnect={() => handleConnectWithTrader(trader.id)}
                onCategoryClick={handleCategoryClick}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Traders"
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No traders found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters to find traders.</p>
        </div>
      )}

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Traders</DialogTitle>
            <DialogDescription>Customize how traders are displayed</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={categoryFilters.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCategoryFilters((prev) => [...prev, category])
                        } else {
                          setCategoryFilters((prev) => prev.filter((c) => c !== category))
                        }
                      }}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Trust Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trusted"
                    checked={trustFilters.trusted}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, trusted: !!checked }))}
                  />
                  <Label htmlFor="trusted" className="flex items-center">
                    <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Trusted
                    </Badge>
                    <span>90%+ trust score</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={trustFilters.verified}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, verified: !!checked }))}
                  />
                  <Label htmlFor="verified" className="flex items-center">
                    <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      Verified
                    </Badge>
                    <span>75-89% trust score</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new"
                    checked={trustFilters.new}
                    onCheckedChange={(checked) => setTrustFilters((prev) => ({ ...prev, new: !!checked }))}
                  />
                  <Label htmlFor="new" className="flex items-center">
                    <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                      New
                    </Badge>
                    <span>Less than 5 trades</span>
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// TraderCard Component
function TraderCard({ trader, onViewProfile, onConnect, onCategoryClick }) {
  const statusColors = {
    Trusted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Verified: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    New: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer" onClick={onViewProfile}>
            <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
            <AvatarFallback>
              {trader.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium cursor-pointer hover:underline" onClick={onViewProfile}>
                {trader.name}
              </h3>
              <Badge className={statusColors[trader.status]} variant="outline">
                {trader.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>
                {trader.rating} ({trader.trades} trades)
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          <Users className="mr-1 inline-block h-3 w-3" />
          {trader.mutualConnections} mutual connections
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          {trader.categories.map((category, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs cursor-pointer hover:bg-primary/10"
              onClick={() => onCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1" 
            onClick={onConnect}
            disabled={trader.connectionStatus === "pending"}
          >
            {trader.connectionStatus === "pending" ? (
              <>
                <Clock className="mr-2 h-3 w-3" />
                Request Sent
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-3 w-3" />
                Connect\

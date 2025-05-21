"use client"

import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Clock,
  Filter,
  HandshakeIcon,
  MessageSquare,
  Search,
  ShieldCheck,
  Star,
  UserPlus,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/context/app-context"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { MapPin, CheckCircle } from "lucide-react"
import { mockUserProfiles } from "@/mock/user-profiles"

export default function NetworkPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(mockUserProfiles)
  const [activeTab, setActiveTab] = useState("all")
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { isAuthenticated, user } = useApp()
  const [activeTabOld, setActiveTabOld] = useState(searchParams.get("tab") || "connections")
  const [isLoading, setIsLoading] = useState(true)
  const [showConnectionsDialog, setShowConnectionsDialog] = useState(false)
  const [showTrustDetailsDialog, setShowTrustDetailsDialog] = useState(false)
  const [showRequestsDialog, setShowRequestsDialog] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteMessage, setInviteMessage] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [suggestedConnections, setSuggestedConnections] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [trustFilters, setTrustFilters] = useState({
    trusted: true,
    verified: true,
    new: true,
  })
  const [sortOption, setSortOption] = useState("recent")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(mockUserProfiles)
    } else {
      const filtered = mockUserProfiles.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery])

  // Mock data for connections
  const mockConnections = [
    {
      id: "user-101",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 12,
      lastTrade: "2 days ago",
      status: "Trusted",
      categories: ["Electronics", "Books"],
    },
    {
      id: "user-102",
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 8,
      lastTrade: "1 week ago",
      status: "Trusted",
      categories: ["Clothing", "Home"],
    },
    {
      id: "user-103",
      name: "Marcus Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 15,
      lastTrade: "3 days ago",
      status: "Verified",
      categories: ["Sports", "Outdoors"],
    },
    {
      id: "user-104",
      name: "Sophia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      trades: 5,
      lastTrade: "2 weeks ago",
      status: "New",
      categories: ["Art", "Collectibles"],
    },
    {
      id: "user-105",
      name: "Daniel Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 20,
      lastTrade: "Yesterday",
      status: "Trusted",
      categories: ["Music", "Electronics"],
    },
  ]

  // Mock data for suggested connections
  const mockSuggested = [
    {
      id: "user-201",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      trades: 37,
      mutualConnections: 5,
      categories: ["Electronics", "Collectibles"],
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
      connectionStatus: "none",
    },
  ]

  // Mock data for received requests
  const mockReceivedRequests = [
    {
      id: "req-101",
      userId: "user-301",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
      trades: 7,
      mutualConnections: 2,
      message: "I'd like to connect with you for potential trades in vintage collectibles.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  // Mock data for sent requests
  const mockSentRequests = [
    {
      id: "req-201",
      userId: "user-401",
      name: "Noah Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      trades: 15,
      mutualConnections: 4,
      message: "I'm interested in your collection of vinyl records. Let's connect!",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "req-202",
      userId: "user-402",
      name: "Ava Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      trades: 22,
      mutualConnections: 3,
      message: "I saw your camera collection and would love to connect for potential trades.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
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

        setConnections(mockConnections)
        setFilteredConnections(mockConnections)
        setSuggestedConnections(mockSuggested)
        setReceivedRequests(mockReceivedRequests)
        setSentRequests(mockSentRequests)
      } catch (error) {
        console.error("Error fetching network data:", error)
        toast({
          title: "Error",
          description: "Failed to load network data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Set active tab from URL if present
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTabOld(tab)
    }
  }, [searchParams, toast]) // Only re-run if searchParams or toast changes

  // Filter connections based on search and filters
  useEffect(() => {
    if (connections.length === 0) return

    let filtered = [...connections]

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter((conn) => conn.name.toLowerCase().includes(searchLower))
    }

    // Apply trust filters
    filtered = filtered.filter((conn) => {
      if (conn.status === "Trusted" && trustFilters.trusted) return true
      if (conn.status === "Verified" && trustFilters.verified) return true
      if (conn.status === "New" && trustFilters.new) return true
      return false
    })

    // Apply sorting
    if (sortOption === "recent") {
      // Sort by most recent trade
      filtered.sort((a, b) => {
        const timeA = getTimeValue(a.lastTrade)
        const timeB = getTimeValue(b.lastTrade)
        return timeA - timeB
      })
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

    setFilteredConnections(filtered)
  }, [connections, searchValue, trustFilters, sortOption]) // Only re-run when these dependencies change

  // Helper function to convert time strings to numeric values for sorting
  const getTimeValue = (timeString) => {
    if (timeString.includes("day")) {
      return Number.parseInt(timeString) * 24
    } else if (timeString.includes("week")) {
      return Number.parseInt(timeString) * 24 * 7
    } else if (timeString === "Yesterday") {
      return 24
    } else {
      return 0 // Today or recent
    }
  }

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
    if (value === "all") {
      setFilteredUsers(mockUserProfiles)
    } else if (value === "online") {
      setFilteredUsers(mockUserProfiles.filter((user) => user.isOnline))
    } else if (value === "nearby") {
      // In a real app, this would filter by location proximity
      setFilteredUsers(mockUserProfiles.filter((user) => user.location.includes("NY")))
    } else if (value === "recommended") {
      // In a real app, this would use an algorithm to recommend users
      setFilteredUsers(mockUserProfiles.filter((user) => user.rating >= 4.8))
    }
    setActiveTabOld(value)
    // Update URL without full page reload
    router.push(`/network?tab=${value}`, { scroll: false })
  }

  // Handle view all connections
  const handleViewAllConnections = () => {
    router.push("/network/connections")
  }

  // Handle view trust details
  const handleViewTrustDetails = () => {
    router.push("/network/trust")
  }

  // Handle manage requests
  const handleManageRequests = () => {
    router.push("/network/requests")
  }

  // Handle find traders
  const handleFindTraders = () => {
    router.push("/network/explore")
  }

  // Handle send invitation
  const handleSendInvitation = () => {
    setShowInviteDialog(true)
  }

  // Handle send invitation form submission
  const handleSendInvitationSubmit = (e) => {
    e.preventDefault()

    if (!inviteEmail) {
      toast({
        title: "Missing information",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    setShowInviteDialog(false)
    toast({
      title: "Invitation sent",
      description: `Your invitation has been sent to ${inviteEmail}.`,
    })

    // Reset form
    setInviteEmail("")
    setInviteName("")
    setInviteMessage("")
  }

  // Handle view trader profile
  const handleViewTraderProfile = (userId) => {
    router.push(`/profile/${userId}`)
  }

  // Handle message trader
  const handleMessageTrader = (userId) => {
    router.push(`/messages/${userId}`)
  }

  // Handle connect with trader
  const handleConnectWithTrader = (userId) => {
    // Update the connection status in the suggested connections
    setSuggestedConnections((prev) =>
      prev.map((conn) => (conn.id === userId ? { ...conn, connectionStatus: "pending" } : conn)),
    )

    toast({
      title: "Connection request sent",
      description: "Your connection request has been sent.",
    })
  }

  // Handle accept connection request
  const handleAcceptRequest = (requestId) => {
    // Find the request
    const request = receivedRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from received requests
    setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId))

    // Add to connections
    const newConnection = {
      id: request.userId,
      name: request.name,
      avatar: request.avatar,
      rating: request.rating,
      trades: request.trades,
      lastTrade: "Just now",
      status: "New",
      categories: ["General"],
    }

    setConnections((prev) => [...prev, newConnection])

    toast({
      title: "Connection accepted",
      description: `You are now connected with ${request.name}.`,
    })
  }

  // Handle decline connection request
  const handleDeclineRequest = (requestId) => {
    // Find the request
    const request = receivedRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from received requests
    setReceivedRequests((prev) => prev.filter((req) => req.id !== requestId))

    toast({
      title: "Connection declined",
      description: `You have declined the connection request from ${request.name}.`,
    })
  }

  // Handle cancel connection request
  const handleCancelRequest = (requestId) => {
    // Find the request
    const request = sentRequests.find((req) => req.id === requestId)

    if (!request) return

    // Remove from sent requests
    setSentRequests((prev) => prev.filter((req) => req.id !== requestId))

    toast({
      title: "Request canceled",
      description: `Your connection request to ${request.name} has been canceled.`,
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
      description: "Your connection list has been filtered.",
    })
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/marketplace?category=${encodeURIComponent(category)}`)
  }

  // Handle load more connections
  const handleLoadMore = async () => {
    if (!hasMore) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would fetch the next page of connections
      // For demo, we'll just add more mock data
      const newConnections = mockConnections.map((conn) => ({
        ...conn,
        id: `${conn.id}-page-${page}`,
        name: `${conn.name} (${page})`,
      }))

      setConnections((prev) => [...prev, ...newConnections])
      setPage((prev) => prev + 1)

      // For demo purposes, stop after page 3
      if (page >= 3) {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more connections:", error)
      toast({
        title: "Error",
        description: "Failed to load more connections. Please try again.",
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

  // Render loading skeleton
  if (isLoading && connections.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-muted"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-32 animate-pulse rounded-md bg-muted"></div>
            <div className="h-10 w-36 animate-pulse rounded-md bg-muted"></div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[120px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted"></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[180px] animate-pulse rounded-lg border bg-muted/50"></div>
            ))}
          </div>
        </div>

        <div className="h-10 w-full animate-pulse rounded-md bg-muted mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[100px] animate-pulse rounded-lg border bg-muted/50"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-8">
      <Breadcrumbs className="mb-6" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Trader Network
          </h1>
          <p className="text-muted-foreground mt-1">Connect with other traders and explore their inventories</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search traders..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 bg-muted/60 p-1 rounded-full">
          <TabsTrigger value="all" className="rounded-full">
            <Users className="h-4 w-4 mr-2" />
            All Traders
          </TabsTrigger>
          <TabsTrigger value="online" className="rounded-full">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Online Now
            </div>
          </TabsTrigger>
          <TabsTrigger value="nearby" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="recommended" className="rounded-full">
            <Star className="h-4 w-4 mr-2" />
            Recommended
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserProfileCard key={user.id} user={user} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1" disabled={true}>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button variant="default" size="sm" className="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>

              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Send Invitation Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite a Trader</DialogTitle>
            <DialogDescription>Send an invitation to connect with a new trader</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendInvitationSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="trader@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Personal Message</Label>
                <Textarea
                  id="message"
                  placeholder="I'd like to connect with you on NeoTradez for trading collectibles..."
                  rows={3}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Trading Interests (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {["Electronics", "Collectibles", "Books", "Music", "Clothing", "Sports"].map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => {
                        if (selectedCategories.includes(category)) {
                          setSelectedCategories((prev) => prev.filter((c) => c !== category))
                        } else {
                          setSelectedCategories((prev) => [...prev, category])
                        }
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowInviteDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Connections</DialogTitle>
            <DialogDescription>Customize how your connections are displayed</DialogDescription>
          </DialogHeader>
          <div className="py-4">
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

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-medium">Sort By</h4>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent Trade</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="trades">Most Trades</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
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

function UserProfileCard({ user }) {
  const router = useRouter()

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
    <Card className="overflow-hidden hover:shadow-lg transition-all transform hover:translate-y-[-5px] hover:scale-[1.02] duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{user.rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm line-clamp-2 mb-3">{user.bio}</p>

        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{user.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {user.badges.slice(0, 2).map((badge) => (
            <Badge key={badge.id} variant="secondary" className="flex items-center gap-1">
              {getBadgeIcon(badge.icon)}
              {badge.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <p className="text-sm font-medium">{user.completedTrades}</p>
            <p className="text-xs text-muted-foreground">Trades</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{user.reviewCount}</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{user.inventory.filter((item) => item.isListed).length}</p>
            <p className="text-xs text-muted-foreground">Listings</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Featured Items:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {user.inventory
              .filter((item) => item.isListed)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-16 h-16 rounded-md border overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/marketplace/${item.id}`)
                  }}
                >
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full" onClick={() => router.push(`/messages?user=${user.id}`)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button className="w-full" onClick={() => router.push(`/user/${user.id}`)}>
          View Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

// SuggestedTraderCard Component
function SuggestedTraderCard({ trader, onViewProfile, onConnect }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onViewProfile}>
            <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
            <AvatarFallback>
              {trader.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
              {trader.name}
            </h3>
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
            <Badge key={index} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <Button
          size="sm"
          className="w-full transition-transform duration-200 hover:scale-105"
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
              Connect
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

// ConnectionCard Component
function ConnectionCard({ connection, onViewProfile, onMessage, onCategoryClick }) {
  const statusColors = {
    Trusted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Verified: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    New: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4 hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <Avatar
          className="cursor-pointer h-12 w-12 transition-transform duration-200 hover:scale-105"
          onClick={onViewProfile}
        >
          <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
          <AvatarFallback>
            {connection.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
              {connection.name}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className={statusColors[connection.status]} variant="outline">
                    {connection.status}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {connection.status === "Trusted" && "90%+ trust score, 10+ successful trades"}
                    {connection.status === "Verified" && "75-89% trust score, 5+ successful trades"}
                    {connection.status === "New" && "Less than 5 trades or new to the platform"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>{connection.rating}</span>
            </div>
            <div className="flex items-center">
              <HandshakeIcon className="mr-1 h-3 w-3" />
              <span>{connection.trades} trades</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>Last trade: {connection.lastTrade}</span>
            </div>
          </div>
          {connection.categories && connection.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {connection.categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-primary/10 transition-colors duration-200 hover:text-primary"
                  onClick={() => onCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 self-end sm:self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewProfile}
          className="transition-transform duration-200 hover:scale-105"
        >
          Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMessage}
          className="transition-transform duration-200 hover:scale-105"
        >
          Message
        </Button>
      </div>
    </div>
  )
}

// RequestCard Component
function RequestCard({ request, type, onAccept, onDecline, onCancel, onViewProfile }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onViewProfile}>
            <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
            <AvatarFallback>
              {request.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3
              className="font-medium cursor-pointer hover:underline transition-colors duration-200 hover:text-primary"
              onClick={onViewProfile}
            >
              {request.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span>
                {request.rating} ({request.trades} trades)
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3 text-xs text-muted-foreground">
          <Users className="mr-1 inline-block h-3 w-3" />
          {request.mutualConnections} mutual connections
        </div>
        <div className="mb-4 rounded-lg bg-muted p-3 text-sm">
          <p>{request.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(request.timestamp).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {type === "received" ? (
          <div className="flex gap-2">
            <Button className="flex-1 transition-transform duration-200 hover:scale-105" onClick={onAccept}>
              Accept
            </Button>
            <Button
              variant="outline"
              className="flex-1 transition-transform duration-200 hover:scale-105"
              onClick={onDecline}
            >
              Decline
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 transition-transform duration-200 hover:scale-105"
              onClick={onCancel}
            >
              Cancel Request
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-none transition-transform duration-200 hover:scale-105"
              onClick={onViewProfile}
            >
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ActivityItem Component
function ActivityItem({ icon, title, description, time, actionLabel, actionHref }) {
  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4 hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <Button variant="ghost" size="sm" asChild className="transition-transform duration-200 hover:scale-105">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}

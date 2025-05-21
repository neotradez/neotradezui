"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  LineChart,
  Loader2,
  MapPin,
  Package,
  RefreshCcw,
  Search,
  ShoppingBag,
  Star,
  Bookmark,
  MessageSquare,
  AlertTriangle,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Define ROUTES constant
const ROUTES = {
  HOME: "/",
  MY_TRADES: "/my-trades",
  MESSAGES: "/messages",
  MARKETPLACE: "/marketplace",
  INVENTORY: "/inventory",
  TRADE_JOURNEY: "/trade-journey",
  SCHEDULE: "/schedule",
  NOTIFICATIONS: "/notifications",
  DISPUTES: "/disputes",
  REVIEWS: "/reviews",
  ANALYTICS: "/analytics",
  SAVED_SEARCHES: "/saved-searches",
  SAVED_TRADES: "/saved-trades",
  SECURITY: "/security",
  MAP: "/map",
}

// Activity Item Component
const ActivityItem = ({ icon, title, description, time, actionLabel, actionHref }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-full bg-muted/50 p-2">{icon}</div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-2 inline-flex items-center text-sm font-medium text-primary">
          {actionLabel}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  </div>
)

// Recommendation Card Component
const RecommendationCard = ({ title, category, distance, matches, image, href }) => (
  <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <p className="text-xs text-muted-foreground">{category}</p>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        <img src={image || "/placeholder.svg"} alt={title} className="mr-4 h-16 w-16 rounded-md object-cover" />
        <div>
          <p className="text-sm font-medium">{distance}</p>
          <p className="text-xs text-muted-foreground">{matches}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" asChild className="w-full">
        <Link href={href}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
)

// Nearby Trade Item Component
const NearbyTradeItem = ({ title, trader, distance, category, href }) => (
  <Link href={href} className="block p-4 hover:bg-muted">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">
          By {trader} - {distance}
        </p>
      </div>
      <Badge variant="secondary">{category}</Badge>
    </div>
  </Link>
)

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("activity")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "notif1",
      title: "New Trade Proposal",
      description: "Alex has proposed a trade for your vintage camera",
      time: "10 minutes ago",
      read: false,
      type: "proposal",
      link: "/my-trades",
    },
    {
      id: "notif2",
      title: "Upcoming Meetup",
      description: "Reminder: You have a meetup with Jessica tomorrow at 2:00 PM",
      time: "1 hour ago",
      read: false,
      type: "meetup",
      link: "/schedule",
    },
    {
      id: "notif3",
      title: "New Message",
      description: "Sarah sent you a message about your trade",
      time: "3 hours ago",
      read: true,
      type: "message",
      link: "/messages",
    },
    {
      id: "notif4",
      title: "Trade Completed",
      description: "Your trade with Michael was successfully completed",
      time: "Yesterday",
      read: true,
      type: "trade",
      link: "/trade-journey",
    },
  ])

  // Handle refresh data
  const handleRefreshData = async () => {
    setIsRefreshing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Data refreshed",
        description: "Your dashboard has been updated with the latest information.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "There was an error refreshing your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Handle mark notification as read
  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  // Handle mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
    })
  }

  // Handle notification click
  const handleNotificationClick = (notification) => {
    handleMarkNotificationAsRead(notification.id)
    router.push(notification.link)
    setShowNotifications(false)
  }

  // Get unread notifications count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="container mx-auto px-4 py-8 perspective-1000">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between transform hover:scale-[1.01] transition-transform duration-300">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Your trading activity and recommendations at a glance.</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Button
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-background shadow-lg">
                <div className="flex items-center justify-between border-b p-3">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`cursor-pointer p-3 hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                notification.type === "proposal"
                                  ? "bg-blue-100 text-blue-600"
                                  : notification.type === "meetup"
                                    ? "bg-green-100 text-green-600"
                                    : notification.type === "message"
                                      ? "bg-purple-100 text-purple-600"
                                      : "bg-amber-100 text-amber-600"
                              }`}
                            >
                              {notification.type === "proposal" && <Package className="h-4 w-4" />}
                              {notification.type === "meetup" && <Calendar className="h-4 w-4" />}
                              {notification.type === "message" && <MessageSquare className="h-4 w-4" />}
                              {notification.type === "trade" && <ShoppingBag className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{notification.title}</h4>
                                {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                              </div>
                              <p className="text-sm text-muted-foreground">{notification.description}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="border-t p-2">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/notifications">View all notifications</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              12
            </div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
          <CardFooter>
            <Link href={ROUTES.MY_TRADES} className="w-full">
              <Button variant="outline" className="w-full">
                View All Trades
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trade Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              94%
            </div>
            <p className="text-xs text-muted-foreground">Based on 47 completed trades</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/trade-journey" className="flex items-center">
                View history
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              28
            </div>
            <p className="text-xs text-muted-foreground">8 listed for trade</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push(ROUTES.INVENTORY)} className="w-full">
              Manage Inventory
            </Button>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              2
            </div>
            <p className="text-xs text-muted-foreground">1 under review</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/disputes" className="flex items-center">
                View all disputes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trader Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                4.8
              </div>
              <Star className="ml-2 h-5 w-5 fill-primary text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Based on 32 reviews</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/reviews" className="flex items-center">
                View reviews
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              5
            </div>
            <p className="text-xs text-muted-foreground">From 3 different traders</p>
          </CardContent>
          <CardFooter>
            <Link href={ROUTES.MESSAGES} className="w-full">
              <Button variant="outline" className="w-full">
                View All Messages
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              2
            </div>
            <p className="text-xs text-muted-foreground">Next: Tomorrow, 2:00 PM</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/schedule" className="flex items-center">
                View schedule
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Trades</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              <ActivityItem
                icon={<Bell className="h-4 w-4" />}
                title="New trade proposal received"
                description="Alex has proposed a trade for your vintage camera"
                time="10 minutes ago"
                actionLabel="View Proposal"
                actionHref="/my-trades"
              />
              <ActivityItem
                icon={<Star className="h-4 w-4" />}
                title="New review received"
                description="Sarah gave you a 5-star rating for your recent trade"
                time="2 hours ago"
                actionLabel="View Review"
                actionHref="/reviews"
              />
              <ActivityItem
                icon={<Package className="h-4 w-4" />}
                title="Trade completed"
                description="Your trade with Michael was successfully completed"
                time="Yesterday"
                actionLabel="View Details"
                actionHref="/trade-journey"
              />
              <ActivityItem
                icon={<Calendar className="h-4 w-4" />}
                title="Meetup confirmed"
                description="Trade meetup with Jessica confirmed for tomorrow"
                time="Yesterday"
                actionLabel="View Schedule"
                actionHref="/schedule"
              />
              <ActivityItem
                icon={<AlertTriangle className="h-4 w-4" />}
                title="Security alert"
                description="New login detected from Seattle, WA"
                time="2 days ago"
                actionLabel="Review"
                actionHref="/security"
              />
            </div>
          </TabsContent>
          <TabsContent value="recommendations" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <RecommendationCard
                title="Vintage Record Player"
                category="Electronics"
                distance="1.2 miles away"
                matches="Matches 3 items in your wishlist"
                image="/placeholder.svg?height=100&width=100"
                href="/marketplace/123"
              />
              <RecommendationCard
                title="Comic Book Collection"
                category="Collectibles"
                distance="0.8 miles away"
                matches="Similar to your recent trades"
                image="/placeholder.svg?height=100&width=100"
                href="/marketplace/456"
              />
              <RecommendationCard
                title="Mountain Bike"
                category="Sports & Outdoors"
                distance="2.5 miles away"
                matches="Matches your search history"
                image="/placeholder.svg?height=100&width=100"
                href="/marketplace/789"
              />
              <RecommendationCard
                title="Antique Desk Lamp"
                category="Home & Garden"
                distance="1.5 miles away"
                matches="Trader has items you want"
                image="/placeholder.svg?height=100&width=100"
                href="/marketplace/101"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Link href={ROUTES.MARKETPLACE} className="w-full">
                <Button className="w-full">Explore Marketplace</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="nearby" className="mt-6">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-medium">Trades Within 5 Miles</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href={ROUTES.MAP}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Open Map View
                  </Link>
                </Button>
              </div>
              <div className="divide-y">
                <NearbyTradeItem
                  title="Vintage Camera Collection"
                  trader="Alex Johnson"
                  distance="0.8 miles"
                  category="Electronics"
                  href="/marketplace/202"
                />
                <NearbyTradeItem
                  title="Rare Vinyl Records"
                  trader="Maria Garcia"
                  distance="1.2 miles"
                  category="Music & Media"
                  href="/marketplace/203"
                />
                <NearbyTradeItem
                  title="Gaming Console Bundle"
                  trader="David Kim"
                  distance="1.7 miles"
                  category="Gaming"
                  href="/marketplace/204"
                />
                <NearbyTradeItem
                  title="Handcrafted Jewelry Set"
                  trader="Emma Wilson"
                  distance="2.3 miles"
                  category="Jewelry"
                  href="/marketplace/205"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <LineChart className="mr-2 h-4 w-4" />
                    Trading Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Trading activity chart</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        47
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        12
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Canceled</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                        3
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/analytics">
                      View Detailed Analytics
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Vintage cameras</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        24 results
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Mechanical keyboards</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        18 results
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Vinyl records jazz</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        42 results
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/saved-searches">
                      Manage Saved Searches
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Saved Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-muted mr-3 overflow-hidden">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Vintage Camera</p>
                          <p className="text-xs text-muted-foreground">Electronics</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/marketplace/1">View</Link>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-muted mr-3 overflow-hidden">
                          <img
                            src="/placeholder.svg?height=40&width=40"
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Mechanical Keyboard</p>
                          <p className="text-xs text-muted-foreground">Electronics</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/marketplace/2">View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/saved-trades">
                      View All Saved Items
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="transform hover:translate-y-[-5px] hover:scale-[1.02] transition-all duration-300 preserve-3d shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Alex Johnson</p>
                          <p className="text-xs text-muted-foreground truncate w-40">Is the camera still available?</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">New</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MG</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Maria Garcia</p>
                          <p className="text-xs text-muted-foreground truncate w-40">Thanks for the trade!</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/messages">
                      Open Messages
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md"
                asChild
              >
                <Link href="/analytics">
                  <Zap className="mr-2 h-4 w-4" />
                  View Full Analytics Dashboard
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

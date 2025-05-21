"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, isSameDay, parseISO, addDays } from "date-fns"
import { ArrowLeft, CalendarIcon, Check, Clock, Filter, MapPin, MessageSquare, Search } from "lucide-react"
import { MeetupDetailsDialog } from "@/components/meetup-details-dialog"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function SchedulePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMeetup, setSelectedMeetup] = useState<any | null>(null)
  const [showMeetupDetails, setShowMeetupDetails] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [meetups, setMeetups] = useState<any[]>([])

  // Mock meetup data
  const mockMeetups = [
    {
      id: "meetup-1",
      title: "Vintage Camera for Gaming Console",
      date: addDays(new Date(), 1).toISOString(),
      time: "2:00 PM - 3:00 PM",
      location: "Central Park - Columbus Circle Entrance",
      status: "confirmed",
      with: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=50&width=50&text=AJ",
        rating: 4.8,
      },
      offering: {
        id: "item-1",
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100&text=Camera",
        value: "$120",
      },
      requesting: {
        id: "item-2",
        title: "Gaming Console",
        image: "/placeholder.svg?height=100&width=100&text=Console",
        value: "$450",
      },
      notes: "I'll be wearing a blue jacket. Let me know if you need to reschedule.",
    },
    {
      id: "meetup-2",
      title: "Mechanical Keyboard for Vinyl Records",
      date: addDays(new Date(), 3).toISOString(),
      time: "5:30 PM - 6:30 PM",
      location: "Starbucks - Union Square",
      status: "pending",
      with: {
        id: "user-2",
        name: "Sam Wilson",
        avatar: "/placeholder.svg?height=50&width=50&text=SW",
        rating: 4.6,
      },
      offering: {
        id: "item-3",
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100&text=Keyboard",
        value: "$150",
      },
      requesting: {
        id: "item-4",
        title: "Vinyl Records",
        image: "/placeholder.svg?height=100&width=100&text=Vinyl",
        value: "$180",
      },
      notes: "I'll bring some extra keycaps as well.",
    },
    {
      id: "meetup-3",
      title: "Mountain Bike for Designer Sunglasses",
      date: addDays(new Date(), 5).toISOString(),
      time: "10:00 AM - 11:00 AM",
      location: "Bryant Park",
      status: "completed",
      with: {
        id: "user-3",
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=50&width=50&text=JL",
        rating: 4.9,
      },
      offering: {
        id: "item-5",
        title: "Mountain Bike",
        image: "/placeholder.svg?height=100&width=100&text=Bike",
        value: "$350",
      },
      requesting: {
        id: "item-6",
        title: "Designer Sunglasses",
        image: "/placeholder.svg?height=100&width=100&text=Sunglasses",
        value: "$200",
      },
      notes: "Trade completed successfully. Great experience!",
    },
    {
      id: "meetup-4",
      title: "Headphones for Smart Watch",
      date: addDays(new Date(), -2).toISOString(),
      time: "3:00 PM - 4:00 PM",
      location: "Washington Square Park",
      status: "canceled",
      with: {
        id: "user-4",
        name: "Taylor Reed",
        avatar: "/placeholder.svg?height=50&width=50&text=TR",
        rating: 4.7,
      },
      offering: {
        id: "item-7",
        title: "Headphones",
        image: "/placeholder.svg?height=100&width=100&text=Headphones",
        value: "$180",
      },
      requesting: {
        id: "item-8",
        title: "Smart Watch",
        image: "/placeholder.svg?height=100&width=100&text=Watch",
        value: "$220",
      },
      notes: "Canceled due to scheduling conflict.",
    },
    {
      id: "meetup-5",
      title: "Drone for Camera Lens",
      date: new Date().toISOString(),
      time: "6:00 PM - 7:00 PM",
      location: "Madison Square Park",
      status: "confirmed",
      with: {
        id: "user-5",
        name: "Jordan Smith",
        avatar: "/placeholder.svg?height=50&width=50&text=JS",
        rating: 4.5,
      },
      offering: {
        id: "item-9",
        title: "Drone",
        image: "/placeholder.svg?height=100&width=100&text=Drone",
        value: "$300",
      },
      requesting: {
        id: "item-10",
        title: "Camera Lens",
        image: "/placeholder.svg?height=100&width=100&text=Lens",
        value: "$280",
      },
      notes: "Meeting at the fountain in the center of the park.",
    },
  ]

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setMeetups(mockMeetups)
      } catch (error) {
        console.error("Error fetching meetups:", error)
        toast({
          title: "Error",
          description: "Failed to load meetup data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter meetups based on search, date, and status
  const filteredMeetups = meetups.filter((meetup) => {
    const matchesSearch =
      meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.with.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDate = selectedDate ? isSameDay(parseISO(meetup.date), selectedDate) : true

    const matchesStatus = statusFilter === "all" || meetup.status === statusFilter

    return matchesSearch && matchesDate && matchesStatus
  })

  // Group meetups by date
  const meetupsByDate = filteredMeetups.reduce((acc, meetup) => {
    const date = format(parseISO(meetup.date), "yyyy-MM-dd")
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(meetup)
    return acc
  }, {})

  // Sort dates
  const sortedDates = Object.keys(meetupsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  // Handle meetup click
  const handleMeetupClick = (meetup) => {
    setSelectedMeetup(meetup)
    setShowMeetupDetails(true)
  }

  // Handle close meetup details
  const handleCloseMeetupDetails = () => {
    setShowMeetupDetails(false)
    setSelectedMeetup(null)
  }

  // Handle view meetup on map
  const handleViewOnMap = (meetup) => {
    router.push(`/trade-location/${meetup.id}`)
  }

  // Handle message trader
  const handleMessageTrader = (userId) => {
    router.push(`/messages/${userId}`)
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "canceled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const upcomingMeetups = meetups.filter((m) => m.status === "confirmed" || m.status === "pending")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Trade Meetups</h1>
          <p className="text-muted-foreground">Manage your scheduled trade meetups</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/map")}>
            <MapPin className="mr-2 h-4 w-4" />
            View Map
          </Button>
          <Button onClick={() => router.push("/marketplace")}>Find New Trades</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Meetups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search meetups..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="list">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 animate-pulse rounded-lg bg-muted"></div>
                      ))}
                    </div>
                  ) : filteredMeetups.length > 0 ? (
                    <div className="space-y-6">
                      {sortedDates.map((date) => (
                        <div key={date}>
                          <h3 className="mb-2 font-medium">
                            {format(new Date(date), "EEEE, MMMM d, yyyy")}
                            {isSameDay(new Date(date), new Date()) && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                Today
                              </Badge>
                            )}
                          </h3>
                          <div className="space-y-3">
                            {meetupsByDate[date].map((meetup) => (
                              <motion.div
                                key={meetup.id}
                                className="flex cursor-pointer flex-col rounded-lg border p-4 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                                onClick={() => handleMeetupClick(meetup)}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Clock className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{meetup.title}</h4>
                                      <Badge className={getStatusBadgeColor(meetup.status)}>
                                        {meetup.status.charAt(0).toUpperCase() + meetup.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                      <span>{meetup.time}</span>
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {meetup.location}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                          <AvatarImage
                                            src={meetup.with.avatar || "/placeholder.svg"}
                                            alt={meetup.with.name}
                                          />
                                          <AvatarFallback>{meetup.with.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {meetup.with.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 flex gap-2 sm:mt-0">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMessageTrader(meetup.with.id)
                                    }}
                                  >
                                    <MessageSquare className="mr-1 h-3 w-3" />
                                    Message
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleViewOnMap(meetup)
                                    }}
                                  >
                                    <MapPin className="mr-1 h-3 w-3" />
                                    Map
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <CalendarIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No meetups found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery || statusFilter !== "all" || selectedDate
                          ? "Try adjusting your filters to see more meetups."
                          : "You don't have any scheduled meetups yet."}
                      </p>
                      {!searchQuery && statusFilter === "all" && !selectedDate && (
                        <Button className="mt-4" onClick={() => router.push("/marketplace")}>
                          Find Trades
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="calendar">
                  <div className="rounded-lg border p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="mx-auto"
                      classNames={{
                        day_today: "bg-primary/10 text-primary font-bold",
                        day_selected: "bg-primary text-primary-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                      }}
                      components={{
                        DayContent: (props) => {
                          const date = props.date
                          const formattedDate = format(date, "yyyy-MM-dd")
                          const hasMeetup = meetupsByDate[formattedDate]

                          return (
                            <div className="relative flex h-full w-full items-center justify-center">
                              {props.children}
                              {hasMeetup && (
                                <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          )
                        },
                      }}
                    />

                    <Separator className="my-4" />

                    <div className="mt-4">
                      <h3 className="mb-2 font-medium">
                        {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                        {selectedDate && isSameDay(selectedDate, new Date()) && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            Today
                          </Badge>
                        )}
                      </h3>

                      {selectedDate && meetupsByDate[format(selectedDate, "yyyy-MM-dd")] ? (
                        <div className="space-y-3">
                          {meetupsByDate[format(selectedDate, "yyyy-MM-dd")].map((meetup) => (
                            <motion.div
                              key={meetup.id}
                              className="flex cursor-pointer flex-col rounded-lg border p-4 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                              onClick={() => handleMeetupClick(meetup)}
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                  <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{meetup.title}</h4>
                                    <Badge className={getStatusBadgeColor(meetup.status)}>
                                      {meetup.status.charAt(0).toUpperCase() + meetup.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                    <span>{meetup.time}</span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {meetup.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Avatar className="h-4 w-4">
                                        <AvatarImage
                                          src={meetup.with.avatar || "/placeholder.svg"}
                                          alt={meetup.with.name}
                                        />
                                        <AvatarFallback>{meetup.with.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      {meetup.with.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2 sm:mt-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMessageTrader(meetup.with.id)
                                  }}
                                >
                                  <MessageSquare className="mr-1 h-3 w-3" />
                                  Message
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewOnMap(meetup)
                                  }}
                                >
                                  <MapPin className="mr-1 h-3 w-3" />
                                  Map
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : selectedDate ? (
                        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                          <p className="text-muted-foreground">No meetups scheduled for this date.</p>
                        </div>
                      ) : (
                        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                          <p className="text-muted-foreground">Select a date to view scheduled meetups.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Meetup Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Upcoming Meetups</span>
                  <span className="font-medium">
                    {meetups.filter((m) => m.status === "confirmed" || m.status === "pending").length}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed Meetups</span>
                  <span className="font-medium">{meetups.filter((m) => m.status === "completed").length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Canceled Meetups</span>
                  <span className="font-medium">{meetups.filter((m) => m.status === "canceled").length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">On-time Rate</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Always meet in public places with plenty of people around</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Let someone know where you're going and who you're meeting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Inspect items thoroughly before completing the trade</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Consider bringing a friend to the meetup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Trust your instincts - if something feels off, don't proceed</span>
                </li>
              </ul>
              <Button variant="outline" className="mt-4 w-full" onClick={() => router.push("/safety-guidelines")}>
                View All Safety Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meetup Details Dialog */}
      <MeetupDetailsDialog open={showMeetupDetails} onOpenChange={setShowMeetupDetails} meetup={selectedMeetup} />
    </div>
  )
}

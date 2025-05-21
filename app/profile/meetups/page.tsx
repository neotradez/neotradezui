"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

// Mock data for meetups
const mockMeetups = [
  {
    id: "meetup-1",
    tradeId: "trade-101",
    title: "Camera Equipment Exchange",
    status: "upcoming",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "14:00",
    location: "Central Park, NY",
    coordinates: { lat: 40.785091, lng: -73.968285 },
    trader: {
      id: "user-101",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    items: [
      {
        giving: {
          id: "item-201",
          name: "Nikon F3 Camera",
          image: "/images/vintage-camera.jpeg",
        },
        receiving: {
          id: "item-301",
          name: "Sony A7III",
          image: "/placeholder.svg?height=60&width=60",
        },
      },
    ],
  },
  {
    id: "meetup-2",
    tradeId: "trade-102",
    title: "Vinyl Records Trade",
    status: "completed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    time: "11:30",
    location: "Brooklyn Record Store, NY",
    coordinates: { lat: 40.712742, lng: -73.966427 },
    trader: {
      id: "user-102",
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    items: [
      {
        giving: {
          id: "item-202",
          name: "Beatles Collection",
          image: "/placeholder.svg?height=60&width=60",
        },
        receiving: {
          id: "item-302",
          name: "Jazz Classics Set",
          image: "/placeholder.svg?height=60&width=60",
        },
      },
    ],
  },
  {
    id: "meetup-3",
    tradeId: "trade-103",
    title: "Gaming Console Exchange",
    status: "cancelled",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    time: "16:00",
    location: "Washington Square Park, NY",
    coordinates: { lat: 40.730823, lng: -73.997332 },
    trader: {
      id: "user-103",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    items: [
      {
        giving: {
          id: "item-203",
          name: "PlayStation 5",
          image: "/placeholder.svg?height=60&width=60",
        },
        receiving: {
          id: "item-303",
          name: "Xbox Series X",
          image: "/placeholder.svg?height=60&width=60",
        },
      },
    ],
  },
]

export default function MeetupsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [meetups, setMeetups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchMeetups = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setMeetups(mockMeetups)
      } catch (error) {
        console.error("Error fetching meetups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeetups()
  }, [])

  const filteredMeetups = meetups.filter((meetup) => {
    if (activeTab === "upcoming") return meetup.status === "upcoming"
    if (activeTab === "completed") return meetup.status === "completed"
    if (activeTab === "cancelled") return meetup.status === "cancelled"
    return true
  })

  const handleViewChat = (meetupId) => {
    router.push(`/meetups/${meetupId}/chat`)
  }

  const handleViewDetails = (meetupId) => {
    router.push(`/meetups/${meetupId}`)
  }

  const handleViewLocation = (meetupId) => {
    router.push(`/meetups/${meetupId}/location`)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meetups</h1>
        <p className="text-muted-foreground">Manage your trade meetups and schedules</p>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">Loading meetups...</p>
            </div>
          ) : filteredMeetups.length > 0 ? (
            <div className="space-y-4">
              {filteredMeetups.map((meetup) => (
                <Card key={meetup.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{meetup.title}</CardTitle>
                      {getStatusBadge(meetup.status)}
                    </div>
                    <CardDescription>
                      Trade ID: {meetup.tradeId} • {format(meetup.date, "PPP")} at {meetup.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{format(meetup.date, "EEEE, MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{meetup.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{meetup.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={meetup.trader.avatar || "/placeholder.svg"} alt={meetup.trader.name} />
                            <AvatarFallback>{meetup.trader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>Meeting with {meetup.trader.name}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium">Items to Exchange</h4>
                        {meetup.items.map((item, index) => (
                          <div key={index} className="mb-2 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                <img
                                  src={item.giving.image || "/placeholder.svg"}
                                  alt={item.giving.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="text-sm">{item.giving.name}</span>
                            </div>
                            <span className="text-sm">↔️</span>
                            <div className="flex items-center gap-1">
                              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                <img
                                  src={item.receiving.image || "/placeholder.svg"}
                                  alt={item.receiving.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="text-sm">{item.receiving.name}</span>
                            </div>
                          </div>
                        ))}

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleViewDetails(meetup.id)}
                          >
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleViewLocation(meetup.id)}
                          >
                            <MapPin className="h-4 w-4" />
                            Map
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleViewChat(meetup.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">No {activeTab} meetups found</p>
              {activeTab === "upcoming" && (
                <Button className="mt-4" onClick={() => router.push("/marketplace")}>
                  Browse Marketplace
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

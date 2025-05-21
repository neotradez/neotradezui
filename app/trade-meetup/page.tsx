"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, MessageSquare, Search } from "lucide-react"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function TradeMeetupsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { meetups } = useMeetup()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredMeetups, setFilteredMeetups] = useState([])

  // Filter meetups based on search query and status
  useEffect(() => {
    let filtered = [...meetups]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((meetup) => meetup.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (meetup) =>
          meetup.trade.title.toLowerCase().includes(query) ||
          meetup.meetup.location.name.toLowerCase().includes(query) ||
          meetup.recipient.name.toLowerCase().includes(query),
      )
    }

    // Filter by tab
    if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (meetup) =>
          (meetup.status === "confirmed" || meetup.status === "pending") && new Date(meetup.meetup.date) >= new Date(),
      )
    } else if (activeTab === "past") {
      filtered = filtered.filter(
        (meetup) =>
          meetup.status === "completed" || meetup.status === "cancelled" || new Date(meetup.meetup.date) < new Date(),
      )
    }

    setFilteredMeetups(filtered)
  }, [meetups, searchQuery, statusFilter, activeTab])

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Trade Meetups</h1>
        <p className="text-muted-foreground">Manage your scheduled meetups for trades</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Meetups</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meetups..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="change-requested">Changes</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TabsContent value="upcoming" className="mt-0">
        <div className="space-y-6">
          {filteredMeetups.length > 0 ? (
            filteredMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} />)
          ) : (
            <EmptyState
              title="No upcoming meetups"
              description="You don't have any upcoming meetups scheduled."
              action="Schedule a meetup"
              onAction={() => router.push("/my-trades")}
            />
          )}
        </div>
      </TabsContent>

      <TabsContent value="all" className="mt-0">
        <div className="space-y-6">
          {filteredMeetups.length > 0 ? (
            filteredMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} />)
          ) : (
            <EmptyState
              title="No meetups found"
              description="No meetups match your search criteria."
              action="Clear filters"
              onAction={() => {
                setSearchQuery("")
                setStatusFilter("all")
              }}
            />
          )}
        </div>
      </TabsContent>

      <TabsContent value="past" className="mt-0">
        <div className="space-y-6">
          {filteredMeetups.length > 0 ? (
            filteredMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} />)
          ) : (
            <EmptyState
              title="No past meetups"
              description="You don't have any past meetups."
              action="View all meetups"
              onAction={() => setActiveTab("all")}
            />
          )}
        </div>
      </TabsContent>
    </div>
  )
}

function MeetupCard({ meetup }) {
  const router = useRouter()
  const meetupDate = new Date(meetup.meetup.date)
  const isPast = meetupDate < new Date()

  // Determine status badge color and text
  const getStatusBadge = () => {
    switch (meetup.status) {
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
          text: "Pending Confirmation",
        }
      case "confirmed":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          text: "Confirmed",
        }
      case "change-requested":
        return {
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
          text: "Change Requested",
        }
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          text: "Cancelled",
        }
      case "completed":
        return {
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
          text: "Completed",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
          text: meetup.status,
        }
    }
  }

  const statusBadge = getStatusBadge()

  // Determine which page to navigate to based on status
  const handleViewDetails = () => {
    switch (meetup.status) {
      case "pending":
        router.push(`/trade-meetup/confirmation/${meetup.id}`)
        break
      case "confirmed":
        router.push(`/trade-meetup/accepted/${meetup.id}`)
        break
      case "change-requested":
        router.push(`/trade-meetup/suggested/${meetup.id}`)
        break
      default:
        router.push(`/trade-meetup/accepted/${meetup.id}`)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-3">
          <div className="p-6 md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Badge variant="outline" className={statusBadge.color}>
                  {statusBadge.text}
                </Badge>
                <h3 className="mt-2 text-xl font-semibold">{meetup.trade.title}</h3>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>
                  {isPast ? "Was scheduled for" : "Scheduled for"} {meetupDate.toLocaleDateString()}
                </div>
                <div>{meetup.meetup.time}</div>
              </div>
            </div>

            <div className="mb-4 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{meetup.meetup.location.name}</h4>
                  <p className="text-sm text-muted-foreground">{meetup.meetup.location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Date</h4>
                  <p className="text-sm text-muted-foreground">
                    {meetupDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Time</h4>
                  <p className="text-sm text-muted-foreground">{meetup.meetup.time}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={meetup.recipient.avatar || "/placeholder.svg"}
                  alt={meetup.recipient.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Trading with {meetup.recipient.name}</h4>
              </div>
            </div>
          </div>

          <div className="border-t md:border-l md:border-t-0 p-6 flex flex-col">
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetup.trade.yourItem.image || "/placeholder.svg"}
                    alt={meetup.trade.yourItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs text-center text-muted-foreground">Your Item</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetup.trade.theirItem.image || "/placeholder.svg"}
                    alt={meetup.trade.theirItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-xs text-center text-muted-foreground">Their Item</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mt-auto space-y-2">
              <Button className="w-full" onClick={handleViewDetails}>
                View Details
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/messages/${meetup.recipient.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ title, description, action, onAction }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-center text-muted-foreground mt-2 mb-6">{description}</p>
        <Button onClick={onAction}>{action}</Button>
      </CardContent>
    </Card>
  )
}

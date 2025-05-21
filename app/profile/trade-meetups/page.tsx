"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, ArrowLeft, MessageCircle, Check, X } from "lucide-react"

export default function TradeMeetupsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Trade Meetups</h1>
          <p className="text-muted-foreground">Manage your scheduled trade exchanges</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingMeetups.length > 0 ? (
            upcomingMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} type="upcoming" />)
          ) : (
            <EmptyState
              title="No upcoming meetups"
              description="You don't have any confirmed meetups scheduled yet."
              action={<Button onClick={() => router.push("/my-trades")}>View My Trades</Button>}
            />
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {pendingMeetups.length > 0 ? (
            pendingMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} type="pending" />)
          ) : (
            <EmptyState
              title="No pending meetups"
              description="You don't have any pending meetup requests."
              action={<Button onClick={() => router.push("/my-trades")}>View My Trades</Button>}
            />
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastMeetups.length > 0 ? (
            pastMeetups.map((meetup) => <MeetupCard key={meetup.id} meetup={meetup} type="past" />)
          ) : (
            <EmptyState
              title="No past meetups"
              description="You haven't completed any trade meetups yet."
              action={<Button onClick={() => router.push("/marketplace")}>Browse Marketplace</Button>}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MeetupCard({ meetup, type }) {
  const router = useRouter()

  const getStatusBadge = () => {
    switch (type) {
      case "upcoming":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </Badge>
        )
      case "past":
        return meetup.completed ? (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
            Completed
          </Badge>
        ) : (
          <Badge variant="destructive">Cancelled</Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{meetup.trade.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>Trade with {meetup.otherTrader.name}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{meetup.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{meetup.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{meetup.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="h-12 w-12 mb-1">
                <AvatarImage src={meetup.otherTrader.avatar || "/placeholder.svg"} alt={meetup.otherTrader.name} />
                <AvatarFallback>{meetup.otherTrader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{meetup.otherTrader.name}</span>
            </div>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>{meetup.trade.yourItem}</span>
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{meetup.trade.theirItem}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-2">
        {type === "upcoming" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push(`/messages/${meetup.otherTrader.id}`)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push(`/trade-meetup/reschedule/${meetup.id}`)}
            >
              Reschedule
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => router.push(`/trade-meetup/details/${meetup.id}`)}
            >
              View Details
            </Button>
          </>
        )}

        {type === "pending" && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push(`/messages/${meetup.otherTrader.id}`)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="destructive" size="sm" className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </>
        )}

        {type === "past" && (
          <>
            {!meetup.reviewed && meetup.completed && (
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => router.push(`/reviews/submit/${meetup.id}`)}
              >
                Leave Review
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push(`/trade-journey/${meetup.trade.id}`)}
            >
              View Trade Journey
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="rounded-full bg-muted p-3">
        <Calendar className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{action}</div>
    </div>
  )
}

// Mock data
const upcomingMeetups = [
  {
    id: "meetup-1",
    trade: {
      id: "trade-1",
      title: "Vintage Camera for Gaming Console",
      yourItem: "Vintage Camera",
      theirItem: "Gaming Console",
    },
    otherTrader: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    date: "May 10, 2025",
    time: "2:00 PM",
    location: "Central Park Coffee Shop",
    completed: false,
    reviewed: false,
  },
]

const pendingMeetups = [
  {
    id: "meetup-2",
    trade: {
      id: "trade-2",
      title: "Mechanical Keyboard for Vinyl Records",
      yourItem: "Mechanical Keyboard",
      theirItem: "Vinyl Records",
    },
    otherTrader: {
      id: "user-2",
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
    },
    date: "May 12, 2025",
    time: "4:30 PM",
    location: "Brooklyn Public Library",
    completed: false,
    reviewed: false,
  },
]

const pastMeetups = [
  {
    id: "meetup-3",
    trade: {
      id: "trade-3",
      title: "Headphones for Smart Watch",
      yourItem: "Headphones",
      theirItem: "Smart Watch",
    },
    otherTrader: {
      id: "user-3",
      name: "Taylor Reed",
      avatar: "/placeholder.svg?height=40&width=40&text=TR",
    },
    date: "April 28, 2025",
    time: "1:00 PM",
    location: "Madison Square Park",
    completed: true,
    reviewed: false,
  },
]

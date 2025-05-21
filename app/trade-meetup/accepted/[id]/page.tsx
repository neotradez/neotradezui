"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageSquare, Check, ArrowLeft, AlertTriangle, CalendarDays } from "lucide-react"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MeetupDetailsDialog } from "@/components/meetup-details-dialog"

export default function MeetupAcceptedPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getMeetup } = useMeetup()
  const { id } = params
  const [meetup, setMeetup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  useEffect(() => {
    const loadMeetup = () => {
      setIsLoading(true)
      try {
        const meetupData = getMeetup(id)
        if (meetupData) {
          setMeetup(meetupData)
        } else {
          toast({
            title: "Meetup not found",
            description: "The meetup you're looking for doesn't exist or has been removed.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading meetup:", error)
        toast({
          title: "Error",
          description: "Failed to load meetup details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadMeetup()
  }, [id, getMeetup, toast])

  const handleShareMeetup = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share link copied",
      description: "The meetup link has been copied to your clipboard.",
    })
  }

  const handleAddToCalendar = () => {
    // In a real app, this would generate a calendar event
    toast({
      title: "Added to calendar",
      description: "The meetup has been added to your calendar.",
    })
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading meetup details...</p>
        </div>
      </div>
    )
  }

  if (!meetup) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Meetup Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The meetup you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/my-trades")}>Back to My Trades</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const meetupDate = new Date(meetup.meetup.date)
  const isUpcoming = meetupDate > new Date()

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Meetup Confirmed</h1>
          <p className="text-muted-foreground">Your meetup has been confirmed by both parties</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center justify-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <CardTitle className="text-center">Meetup Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isUpcoming ? (
                <Alert className="mb-6">
                  <AlertTitle>Meetup is scheduled</AlertTitle>
                  <AlertDescription>
                    This meetup is scheduled for{" "}
                    {meetupDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {meetup.meetup.time}.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="mb-6" variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Meetup date has passed</AlertTitle>
                  <AlertDescription>
                    This meetup was scheduled for{" "}
                    {meetupDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {meetup.meetup.time}. If you completed the trade, please mark it as completed.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Meetup Details</h3>
                  <div className="rounded-lg border p-4">
                    <div className="space-y-4">
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
                      {meetup.meetup.notes && (
                        <div className="pt-2">
                          <h4 className="font-medium">Additional Notes</h4>
                          <p className="text-sm text-muted-foreground">{meetup.meetup.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Trade Information</h3>
                  <div className="rounded-lg border p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={meetup.trade.yourItem.image || "/placeholder.svg"}
                            alt={meetup.trade.yourItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Your Item</h4>
                          <p className="text-sm text-muted-foreground">{meetup.trade.yourItem.title}</p>
                          <Badge variant="outline" className="mt-1">
                            {meetup.trade.yourItem.condition}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={meetup.trade.theirItem.image || "/placeholder.svg"}
                            alt={meetup.trade.theirItem.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Their Item</h4>
                          <p className="text-sm text-muted-foreground">{meetup.trade.theirItem.title}</p>
                          <Badge variant="outline" className="mt-1">
                            {meetup.trade.theirItem.condition}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Safety Tips</h3>
                  <div className="rounded-lg border p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-green-600" />
                        <span>Meet in a public place with plenty of people around</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-green-600" />
                        <span>Consider bringing a friend to the meetup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-green-600" />
                        <span>Inspect the item thoroughly before completing the trade</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-green-600" />
                        <span>Trust your instincts - if something feels off, leave</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 border-t p-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/messages/${meetup.recipient.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
                <CalendarDays className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button className="flex-1" onClick={() => setDetailsDialogOpen(true)}>
                View Full Details
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meetup Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Confirmed
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Confirmed on {new Date(meetup.confirmedAt).toLocaleDateString()}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Next Steps:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Propose meetup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>Confirm meetup details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        3
                      </span>
                      <span>Meet and complete the trade</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trader Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={meetup.recipient.avatar || "/placeholder.svg"}
                    alt={meetup.recipient.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{meetup.recipient.name}</h3>
                  <p className="text-sm text-muted-foreground">Confirmed meetup</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => router.push(`/messages/${meetup.recipient.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/trade-meetup/reschedule/${id}`)}
              >
                Reschedule Meetup
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => router.push(`/trade-meetup/cancel/${id}`)}
              >
                Cancel Meetup
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <MeetupDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} meetup={meetup} />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CancelMeetupPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getMeetup, cancelMeetup } = useMeetup()
  const { id } = params
  const [meetup, setMeetup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [cancelReason, setCancelReason] = useState("schedule-conflict")
  const [notes, setNotes] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Cancel the meetup
      await cancelMeetup(id, notes || cancelReason)

      toast({
        title: "Meetup cancelled",
        description: "The meetup has been cancelled successfully.",
      })

      router.push("/my-trades")
    } catch (error) {
      console.error("Error cancelling meetup:", error)
      toast({
        title: "Error",
        description: "Failed to cancel meetup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Cancel Meetup</h1>
          <p className="text-muted-foreground">Cancel your scheduled meetup with {meetup.recipient.name}</p>
        </div>
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Are you sure you want to cancel this meetup?</AlertTitle>
        <AlertDescription>
          Cancelling a meetup may affect your trader reputation. Please provide a reason for cancellation.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Reason for Cancellation</h3>
                  <RadioGroup value={cancelReason} onValueChange={setCancelReason} className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="schedule-conflict" id="schedule-conflict" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="schedule-conflict" className="font-medium">
                          Schedule Conflict
                        </Label>
                        <p className="text-sm text-muted-foreground">I have a conflict with the scheduled time</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="item-unavailable" id="item-unavailable" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="item-unavailable" className="font-medium">
                          Item No Longer Available
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          The item I was going to trade is no longer available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="found-alternative" id="found-alternative" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="found-alternative" className="font-medium">
                          Found Alternative Trade
                        </Label>
                        <p className="text-sm text-muted-foreground">I've found another trade for this item</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="location-issue" id="location-issue" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="location-issue" className="font-medium">
                          Location Issue
                        </Label>
                        <p className="text-sm text-muted-foreground">I can't make it to the agreed meeting location</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="other" id="other" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="other" className="font-medium">
                          Other Reason
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I have another reason for cancelling this meetup
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Please provide more details about why you're cancelling this meetup..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Go Back
                </Button>
                <Button type="submit" variant="destructive" disabled={isSubmitting}>
                  {isSubmitting ? "Cancelling..." : "Cancel Meetup"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Meetup Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(meetup.meetup.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at {meetup.meetup.time}
                </p>
              </div>

              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">{meetup.meetup.location.name}</p>
                <p className="text-sm text-muted-foreground">{meetup.meetup.location.address}</p>
              </div>

              <div className="pt-2">
                <h3 className="font-medium">Trading With</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={meetup.recipient.avatar || "/placeholder.svg"}
                      alt={meetup.recipient.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{meetup.recipient.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trade Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <h3 className="font-medium">Your Item</h3>
                  <p className="text-sm text-muted-foreground">{meetup.trade.yourItem.title}</p>
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
                  <h3 className="font-medium">Their Item</h3>
                  <p className="text-sm text-muted-foreground">{meetup.trade.theirItem.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ArrowLeft, CalendarIcon, Clock, MapPin } from "lucide-react"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RescheduleMeetupPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getMeetup, requestMeetupChange } = useMeetup()
  const { id } = params
  const [meetup, setMeetup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [changeType, setChangeType] = useState<"location" | "date" | "time" | "both">("both")

  useEffect(() => {
    const loadMeetup = () => {
      setIsLoading(true)
      try {
        const meetupData = getMeetup(id)
        if (meetupData) {
          setMeetup(meetupData)

          // Initialize form with current values
          setDate(new Date(meetupData.meetup.date))
          setTime(meetupData.meetup.time)
          setLocation(meetupData.meetup.location.name)
          setNotes(meetupData.meetup.notes || "")
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
      // Determine what's being changed
      const actualChangeType: "location" | "date" | "time" | "both" = changeType
      const changeData: any = {}

      if (changeType === "location" || changeType === "both") {
        changeData.proposedLocation = {
          id: `loc-custom-${Date.now()}`,
          name: location,
          address: location, // In a real app, you'd geocode this
          type: "custom",
          coordinates: { lat: 40.7128, lng: -74.006 }, // Default to NYC
        }
      }

      if ((changeType === "date" || changeType === "both") && date) {
        changeData.proposedDate = date.toISOString().split("T")[0]
      }

      if (changeType === "time" || changeType === "both") {
        changeData.proposedTime = time
      }

      if (notes) {
        changeData.notes = notes
      }

      // Request the change
      await requestMeetupChange(id, actualChangeType, changeData)

      toast({
        title: "Reschedule request sent",
        description: "Your request to reschedule the meetup has been sent.",
      })

      router.push(`/trade-meetup/suggested/${id}`)
    } catch (error) {
      console.error("Error requesting meetup change:", error)
      toast({
        title: "Error",
        description: "Failed to request meetup change. Please try again.",
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
          <h1 className="text-2xl font-bold">Reschedule Meetup</h1>
          <p className="text-muted-foreground">Propose new date, time, or location for your meetup</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Current Meetup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Date & Time</h4>
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
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">What would you like to change?</h3>
                  <Select value={changeType} onValueChange={(value) => setChangeType(value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select what to change" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location">Location Only</SelectItem>
                      <SelectItem value="date">Date Only</SelectItem>
                      <SelectItem value="time">Time Only</SelectItem>
                      <SelectItem value="both">Date, Time & Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(changeType === "location" || changeType === "both") && (
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="location">New Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter address or place name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {(changeType === "date" || changeType === "both") && (
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="date">New Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                {(changeType === "time" || changeType === "both") && (
                  <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="time">New Time</Label>
                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="grid gap-1.5">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional details or instructions"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Request Reschedule"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
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

          <Card className="mt-6">
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
                  <p className="text-sm text-muted-foreground">Trading Partner</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => router.push(`/messages/${meetup.recipient.id}`)}
              >
                Message Trader
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

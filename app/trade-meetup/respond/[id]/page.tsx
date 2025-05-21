"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ArrowLeft, CalendarIcon, Clock, MapPin } from "lucide-react"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"

export default function RespondToMeetupPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getMeetup, confirmMeetup, requestMeetupChange } = useMeetup()
  const { id } = params
  const [response, setResponse] = useState("accept")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [meetup, setMeetup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load meetup data
  useEffect(() => {
    const loadMeetup = () => {
      setIsLoading(true)
      try {
        const meetupData = getMeetup(id)
        
        if (meetupData) {
          setMeetup(meetupData)
          
          // If there's a change request, pre-fill the form with the original values
          if (meetupData.changeRequested) {
            if (meetupData.changeRequested.type === 'date' || meetupData.changeRequested.type === 'both') {
              setDate(new Date(meetupData.meetup.date))
            }
            
            if (meetupData.changeRequested.type === 'time' || meetupData.changeRequested.type === 'both') {
              setTime(meetupData.meetup.time)
            }
            
            if (meetupData.changeRequested.type === 'location') {
              setLocation(meetupData.meetup.location.name)
            }
          } else {
            // No change request, just set the current values
            setDate(new Date(meetupData.meetup.date))
            setTime(meetupData.meetup.time)
            setLocation(meetupData.meetup.location.name)
          }
        } else {
          // If no meetup found, use mock data
          const mockMeetupRequest = {
            id: id,
            trade: {
              id: "trade-123",
              title: "Vintage Camera for Gaming Console",
              yourItem: {
                title: "Gaming Console",
                image: "/placeholder.svg?height=100&width=100&text=Console",
              },
              theirItem: {
                title: "Vintage Camera",
                image: "/placeholder.svg?height=100&width=100&text=Camera",
              },
              owner: {
                id: "user-789",
                name: "Jamie Smith",
                avatar: "/placeholder.svg?height=50&width=50&text=JS",
              },
            },
            location: {
              name: "Madison Square Park",
              address: "Madison Ave & E 23rd St, New York, NY 10010",
            },
            date: "May 25, 2025",
            time: "2:30 PM",
            notes: "I'll be wearing a blue jacket. Let's meet near the fountain.",
            createdAt: "May 15, 2025",
          }
          
          setMeetup(mockMeetupRequest)
          setDate(new Date("2025-05-25"))
          setTime("14:30")
          setLocation("Madison Square Park")
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
      if (response === "accept") {
        // Accept the meetup as is
        await confirmMeetup(id)
        router.push(`/trade-meetup/accepted/${id}`)
      } else if (response === "suggest") {
        // Determine what's being changed
        let changeType: "location" | "date" | "time" | "both" = "location"
        const changeData: any = {}
        
        if (location !== meetup.meetup.location.name) {
          changeType = "location"
          changeData.proposedLocation = {
            id: `loc-custom-${Date.now()}`,
            name: location,
            address: location, // In a real app, you'd geocode this
            type: "custom",
            coordinates: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
          }
        }
        
        if (date && date.toISOString().split('T')[0] !== meetup.meetup.date) {
          changeType = changeType === "location" ? "both" : "date"
          changeData.proposedDate = date.toISOString().split('T')[0]
        }
        
        if (time !== meetup.meetup.time) {
          changeType = changeType === "location" || changeType === "both" ? "both" : "time"
          changeData.proposedTime = time
        }
        
        if (notes) {
          changeData.notes = notes
        }
        
        // Request the change
        await requestMeetupChange(id, changeType, changeData)
        router.push(`/trade-meetup/suggested/${id}`)
      } else {
        // Decline the meetup
        // In a real app, you'd call an API to decline
        setTimeout(() => {
          router.push(`/my-trades`)
        }, 1500)
      }
    } catch (error) {
      console.error("Error processing meetup response:", error)
      toast({
        title: "Error",
        description: "Failed to process your response. Please try again.",
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
            <CardDescription>The meetup you're looking for doesn't exist or has been removed.</CardDescription>
          </CardHeader>
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
          <h1 className="text-2xl font-bold">Respond to Meetup Request</h1>
          <p className="text-muted-foreground">
            {meetup.initiator?.name || meetup.trade?.owner?.name || "Another user"} has requested to meet for your trade
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Meetup Request</CardTitle>
                <CardDescription>Review the proposed meetup details and respond</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Proposed Meetup Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">
                          {meetup.meetup?.location?.name || meetup.location?.name || "Location"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {meetup.meetup?.location?.address || meetup.location?.address || "Address"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-sm text-muted-foreground">{meetup.meetup?.date || meetup.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Time</h4>
                        <p className="text-sm text-muted-foreground">{meetup.meetup?.time || meetup.time}</p>
                      </div>
                    </div>
                    {(meetup.meetup?.notes || meetup.notes) && (
                      <div className="pt-2">
                        <h4 className="font-medium">Additional Notes</h4>
                        <p className="text-sm text-muted-foreground">{meetup.meetup?.notes || meetup.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Your Response</h3>
                  <RadioGroup value={response} onValueChange={setResponse} className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="accept" id="accept" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="accept" className="font-medium">
                          Accept the meetup request
                        </Label>
                        <p className="text-sm text-muted-foreground">I agree with the proposed time and location</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="suggest" id="suggest" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="suggest" className="font-medium">
                          Suggest changes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I'd like to suggest a different time or location
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="decline" id="decline" className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="decline" className="font-medium">
                          Decline the meetup
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I'm not interested in proceeding with this trade
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {response === "suggest" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Suggest Alternative</h4>
                    <div className="grid gap-4">
                      <div className="grid gap-1.5">
                        <Label htmlFor="alt-location">Alternative Location</Label>
                        <Input
                          id="alt-location"
                          placeholder="Enter address or place name"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="alt-date">Alternative Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="alt-date"
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
                        <div className="grid gap-1.5">
                          <Label htmlFor="alt-time">Alternative Time</Label>
                          <Input id="alt-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {response === "decline" && (
                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="font-medium">Reason for Declining</h4>
                    <div className="grid gap-1.5">
                      <Label htmlFor="decline-reason">Message to Trader</Label>
                      <Textarea
                        id="decline-reason"
                        placeholder="Explain why you're declining the meetup request"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {response !== "decline" && (
                  <div className="grid gap-1.5">
                    <Label htmlFor="response-notes">Additional Notes</Label>
                    <Textarea
                      id="response-notes"
                      placeholder="Add any additional details or instructions"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || (response === "decline" && !notes)}
                  variant={response === "decline" ? "destructive" : "default"}
                >
                  {isSubmitting
                    ? "Sending..."
                    : response === "accept"
                      ? "Accept Meetup"
                      : response === "suggest"
                        ? "Suggest Changes"
                        : "Decline Meetup"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Trade Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetup.trade?.yourItem?.image || "/placeholder.svg"}
                    alt={meetup.trade?.yourItem?.title || "Your item"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Your Item</h3>
                  <p className="text-sm text-muted-foreground">{meetup.trade?.yourItem?.title || "Your item"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                  <Image
                    src={meetup.trade?.theirItem?.image || "/placeholder.svg"}
                    alt={meetup.trade?.theirItem?.title || "Their item"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Their Item</h3>
                  <p className="text-sm text-muted-foreground">{meetup.trade?.theirItem?.title || "Their item"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative h-10 w-10

I notice that you're asking about implementing the meetup system, but your original request was about making the \"View Details" button in the trade card on the map view functional. Let me focus on that specific task first:

```typescriptreact file="components/map/trade-popup.tsx"
[v0-no-op-code-block-prefix]"use client"

import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCategoryIcon } from "@/lib/category-utils"
import { useRouter } from "next/navigation";

export function TradePopup({ trade, position, onClose, onView }) {
  const IconComponent = getCategoryIcon(trade.category)
  const router = useRouter();

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 120}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="w-64 rounded-lg border bg-card p-3 shadow-lg">
        <div className="flex justify-between">
          <h3 className="font-medium">{trade.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
            {trade.image ? (
              <img src={trade.image || "/placeholder.svg"} alt={trade.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <IconComponent className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Badge variant="outline" className="mb-1">
              <IconComponent className="mr-1 h-3 w-3" />
              {trade.category}
            </Badge>
            <p className="text-xs text-muted-foreground">{trade.description.substring(0, 50)}...</p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => router.push(`/map/item/${trade.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

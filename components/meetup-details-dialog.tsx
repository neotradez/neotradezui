"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageSquare, Share2, CalendarDays } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function MeetupDetailsDialog({ open, onOpenChange, meetup }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSharing, setIsSharing] = useState(false)

  if (!meetup) return null

  const handleShare = () => {
    setIsSharing(true)

    // Simulate sharing functionality
    setTimeout(() => {
      setIsSharing(false)
      toast({
        title: "Meetup details shared",
        description: "A link has been copied to your clipboard.",
      })
    }, 1000)
  }

  const handleAddToCalendar = () => {
    toast({
      title: "Added to calendar",
      description: "The meetup has been added to your calendar.",
    })
  }

  const meetupDate = new Date(meetup.meetup.date)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Meetup Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-medium">Location</h3>
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{meetup.meetup.location.name}</h4>
                  <p className="text-sm text-muted-foreground">{meetup.meetup.location.address}</p>
                  {meetup.meetup.location.safetyRating && (
                    <Badge variant="outline" className="mt-2">
                      Safety Rating: {meetup.meetup.location.safetyRating}/5
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <h3 className="mb-2 mt-4 text-lg font-medium">Date & Time</h3>
            <div className="rounded-lg border p-4">
              <div className="space-y-4">
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
            </div>

            {meetup.meetup.notes && (
              <>
                <h3 className="mb-2 mt-4 text-lg font-medium">Notes</h3>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">{meetup.meetup.notes}</p>
                </div>
              </>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Trade Details</h3>
            <div className="rounded-lg border p-4">
              <div className="space-y-4">
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

            <h3 className="mb-2 mt-4 text-lg font-medium">Trader Information</h3>
            <div className="rounded-lg border p-4">
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
                onClick={() => {
                  router.push(`/messages/${meetup.recipient.id}`)
                  onOpenChange(false)
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={handleShare} disabled={isSharing}>
            <Share2 className="mr-2 h-4 w-4" />
            {isSharing ? "Sharing..." : "Share Details"}
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleAddToCalendar}>
            <CalendarDays className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              router.push(`/trade-meetup/reschedule/${meetup.id}`)
              onOpenChange(false)
            }}
          >
            Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

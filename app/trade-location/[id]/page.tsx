"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Navigation, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock meetup data - in a real app, this would come from an API
const mockMeetups = [
  {
    id: "meetup-1",
    title: "Vintage Camera for Gaming Console",
    location: "Central Park - Columbus Circle Entrance",
    coordinates: { lat: 40.7681, lng: -73.9806 },
    with: { name: "Alex Johnson" },
  },
  {
    id: "meetup-2",
    title: "Mechanical Keyboard for Vinyl Records",
    location: "Starbucks - Union Square",
    coordinates: { lat: 40.7359, lng: -73.9911 },
    with: { name: "Sam Wilson" },
  },
  {
    id: "meetup-3",
    title: "Mountain Bike for Designer Sunglasses",
    location: "Bryant Park",
    coordinates: { lat: 40.7536, lng: -73.9832 },
    with: { name: "Jamie Lee" },
  },
  {
    id: "meetup-4",
    title: "Headphones for Smart Watch",
    location: "Washington Square Park",
    coordinates: { lat: 40.7308, lng: -73.9973 },
    with: { name: "Taylor Reed" },
  },
  {
    id: "meetup-5",
    title: "Drone for Camera Lens",
    location: "Madison Square Park",
    coordinates: { lat: 40.742, lng: -73.9874 },
    with: { name: "Jordan Smith" },
  },
]

// Google Maps API key would normally be stored in environment variables
// For this example, we'll use a placeholder
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

export default function TradeMeetupLocationPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [meetup, setMeetup] = useState<any | null>(null)
  const [mapUrl, setMapUrl] = useState<string>("")

  useEffect(() => {
    const fetchMeetupData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 800))

        const meetupId = params.id as string
        const foundMeetup = mockMeetups.find((m) => m.id === meetupId)

        if (foundMeetup) {
          setMeetup(foundMeetup)

          // Create the Google Maps embed URL
          // Using the embed API to create a map with a marker
          const { lat, lng } = foundMeetup.coordinates
          const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=17&maptype=roadmap`

          // For demo purposes, we'll use a static map URL that doesn't require an API key
          const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`

          // For this demo, we'll use an iframe that doesn't require an API key
          const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343077!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzA1LjIiTiA3M8KwNTgnNTAuNCJX!5e0!3m2!1sen!2sus!4v1620841112403!5m2!1sen!2sus`

          setMapUrl(googleMapsUrl)
        } else {
          toast({
            title: "Error",
            description: "Meetup location not found",
            variant: "destructive",
          })
          router.push("/schedule")
        }
      } catch (error) {
        console.error("Error fetching meetup location:", error)
        toast({
          title: "Error",
          description: "Failed to load meetup location. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeetupData()
  }, [params.id, router, toast])

  const handleOpenInMaps = () => {
    if (meetup && meetup.coordinates) {
      const { lat, lng } = meetup.coordinates
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")
    }
  }

  const handleShare = () => {
    // Create a Google Maps URL for the location
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${meetup.location}`)}`

    // Copy to clipboard
    navigator.clipboard.writeText(googleMapsUrl).then(
      () => {
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste and share the location link",
        })
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        })
      },
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading meetup location...</p>
        </div>
      </div>
    )
  }

  if (!meetup) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-medium">Meetup location not found</p>
          <Button onClick={() => router.push("/schedule")}>Return to Schedule</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{meetup.title}</h1>
            <p className="text-sm text-muted-foreground">Trade with {meetup.with.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleOpenInMaps}>
            <Navigation className="mr-2 h-4 w-4" />
            Open in Google Maps
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        {/* Actual Google Maps Embed */}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map location for ${meetup.title}`}
          aria-label={`Map showing the location for trade meetup at ${meetup.location}`}
        ></iframe>
      </div>

      {/* Footer */}
      <div className="border-t bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{meetup.location}</p>
            <p className="text-sm text-muted-foreground">
              Coordinates: {meetup.coordinates.lat.toFixed(6)}, {meetup.coordinates.lng.toFixed(6)}
            </p>
          </div>
          <Button onClick={() => router.back()}>Back to Schedule</Button>
        </div>
      </div>
    </div>
  )
}

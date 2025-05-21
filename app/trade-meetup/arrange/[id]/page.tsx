"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  ArrowLeft,
  CalendarIcon,
  Check,
  Clock,
  Coffee,
  MapPin,
  MessageSquare,
  Shield,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useMeetup } from "@/context/meetup-context"
import { useToast } from "@/hooks/use-toast"

export default function TradeMeetupArrangePage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { proposeMeetup } = useMeetup()
  const { id } = params
  const [meetupType, setMeetupType] = useState("midpoint")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [date, setDate] = useState(null)
  const [timeRange, setTimeRange] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mapTab, setMapTab] = useState("map")
  const [trade, setTrade] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock trade data
  useEffect(() => {
    const fetchTradeData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        setTrade({
          id: id || "trade-123",
          referenceNumber: "NT" + (id || "123456").substring(0, 6).toUpperCase(),
          status: "Accepted",
          yourItem: {
            title: "Vintage Polaroid Camera",
            image: "/placeholder.svg?height=100&width=100&text=Camera",
            condition: "Good",
            rarity: "Uncommon",
            location: "Brooklyn, NY",
            coordinates: { lat: 40.6782, lng: -73.9442 },
          },
          theirItem: {
            title: "PlayStation 5 Console",
            image: "/placeholder.svg?height=100&width=100&text=PS5",
            condition: "Like New",
            rarity: "Common",
            location: "Manhattan, NY",
            coordinates: { lat: 40.7831, lng: -73.9712 },
          },
          trader: {
            id: "user-456",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=50&width=50&text=AJ",
            rating: 4.8,
            trades: 24,
            location: "Manhattan, NY",
            coordinates: { lat: 40.7831, lng: -73.9712 },
          },
          acceptedDate: "2025-05-16T10:15:00",
        })
      } catch (error) {
        console.error("Error fetching trade data:", error)
        toast({
          title: "Error",
          description: "Failed to load trade data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTradeData()
  }, [id, toast])

  // Filter state for popular locations
  const [boroughFilter, setBoroughFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filtered popular locations
  const filteredPopularLocations = popularLocations.filter((location) => {
    const matchesBorough = boroughFilter === "all" || location.borough.toLowerCase() === boroughFilter.toLowerCase()
    const matchesType = typeFilter === "all" || location.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesBorough && matchesType
  })

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }

  const handleSubmit = async () => {
    if (!selectedLocation || !date || !timeRange) {
      toast({
        title: "Missing information",
        description: "Please select a location, date, and time for the meetup.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create meetup data
      const meetupData = {
        trade: {
          id: trade.id,
          title: `${trade.yourItem.title} for ${trade.theirItem.title}`,
          yourItem: {
            id: `your-item-${Date.now()}`,
            title: trade.yourItem.title,
            image: trade.yourItem.image,
            condition: trade.yourItem.condition,
            rarity: trade.yourItem.rarity,
          },
          theirItem: {
            id: `their-item-${Date.now()}`,
            title: trade.theirItem.title,
            image: trade.theirItem.image,
            condition: trade.theirItem.condition,
            rarity: trade.theirItem.rarity,
          },
          owner: {
            id: trade.trader.id,
            name: trade.trader.name,
            avatar: trade.trader.avatar,
            location: {
              address: trade.trader.location,
              coordinates: trade.trader.coordinates,
            },
          },
        },
        initiator: {
          id: "user-123", // Current user ID (mock)
          name: "Current User", // Current user name (mock)
          avatar: "/placeholder.svg?height=50&width=50&text=CU",
          location: {
            address: trade.yourItem.location,
            coordinates: trade.yourItem.coordinates,
          },
        },
        recipient: {
          id: trade.trader.id,
          name: trade.trader.name,
          avatar: trade.trader.avatar,
          location: {
            address: trade.trader.location,
            coordinates: trade.trader.coordinates,
          },
        },
        meetup: {
          location: selectedLocation,
          date: date.toISOString().split("T")[0],
          time: getTimeFromRange(timeRange),
          timeRange: timeRange,
          notes: notes,
        },
        status: "proposed",
      }

      // Call the context function to propose the meetup
      const newMeetup = await proposeMeetup(meetupData)

      // Navigate to confirmation page
      router.push(`/trade-meetup/confirmation/${newMeetup.id}`)
    } catch (error) {
      console.error("Error creating meetup:", error)
      toast({
        title: "Error",
        description: "Failed to create meetup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to get a time string from the time range
  const getTimeFromRange = (range) => {
    switch (range) {
      case "morning":
        return "10:00 AM"
      case "afternoon":
        return "2:00 PM"
      case "evening":
        return "6:00 PM"
      default:
        return "12:00 PM"
    }
  }

  // Calculate midpoint between two coordinates
  const calculateMidpoint = (coord1, coord2) => {
    return {
      lat: (coord1.lat + coord2.lat) / 2,
      lng: (coord1.lng + coord2.lng) / 2,
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading trade details...</p>
        </div>
      </div>
    )
  }

  const midpoint = trade ? calculateMidpoint(trade.yourItem.coordinates, trade.theirItem.coordinates) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Arrange Meetup</h1>
            <p className="text-muted-foreground">Set up a time and place to complete your trade</p>
          </div>
        </div>

        {/* Trade Summary Card */}
        <Card className="mb-8 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mb-2 bg-green-500/10 text-green-500">
                  Trade Accepted
                </Badge>
                <h2 className="text-xl font-semibold">{trade.referenceNumber}</h2>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>Accepted on {new Date(trade.acceptedDate).toLocaleDateString()}</div>
                <div>{new Date(trade.acceptedDate).toLocaleTimeString()}</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                    <Image
                      src={trade.yourItem.image || "/placeholder.svg"}
                      alt={trade.yourItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Your Item</h3>
                    <p className="text-lg font-semibold">{trade.yourItem.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{trade.yourItem.rarity}</span>
                      <span>•</span>
                      <span>{trade.yourItem.condition}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{trade.yourItem.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                    <Image
                      src={trade.theirItem.image || "/placeholder.svg"}
                      alt={trade.theirItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Their Item</h3>
                      <div className="flex items-center gap-1">
                        <div className="relative h-5 w-5 overflow-hidden rounded-full">
                          <Image
                            src={trade.trader.avatar || "/placeholder.svg"}
                            alt={trade.trader.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{trade.trader.name}</span>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">{trade.theirItem.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{trade.theirItem.rarity}</span>
                      <span>•</span>
                      <span>{trade.theirItem.condition}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{trade.theirItem.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Meetup Type Selection */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Choose Meetup Type</h2>
              <RadioGroup value={meetupType} onValueChange={setMeetupType} className="grid gap-4 md:grid-cols-2">
                <div
                  className={cn(
                    "flex cursor-pointer flex-col rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40",
                    meetupType === "midpoint" && "border-[#00D084]/50 ring-1 ring-[#00D084]/20",
                  )}
                >
                  <RadioGroupItem value="midpoint" id="midpoint" className="sr-only" />
                  <Label htmlFor="midpoint" className="flex cursor-pointer flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00D084]/10">
                      <MapPin className="h-6 w-6 text-[#00D084]" />
                    </div>
                    <span className="text-lg font-medium">Meet at Calculated Midpoint</span>
                    <p className="text-sm text-muted-foreground">
                      We'll suggest locations roughly halfway between you and the other trader
                    </p>
                  </Label>
                </div>

                <div
                  className={cn(
                    "flex cursor-pointer flex-col rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40",
                    meetupType === "popular" && "border-[#00D084]/50 ring-1 ring-[#00D084]/20",
                  )}
                >
                  <RadioGroupItem value="popular" id="popular" className="sr-only" />
                  <Label htmlFor="popular" className="flex cursor-pointer flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10">
                      <Coffee className="h-6 w-6 text-[#3B82F6]" />
                    </div>
                    <span className="text-lg font-medium">Meet at Popular Location</span>
                    <p className="text-sm text-muted-foreground">
                      Choose from curated safe public locations like cafés, malls, and parks
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Map and Location Selection */}
            <div className="mb-6 rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <div className="border-b border-border/40 p-4 dark:border-border/20">
                <h2 className="text-xl font-semibold">
                  {meetupType === "midpoint" ? "Suggested Midpoint Locations" : "Popular Meetup Locations"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {meetupType === "midpoint"
                    ? "These locations are approximately halfway between you and the other trader"
                    : "Choose from these safe, public locations for your meetup"}
                </p>
              </div>

              <Tabs value={mapTab} onValueChange={setMapTab} className="p-4">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="map">Map View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>

                  {meetupType === "popular" && (
                    <div className="flex gap-2">
                      <Select value={boroughFilter} onValueChange={setBoroughFilter}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Borough" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Boroughs</SelectItem>
                          <SelectItem value="manhattan">Manhattan</SelectItem>
                          <SelectItem value="brooklyn">Brooklyn</SelectItem>
                          <SelectItem value="queens">Queens</SelectItem>
                          <SelectItem value="bronx">Bronx</SelectItem>
                          <SelectItem value="staten island">Staten Island</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="park">Parks</SelectItem>
                          <SelectItem value="plaza">Plazas</SelectItem>
                          <SelectItem value="market">Markets</SelectItem>
                          <SelectItem value="bar">Bars</SelectItem>
                          <SelectItem value="garden">Gardens</SelectItem>
                          <SelectItem value="beach">Beaches</SelectItem>
                          <SelectItem value="mall">Malls</SelectItem>
                          <SelectItem value="café">Cafés</SelectItem>
                          <SelectItem value="police station">Police Stations</SelectItem>
                          <SelectItem value="library">Libraries</SelectItem>
                          <SelectItem value="store">Stores</SelectItem>
                          <SelectItem value="transit hub">Transit Hubs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Update the map visualization section to use a Google Maps embed with markers for these locations */}
                {/* Replace the existing TabsContent value="map" section with this updated one */}
                <TabsContent value="map" className="mt-4">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border">
                    {/* Map Visualization */}
                    <div className="h-full w-full">
                      {meetupType === "midpoint" ? (
                        // Midpoint Map View
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus`}
                          className="h-full w-full border-0"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps - Midpoint Locations"
                        ></iframe>
                      ) : (
                        // Popular Locations Map View
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus`}
                          className="h-full w-full border-0"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps - Popular Meetup Locations"
                        ></iframe>
                      )}
                    </div>

                    {/* Map Overlay with Location Markers */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* This would be replaced with actual map markers in a production environment */}
                      {meetupType === "popular" && (
                        <div className="relative h-full w-full">
                          {/* Manhattan Locations */}
                          <div className="absolute" style={{ left: "40%", top: "30%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "42%", top: "35%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "38%", top: "32%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "36%", top: "25%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "34%", top: "33%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "37%", top: "28%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "35%", top: "34%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white">
                              <ShoppingBag className="h-3 w-3" />
                            </div>
                          </div>

                          {/* Brooklyn Locations */}
                          <div className="absolute" style={{ left: "60%", top: "50%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "63%", top: "45%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "58%", top: "55%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "62%", top: "48%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <ShoppingBag className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "64%", top: "43%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "66%", top: "46%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EC4899] text-white">
                              <Coffee className="h-3 w-3" />
                            </div>
                          </div>

                          {/* Queens Locations */}
                          <div className="absolute" style={{ left: "75%", top: "35%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "68%", top: "38%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "65%", top: "30%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "78%", top: "32%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "67%", top: "33%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "80%", top: "40%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <ShoppingBag className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "72%", top: "60%" }}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                              <MapPin className="h-3 w-3" />
                            </div>
                          </div>

                          {/* Your Location */}
                          <div className="absolute" style={{ left: "55%", top: "52%" }}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-white">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          </div>

                          {/* Their Location */}
                          <div className="absolute" style={{ left: "45%", top: "30%" }}>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white ring-2 ring-white">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          </div>

                          {/* Hover tooltips for a few example locations */}
                          <div className="absolute" style={{ left: "40%", top: "26%" }}>
                            <div className="rounded-md bg-background/90 px-2 py-1 text-xs shadow-md backdrop-blur-sm">
                              Washington Square Park
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "60%", top: "46%" }}>
                            <div className="rounded-md bg-background/90 px-2 py-1 text-xs shadow-md backdrop-blur-sm">
                              Brooklyn Bridge Park
                            </div>
                          </div>
                          <div className="absolute" style={{ left: "75%", top: "31%" }}>
                            <div className="rounded-md bg-background/90 px-2 py-1 text-xs shadow-md backdrop-blur-sm">
                              Flushing Meadows
                            </div>
                          </div>

                          {/* Note about the map */}
                          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-background/90 px-3 py-2 rounded-md text-xs text-center max-w-xs backdrop-blur-sm">
                            <p>
                              In a production environment, these would be interactive markers with the exact coordinates
                              from the data
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Map Legend */}
                    <div className="absolute bottom-2 left-2 rounded-md bg-background/90 p-2 text-xs backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span>Your Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span>Their Location</span>
                      </div>
                      {meetupType === "midpoint" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#00D084]"></div>
                          <span>Midpoint Locations</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#3B82F6]"></div>
                            <span>Manhattan Locations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#EC4899]"></div>
                            <span>Brooklyn Locations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#10B981]"></div>
                            <span>Queens Locations</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-4 space-y-3">
                  {meetupType === "midpoint" ? (
                    // Midpoint Locations List
                    midpointLocations.map((location) => (
                      <div
                        key={location.id}
                        className={cn(
                          "cursor-pointer rounded-lg border border-border/40 p-4 transition-all hover:border-[#00D084]/50 dark:border-border/20",
                          selectedLocation?.id === location.id &&
                            "border-[#00D084]/50 bg-[#00D084]/5 ring-1 ring-[#00D084]/20",
                        )}
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                              selectedLocation?.id === location.id
                                ? "bg-[#00D084] text-white"
                                : "bg-[#00D084]/10 text-[#00D084]",
                            )}
                          >
                            {location.icon || <MapPin className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{location.name}</h3>
                              <Badge variant="outline" className="bg-[#00D084]/10 text-[#00D084]">
                                Midpoint
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{location.address}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{location.distanceFromYou} miles from you</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{location.distanceFromThem} miles from them</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500" />
                                <span>Safety Rating: {location.safetyRating}/5</span>
                              </div>
                            </div>
                          </div>
                          {selectedLocation?.id === location.id && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D084]">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : // Popular Locations List
                  filteredPopularLocations.length > 0 ? (
                    filteredPopularLocations.map((location) => (
                      <div
                        key={location.id}
                        className={cn(
                          "cursor-pointer rounded-lg border border-border/40 p-4 transition-all hover:border-[#3B82F6]/50 dark:border-border/20",
                          selectedLocation?.id === location.id &&
                            "border-[#3B82F6]/50 bg-[#3B82F6]/5 ring-1 ring-[#3B82F6]/20",
                        )}
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                              selectedLocation?.id === location.id
                                ? "bg-[#3B82F6] text-white"
                                : "bg-[#3B82F6]/10 text-[#3B82F6]",
                            )}
                          >
                            {location.icon || <MapPin className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{location.name}</h3>
                              <Badge variant="outline" className="bg-[#3B82F6]/10 text-[#3B82F6]">
                                {location.type}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{location.address}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{location.distanceFromYou} miles from you</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{location.openingHours}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500" />
                                <span>Safety Rating: {location.safetyRating}/5</span>
                              </div>
                            </div>
                          </div>
                          {selectedLocation?.id === location.id && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6]">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-muted/50 p-3">
                        <MapPin className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 font-medium">No locations found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Try adjusting your filters to see more options
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Selected Location Details */}
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
              >
                <h2 className="mb-2 text-lg font-semibold">Selected Location</h2>
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                      meetupType === "midpoint" ? "bg-[#00D084] text-white" : "bg-[#3B82F6] text-white",
                    )}
                  >
                    {selectedLocation.icon || <MapPin className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedLocation.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedLocation.distanceFromYou} miles from you</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedLocation.distanceFromThem} miles from them</span>
                      </div>
                      {selectedLocation.openingHours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{selectedLocation.openingHours}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-500" />
                        <span>Safety Rating: {selectedLocation.safetyRating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Date and Time Selection */}
            <div className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <h2 className="mb-4 text-lg font-semibold">Suggest Meetup Time</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="date" className="mb-2 block">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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
                <div>
                  <Label htmlFor="time-range" className="mb-2 block">
                    Time Range
                  </Label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger id="time-range">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5:00 PM - 9:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="notes" className="mb-2 block">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details or instructions for the meetup"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Messaging Reminder */}
            <Alert className="mb-6 border-amber-500/20 bg-amber-500/10">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle>Direct Chat Will Open After Confirmation</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                After confirming, a direct chat will open for planning details. You may cancel this trade before the
                meetup time.
              </AlertDescription>
            </Alert>

            {/* Safety Reminders */}
            <div className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <h2 className="mb-4 text-lg font-semibold">Safety Reminders</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#00D084]/10">
                    <MapPin className="h-6 w-6 text-[#00D084]" />
                  </div>
                  <h3 className="font-medium">Always Meet in Public</h3>
                  <p className="text-sm text-muted-foreground">Choose busy locations with plenty of people around</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6]/10">
                    <Users className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="font-medium">Bring a Friend</h3>
                  <p className="text-sm text-muted-foreground">It's always safer to have someone with you</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#EC4899]/10">
                    <Shield className="h-6 w-6 text-[#EC4899]" />
                  </div>
                  <h3 className="font-medium">Trust Your Instincts</h3>
                  <p className="text-sm text-muted-foreground">If something feels off, don't hesitate to leave</p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="sticky bottom-4 flex justify-end">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                disabled={!selectedLocation || !date || !timeRange || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Confirming..." : "Confirm Meetup Location"}
              </Button>
            </div>
          </div>

          <div>
            {/* Trader Profile Card */}
            <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={trade.trader.avatar || "/placeholder.svg"}
                      alt={trade.trader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{trade.trader.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">{trade.trader.rating}</span>
                      <span className="text-sm text-muted-foreground">({trade.trader.trades} trades)</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{trade.trader.location}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/messages/${trade.trader.id}`)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Trader
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <div className="space-y-4">
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <h3 className="mb-2 font-medium">What to Bring</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Your item in the condition described</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Trade reference number ({trade.referenceNumber})</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Photo ID for verification (recommended)</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <h3 className="mb-2 font-medium">After the Trade</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Mark the trade as completed in the site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Leave a review for the other trader</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#00D084]" />
                    <span>Report any issues immediately if they arise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock midpoint locations
const midpointLocations = [
  {
    id: "mid-1",
    name: "Central Park - Columbus Circle Entrance",
    address: "Columbus Circle, New York, NY 10019",
    type: "midpoint",
    coordinates: { lat: 40.7679, lng: -73.9814 },
    distanceFromYou: 2.3,
    distanceFromThem: 2.1,
    safetyRating: 4.7,
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "mid-2",
    name: "Starbucks - Union Square",
    address: "25 Union Square W, New York, NY 10003",
    type: "midpoint",
    coordinates: { lat: 40.7359, lng: -73.9911 },
    distanceFromYou: 1.8,
    distanceFromThem: 2.5,
    safetyRating: 4.5,
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: "mid-3",
    name: "Bryant Park",
    address: "Between 40th and 42nd Streets & Fifth and Sixth Avenues, New York, NY 10018",
    type: "midpoint",
    coordinates: { lat: 40.7536, lng: -73.9832 },
    distanceFromYou: 2.7,
    distanceFromThem: 1.9,
    safetyRating: 4.6,
    icon: <MapPin className="h-4 w-4" />,
  },
]

// Mock popular locations
const popularLocations = [
  {
    id: "man-1",
    name: "Washington Square Park Arch",
    address: "Washington Square N, New York, NY 10012",
    type: "Park",
    borough: "Manhattan",
    coordinates: { lat: 40.730823, lng: -73.997332 },
    distanceFromYou: 2.8,
    distanceFromThem: 3.2,
    safetyRating: 4.7,
    openingHours: "Open 24 hours",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "man-2",
    name: "Union Square Park",
    address: "E 14th St & Union Square W, New York, NY 10003",
    type: "Park",
    borough: "Manhattan",
    coordinates: { lat: 40.735863, lng: -73.991084 },
    distanceFromYou: 2.5,
    distanceFromThem: 2.9,
    safetyRating: 4.6,
    openingHours: "Open 24 hours",
    icon: <MapPin className="h-4 w-4" />,
  },
  // More locations omitted for brevity
]

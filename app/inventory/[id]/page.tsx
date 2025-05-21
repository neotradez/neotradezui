"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Bookmark, Share, Flag, ChevronLeft, ChevronRight, Bell, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemLocationView } from "@/components/item-location-view"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function InventoryItemPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("details")
  const [isSaved, setIsSaved] = useState(false)
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call with loading state
    setLoading(true)

    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // In a real app, this would fetch from an API
        const mockItems = [
          {
            id: "1",
            title: "Vintage Camera",
            description:
              "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors. This camera features manual focus, adjustable aperture, and a classic design that has stood the test of time. The camera comes with its original leather case and strap, both in excellent condition. The lens is clear with no scratches or fungus, and all mechanical parts are functioning properly.",
            category: "Electronics",
            condition: "Good",
            rarity: "Uncommon",
            images: [
              "/placeholder.svg?height=500&width=500",
              "/placeholder.svg?height=500&width=500&text=Side+View",
              "/placeholder.svg?height=500&width=500&text=Back+View",
            ],
            status: "available",
            rating: 4.5,
            dateAdded: "2023-11-15",
            details: {
              brand: "Canon",
              model: "AE-1",
              year: "1976",
              features: ["Manual focus", "35mm film", "Built-in light meter"],
            },
            location: {
              address: "Brooklyn, NY 11201",
              city: "Brooklyn",
              state: "NY",
              distance: "2.3 miles away",
              lat: 40.6782,
              lng: -73.9442,
            },
            seller: {
              id: 101,
              name: "Alex Johnson",
              rating: 4.8,
              trades: 32,
              joinedDate: "2022-03-15",
              avatar: "/placeholder.svg?height=40&width=40",
              responseTime: "Usually responds within 2 hours",
            },
            referenceNumber: "ITEM-7829",
            listed: "2 days ago",
            views: 42,
            saves: 5,
          },
          {
            id: "2",
            title: "Mechanical Keyboard",
            description:
              "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience. This keyboard features a full ANSI layout with dedicated media controls and a volume knob. The RGB lighting is fully customizable with software, allowing for per-key lighting effects. The keyboard has a detachable USB-C cable for easy transport and replacement.",
            category: "Electronics",
            condition: "Like New",
            rarity: "Rare",
            images: [
              "/images/mechanical-keyboard.jpeg",
              "/placeholder.svg?height=500&width=500&text=Side+View",
              "/placeholder.svg?height=500&width=500&text=With+RGB+on",
            ],
            status: "available",
            rating: 4.8,
            dateAdded: "2023-12-01",
            details: {
              brand: "Ducky",
              model: "One 2 RGB",
              switches: "Cherry MX Brown",
              features: ["RGB lighting", "PBT keycaps", "USB-C connection"],
            },
            location: {
              address: "Manhattan, NY 10001",
              city: "Manhattan",
              state: "NY",
              distance: "0.8 miles away",
              lat: 40.7505,
              lng: -73.9934,
            },
            seller: {
              id: 102,
              name: "Sam Taylor",
              rating: 4.9,
              trades: 45,
              joinedDate: "2021-09-07",
              avatar: "/placeholder.svg?height=40&width=40",
              responseTime: "Usually responds within 1 hour",
            },
            referenceNumber: "ITEM-4532",
            listed: "5 days ago",
            views: 87,
            saves: 12,
          },
          {
            id: "3",
            title: "Drone",
            description:
              "Compact drone with 4K camera and 30 minutes of flight time. Includes extra batteries and carrying case. This drone features GPS positioning, return-to-home functionality, and obstacle avoidance sensors. The camera is mounted on a 3-axis gimbal for smooth, stable footage. The drone can be controlled via smartphone app or the included remote controller.",
            category: "Electronics",
            condition: "Like New",
            rarity: "Common",
            images: [
              "/images/drone.webp",
              "/placeholder.svg?height=500&width=500&text=With+Controller",
              "/placeholder.svg?height=500&width=500&text=Camera+Detail",
            ],
            status: "trading",
            rating: 4.7,
            dateAdded: "2023-10-20",
            details: {
              brand: "DJI",
              model: "Mini 2",
              flightTime: "30 minutes",
              features: ["4K camera", "GPS", "Foldable design"],
            },
            location: {
              address: "Queens, NY 11101",
              city: "Queens",
              state: "NY",
              distance: "4.6 miles away",
              lat: 40.7447,
              lng: -73.9485,
            },
            seller: {
              id: 103,
              name: "Jamie Wilson",
              rating: 4.6,
              trades: 19,
              joinedDate: "2022-08-22",
              avatar: "/placeholder.svg?height=40&width=40",
              responseTime: "Usually responds within 3 hours",
            },
            referenceNumber: "ITEM-9876",
            listed: "1 day ago",
            views: 29,
            saves: 8,
          },
        ]

        const foundItem = mockItems.find((i) => i.id === params.id)

        if (!foundItem) {
          setError("Item not found. It may have been removed or is no longer available.")
          setLoading(false)
          return
        }

        setItem(foundItem)
        setCurrentImageIndex(0)
        setLoading(false)
      } catch (err) {
        console.error("Error loading item:", err)
        setError("An error occurred while loading the item. Please try again.")
        setLoading(false)
      }
    }, 1000) // Simulate 1 second loading time

    return () => clearTimeout(timer)
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleSave = () => {
    setIsSaved(!isSaved)

    toast({
      title: isSaved ? "Removed from saved items" : "Saved to your collection",
      description: isSaved
        ? "This item has been removed from your saved trades"
        : "This item has been added to your saved trades",
      duration: 3000,
    })
  }

  const handleShare = () => {
    // Create the item URL
    const itemUrl = `${window.location.origin}/inventory/${item.id}`

    // Copy to clipboard
    navigator.clipboard.writeText(itemUrl).then(
      () => {
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste and share the item link",
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

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for your report. Our team will review this item.",
      duration: 3000,
    })
  }

  const handleEdit = () => {
    router.push(`/inventory/edit/${params.id}`)
  }

  const handleDelete = () => {
    router.push(`/inventory/delete/${params.id}`)
  }

  const handleTrade = () => {
    router.push(`/inventory/trade/${params.id}`)
  }

  const handlePrevImage = () => {
    if (!item) return
    setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!item) return
    setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index)
  }

  const handleGetAlerts = () => {
    toast({
      title: "Alert set",
      description: "You'll be notified when similar items become available.",
      duration: 3000,
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="container flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container max-w-4xl py-12">
        <Button
          variant="ghost"
          className="mb-4 -ml-2 flex h-8 items-center gap-1 px-2 text-muted-foreground"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Inventory</span>
        </Button>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={() => router.push("/inventory")}>Browse Other Items</Button>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container max-w-4xl py-12">
        <Button
          variant="ghost"
          className="mb-4 -ml-2 flex h-8 items-center gap-1 px-2 text-muted-foreground"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Inventory</span>
        </Button>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Item Not Found</AlertTitle>
          <AlertDescription>This item may have been removed or is no longer available.</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={() => router.push("/inventory")}>Browse Other Items</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl pb-20">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-4 -ml-2 mt-4 flex h-8 items-center gap-1 px-2 text-muted-foreground"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Inventory</span>
      </Button>

      {/* Image gallery */}
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          {/* Main image */}
          <div className="relative col-span-1 overflow-hidden rounded-lg bg-accent md:col-span-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${item.title} - Image ${currentImageIndex + 1}`}
                className="h-full w-full object-contain"
              />

              {/* Navigation arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 shadow-sm"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 shadow-sm"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs">
                {currentImageIndex + 1} / {item.images.length}
              </div>
            </div>
          </div>

          {/* Thumbnails - vertical on desktop, horizontal on mobile */}
          <div className="col-span-1 flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-x-visible">
            {item.images.map((image, index) => (
              <button
                key={index}
                className={`relative min-w-[80px] overflow-hidden rounded-md border-2 transition-all ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className="aspect-square w-full">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Item header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <div className="mt-1 flex items-center gap-3">
              <Badge variant="outline">{item.rarity || "Common"}</Badge>
              <span className="text-sm text-muted-foreground">Added {item.dateAdded}</span>
              <span className="text-sm text-muted-foreground">Ref: {item.referenceNumber || "N/A"}</span>
            </div>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={handleGetAlerts}>
                <Bell className="h-4 w-4" />
                Get alerted when similar items are available
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-9 w-9 ${isSaved ? "border-primary" : ""}`}
              onClick={handleSave}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleShare}>
              <Share className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleReport}>
              <Flag className="h-5 w-5" />
              <span className="sr-only">Report</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="owner">Owner</TabsTrigger>
          <TabsTrigger value="location" className={activeTab === "location" ? "bg-primary/10" : ""}>
            Location
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Condition</h3>
              <p>{item.condition}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Category</h3>
              <p>{item.category}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Description</h3>
              <p>{item.description}</p>
            </div>
            {item.details && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Additional Details</h3>
                <div className="grid gap-2">
                  {Object.entries(item.details).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <div>
                        <span className="font-medium capitalize">{key}: </span>
                        {Array.isArray(value) ? (
                          <ul className="ml-2 list-inside list-disc">
                            {value.map((item, index) => (
                              <li key={index} className="text-muted-foreground">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="owner" className="mt-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                src={item.seller?.avatar || "/placeholder.svg"}
                alt={item.seller?.name || "You"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">{item.seller?.name || "You"}</h3>
              {item.seller ? (
                <>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-sm font-medium">{item.seller.rating}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(item.seller.rating) ? "text-yellow-500" : "text-muted-foreground"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Completed trades:</span> {item.seller.trades}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Member since:</span>{" "}
                      {new Date(item.seller.joinedDate).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground">{item.seller.responseTime}</p>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-muted-foreground">This is your item. You can edit or list it for trade.</p>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="location" className="mt-4">
          {item.location && (
            <ItemLocationView
              itemId={item.id}
              itemTitle={item.title}
              location={item.location}
              distance={item.location.distance}
              itemImage={item.images[0]}
              itemCategory={item.category}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4 pb-6 pt-10">
        <div className="container max-w-4xl flex gap-3">
          <Button variant="outline" onClick={handleEdit} className="flex-1">
            Edit Item
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Delete
          </Button>
          <Button
            onClick={handleTrade}
            className="flex-1 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
          >
            <span className="relative z-10">List for Trade</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}

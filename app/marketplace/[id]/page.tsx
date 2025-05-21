"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Share,
  Flag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Bell,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemLocationView } from "@/components/item-location-view"
import { mockUserProfiles } from "@/mock/user-profiles"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { NetworkUserCard } from "@/components/network/network-user-card"
import { Badge } from "@/components/ui/badge"
import { ReportItemDialog } from "@/components/report-item-dialog"

// Mock data for different items
const defaultMockItems = {
  "item-1": {
    id: "item-1",
    title: "Vintage Polaroid SX-70 Camera",
    description:
      "Original Polaroid SX-70 in excellent condition. Tested and working perfectly. Comes with original leather case and manual.",
    price: "$250",
    condition: "Excellent",
    category: "Electronics",
    images: [
      "/images/vintage-camera.jpeg",
      "/placeholder.svg?height=400&width=600&text=Image+2",
      "/placeholder.svg?height=400&width=600&text=Image+3",
    ],
    location: {
      address: "Brooklyn, NY 11201",
      lat: 40.6782,
      lng: -73.9442,
    },
    distance: "2.5 miles",
    seller: {
      id: 101,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100&text=AJ",
      rating: 4.8,
      trades: 27,
      joined: "March 2023",
      responseTime: "Usually responds within 2 hours",
    },
    listed: "2 days ago",
    views: 42,
    saves: 5,
    referenceNumber: "ITEM-7829",
  },
  "item-2": {
    id: "item-2",
    title: "Mechanical Keyboard - Cherry MX Brown",
    description:
      "High-quality mechanical keyboard with Cherry MX Brown switches. Excellent tactile feedback without being too loud. Perfect for both typing and gaming.",
    price: "$120",
    condition: "Like New",
    category: "Electronics",
    images: [
      "/images/mechanical-keyboard.jpeg",
      "/placeholder.svg?height=400&width=600&text=Image+2",
      "/placeholder.svg?height=400&width=600&text=Image+3",
    ],
    location: {
      address: "Manhattan, NY 10001",
      lat: 40.7505,
      lng: -73.9934,
    },
    distance: "1.2 miles",
    seller: {
      id: 102,
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=100&width=100&text=SM",
      rating: 4.5,
      trades: 32,
      joined: "January 2022",
      responseTime: "Usually responds within 1 hour",
    },
    listed: "5 days ago",
    views: 87,
    saves: 12,
    referenceNumber: "ITEM-4532",
  },
  "item-10": {
    id: "item-10",
    title: "DJI Mini 2 Drone - Barely Used",
    description:
      "DJI Mini 2 drone in perfect condition. Only flown a few times. Comes with extra batteries, propellers, and carrying case.",
    price: "$350",
    condition: "Excellent",
    category: "Electronics",
    images: [
      "/images/drone.webp",
      "/placeholder.svg?height=400&width=600&text=Image+2",
      "/placeholder.svg?height=400&width=600&text=Image+3",
    ],
    location: {
      address: "Queens, NY 11101",
      lat: 40.7447,
      lng: -73.9485,
    },
    distance: "3.7 miles",
    seller: {
      id: 103,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
      rating: 4.9,
      trades: 63,
      joined: "August 2023",
      responseTime: "Usually responds within 3 hours",
    },
    listed: "1 day ago",
    views: 29,
    saves: 8,
    referenceNumber: "ITEM-9876",
  },
}

export default function ItemPage({ params }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [isSaved, setIsSaved] = useState(false)
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [sellerProfile, setSellerProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call with loading state
    setLoading(true)

    // Simulate network delay
    const timer = setTimeout(() => {
      try {
        // Get the item based on the ID in the URL
        const itemId = params.id

        // Check if the item exists in our global mockItems object or fall back to default mock items
        let foundItem = null

        if (typeof window !== "undefined" && window.mockItems && window.mockItems[itemId]) {
          // @ts-ignore - This is just for demo purposes
          foundItem = window.mockItems[itemId]
        } else {
          foundItem = defaultMockItems[itemId]
        }

        if (!foundItem) {
          // Item not found, show error
          setError("Item not found. It may have been removed or is no longer available.")
          setLoading(false)
          return
        }

        // Item found, use it
        setItem(foundItem)
        setCurrentImageIndex(0)

        // Find the seller profile
        if (foundItem.seller) {
          const profile = mockUserProfiles.find((p) => p.id === foundItem.seller.id)
          setSellerProfile(profile || null)
        }

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
    const itemUrl = `${window.location.origin}/marketplace/${item.id}`

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
    setIsReportDialogOpen(true)
  }

  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false)
  }

  const handleMessage = () => {
    // In a real app, this would navigate to the messages page
    router.push(`/messages?item=${params.id}`)
  }

  const handleProposeTrade = () => {
    router.push(`/marketplace/propose-trade/${params.id}`)
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

  const handleViewProfile = () => {
    if (item && item.seller) {
      router.push(`/user/${item.seller.id}`)
    }
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
          <span>Back to Marketplace</span>
        </Button>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={() => router.push("/marketplace")}>Browse Other Items</Button>
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
          <span>Back to Marketplace</span>
        </Button>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Item Not Found</AlertTitle>
          <AlertDescription>This item may have been removed or is no longer available.</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button onClick={() => router.push("/marketplace")}>Browse Other Items</Button>
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
        <span>Back to Marketplace</span>
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
              <span className="text-sm text-muted-foreground">Listed {item.listed}</span>
              <span className="text-sm text-muted-foreground">Ref: {item.referenceNumber}</span>
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
          <TabsTrigger value="seller">Seller</TabsTrigger>
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
            {item.additionalDetails && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Additional Details</h3>
                <p>{item.additionalDetails}</p>
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
        <TabsContent value="seller" className="mt-4">
          {sellerProfile ? (
            <NetworkUserCard
              user={{
                id: sellerProfile.id.toString(),
                name: sellerProfile.name,
                avatar: sellerProfile.avatar,
                rating: sellerProfile.rating,
                trades: sellerProfile.reviewCount,
                location: sellerProfile.location,
                badges: sellerProfile.badges.map((badge) => badge.name),
                isOnline: sellerProfile.isOnline || false,
              }}
              onMessage={() => handleMessage()}
            />
          ) : (
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <img
                  src={item.seller.avatar || "/placeholder.svg"}
                  alt={item.seller.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.seller.name}</h3>
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
                    <span className="text-muted-foreground">Member since:</span> {item.seller.joined}
                  </p>
                  <p className="text-muted-foreground">{item.seller.responseTime}</p>
                </div>
                <Button className="mt-4 flex items-center gap-2" onClick={handleMessage}>
                  <MessageCircle className="h-4 w-4" />
                  Message Seller
                </Button>
                <Button variant="outline" className="mt-2 flex items-center gap-2" onClick={handleViewProfile}>
                  View Full Profile
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="location" className="mt-4">
          <ItemLocationView
            itemId={item.id}
            itemTitle={item.title}
            location={item.location}
            distance={item.distance}
            itemImage={item.images[0]}
            itemCategory={item.category}
          />
        </TabsContent>
      </Tabs>

      {/* Propose trade button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4 pb-6 pt-10">
        <div className="container max-w-4xl">
          <Button
            className="mx-auto flex w-auto px-8 py-2 text-base font-medium group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
            onClick={handleProposeTrade}
          >
            <span className="relative z-10">Propose a Trade</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>

      {/* Report dialog */}
      {item && (
        <ReportItemDialog
          isOpen={isReportDialogOpen}
          onClose={handleCloseReportDialog}
          itemId={item.id}
          itemTitle={item.title}
        />
      )}
    </div>
  )
}

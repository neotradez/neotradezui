"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Package, MapPin, X, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock inventory data - in a real app, this would come from an API
const inventoryItems = [
  {
    id: "inv-1",
    name: "Vintage Camera",
    description: "Nikon F3 in excellent condition",
    category: "Electronics",
    condition: "Excellent",
    image: "/images/vintage-camera.jpeg",
    value: "$250",
  },
  {
    id: "inv-2",
    name: "Mechanical Keyboard",
    description: "Custom built with Cherry MX switches",
    category: "Electronics",
    condition: "Like New",
    image: "/images/mechanical-keyboard.jpeg",
    value: "$120",
  },
  {
    id: "inv-3",
    name: "Film Camera Lens",
    description: "50mm f/1.4 manual focus lens",
    category: "Photography",
    condition: "Good",
    image: "/placeholder.svg?height=100&width=100",
    value: "$180",
  },
  {
    id: "inv-4",
    name: "Vintage Record Player",
    description: "1970s turntable, recently serviced",
    category: "Audio",
    condition: "Fair",
    image: "/placeholder.svg?height=100&width=100",
    value: "$200",
  },
  {
    id: "inv-5",
    name: "Drone",
    description: "DJI Mini 2 with extra batteries",
    category: "Electronics",
    condition: "Like New",
    image: "/images/drone.webp",
    value: "$350",
  },
]

export default function ListFromInventoryPage() {
  const router = useRouter()
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    tradeFor: "",
    location: "",
    showExactLocation: false,
    estimatedValue: "",
    additionalDetails: "",
    meetupPreferences: "",
    tags: [] as string[],
  })

  // Handle inventory item selection
  const handleInventorySelect = (itemId: string) => {
    setSelectedInventoryItem(itemId)
    const item = inventoryItems.find((item) => item.id === itemId)
    if (item) {
      setFormData({
        ...formData,
        title: item.name,
        description: item.description,
        category: item.category,
        condition: item.condition,
        estimatedValue: item.value.replace("$", ""),
      })
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create a marketplace listing
      // For now, we'll simulate creating a listing with the form data

      // Find the selected inventory item
      const inventoryItem = inventoryItems.find((item) => item.id === selectedInventoryItem)

      // Create a new marketplace listing object
      const newListing = {
        id: `item-${Math.floor(Math.random() * 10000)}`,
        title: formData.title,
        description: formData.description,
        price: `$${formData.estimatedValue}`,
        condition: formData.condition,
        category: formData.category,
        images: [inventoryItem?.image || "/placeholder.svg?height=400&width=600"],
        location: {
          address: formData.location || "New York, NY",
          lat: 40.7128,
          lng: -74.006,
        },
        distance: "0.5 miles",
        seller: {
          id: 101,
          name: "Your Name",
          avatar: "/placeholder.svg?height=100&width=100",
          rating: 4.8,
          trades: 27,
          joined: "March 2023",
          responseTime: "Usually responds within 2 hours",
        },
        listed: "Just now",
        views: 0,
        saves: 0,
        referenceNumber: `ITEM-${Math.floor(Math.random() * 10000)}`,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would add this to your marketplace items in the database
      console.log("New marketplace listing created:", newListing)

      // Add the new listing to mockItems (this is just for demo purposes)
      // In a real app, this would be handled by the database/API
      if (typeof window !== "undefined") {
        // @ts-ignore - This is just for demo purposes
        window.mockItems = window.mockItems || {}
        // @ts-ignore
        window.mockItems[newListing.id] = newListing
      }

      // Navigate to the marketplace item page
      router.push(`/marketplace/${newListing.id}?listed=true`)
    } catch (error) {
      console.error("Error creating listing:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle adding a tag
  const [tagInput, setTagInput] = useState("")
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput("")
    }
  }

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Link href="/marketplace" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">List an Item from Your Inventory</h1>

      {step === 1 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Select an Item from Your Inventory
            </CardTitle>
            <CardDescription>
              Choose an item from your inventory to list on the marketplace, or{" "}
              <Link href="/marketplace/list-item" className="text-primary hover:underline">
                create a new listing
              </Link>{" "}
              from scratch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedInventoryItem === item.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => handleInventorySelect(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="flex items-center mt-2 text-xs">
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full mr-2">
                          {item.category}
                        </span>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {item.condition}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/inventory">Manage Inventory</Link>
              </Button>
              <Button onClick={() => setStep(2)} disabled={!selectedInventoryItem}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Item Details</TabsTrigger>
              <TabsTrigger value="preferences">Trade Preferences</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                  <CardDescription>
                    These details are pre-filled from your inventory. You can modify them for this listing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                          <SelectItem value="Collectibles">Collectibles</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalDetails">Additional Details</Label>
                    <Textarea
                      id="additionalDetails"
                      rows={3}
                      value={formData.additionalDetails}
                      onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                      placeholder="Add any additional details that might be helpful for potential traders"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove tag</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddTag()
                          }
                        }}
                      />
                      <Button type="button" size="sm" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trade Preferences</CardTitle>
                  <CardDescription>
                    Specify what you're looking to trade for and your meetup preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tradeFor">What You're Looking to Trade For</Label>
                    <Textarea
                      id="tradeFor"
                      rows={4}
                      value={formData.tradeFor}
                      onChange={(e) => setFormData({ ...formData, tradeFor: e.target.value })}
                      placeholder="Describe what you're interested in trading this item for"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meetupPreferences">Meetup Preferences</Label>
                    <Textarea
                      id="meetupPreferences"
                      rows={3}
                      value={formData.meetupPreferences}
                      onChange={(e) => setFormData({ ...formData, meetupPreferences: e.target.value })}
                      placeholder="Preferred days, times, or locations for meetups"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>Specify where you're willing to meet for trades.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Meeting Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pl-10"
                        placeholder="Enter a neighborhood, area, or address"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showExactLocation">Show exact location on map</Label>
                      <Switch
                        id="showExactLocation"
                        checked={formData.showExactLocation}
                        onCheckedChange={(checked) => setFormData({ ...formData, showExactLocation: checked })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      If turned off, only the general area will be shown to other users
                    </p>
                  </div>

                  <div className="h-[300px] w-full rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p>Enter a location to see it on the map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? "Listing..." : "List Item"}
              {!isLoading && <Check className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

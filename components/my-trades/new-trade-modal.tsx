"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Plus, Upload, X } from "lucide-react"

export function NewTradeModal({ onClose }) {
  const [uploadedImages, setUploadedImages] = useState([])
  const [activeTab, setActiveTab] = useState("details")

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For this demo, we'll just simulate adding placeholder images
    if (uploadedImages.length < 5) {
      setUploadedImages([
        ...uploadedImages,
        {
          id: Date.now(),
          url: "/placeholder.svg?height=200&width=200",
        },
      ])
    }
  }

  const removeUploadedImage = (id) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto p-0 dark:bg-[#121212]">
        <DialogHeader className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-md dark:bg-[#121212]/80">
          <DialogTitle className="font-heading text-xl">List a New Item</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="sticky top-[60px] z-10 w-full justify-start bg-background/80 px-4 backdrop-blur-md dark:bg-[#121212]/80">
            <TabsTrigger value="details">Item Details</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="preferences">Trade Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 p-4 md:p-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Item Title</Label>
                <Input id="title" placeholder="Enter a descriptive title" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail (condition, features, etc.)"
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="condition">Condition</Label>
                  <Select>
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="value">Estimated Value (USD)</Label>
                <Input id="value" type="number" placeholder="0.00" />
                <p className="text-xs text-muted-foreground">
                  This is for reference only and helps match you with fair trades.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab("photos")}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                >
                  <span className="relative z-10">Continue to Photos</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-0 p-4 md:p-6">
            <div className="grid gap-6">
              <div>
                <h3 className="mb-2 font-medium">Item Photos</h3>
                <p className="text-sm text-muted-foreground">
                  Add up to 5 photos of your item. The first photo will be your main listing image.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {uploadedImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border/40 dark:border-border/20"
                  >
                    <Image src={img.url || "/placeholder.svg"} alt="Item photo" fill className="object-cover" />
                    <button
                      onClick={() => removeUploadedImage(img.id)}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm dark:bg-[#121212]/80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {uploadedImages.length < 5 && (
                  <button
                    onClick={handleImageUpload}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/40 transition-colors hover:bg-muted/60 dark:border-border/40"
                  >
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs font-medium">Add Photo</span>
                  </button>
                )}
              </div>

              <div className="relative mt-4 rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
                <div className="flex flex-col items-center">
                  <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-1 text-sm font-medium">Drag and drop photos here</p>
                  <p className="text-xs text-muted-foreground">Or click to browse from your device</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleImageUpload}>
                    Browse Files
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button
                  onClick={() => setActiveTab("preferences")}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                >
                  <span className="relative z-10">Continue to Preferences</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-0 p-4 md:p-6">
            <div className="grid gap-6">
              <div>
                <h3 className="mb-2 font-medium">Trade Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Let others know what you're looking for in exchange for your item.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="looking-for">What are you looking for?</Label>
                <Textarea
                  id="looking-for"
                  placeholder="Describe items you'd be interested in trading for..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-3">
                <Label>Preferred Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {["Electronics", "Furniture", "Clothing", "Sports", "Collectibles"].map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="cursor-pointer border-border/40 bg-background/40 hover:border-[#00D084]/50 hover:bg-[#00D084]/10 dark:border-border/20 dark:bg-[#1a1a1a]/40"
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="grid gap-3">
                  <Label htmlFor="location">Your Location</Label>
                  <Input id="location" placeholder="City, State or Zip" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="delivery">Delivery Options</Label>
                  <Select>
                    <SelectTrigger id="delivery">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Meetup Only</SelectItem>
                      <SelectItem value="shipping">Shipping Available</SelectItem>
                      <SelectItem value="both">Both Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("photos")}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
                    <span className="relative z-10">Publish Listing</span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

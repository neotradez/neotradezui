"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, X, MapPin, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { LocationPicker } from "@/components/map/location-picker"

export default function AddInventoryItemPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    rarity: "",
    images: ["/placeholder.svg?height=500&width=500"],
    details: {
      brand: "",
      model: "",
    },
    listOnMarketplace: false,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "New York, NY",
    },
  })
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const fileInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDetailChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      listOnMarketplace: checked,
    }))
  }

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }))
    setShowLocationPicker(false)
  }

  const handleAddImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }))
    }
  }

  const handleRemoveImage = (index) => {
    if (formData.images.length > 1) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would send data to an API
    console.log("Submitting form data:", formData)

    // Create a unique ID for the new item
    const newItemId = Date.now().toString()

    // Simulate successful creation
    setTimeout(() => {
      setIsSubmitting(false)

      // Store the new item in localStorage so it can be retrieved on the inventory page
      const existingItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")
      const newItem = {
        id: newItemId,
        ...formData,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("inventoryItems", JSON.stringify([...existingItems, newItem]))

      if (formData.listOnMarketplace) {
        router.push({
          pathname: "/marketplace/list-item/confirmation",
          query: {
            title: formData.title,
            id: newItemId,
          },
        })
      } else {
        // Add a query parameter to indicate a new item was added
        router.push(`/inventory?newItem=${newItemId}`)
      }
    }, 1000)
  }

  const handleCancel = () => {
    router.push("/inventory")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleCancel} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Add New Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <Label className="mb-2 block">Item Images</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <div className="relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Item image ${index + 1}`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          {formData.images.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="aspect-square flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 p-2 dark:border-border/40"
                        onClick={handleAddImage}
                      >
                        <Plus className="mb-1 h-6 w-6" />
                        <span className="text-xs">Add Image</span>
                      </Button>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="collectibles">Collectibles</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="tools">Tools</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => handleSelectChange("condition", value)}
                        >
                          <SelectTrigger id="condition" className="mt-1">
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

                    <div>
                      <Label htmlFor="rarity">Rarity</Label>
                      <Select value={formData.rarity} onValueChange={(value) => handleSelectChange("rarity", value)}>
                        <SelectTrigger id="rarity" className="mt-1">
                          <SelectValue placeholder="Select rarity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Common">Common</SelectItem>
                          <SelectItem value="Uncommon">Uncommon</SelectItem>
                          <SelectItem value="Rare">Rare</SelectItem>
                          <SelectItem value="Very Rare">Very Rare</SelectItem>
                          <SelectItem value="Unique">Unique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={formData.details.brand}
                          onChange={(e) => handleDetailChange("brand", e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={formData.details.model}
                          onChange={(e) => handleDetailChange("model", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input id="location" value={formData.location.address} readOnly className="pl-9" />
                        </div>
                        <Button type="button" variant="outline" onClick={() => setShowLocationPicker(true)}>
                          Set Location
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="listOnMarketplace"
                        checked={formData.listOnMarketplace}
                        onCheckedChange={handleSwitchChange}
                      />
                      <Label htmlFor="listOnMarketplace">List on marketplace after adding to inventory</Label>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Adding..." : "Add Item"}
                      </span>
                      <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>

        {/* Location Picker Modal */}
        {showLocationPicker && (
          <LocationPicker
            initialLocation={formData.location}
            onSelect={handleLocationSelect}
            onCancel={() => setShowLocationPicker(false)}
          />
        )}
      </main>
    </div>
  )
}

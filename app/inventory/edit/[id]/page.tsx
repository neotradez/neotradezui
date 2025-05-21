"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Save, X, Plus, Trash2, ImageIcon } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function EditInventoryItemPage() {
  const router = useRouter()
  const params = useParams()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    rarity: "",
    images: [],
    details: {
      brand: "",
      model: "",
    },
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate with mock data
    const mockItems = [
      {
        id: 1,
        title: "Vintage Camera",
        description:
          "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors.",
        category: "Electronics",
        condition: "Good",
        rarity: "Uncommon",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=Back+View",
        ],
        details: {
          brand: "Canon",
          model: "AE-1",
          year: "1976",
          features: ["Manual focus", "35mm film", "Built-in light meter"],
        },
      },
      {
        id: 2,
        title: "Mechanical Keyboard",
        description:
          "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
        category: "Electronics",
        condition: "Like New",
        rarity: "Rare",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=With+RGB+on",
        ],
        details: {
          brand: "Ducky",
          model: "One 2 RGB",
          switches: "Cherry MX Brown",
          features: ["RGB lighting", "PBT keycaps", "USB-C connection"],
        },
      },
      {
        id: 3,
        title: "Drone",
        description:
          "Compact drone with 4K camera and 30 minutes of flight time. Includes extra batteries and carrying case.",
        category: "Electronics",
        condition: "Like New",
        rarity: "Very Rare",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=With+Controller",
          "/placeholder.svg?height=500&width=500&text=Camera+Detail",
        ],
        details: {
          brand: "DJI",
          model: "Mini 2",
          flightTime: "30 minutes",
          features: ["4K camera", "GPS", "Foldable design"],
        },
      },
      {
        id: 4,
        title: "Leather Jacket",
        description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
        category: "Clothing",
        condition: "Excellent",
        rarity: "Rare",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Back+View",
          "/placeholder.svg?height=500&width=500&text=Detail+Shot",
        ],
        details: {
          brand: "Wilson's Leather",
          size: "Medium",
          material: "Genuine leather",
          features: ["Zip front", "Quilted lining", "Multiple pockets"],
        },
      },
      {
        id: 5,
        title: "Mountain Bike",
        description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
        category: "Sports",
        condition: "Good",
        rarity: "Common",
        images: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500&text=Side+View",
          "/placeholder.svg?height=500&width=500&text=Drivetrain",
        ],
        details: {
          brand: "Trek",
          model: "Marlin 5",
          size: 'Medium (17.5")',
          features: ["Hydraulic disc brakes", "Suspension fork", "21-speed Shimano drivetrain"],
        },
      },
    ]

    setTimeout(() => {
      const foundItem = mockItems.find((i) => i.id.toString() === params.id)
      if (foundItem) {
        setFormData({
          title: foundItem.title,
          description: foundItem.description,
          category: foundItem.category,
          condition: foundItem.condition,
          rarity: foundItem.rarity,
          images: foundItem.images || [],
          details: foundItem.details,
        })
      }
      setLoading(false)
    }, 500) // Simulate loading
  }, [params.id])

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

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageUpload = (e) => {
    // In a real app, this would upload to a server
    // For now, we'll just simulate adding a placeholder

    if (e.target.files && e.target.files.length > 0) {
      // Create placeholder URLs for the uploaded files
      const newImages = Array.from(e.target.files).map(
        (_, index) => `/placeholder.svg?height=500&width=500&text=New+Image+${formData.images.length + index + 1}`,
      )

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }))

      toast({
        title: "Images added",
        description: `Added ${e.target.files.length} new images`,
        duration: 3000,
      })
    }
  }

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))

    toast({
      title: "Image removed",
      description: "The image has been removed from this item",
      duration: 3000,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Submitting form data:", formData)

    // Simulate successful update
    toast({
      title: "Item updated",
      description: "Your item has been successfully updated",
      duration: 3000,
    })

    setTimeout(() => {
      router.push(`/inventory/${params.id}`)
    }, 500)
  }

  const handleCancel = () => {
    router.push(`/inventory/${params.id}`)
  }

  const handleBack = () => {
    router.push("/inventory")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
          <div className="flex animate-pulse flex-col items-center justify-center py-20">
            <div className="h-8 w-48 rounded-md bg-muted"></div>
            <div className="mt-4 h-4 w-64 rounded-md bg-muted"></div>
            <div className="mt-8 h-64 w-full max-w-md rounded-lg bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                  <span className="font-bold">NT</span>
                </div>
              </div>
              <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Edit Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.length > 0 ? (
                        formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${formData.title} image ${index + 1}`}
                              fill
                              className="object-contain p-2"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute right-1 top-1 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove image</span>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed border-border/40 bg-background/40 p-4 dark:border-border/20 dark:bg-[#1a1a1a]/40">
                          <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="mb-1 text-sm font-medium">No images</p>
                          <p className="mb-4 text-xs text-muted-foreground">Add images to showcase your item</p>
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />

                    <Button type="button" variant="outline" className="w-full" onClick={handleImageClick}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Images
                    </Button>
                  </div>
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
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Clothing">Clothing</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Collectibles">Collectibles</SelectItem>
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
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </span>
                      <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

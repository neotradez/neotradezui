"use client"

import { useState, useEffect } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowLeftRight, Plus, X } from "lucide-react"

export default function TradeItemPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [lookingFor, setLookingFor] = useState("")
  const [lookingForItems, setLookingForItems] = useState([])
  const [meetingPreference, setMeetingPreference] = useState("in-person")
  const [additionalNotes, setAdditionalNotes] = useState("")

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
        estimatedValue: 120,
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: 2,
        title: "Mechanical Keyboard",
        description:
          "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
        category: "Electronics",
        condition: "Like New",
        estimatedValue: 150,
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: 3,
        title: "Drone",
        description:
          "Compact drone with 4K camera and 30 minutes of flight time. Includes extra batteries and carrying case.",
        category: "Electronics",
        condition: "Like New",
        estimatedValue: 300,
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: 4,
        title: "Leather Jacket",
        description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
        category: "Clothing",
        condition: "Excellent",
        estimatedValue: 200,
        image: "/placeholder.svg?height=500&width=500",
      },
      {
        id: 5,
        title: "Mountain Bike",
        description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
        category: "Sports",
        condition: "Good",
        estimatedValue: 350,
        image: "/placeholder.svg?height=500&width=500",
      },
    ]

    setTimeout(() => {
      const foundItem = mockItems.find((i) => i.id.toString() === params.id)
      setItem(foundItem || null)
      setLoading(false)
    }, 500) // Simulate loading
  }, [params.id])

  const handleAddLookingFor = () => {
    if (lookingFor.trim()) {
      setLookingForItems([...lookingForItems, lookingFor.trim()])
      setLookingFor("")
    }
  }

  const handleRemoveLookingFor = (index) => {
    setLookingForItems(lookingForItems.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Listing item for trade:", {
      item,
      lookingForItems,
      meetingPreference,
      additionalNotes,
    })

    // Simulate successful listing
    setTimeout(() => {
      router.push("/marketplace")
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

  if (!item) {
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
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="mb-4 text-2xl font-bold">Item Not Found</h1>
            <p className="mb-8 text-muted-foreground">The item you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Inventory
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">List Item for Trade</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain p-4" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-muted/50">
                      {item.condition}
                    </Badge>
                    <div className="text-sm font-medium">~${item.estimatedValue}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
                <div className="grid gap-6">
                  <div>
                    <Label className="mb-2 block">What are you looking for?</Label>
                    <div className="flex gap-2">
                      <Input
                        value={lookingFor}
                        onChange={(e) => setLookingFor(e.target.value)}
                        placeholder="e.g., Headphones, Camera Lens, etc."
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={handleAddLookingFor}>
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    </div>
                    {lookingForItems.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {lookingForItems.map((item, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => handleRemoveLookingFor(index)}
                              className="ml-1 rounded-full p-0.5 hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="mb-2 block">Meeting Preference</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="in-person"
                          checked={meetingPreference === "in-person"}
                          onCheckedChange={() => setMeetingPreference("in-person")}
                        />
                        <Label htmlFor="in-person" className="font-normal">
                          In-person meeting
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shipping"
                          checked={meetingPreference === "shipping"}
                          onCheckedChange={() => setMeetingPreference("shipping")}
                        />
                        <Label htmlFor="shipping" className="font-normal">
                          Shipping
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="both"
                          checked={meetingPreference === "both"}
                          onCheckedChange={() => setMeetingPreference("both")}
                        />
                        <Label htmlFor="both" className="font-normal">
                          Both options
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Add any additional details about your trade preferences..."
                      className="mt-1 min-h-[120px]"
                    />
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
                      <ArrowLeftRight className="h-4 w-4" />
                      List for Trade
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { TouchFriendlyButton } from "@/components/ui/touch-friendly-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Grid, Map, Plus } from "lucide-react"
import { EnhancedMapView } from "@/components/map/enhanced-map-view"
import { DistanceSearchControls } from "@/components/map/distance-search-controls"
import { ResponsiveContainer } from "@/components/ui/responsive-container"
import { SkipToContent } from "@/components/accessibility/skip-to-content"
import { useToast } from "@/hooks/use-toast"

export default function MarketplaceMapPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [distance, setDistance] = useState(50)
  const [includeWorldwide, setIncludeWorldwide] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock marketplace items with locations
  const marketplaceItems = [
    {
      id: 1,
      title: "Vintage Camera",
      description:
        "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors.",
      category: "Electronics",
      condition: "Good",
      estimatedValue: 120,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 101,
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      location: "Seattle, WA",
      coordinates: { lat: 47.6062, lng: -122.3321 },
      lookingFor: ["Mechanical Keyboard", "Headphones", "Audio Equipment"],
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      description:
        "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
      category: "Electronics",
      condition: "Like New",
      estimatedValue: 150,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 102,
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      location: "Portland, OR",
      coordinates: { lat: 45.5152, lng: -122.6784 },
      lookingFor: ["Camera Gear", "Smartphone", "Tablet"],
    },
    {
      id: 3,
      title: "Leather Jacket",
      description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
      category: "Clothing",
      condition: "Excellent",
      estimatedValue: 200,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 103,
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      location: "San Francisco, CA",
      coordinates: { lat: 37.7749, lng: -122.4194 },
      lookingFor: ["Winter Gear", "Outdoor Equipment", "Boots"],
    },
    {
      id: 4,
      title: "Mountain Bike",
      description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
      category: "Sports",
      condition: "Good",
      estimatedValue: 350,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 104,
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      location: "Denver, CO",
      coordinates: { lat: 39.7392, lng: -104.9903 },
      lookingFor: ["Camping Gear", "Fitness Equipment", "Electronics"],
    },
    {
      id: 5,
      title: "Vintage Vinyl Records",
      description:
        "Collection of classic rock vinyl records from the 70s and 80s. All in great condition with original sleeves.",
      category: "Music",
      condition: "Good",
      estimatedValue: 180,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 105,
        name: "Jamie Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      location: "Austin, TX",
      coordinates: { lat: 30.2672, lng: -97.7431 },
      lookingFor: ["Audio Equipment", "Musical Instruments", "Books"],
    },
    {
      id: 6,
      title: "Professional DSLR Camera",
      description:
        "Professional-grade DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.",
      category: "Electronics",
      condition: "Like New",
      estimatedValue: 800,
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        id: 106,
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      location: "New York, NY",
      coordinates: { lat: 40.7128, lng: -74.006 },
      lookingFor: ["Laptop", "Tablet", "Smart Home Devices"],
    },
  ]

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "sports", name: "Sports" },
    { id: "music", name: "Music" },
    { id: "collectibles", name: "Collectibles" },
    { id: "books", name: "Books" },
    { id: "art", name: "Art" },
    { id: "vehicles", name: "Vehicles" },
    { id: "tools", name: "Tools" },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance)
  }

  const handleLocationChange = (location: { lat: number; lng: number; address: string }) => {
    setUserLocation(location)
    toast({
      title: "Location Updated",
      description: `Now showing items near ${location.address}`,
    })
  }

  const handleIncludeWorldwideChange = (include: boolean) => {
    setIncludeWorldwide(include)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleSwitchToGrid = () => {
    router.push("/marketplace")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <SkipToContent contentId="main-content" />

      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <ResponsiveContainer>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2" aria-label="NeoTradez Home">
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
        </ResponsiveContainer>
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        <ResponsiveContainer className="pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Marketplace</h1>
              <p className="text-muted-foreground">Discover items available for trade from our community</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <TouchFriendlyButton
                variant="outline"
                className="gap-2"
                onClick={handleSwitchToGrid}
                aria-label="Switch to grid view"
              >
                <Grid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid View</span>
              </TouchFriendlyButton>
              <TouchFriendlyButton
                className="gap-2 bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                aria-label="Current view: Map view"
                aria-current="page"
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Map View</span>
              </TouchFriendlyButton>
              <TouchFriendlyButton
                className="gap-2 bg-[#00D084] text-white hover:bg-[#00D084]/90"
                onClick={() => router.push("/inventory/add")}
                aria-label="List a new item"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">List Item</span>
              </TouchFriendlyButton>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold" id="filters-heading">
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => {
                      setSelectedCategories([])
                      setDistance(50)
                      setIncludeWorldwide(false)
                    }}
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4" aria-labelledby="filters-heading">
                  <DistanceSearchControls
                    initialDistance={distance}
                    maxDistance={100}
                    onDistanceChange={handleDistanceChange}
                    onLocationChange={handleLocationChange}
                    onIncludeWorldwideChange={handleIncludeWorldwideChange}
                    userLocation={userLocation || undefined}
                  />

                  <div>
                    <h3 className="mb-2 text-sm font-medium" id="categories-heading">
                      Categories
                    </h3>
                    <div className="space-y-2" role="group" aria-labelledby="categories-heading">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                          <label
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <EnhancedMapView
                initialItems={marketplaceItems}
                initialDistance={distance}
                onDistanceChange={handleDistanceChange}
                onLocationChange={handleLocationChange}
                onItemSelect={(item) => {
                  toast({
                    title: "Item Selected",
                    description: `You selected ${item.title}`,
                  })
                }}
              />
            </div>
          </div>
        </ResponsiveContainer>
      </main>

      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <ResponsiveContainer className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
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
        </ResponsiveContainer>
      </footer>
    </div>
  )
}

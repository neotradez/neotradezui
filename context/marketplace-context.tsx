"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Define types for our marketplace items and filters
export type MarketplaceItem = {
  id: string
  referenceNumber: string
  title: string
  description: string
  category: string
  condition: string
  estimatedValue: number
  image: string
  owner: {
    id: string
    name: string
    avatar: string
    rating: number
  }
  location: string
  lookingFor: string[]
  distance?: number
  createdAt?: string
  views?: number
  saves?: number
}

export type MarketplaceFilters = {
  search: string
  categories: string[]
  minValue: number
  maxValue: number
  conditions: string[]
  ratings: string[]
  location: string
  distance: number
  includeWorldwide: boolean
  sort: "newest" | "popular" | "price-low" | "price-high" | "distance"
  view: "grid" | "list"
}

type MarketplaceContextType = {
  items: MarketplaceItem[]
  filteredItems: MarketplaceItem[]
  filters: MarketplaceFilters
  loading: boolean
  error: string | null
  setFilters: (filters: Partial<MarketplaceFilters>) => void
  resetFilters: () => void
  saveItem: (itemId: string) => void
  savedItems: Set<string>
  applyFilters: () => void
  loadMore: () => void
  hasMore: boolean
}

// Mock data for marketplace items
const mockItems: MarketplaceItem[] = [
  {
    id: "item-1",
    referenceNumber: "NT12AB34",
    title: "Vintage Camera",
    description:
      "A well-preserved vintage film camera from the 1970s. Perfect for photography enthusiasts or collectors.",
    category: "Electronics",
    condition: "Good",
    estimatedValue: 120,
    image: "/images/vintage-camera.jpeg",
    owner: {
      id: "user-101",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    location: "Seattle, WA",
    lookingFor: ["Mechanical Keyboard", "Headphones", "Audio Equipment"],
    distance: 2.5,
    createdAt: "2025-05-08T14:30:00Z",
    views: 42,
    saves: 5,
  },
  {
    id: "item-2",
    referenceNumber: "NT56CD78",
    title: "Mechanical Keyboard",
    description:
      "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
    category: "Electronics",
    condition: "Like New",
    estimatedValue: 150,
    image: "/images/mechanical-keyboard.jpeg",
    owner: {
      id: "user-102",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    location: "Portland, OR",
    lookingFor: ["Camera Gear", "Smartphone", "Tablet"],
    distance: 15.7,
    createdAt: "2025-05-05T09:15:00Z",
    views: 87,
    saves: 12,
  },
  {
    id: "item-3",
    referenceNumber: "NT90EF12",
    title: "Leather Jacket",
    description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
    category: "Clothing",
    condition: "Excellent",
    estimatedValue: 200,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-103",
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    location: "San Francisco, CA",
    lookingFor: ["Winter Gear", "Outdoor Equipment", "Boots"],
    distance: 35.2,
    createdAt: "2025-05-09T16:45:00Z",
    views: 29,
    saves: 8,
  },
  {
    id: "item-4",
    referenceNumber: "NT34GH56",
    title: "Mountain Bike",
    description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
    category: "Sports",
    condition: "Good",
    estimatedValue: 350,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-104",
      name: "Sam Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    location: "Denver, CO",
    lookingFor: ["Camping Gear", "Fitness Equipment", "Electronics"],
    distance: 5.8,
    createdAt: "2025-05-07T11:20:00Z",
    views: 65,
    saves: 15,
  },
  {
    id: "item-5",
    referenceNumber: "NT78IJ90",
    title: "Vintage Vinyl Records",
    description:
      "Collection of classic rock vinyl records from the 70s and 80s. All in great condition with original sleeves.",
    category: "Music",
    condition: "Good",
    estimatedValue: 180,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-105",
      name: "Jamie Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    location: "Austin, TX",
    lookingFor: ["Audio Equipment", "Musical Instruments", "Books"],
    distance: 12.3,
    createdAt: "2025-05-06T13:10:00Z",
    views: 53,
    saves: 7,
  },
  {
    id: "item-6",
    referenceNumber: "NT12KL34",
    title: "Professional DSLR Camera",
    description:
      "Professional-grade DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.",
    category: "Electronics",
    condition: "Like New",
    estimatedValue: 800,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-106",
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
    },
    location: "New York, NY",
    lookingFor: ["Laptop", "Tablet", "Smart Home Devices"],
    distance: 8.9,
    createdAt: "2025-05-04T10:05:00Z",
    views: 112,
    saves: 23,
  },
  {
    id: "item-7",
    referenceNumber: "NT45MN67",
    title: "Antique Wooden Desk",
    description: "Beautiful antique wooden desk with intricate carvings. Perfect for a home office or study.",
    category: "Furniture",
    condition: "Fair",
    estimatedValue: 250,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-107",
      name: "Casey Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.3,
    },
    location: "Chicago, IL",
    lookingFor: ["Bookshelves", "Office Chair", "Lamps"],
    distance: 18.5,
    createdAt: "2025-05-03T15:30:00Z",
    views: 38,
    saves: 6,
  },
  {
    id: "item-8",
    referenceReference: "NT89OP12",
    title: "Gaming Console",
    description: "Latest generation gaming console with two controllers and five popular games. Barely used.",
    category: "Electronics",
    condition: "Like New",
    estimatedValue: 450,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-108",
      name: "Riley Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    location: "Miami, FL",
    lookingFor: ["Gaming Laptop", "VR Headset", "Gaming Accessories"],
    distance: 25.1,
    createdAt: "2025-05-02T09:45:00Z",
    views: 95,
    saves: 18,
  },
  {
    id: "item-9",
    referenceNumber: "NT34QR56",
    title: "Acoustic Guitar",
    description: "Handcrafted acoustic guitar with beautiful tone. Includes hard case and extra strings.",
    category: "Music",
    condition: "Excellent",
    estimatedValue: 300,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-109",
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    location: "Nashville, TN",
    lookingFor: ["Other Instruments", "Audio Equipment", "Music Books"],
    distance: 7.6,
    createdAt: "2025-05-01T14:20:00Z",
    views: 72,
    saves: 14,
  },
  {
    id: "item-10",
    referenceNumber: "NT78ST90",
    title: "Drone with 4K Camera",
    description: "High-quality drone with 4K camera, obstacle avoidance, and 30-minute flight time.",
    category: "Electronics",
    condition: "Good",
    estimatedValue: 500,
    image: "/images/drone.webp",
    owner: {
      id: "user-110",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    location: "Los Angeles, CA",
    lookingFor: ["Camera Equipment", "Laptop", "Smartphone"],
    distance: 10.2,
    createdAt: "2025-04-30T11:15:00Z",
    views: 128,
    saves: 27,
  },
  {
    id: "item-11",
    referenceNumber: "NT12UV34",
    title: "Vintage Watch Collection",
    description: "Collection of three vintage watches from the 1960s. All in working condition with original boxes.",
    category: "Collectibles",
    condition: "Good",
    estimatedValue: 600,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-111",
      name: "Jamie Parker",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    location: "Boston, MA",
    lookingFor: ["Jewelry", "Antiques", "Luxury Items"],
    distance: 22.7,
    createdAt: "2025-04-29T16:40:00Z",
    views: 85,
    saves: 19,
  },
  {
    id: "item-12",
    referenceNumber: "NT56WX78",
    title: "Professional Art Supplies",
    description:
      "Complete set of professional art supplies including paints, brushes, and canvases. Perfect for artists.",
    category: "Art",
    condition: "New",
    estimatedValue: 220,
    image: "/placeholder.svg?height=300&width=300",
    owner: {
      id: "user-112",
      name: "Taylor Reed",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    location: "Portland, OR",
    lookingFor: ["Art Books", "Crafting Supplies", "Photography Equipment"],
    distance: 14.3,
    createdAt: "2025-04-28T10:30:00Z",
    views: 47,
    saves: 9,
  },
]

// Default filters
const defaultFilters: MarketplaceFilters = {
  search: "",
  categories: [],
  minValue: 0,
  maxValue: 1000,
  conditions: [],
  ratings: [],
  location: "",
  distance: 50,
  includeWorldwide: false,
  sort: "newest",
  view: "grid",
}

// Create the context
const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined)

// Provider component
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [items] = useState<MarketplaceItem[]>(mockItems)
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(mockItems)
  const [filters, setFiltersState] = useState<MarketplaceFilters>(defaultFilters)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set())
  const [displayCount, setDisplayCount] = useState(8) // Number of items to display initially
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Apply filters to items - memoized to prevent recreation on every render
  const applyFilters = useCallback(() => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      setTimeout(() => {
        let result = [...items]

        // Apply search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          result = result.filter(
            (item) =>
              item.title.toLowerCase().includes(searchLower) ||
              item.description.toLowerCase().includes(searchLower) ||
              item.category.toLowerCase().includes(searchLower),
          )
        }

        // Apply category filter
        if (filters.categories.length > 0) {
          result = result.filter((item) => filters.categories.includes(item.category))
        }

        // Apply price range filter
        result = result.filter(
          (item) => item.estimatedValue >= filters.minValue && item.estimatedValue <= filters.maxValue,
        )

        // Apply condition filter
        if (filters.conditions.length > 0) {
          result = result.filter((item) => filters.conditions.includes(item.condition))
        }

        // Apply rating filter
        if (filters.ratings.length > 0) {
          result = result.filter((item) => {
            const rating = item.owner.rating
            return filters.ratings.some((ratingFilter) => {
              const minRating = Number.parseInt(ratingFilter.split("+")[0])
              return rating >= minRating
            })
          })
        }

        // Apply distance filter
        if (filters.location) {
          result = result.filter((item) => {
            if (filters.includeWorldwide) {
              return true
            }
            return item.distance !== undefined && item.distance <= filters.distance
          })
        }

        // Apply sorting
        switch (filters.sort) {
          case "newest":
            result.sort((a, b) => {
              if (!a.createdAt || !b.createdAt) return 0
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
            break
          case "popular":
            result.sort((a, b) => (b.views || 0) - (a.views || 0))
            break
          case "price-low":
            result.sort((a, b) => a.estimatedValue - b.estimatedValue)
            break
          case "price-high":
            result.sort((a, b) => b.estimatedValue - a.estimatedValue)
            break
          case "distance":
            result.sort((a, b) => (a.distance || 0) - (b.distance || 0))
            break
        }

        setFilteredItems(result)
        setHasMore(result.length > displayCount)
        setLoading(false)
      }, 500) // Simulate network delay
    } catch (err) {
      setError("Failed to apply filters. Please try again.")
      setLoading(false)
    }
  }, [displayCount, filters, items])

  // Initialize filters from URL params - only run once on mount
  useEffect(() => {
    const filterParam = searchParams.get("filter")
    const searchParam = searchParams.get("search")
    const categoryParam = searchParams.get("category")

    let shouldUpdate = false
    const newFilters = { ...defaultFilters }

    if (filterParam) {
      shouldUpdate = true
      if (filterParam === "nearby") {
        newFilters.sort = "distance"
      } else if (filterParam === "recent") {
        newFilters.sort = "newest"
      } else if (filterParam === "popular") {
        newFilters.sort = "popular"
      }
    }

    if (searchParam) {
      shouldUpdate = true
      newFilters.search = searchParam
    }

    if (categoryParam) {
      shouldUpdate = true
      newFilters.categories = [categoryParam]
    }

    if (shouldUpdate) {
      setFiltersState(newFilters)
    }

    // Initial filter application
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set filters without triggering infinite loops
  const setFilters = useCallback(
    (newFilters: Partial<MarketplaceFilters>) => {
      setFiltersState((prev) => {
        const updatedFilters = { ...prev, ...newFilters }
        return updatedFilters
      })

      // We need to manually trigger applyFilters after state update
      // Using setTimeout to ensure it runs after the state update is complete
      setTimeout(() => {
        applyFilters()
      }, 0)
    },
    [applyFilters],
  )

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters)
    router.push("/marketplace")

    // Apply default filters
    setTimeout(() => {
      applyFilters()
    }, 0)
  }, [applyFilters, router])

  // Save/unsave an item
  const saveItem = useCallback(
    (itemId: string) => {
      setSavedItems((prev) => {
        const newSaved = new Set(prev)
        if (newSaved.has(itemId)) {
          newSaved.delete(itemId)
          toast({
            title: "Item removed from saved items",
            description: "This item has been removed from your saved trades",
          })
        } else {
          newSaved.add(itemId)
          toast({
            title: "Item saved",
            description: "This item has been added to your saved trades",
          })
        }
        return newSaved
      })
    },
    [toast],
  )

  // Load more items
  const loadMore = useCallback(() => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setDisplayCount((prev) => prev + 4)
      setHasMore(filteredItems.length > displayCount + 4)
      setLoading(false)
    }, 800)
  }, [displayCount, filteredItems.length])

  // Get displayed items (with pagination)
  const displayedItems = filteredItems.slice(0, displayCount)

  const value = {
    items,
    filteredItems: displayedItems,
    filters,
    loading,
    error,
    setFilters,
    resetFilters,
    saveItem,
    savedItems,
    applyFilters,
    loadMore,
    hasMore,
  }

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

// Custom hook to use the marketplace context
export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (context === undefined) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider")
  }
  return context
}

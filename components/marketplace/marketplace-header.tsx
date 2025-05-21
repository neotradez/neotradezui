"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, SlidersHorizontal, X } from "lucide-react"
import { useMarketplace } from "@/context/marketplace-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MarketplaceHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const { setFilters, filters, applyFilters } = useMarketplace()

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get("search") || ""
    setSearchQuery(query)

    const filter = searchParams.get("filter")
    if (filter) {
      setActiveTab(filter)
    } else {
      setActiveTab("all")
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ search: searchQuery })

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    router.push(`/marketplace?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setFilters({ search: "" })

    // Remove search from URL
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    router.push(`/marketplace?${params.toString()}`)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update URL and filters based on tab
    const params = new URLSearchParams(searchParams.toString())

    if (value !== "all") {
      params.set("filter", value)

      // Update filters based on tab
      if (value === "nearby") {
        setFilters({ sort: "distance" })
      } else if (value === "recent") {
        setFilters({ sort: "newest" })
      } else if (value === "popular") {
        setFilters({ sort: "popular" })
      }
    } else {
      params.delete("filter")
      setFilters({ sort: "newest" })
    }

    router.push(`/marketplace?${params.toString()}`)
  }

  const handleSortChange = (
    sort: "newest" | "popular" | "price-low" | "price-high" | "distance" | "rarity-common" | "rarity-rare",
  ) => {
    setFilters({ sort })
    applyFilters()
  }

  return (
    <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col gap-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold sm:text-2xl">Marketplace</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => router.push("/inventory/add")}>
              <Plus className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">List from Inventory</span>
              <span className="sm:hidden">List Item</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search marketplace..."
              className="pl-9 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </form>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("newest")}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("popular")}>Most Popular</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("rarity-common")}>
                  Rarity: Common First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("rarity-rare")}>Rarity: Rare First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("distance")}>
                  Distance: Nearest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

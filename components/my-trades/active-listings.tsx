"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeftRight, Calendar, Edit, Eye, MoreHorizontal, Trash2, TrendingUp } from "lucide-react"

export function ActiveListings() {
  const router = useRouter()

  const activeListings = [
    {
      id: "list-1",
      title: "Mechanical Keyboard",
      description:
        "Mechanical keyboard with RGB lighting and custom keycaps. Cherry MX Brown switches for a tactile typing experience.",
      category: "Electronics",
      condition: "Like New",
      rarity: "Uncommon",
      image: "/placeholder.svg?height=300&width=300",
      datePosted: "2025-05-15T09:30:00",
      views: 42,
      offers: 3,
    },
    {
      id: "list-2",
      title: "Leather Jacket",
      description: "Genuine leather jacket in classic style. Size M, barely worn, excellent condition.",
      category: "Clothing",
      condition: "Excellent",
      rarity: "Rare",
      image: "/placeholder.svg?height=300&width=300",
      datePosted: "2025-05-12T14:45:00",
      views: 38,
      offers: 2,
    },
    {
      id: "list-3",
      title: "Mountain Bike",
      description: "Aluminum frame mountain bike with 21 speeds. Recently tuned up and ready to ride.",
      category: "Sports",
      condition: "Good",
      rarity: "Common",
      image: "/placeholder.svg?height=300&width=300",
      datePosted: "2025-05-10T11:15:00",
      views: 56,
      offers: 4,
    },
    {
      id: "list-4",
      title: "Vintage Vinyl Records",
      description:
        "Collection of classic rock vinyl records from the 70s and 80s. All in great condition with original sleeves.",
      category: "Music",
      condition: "Good",
      rarity: "Uncommon",
      image: "/placeholder.svg?height=300&width=300",
      datePosted: "2025-05-08T16:20:00",
      views: 29,
      offers: 1,
    },
  ]

  const handleListingClick = (listingId) => {
    router.push(`/inventory/${listingId}`)
  }

  const handleEditClick = (listingId, event) => {
    event.stopPropagation()
    router.push(`/inventory/edit/${listingId}`)
  }

  const handleViewClick = (listingId, event) => {
    event.stopPropagation()
    router.push(`/inventory/${listingId}`)
  }

  const handleViewOffersClick = (listingId, event) => {
    event.stopPropagation()
    router.push(`/inventory/${listingId}/offers`)
  }

  const handleDeleteClick = (listingId, event) => {
    event.stopPropagation()
    // Delete listing logic would go here
    console.log(`Delete listing ${listingId}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {activeListings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleListingClick(listing.id)}
              className="cursor-pointer"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute right-3 top-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => handleEditClick(listing.id, e)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Listing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleViewClick(listing.id, e)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Listing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleViewOffersClick(listing.id, e)}>
                            <ArrowLeftRight className="mr-2 h-4 w-4" />
                            View Offers
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => handleDeleteClick(listing.id, e)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Badge className="absolute left-3 top-3 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">
                      {listing.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">{listing.title}</h3>
                      <div className="text-sm font-medium text-muted-foreground">Rarity: {listing.rarity}</div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Posted {new Date(listing.datePosted).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{listing.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-[#00D084]" />
                        <span className="text-[#00D084]">{listing.offers} offers</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No active listings</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            You don't have any active trade listings yet. Create your first listing to start trading.
          </p>
          <Button
            className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
            onClick={(e) => {
              e.stopPropagation()
              router.push("/inventory/add")
            }}
          >
            <span className="relative z-10">List New Item</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

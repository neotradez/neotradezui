"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Bookmark, BookmarkCheck, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function InventoryGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [savedItems, setSavedItems] = useState({})
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const newItemId = searchParams.get("newItem")

  // Fetch inventory items
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchItems = () => {
      setLoading(true)
      try {
        // Get items from localStorage (mock data store)
        const storedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]")

        // If no stored items, use demo data
        const demoItems =
          storedItems.length > 0
            ? storedItems
            : [
                {
                  id: "1",
                  title: "Vintage Film Camera",
                  description: "A well-preserved vintage film camera from the 1970s.",
                  category: "electronics",
                  condition: "Good",
                  rarity: "Uncommon",
                  images: ["/images/vintage-camera.jpeg"],
                  location: { address: "Brooklyn, NY" },
                },
                {
                  id: "2",
                  title: "Mechanical Keyboard",
                  description: "Custom mechanical keyboard with Cherry MX switches.",
                  category: "electronics",
                  condition: "Excellent",
                  rarity: "Rare",
                  images: ["/images/mechanical-keyboard.jpeg"],
                  location: { address: "Manhattan, NY" },
                },
                {
                  id: "3",
                  title: "Drone",
                  description: "Slightly used drone with 4K camera and extra batteries.",
                  category: "electronics",
                  condition: "Like New",
                  rarity: "Common",
                  images: ["/images/drone.webp"],
                  location: { address: "Queens, NY" },
                },
              ]

        setItems(demoItems)

        // If there's a new item, show a toast notification
        if (newItemId) {
          const newItem = demoItems.find((item) => item.id === newItemId)
          if (newItem) {
            toast({
              title: "Item Added Successfully",
              description: `"${newItem.title}" has been added to your inventory.`,
              variant: "success",
            })
          }
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [newItemId, toast])

  const toggleSave = (id) => {
    setSavedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card
            key={i}
            className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
          >
            <div className="aspect-square animate-pulse bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-6 w-2/3 animate-pulse rounded bg-muted"></div>
              <div className="mt-2 h-4 animate-pulse rounded bg-muted"></div>
              <div className="mt-1 h-4 w-4/5 animate-pulse rounded bg-muted"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/40 p-12 text-center dark:border-border/30">
        <div className="rounded-full bg-background/60 p-4 dark:bg-[#1a1a1a]/60">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Empty inventory"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <h3 className="mt-6 text-xl font-medium">Your inventory is empty</h3>
        <p className="mt-2 text-muted-foreground">Add items to your inventory to start trading.</p>
        <Button className="mt-6" onClick={() => (window.location.href = "/inventory/add")}>
          Add Your First Item
        </Button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40 dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={item.images[0] || "/placeholder.svg?height=400&width=400"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-md dark:bg-[#1a1a1a]/80">
                    {item.condition}
                  </Badge>
                  <Badge className="bg-[#00D084]/90 text-[#00120a] backdrop-blur-md dark:text-white">
                    {item.rarity}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="line-clamp-1 font-medium">{item.title}</h3>
                    <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => toggleSave(item.id)}>
                    {savedItems[item.id] ? (
                      <BookmarkCheck className="h-5 w-5 text-[#00D084]" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                    <span className="sr-only">Save item</span>
                  </Button>
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {item.location?.address || "Location not specified"}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border/40 p-3 dark:border-border/20">
                <Link href={`/inventory/${item.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}

"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { PageInfoAlert } from "@/components/page-info-alert"
import { useMarketplace } from "@/context/marketplace-context"
import { Loader2, Search, AlertCircle, BookmarkIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"

export function MarketplaceGrid() {
  const router = useRouter()
  const { filteredItems: items, loading, error, loadMore, hasMore, savedItems, saveItem, filters } = useMarketplace()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const handleSaveItem = (itemId) => {
    saveItem(itemId)
  }

  // Helper function to extract numeric ID from user ID string
  const extractUserId = (userId) => {
    // If userId is like "user-123", extract just the "123" part
    if (typeof userId === "string" && userId.startsWith("user-")) {
      return userId.replace("user-", "")
    }
    // If it's already just a number or doesn't have the prefix, return as is
    return userId
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  // Render empty state when no items match filters
  if (items.length === 0 && !loading && !error) {
    return (
      <div className="py-8">
        <PageInfoAlert
          title="Marketplace"
          description="Browse items available for trade. Each item has a unique reference number for easy tracking."
        />

        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No items found</h3>
          <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
            {filters.search
              ? `No items match your search for "${filters.search}". Try adjusting your filters or search terms.`
              : "No items match your current filters. Try adjusting your filters or check back later."}
          </p>
          <Button
            onClick={() => router.push("/marketplace/list-item")}
            className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
          >
            <span className="relative z-10">List an Item</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button onClick={() => window.location.reload()} variant="outline" className="mx-auto block">
          Refresh Page
        </Button>
      </div>
    )
  }

  return (
    <div className="py-8">
      <PageInfoAlert
        title="Marketplace"
        description="Browse items available for trade. Each item has a unique reference number for easy tracking."
      />

      <AnimatePresence>
        {loading && items.length === 0 ? (
          <motion.div
            className="flex h-64 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading items...</span>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
              <Link
                href={`/marketplace/${item.id}`}
                key={item.id}
                className="block transition-transform hover:scale-[1.03] duration-300"
              >
                <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-sm hover:shadow-lg dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {item.featured && (
                      <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Featured
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSaveItem(item.id)
                      }}
                    >
                      {savedItems && savedItems.has && savedItems.has(item.id) ? (
                        <BookmarkIcon className="h-4 w-4 fill-primary text-primary" />
                      ) : (
                        <BookmarkIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge variant="outline">{item.condition}</Badge>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const userId = extractUserId(item.owner.id)
                          router.push(`/user/${userId}`)
                        }}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 underline-offset-2 hover:underline">
                          {item.owner.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {items.length > 0 && (
        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            variant="outline"
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) })
              .map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className={`h-8 w-8 p-0 ${currentPage === index + 1 ? "bg-primary text-primary-foreground" : ""}`}
                  disabled={loading}
                >
                  {index + 1}
                </Button>
              ))
              .slice(
                // Only show 5 page buttons at a time
                Math.max(0, currentPage - 3),
                Math.min(Math.ceil(items.length / itemsPerPage), currentPage + 2),
              )}

            {Math.ceil(items.length / itemsPerPage) > 5 && currentPage + 2 < Math.ceil(items.length / itemsPerPage) && (
              <>
                <span className="mx-1">...</span>
                <Button
                  onClick={() => setCurrentPage(Math.ceil(items.length / itemsPerPage))}
                  variant="outline"
                  className="h-8 w-8 p-0"
                  disabled={loading}
                >
                  {Math.ceil(items.length / itemsPerPage)}
                </Button>
              </>
            )}
          </div>

          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(items.length / itemsPerPage)))}
            variant="outline"
            disabled={currentPage === Math.ceil(items.length / itemsPerPage) || loading}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Bell,
  BookmarkCheck,
  Clock,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SavedSearchesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedSearchId, setSelectedSearchId] = useState(null)

  const [savedSearches, setSavedSearches] = useState([
    {
      id: "1",
      name: "Vintage Cameras",
      query: "vintage camera film analog",
      filters: {
        category: "Photography",
        condition: ["Good", "Excellent", "Like New"],
        distance: "25 miles",
        priceRange: "$50 - $500",
      },
      lastRun: "2 hours ago",
      results: 24,
      notifications: true,
      frequency: "daily",
      createdAt: "May 10, 2025",
    },
    {
      id: "2",
      name: "Mechanical Keyboards",
      query: "mechanical keyboard cherry mx",
      filters: {
        category: "Electronics",
        condition: ["Good", "Excellent", "Like New"],
        distance: "50 miles",
        priceRange: "$50 - $300",
      },
      lastRun: "Yesterday",
      results: 18,
      notifications: true,
      frequency: "instant",
      createdAt: "May 5, 2025",
    },
    {
      id: "3",
      name: "Vinyl Records - Jazz",
      query: "vinyl records jazz miles davis coltrane",
      filters: {
        category: "Music & Media",
        condition: ["Fair", "Good", "Excellent"],
        distance: "100 miles",
        priceRange: "$10 - $200",
      },
      lastRun: "3 days ago",
      results: 42,
      notifications: false,
      frequency: "weekly",
      createdAt: "April 28, 2025",
    },
    {
      id: "4",
      name: "Retro Gaming Consoles",
      query: "nintendo sega playstation retro vintage console",
      filters: {
        category: "Gaming",
        condition: ["Fair", "Good", "Excellent"],
        distance: "150 miles",
        priceRange: "$50 - $500",
      },
      lastRun: "1 week ago",
      results: 31,
      notifications: true,
      frequency: "daily",
      createdAt: "April 20, 2025",
    },
    {
      id: "5",
      name: "Film Photography Equipment",
      query: "35mm film camera equipment darkroom",
      filters: {
        category: "Photography",
        condition: ["Fair", "Good", "Excellent", "Like New"],
        distance: "Any",
        priceRange: "$25 - $1000",
      },
      lastRun: "2 weeks ago",
      results: 56,
      notifications: true,
      frequency: "weekly",
      createdAt: "April 15, 2025",
    },
  ])

  const filteredSearches = savedSearches.filter(
    (search) =>
      search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      search.query.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteSearch = (id) => {
    setSelectedSearchId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setSavedSearches(savedSearches.filter((search) => search.id !== selectedSearchId))
    setDeleteDialogOpen(false)
  }

  const toggleNotification = (id) => {
    setSavedSearches(
      savedSearches.map((search) => (search.id === id ? { ...search, notifications: !search.notifications } : search)),
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Saved Searches</h1>
            <p className="text-muted-foreground mt-1">Manage your saved search queries and notifications</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Find a saved search..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/advanced-search">
              <Plus className="h-4 w-4 mr-2" />
              New Search
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Searches</TabsTrigger>
          <TabsTrigger value="notifications">With Notifications</TabsTrigger>
          <TabsTrigger value="recent">Recently Run</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredSearches.length > 0 ? (
            <div className="space-y-4">
              {filteredSearches.map((search) => (
                <SavedSearchCard
                  key={search.id}
                  search={search}
                  onDelete={() => handleDeleteSearch(search.id)}
                  onToggleNotification={() => toggleNotification(search.id)}
                />
              ))}
            </div>
          ) : (
            <EmptySavedSearches searchTerm={searchTerm} />
          )}
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          {filteredSearches.filter((s) => s.notifications).length > 0 ? (
            <div className="space-y-4">
              {filteredSearches
                .filter((search) => search.notifications)
                .map((search) => (
                  <SavedSearchCard
                    key={search.id}
                    search={search}
                    onDelete={() => handleDeleteSearch(search.id)}
                    onToggleNotification={() => toggleNotification(search.id)}
                  />
                ))}
            </div>
          ) : (
            <EmptySavedSearches searchTerm={searchTerm} message="No searches with notifications found." />
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          {filteredSearches.length > 0 ? (
            <div className="space-y-4">
              {filteredSearches
                .sort((a, b) => {
                  // Simple sorting by "recency" based on lastRun text
                  const aTime = a.lastRun.includes("hour")
                    ? 1
                    : a.lastRun.includes("Yesterday")
                      ? 2
                      : a.lastRun.includes("day")
                        ? 3
                        : a.lastRun.includes("week")
                          ? 4
                          : 5
                  const bTime = b.lastRun.includes("hour")
                    ? 1
                    : b.lastRun.includes("Yesterday")
                      ? 2
                      : b.lastRun.includes("day")
                        ? 3
                        : b.lastRun.includes("week")
                          ? 4
                          : 5
                  return aTime - bTime
                })
                .map((search) => (
                  <SavedSearchCard
                    key={search.id}
                    search={search}
                    onDelete={() => handleDeleteSearch(search.id)}
                    onToggleNotification={() => toggleNotification(search.id)}
                  />
                ))}
            </div>
          ) : (
            <EmptySavedSearches searchTerm={searchTerm} message="No recently run searches found." />
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete saved search?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this saved search and stop any notifications. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function SavedSearchCard({ search, onDelete, onToggleNotification }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center">
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{search.name}</h3>
                {search.notifications && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Bell className="h-3 w-3 mr-1" />
                    {search.frequency}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium">Query:</span> {search.query}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(search.filters).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key}: {Array.isArray(value) ? value.join(", ") : value}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Last run: {search.lastRun}
                </div>
                <div className="flex items-center">
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  {search.results} results
                </div>
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`notifications-${search.id}`}
                      checked={search.notifications}
                      onCheckedChange={onToggleNotification}
                    />
                    <Label htmlFor={`notifications-${search.id}`}>Notifications</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <Link href={`/marketplace?q=${encodeURIComponent(search.query)}`}>
                  <Search className="h-4 w-4 mr-2" />
                  Run Search
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/advanced-search?edit=${search.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Search
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Search
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function EmptySavedSearches({ searchTerm, message = "You haven't saved any searches yet." }) {
  return (
    <Card className="w-full border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-xl font-semibold mb-2">
          {searchTerm ? "No matching searches found" : "No saved searches"}
        </CardTitle>
        <CardDescription className="text-center max-w-md mb-6">
          {searchTerm ? `No saved searches matching "${searchTerm}" were found.` : message}
        </CardDescription>
        <Button asChild>
          <Link href="/advanced-search">
            <Plus className="mr-2 h-4 w-4" />
            Create New Search
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

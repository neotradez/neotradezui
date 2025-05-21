"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowRight,
  BookmarkPlus,
  ChevronDown,
  Clock,
  Filter,
  Heart,
  History,
  MapPin,
  MoreHorizontal,
  Save,
  Search,
  Share2,
  Star,
  Tag,
  Trash2,
  User,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function AdvancedSearchPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)
  const [distanceValue, setDistanceValue] = useState([10])
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Search</h1>
          <p className="text-muted-foreground">Find exactly what you're looking for with powerful search tools.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            Recent Searches
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="w-full rounded-lg border">
            <CollapsibleTrigger asChild>
              <div className="flex cursor-pointer items-center justify-between border-b p-4">
                <div className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  <h2 className="font-semibold">Filters</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-6 p-4">
                <div>
                  <Label className="mb-2 block font-medium">Categories</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="electronics" />
                      <Label htmlFor="electronics">Electronics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="collectibles" />
                      <Label htmlFor="collectibles">Collectibles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="clothing" />
                      <Label htmlFor="clothing">Clothing & Accessories</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="home" />
                      <Label htmlFor="home">Home & Garden</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sports" />
                      <Label htmlFor="sports">Sports & Outdoors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="toys" />
                      <Label htmlFor="toys">Toys & Games</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="books" />
                      <Label htmlFor="books">Books & Media</Label>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Show more categories
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block font-medium">Location</Label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="City, state, or zip code" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Distance</Label>
                        <span className="text-sm">{distanceValue[0]} miles</span>
                      </div>
                      <Slider
                        defaultValue={[10]}
                        max={50}
                        step={1}
                        value={distanceValue}
                        onValueChange={setDistanceValue}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block font-medium">Price Range</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 0])}
                      />
                    </div>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={2000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block font-medium">Item Condition</Label>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any" />
                      <Label htmlFor="any">Any condition</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="like-new" id="like-new" />
                      <Label htmlFor="like-new">Like new</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fair" id="fair" />
                      <Label htmlFor="fair">Fair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="poor" />
                      <Label htmlFor="poor">Poor</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block font-medium">Trader Rating</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any rating</SelectItem>
                      <SelectItem value="5">5 stars & above</SelectItem>
                      <SelectItem value="4">4 stars & above</SelectItem>
                      <SelectItem value="3">3 stars & above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block font-medium">Additional Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verified-only" className="text-sm">
                        Verified traders only
                      </Label>
                      <Switch id="verified-only" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="with-photos" className="text-sm">
                        Items with photos only
                      </Label>
                      <Switch id="with-photos" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="local-pickup" className="text-sm">
                        Local pickup available
                      </Label>
                      <Switch id="local-pickup" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="shipping" className="text-sm">
                        Shipping available
                      </Label>
                      <Switch id="shipping" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button>Apply Filters</Button>
                  <Button variant="outline">Reset All</Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Quick access to your saved search queries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vintage Cameras</p>
                  <p className="text-xs text-muted-foreground">Within 15 miles</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Retro Video Games</p>
                  <p className="text-xs text-muted-foreground">Any location</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Hiking Gear</p>
                  <p className="text-xs text-muted-foreground">Within 25 miles</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/saved-searches">View All Saved Searches</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-9">
          <div className="mb-6 rounded-lg border">
            <div className="flex flex-col gap-4 p-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search for items, categories, or keywords..." className="pl-8" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="distance">Distance: Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="grid">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 24 results</p>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <SearchResultCard key={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <SearchResultListItem key={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="rounded-lg border">
                <div className="aspect-[16/9] w-full bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Map View - Interactive map would be displayed here</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">9 items found in the selected area</p>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex-shrink-0">
                        <SearchResultMapCard />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex items-center justify-center">
            <Button variant="outline" className="mx-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="default" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <span className="mx-1">...</span>
            <Button variant="outline" className="mx-1">
              8
            </Button>
            <Button variant="outline" className="mx-2">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchResultCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src="/placeholder.svg?height=300&width=300"
            alt="Item"
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline">Electronics</Badge>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        <h3 className="mb-1 font-semibold">Vintage Film Camera</h3>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" />
          <span>2.5 miles away</span>
        </div>
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          <span>Listed 2 days ago</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-xs">John Doe</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Save
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}

function SearchResultListItem() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border sm:flex-row">
      <div className="relative h-48 w-full sm:h-auto sm:w-48">
        <img src="/placeholder.svg?height=200&width=200" alt="Item" className="h-full w-full object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline">Electronics</Badge>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        <h3 className="mb-1 text-lg font-semibold">Vintage Film Camera</h3>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          A beautiful vintage film camera in excellent working condition. Comes with original leather case and manual.
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span>2.5 miles away</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>Listed 2 days ago</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Tag className="mr-1 h-3 w-3" />
            <span>Like New</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            <span>John Doe</span>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Button>View Details</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="outline" size="icon">
              <BookmarkPlus className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchResultMapCard() {
  return (
    <Card className="w-64">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src="/placeholder.svg?height=150&width=200" alt="Item" className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium">Vintage Film Camera</h4>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span>2.5 miles</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Electronics
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

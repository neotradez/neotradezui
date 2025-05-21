import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  ArrowUpDown,
  Calendar,
  ChevronRight,
  DollarSign,
  Filter,
  Info,
  LineChart,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PriceGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rarity Guide</h1>
          <p className="text-muted-foreground">Rarity classification for common trade items</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Rarity History
          </Button>
          <Button>
            <LineChart className="mr-2 h-4 w-4" />
            My Items
          </Button>
        </div>
      </div>

      <div className="mb-8 rounded-lg border p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for items, brands, or categories..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="collectibles">Collectibles</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="sports">Sports & Outdoors</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="popular">Popular Items</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="brands">By Brand</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Vintage Film Camera",
                category: "Electronics",
                avgPrice: "Common",
                trend: "up",
                trendValue: "8%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "High",
                condition: "Used - Good",
              },
              {
                name: "Mechanical Keyboard",
                category: "Electronics",
                avgPrice: "Uncommon",
                trend: "up",
                trendValue: "12%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "Very High",
                condition: "Used - Excellent",
              },
              {
                name: "Vinyl Record Collection",
                category: "Collectibles",
                avgPrice: "Rare",
                trend: "stable",
                trendValue: "2%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "Medium",
                condition: "Used - Good",
              },
              {
                name: "Vintage Leather Jacket",
                category: "Clothing",
                avgPrice: "Uncommon",
                trend: "up",
                trendValue: "5%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "Medium",
                condition: "Used - Good",
              },
              {
                name: "Gaming Console",
                category: "Electronics",
                avgPrice: "Common",
                trend: "down",
                trendValue: "3%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "High",
                condition: "Used - Good",
              },
              {
                name: "Mountain Bike",
                category: "Sports & Outdoors",
                avgPrice: "Rare",
                trend: "up",
                trendValue: "10%",
                image: "/placeholder.svg?height=200&width=200",
                popularity: "High",
                condition: "Used - Good",
              },
            ].map((item, index) => (
              <PriceGuideCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="mb-6 rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-medium">Rarity Trends This Month</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Biggest Rarity Increases</h3>
                    <p className="text-sm text-muted-foreground">Items with the largest value gains</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/price-guide/trending/up">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Retro Gaming Consoles", change: "+18%" },
                  { name: "Vintage Cameras", change: "+15%" },
                  { name: "Vinyl Records", change: "+12%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <span>{item.name}</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Biggest Rarity Decreases</h3>
                    <p className="text-sm text-muted-foreground">Items with the largest value drops</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/price-guide/trending/down">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Last-Gen Smartphones", change: "-15%" },
                  { name: "DVD Collections", change: "-12%" },
                  { name: "Fitness Equipment", change: "-8%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <span>{item.name}</span>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Trends</CardTitle>
              <CardDescription>How item values change throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Spring (Current Season)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Outdoor Equipment</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Rising
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Gardening Tools</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Rising
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Winter Sports Gear</span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Falling</Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Summer (Upcoming)</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Camping Gear</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Will Rise
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Beach Equipment</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Will Rise
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Video Games</span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Will Fall</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/price-guide/seasonal">
                  View Full Seasonal Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Electronics",
                icon: "💻",
                items: 1245,
                avgValue: "Common",
                trend: "up",
              },
              {
                name: "Collectibles",
                icon: "🏆",
                items: 982,
                avgValue: "Uncommon",
                trend: "up",
              },
              {
                name: "Clothing & Accessories",
                icon: "👕",
                items: 1876,
                avgValue: "Common",
                trend: "stable",
              },
              {
                name: "Home & Garden",
                icon: "🏡",
                items: 1432,
                avgValue: "Rare",
                trend: "down",
              },
              {
                name: "Sports & Outdoors",
                icon: "⚽",
                items: 876,
                avgValue: "Uncommon",
                trend: "up",
              },
              {
                name: "Books & Media",
                icon: "📚",
                items: 2134,
                avgValue: "Common",
                trend: "stable",
              },
              {
                name: "Toys & Games",
                icon: "🎮",
                items: 1543,
                avgValue: "Uncommon",
                trend: "up",
              },
              {
                name: "Musical Instruments",
                icon: "🎸",
                items: 543,
                avgValue: "Rare",
                trend: "stable",
              },
              {
                name: "Art & Crafts",
                icon: "🎨",
                items: 765,
                avgValue: "Uncommon",
                trend: "up",
              },
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Items Listed:</span>
                      <span className="font-medium">{category.items}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Rarity Range:</span>
                      <span className="font-medium">{category.avgValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rarity Trend:</span>
                      <div className="flex items-center">
                        {category.trend === "up" && <TrendingUp className="mr-1 h-4 w-4 text-green-500" />}
                        {category.trend === "down" && <TrendingDown className="mr-1 h-4 w-4 text-red-500" />}
                        {category.trend === "stable" && <ArrowUpDown className="mr-1 h-4 w-4 text-amber-500" />}
                        <span
                          className={
                            category.trend === "up"
                              ? "text-green-500"
                              : category.trend === "down"
                                ? "text-red-500"
                                : "text-amber-500"
                          }
                        >
                          {category.trend === "up" ? "Rising" : category.trend === "down" ? "Falling" : "Stable"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/price-guide/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Category
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brands" className="mt-6">
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Apple", "Sony", "Nintendo", "Samsung", "Levi's", "Nike", "Canon", "IKEA"].map((brand, index) => (
              <Button key={index} variant="outline" className="h-auto py-6 text-lg" asChild>
                <Link href={`/price-guide/brands/${brand.toLowerCase()}`}>{brand}</Link>
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Brands by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="electronics" className="w-full">
                <TabsList className="mb-4 w-full grid grid-cols-3">
                  <TabsTrigger value="electronics">Electronics</TabsTrigger>
                  <TabsTrigger value="clothing">Clothing</TabsTrigger>
                  <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
                </TabsList>

                <TabsContent value="electronics">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { name: "Apple", avgValue: "Rare", popularity: "Very High" },
                      { name: "Samsung", avgValue: "Uncommon", popularity: "High" },
                      { name: "Sony", avgValue: "Uncommon", popularity: "High" },
                      { name: "Nintendo", avgValue: "Common", popularity: "High" },
                      { name: "Canon", avgValue: "Rare", popularity: "Medium" },
                      { name: "Bose", avgValue: "Uncommon", popularity: "Medium" },
                    ].map((brand, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{brand.name}</div>
                          <div className="text-sm text-muted-foreground">Avg. Rarity: {brand.avgValue}</div>
                        </div>
                        <Badge variant="outline">{brand.popularity}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="clothing">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { name: "Nike", avgValue: "Uncommon", popularity: "Very High" },
                      { name: "Adidas", avgValue: "Uncommon", popularity: "High" },
                      { name: "Levi's", avgValue: "Common", popularity: "High" },
                      { name: "North Face", avgValue: "Rare", popularity: "Medium" },
                      { name: "Patagonia", avgValue: "Rare", popularity: "Medium" },
                      { name: "Zara", avgValue: "Common", popularity: "Medium" },
                    ].map((brand, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{brand.name}</div>
                          <div className="text-sm text-muted-foreground">Avg. Rarity: {brand.avgValue}</div>
                        </div>
                        <Badge variant="outline">{brand.popularity}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="collectibles">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { name: "LEGO", avgValue: "Rare", popularity: "Very High" },
                      { name: "Funko", avgValue: "Uncommon", popularity: "High" },
                      { name: "Pokemon", avgValue: "Very Rare", popularity: "High" },
                      { name: "Hot Wheels", avgValue: "Common", popularity: "Medium" },
                      { name: "Star Wars", avgValue: "Rare", popularity: "Medium" },
                      { name: "Marvel", avgValue: "Uncommon", popularity: "Medium" },
                    ].map((brand, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{brand.name}</div>
                          <div className="text-sm text-muted-foreground">Avg. Rarity: {brand.avgValue}</div>
                        </div>
                        <Badge variant="outline">{brand.popularity}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Rarity Estimation Tool</CardTitle>
            <CardDescription>Get an estimated value range for your items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="clothing">Clothing & Accessories</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="sony">Sony</SelectItem>
                      <SelectItem value="nintendo">Nintendo</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Item Condition</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Item Description</label>
                <Input placeholder="Enter item name, model, or specific details" />
              </div>

              <Button className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Estimate Rarity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PriceGuideCard({ item }) {
  return (
    <Card>
      <div className="aspect-square w-full overflow-hidden">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline">{item.category}</Badge>
          <div className="flex items-center">
            {item.trend === "up" && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                {item.trendValue}
              </Badge>
            )}
            {item.trend === "down" && (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <TrendingDown className="mr-1 h-3 w-3" />
                {item.trendValue}
              </Badge>
            )}
            {item.trend === "stable" && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <ArrowUpDown className="mr-1 h-3 w-3" />
                {item.trendValue}
              </Badge>
            )}
          </div>
        </div>
        <h3 className="mb-1 font-semibold">{item.name}</h3>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <DollarSign className="mr-1 h-3 w-3" />
          <span>Avg. Rarity: {item.avgPrice}</span>
        </div>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <Star className="mr-1 h-3 w-3" />
          <span>Popularity: {item.popularity}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="mr-1 h-3 w-3" />
          <span>Typical Condition: {item.condition}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button className="w-full" asChild>
          <Link href={`/price-guide/items/${item.name.toLowerCase().replace(/\s+/g, "-")}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

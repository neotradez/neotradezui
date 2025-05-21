import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Search | NeoTradez",
  description: "Search for items, users, and trades",
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-2" />
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Search</h1>

      <div className="mb-6 flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search for items, users, trades..." className="pl-8" />
        </div>
        <Button type="submit">Search</Button>
      </div>

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Item+${i + 1}`}
                      alt={`Item ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Example Item {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">Category • Condition: Good</p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=U${i + 1}`}
                      alt={`User ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">User{i + 1}</h3>
                    <p className="text-sm text-muted-foreground">Rating: {(4 + Math.random()).toFixed(1)} ★</p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <div className="space-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Trade #{1000 + i}</h3>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {["Pending", "Accepted", "Completed"][i % 3]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex flex-1 items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=U${i + 1}`}
                          alt={`User ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Item {i + 1}</span>
                    </div>
                    <div className="flex-0">↔️</div>
                    <div className="flex flex-1 items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=U${i + 2}`}
                          alt={`User ${i + 2}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm">Item {i + 2}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Location+${i + 1}`}
                      alt={`Location ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Location {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">
                      {["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Jersey City"][i]} •{" "}
                      {Math.floor(Math.random() * 10) + 1} trades this week
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

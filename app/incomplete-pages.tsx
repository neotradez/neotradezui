"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, AlertCircle, Clock, ArrowRight } from "lucide-react"

export default function IncompletePagesPage() {
  const [selectedTab, setSelectedTab] = useState("core")

  const statusColors = {
    notStarted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    inProgress: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    planned: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }

  const statusIcons = {
    notStarted: <Circle className="h-4 w-4" />,
    inProgress: <Clock className="h-4 w-4" />,
    planned: <AlertCircle className="h-4 w-4" />,
    completed: <CheckCircle2 className="h-4 w-4" />,
  }

  const pages = {
    core: [
      {
        name: "Dashboard",
        description: "User dashboard with activity summary and quick actions",
        status: "notStarted",
        priority: "High",
        route: "/dashboard",
      },
      {
        name: "Trade History",
        description: "Detailed history of all completed trades",
        status: "planned",
        priority: "Medium",
        route: "/trade-history",
      },
      {
        name: "Saved Searches",
        description: "View and manage saved search queries",
        status: "notStarted",
        priority: "Low",
        route: "/saved-searches",
      },
      {
        name: "Notifications Center",
        description: "Centralized notifications management",
        status: "inProgress",
        priority: "High",
        route: "/notifications/center",
      },
      {
        name: "Help Center",
        description: "FAQ, guides, and support resources",
        status: "notStarted",
        priority: "Medium",
        route: "/help",
      },
    ],
    trading: [
      {
        name: "Trade Analytics",
        description: "Statistics and insights about your trading activity",
        status: "notStarted",
        priority: "Medium",
        route: "/analytics",
      },
      {
        name: "Trade Disputes",
        description: "File and manage trade disputes",
        status: "notStarted",
        priority: "High",
        route: "/disputes",
      },
      {
        name: "Trade Offers",
        description: "Manage and compare multiple offers for an item",
        status: "planned",
        priority: "High",
        route: "/offers",
      },
      {
        name: "Trade Bundles",
        description: "Create and manage bundles of multiple items for trade",
        status: "notStarted",
        priority: "Medium",
        route: "/bundles",
      },
      {
        name: "Trade Insurance",
        description: "Purchase insurance for high-value trades",
        status: "notStarted",
        priority: "Low",
        route: "/insurance",
      },
    ],
    social: [
      {
        name: "Community Forums",
        description: "Discuss trading topics with other users",
        status: "notStarted",
        priority: "Medium",
        route: "/forums",
      },
      {
        name: "User Groups",
        description: "Join and create trading groups with shared interests",
        status: "notStarted",
        priority: "Low",
        route: "/groups",
      },
      {
        name: "Events Calendar",
        description: "View and join upcoming trading events",
        status: "planned",
        priority: "Medium",
        route: "/events",
      },
      {
        name: "Trader Network",
        description: "Build a network of trusted traders",
        status: "notStarted",
        priority: "High",
        route: "/network",
      },
      {
        name: "Trade Clubs",
        description: "Exclusive clubs for specialized trading categories",
        status: "notStarted",
        priority: "Low",
        route: "/clubs",
      },
    ],
    account: [
      {
        name: "Verification Center",
        description: "Complete identity and item verification",
        status: "inProgress",
        priority: "High",
        route: "/verification",
      },
      {
        name: "Security Settings",
        description: "Enhanced security options including 2FA",
        status: "planned",
        priority: "High",
        route: "/security",
      },
      {
        name: "Linked Accounts",
        description: "Connect social and payment accounts",
        status: "notStarted",
        priority: "Medium",
        route: "/linked-accounts",
      },
      {
        name: "Subscription Management",
        description: "Manage premium subscription options",
        status: "notStarted",
        priority: "Low",
        route: "/subscriptions",
      },
      {
        name: "Data Export",
        description: "Export your account data and history",
        status: "notStarted",
        priority: "Low",
        route: "/data-export",
      },
    ],
    marketplace: [
      {
        name: "Advanced Search",
        description: "Powerful search with filters and saved queries",
        status: "planned",
        priority: "High",
        route: "/advanced-search",
      },
      {
        name: "Price Guide",
        description: "Value estimation for common trade items",
        status: "notStarted",
        priority: "Medium",
        route: "/price-guide",
      },
      {
        name: "Trending Items",
        description: "View currently popular and trending items",
        status: "notStarted",
        priority: "Medium",
        route: "/trending",
      },
      {
        name: "Seasonal Collections",
        description: "Curated collections based on seasons or themes",
        status: "notStarted",
        priority: "Low",
        route: "/collections",
      },
      {
        name: "Marketplace Insights",
        description: "Data-driven insights about marketplace activity",
        status: "notStarted",
        priority: "Medium",
        route: "/insights",
      },
    ],
  }

  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Incomplete UI/Frontend Pages</h1>
        <p className="text-muted-foreground">
          This is a comprehensive list of UI/frontend pages that still need to be completed for the NeoTradez platform.
        </p>
      </div>

      <Tabs defaultValue="core" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="mb-6 overflow-x-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="core">Core Pages</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(pages).map(([category, categoryPages]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryPages.map((page, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{page.name}</CardTitle>
                      <Badge className={statusColors[page.status]} variant="outline">
                        <span className="flex items-center gap-1">
                          {statusIcons[page.status]}
                          {page.status === "notStarted"
                            ? "Not Started"
                            : page.status === "inProgress"
                              ? "In Progress"
                              : page.status === "planned"
                                ? "Planned"
                                : "Completed"}
                        </span>
                      </Badge>
                    </div>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge className={priorityColors[page.priority]} variant="outline">
                        {page.priority} Priority
                      </Badge>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Development Status Summary</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Not Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {
                  Object.values(pages)
                    .flat()
                    .filter((page) => page.status === "notStarted").length
                }
              </div>
              <p className="text-muted-foreground text-sm">Pages that haven't been started yet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Planned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {
                  Object.values(pages)
                    .flat()
                    .filter((page) => page.status === "planned").length
                }
              </div>
              <p className="text-muted-foreground text-sm">Pages that are planned for development</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {
                  Object.values(pages)
                    .flat()
                    .filter((page) => page.status === "inProgress").length
                }
              </div>
              <p className="text-muted-foreground text-sm">Pages currently being developed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {
                  Object.values(pages)
                    .flat()
                    .filter((page) => page.status === "completed").length
                }
              </div>
              <p className="text-muted-foreground text-sm">Pages that are fully implemented</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

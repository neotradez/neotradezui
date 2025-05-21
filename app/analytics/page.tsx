"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Calendar,
  Download,
  LineChart,
  PieChart,
  RefreshCw,
  Share2,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function TradeAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trade Analytics</h1>
          <p className="text-muted-foreground">Insights and statistics about your trading activity</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trade Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,840</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8%</span>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+2%</span>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hrs</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">-15%</span>
              <span className="ml-1">from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Trade Activity</CardTitle>
                <CardDescription>Number of trades over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/1] w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Trade activity chart would render here</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View by Month
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Types</CardTitle>
                <CardDescription>Breakdown of your trade types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-square w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Trade types chart would render here</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Item for Item</span>
                    </div>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Item for Service</span>
                    </div>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Item for Cash</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Status</CardTitle>
                <CardDescription>Current status of your trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 aspect-square w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Trade status chart would render here</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="text-sm font-medium">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">In Progress</span>
                    </div>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Canceled</span>
                    </div>
                    <span className="text-sm font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Items traded by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/1] w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Category distribution chart would render here
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>Your most traded categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Electronics</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Collectibles</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Books & Media</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Clothing</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Home & Garden</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/analytics/categories">
                    View All Categories
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Growth</CardTitle>
                <CardDescription>Changes in your trading categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Electronics", change: 8, direction: "up" },
                    { category: "Collectibles", change: 12, direction: "up" },
                    { category: "Books & Media", change: 3, direction: "down" },
                    { category: "Clothing", change: 5, direction: "up" },
                    { category: "Home & Garden", change: 2, direction: "down" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{item.category}</span>
                      <div className="flex items-center">
                        {item.direction === "up" ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <ArrowUp className="mr-1 h-3 w-3" />
                            {item.change}%
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            <ArrowDown className="mr-1 h-3 w-3" />
                            {item.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trade Success Rate</CardTitle>
                <CardDescription>Percentage of successful trades over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/2] w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Success rate chart would render here</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average time to respond to trade requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/2] w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Response time chart would render here</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                    <div className="mt-1 text-2xl font-bold">78%</div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+5%</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Avg. Negotiation Time</div>
                    <div className="mt-1 text-2xl font-bold">1.8 days</div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">-12%</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Meetup Reliability</div>
                    <div className="mt-1 text-2xl font-bold">96%</div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+2%</span>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm text-muted-foreground">Positive Feedback</div>
                    <div className="mt-1 text-2xl font-bold">92%</div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Trade Locations</CardTitle>
                <CardDescription>Geographic distribution of your trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-muted-foreground">Map visualization would render here</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Trading Areas</CardTitle>
                <CardDescription>Areas where you trade most frequently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { area: "Downtown", trades: 15, distance: "0-3 miles" },
                    { area: "Westside", trades: 10, distance: "3-7 miles" },
                    { area: "Northside", trades: 8, distance: "5-10 miles" },
                    { area: "Eastside", trades: 5, distance: "4-8 miles" },
                    { area: "Southside", trades: 4, distance: "6-12 miles" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.area}</div>
                        <div className="text-xs text-muted-foreground">{item.distance}</div>
                      </div>
                      <Badge variant="outline">{item.trades} trades</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distance Analysis</CardTitle>
                <CardDescription>How far you typically travel for trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 aspect-square w-full rounded-md border bg-muted/20">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Distance chart would render here</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">0-5 miles</span>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">5-10 miles</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">10+ miles</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Recent Insights</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Trading Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You trade most actively on weekends, with Saturday being your most active day. Consider listing items on
                Thursday or Friday to maximize visibility.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Category Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                There's high demand for vintage electronics in your area, but you've only listed 2 items in this
                category. Consider listing more to increase your trade opportunities.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response Time Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trades where you responded within 1 hour had a 95% completion rate, compared to 72% for responses after
                12 hours. Quick responses significantly improve your success rate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

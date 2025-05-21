"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Loader2, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { mockTrustedUsers } from "@/mock/network-data"
import NetworkUserCard from "@/components/network/network-user-card"
import type { User } from "@/types"
export default function TrustPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [trustData, setTrustData] = useState(null)
  const [trustedUsers, setTrustedUsers] = useState<User[]>(mockTrustedUsers)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock trust data
  const mockTrustData = {
    score: 92,
    level: "Excellent",
    totalTrades: 45,
    factors: {
      onTimeMeetups: 95,
      itemConditionAccuracy: 90,
      communication: 98,
      fairNegotiations: 88,
    },
    recentChanges: [
      {
        change: "+1%",
        reason: "You received a 5-star review from Marcus Wilson for your recent camera equipment trade.",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        change: "+2%",
        reason: "You completed 5 consecutive trades with perfect on-time arrivals and accurate item descriptions.",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        change: "-1%",
        reason: "You were 20 minutes late to a scheduled meetup without advance notice.",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    networkBreakdown: {
      trusted: 18,
      verified: 7,
      new: 3,
    },
  }

  // Initialize data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data with a delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setTrustData(mockTrustData)
      } catch (error) {
        console.error("Error fetching trust data:", error)
        toast({
          title: "Error",
          description: "Failed to load trust data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  // Filter trusted users based on search query
  const filteredUsers = trustedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle messaging a user
  const handleMessage = (userId: string) => {
    router.push(`/messages?user=${userId}`)
  }

  // Handle untrusting a user
  const handleUntrustUser = (userId: string) => {
    setTrustedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Network
        </Button>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Trust Score Details</h1>

        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading trust data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Network
      </Button>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Trust Score Details</h1>
      <div className="mb-4 flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search trusted users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="h-5 w-5 text-gray-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Trust Score</CardTitle>
            <CardDescription>How your network rates your trading reliability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{trustData.score}%</div>
                  <p className="text-sm text-muted-foreground">{trustData.level}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{trustData.totalTrades}</div>
                <p className="text-sm text-muted-foreground">Network trades</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-2 text-sm font-medium">Trust Factors</h4>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>On-time meetups</span>
                    <span>{trustData.factors.onTimeMeetups}%</span>
                  </div>
                  <Progress value={trustData.factors.onTimeMeetups} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Item condition accuracy</span>
                    <span>{trustData.factors.itemConditionAccuracy}%</span>
                  </div>
                  <Progress value={trustData.factors.itemConditionAccuracy} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Communication</span>
                    <span>{trustData.factors.communication}%</span>
                  </div>
                  <Progress value={trustData.factors.communication} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Fair negotiations</span>
                    <span>{trustData.factors.fairNegotiations}%</span>
                  </div>
                  <Progress value={trustData.factors.fairNegotiations} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/reviews")}>
              View Detailed Feedback
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Trust Levels</CardTitle>
            <CardDescription>Trust breakdown of your trading network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Trusted
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>90%+ trust score, 10+ successful trades</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>90%+ trust score</span>
                </div>
                <span className="font-medium">{trustData.networkBreakdown.trusted}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Verified
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>75-89% trust score, 5+ successful trades</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>75-89% trust score</span>
                </div>
                <span className="font-medium">{trustData.networkBreakdown.verified}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          New
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Less than 5 trades or new to the platform</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>Less than 5 trades</span>
                </div>
                <span className="font-medium">{trustData.networkBreakdown.new}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium">Trust Benefits</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority access to new listings from trusted traders</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Simplified trade process with trusted network members</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Higher visibility in search results and recommendations</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/about/trust-system")}>
              Learn About Trust Program
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Trust Score Changes</CardTitle>
          <CardDescription>History of changes to your trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trustData.recentChanges.map((change, index) => (
              <div key={index} className="rounded-lg border p-3">
                <div className="flex justify-between">
                  <div className="font-medium">{change.change} change</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(change.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{change.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Improve Your Score</CardTitle>
          <CardDescription>Tips to increase your trust score</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">Always provide accurate descriptions and photos of your items</span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">Be punctual for meetups or notify the other party if you'll be delayed</span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">Respond to messages within 24 hours</span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">Be fair and transparent in your negotiations</span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
              <span className="text-sm">Complete more trades with trusted network members</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trusted Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <NetworkUserCard key={user.id} user={user} onMessage={handleMessage} onUntrust={handleUntrustUser} />
          ))}
        </div>
      </div>
    </div>
  )
}

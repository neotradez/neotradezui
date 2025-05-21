"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  MapPin,
  AlertTriangle,
  Check,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TradeProposalPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [showCounterOfferDialog, setShowCounterOfferDialog] = useState(false)

  // Mock data for the trade proposal
  const proposal = {
    id: params.id,
    status: "pending",
    date: "May 5, 2025",
    title: "Trade Proposal: Vintage Camera",
    description:
      "I'm interested in trading my gaming console for your vintage camera. The console is in excellent condition and comes with two controllers and three games.",
    yourItem: {
      id: "item-1",
      title: "Vintage Film Camera",
      description: "Pentax K1000 35mm film camera in excellent condition. Includes 50mm lens.",
      condition: "Excellent",
      category: "Photography",
      image: "/placeholder.svg?height=200&width=200&text=Camera",
      estimatedValue: 150,
    },
    theirItem: {
      id: "item-2",
      title: "Gaming Console",
      description: "Latest generation gaming console with two controllers and three games.",
      condition: "Like New",
      category: "Gaming",
      image: "/placeholder.svg?height=200&width=200&text=Console",
      estimatedValue: 300,
    },
    trader: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50&text=AJ",
      rating: 4.8,
      tradeCount: 23,
      location: "Brooklyn, NY",
      joinedDate: "January 2024",
    },
  }

  const handleAccept = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Trade Accepted",
        description: "You've accepted the trade proposal. Let's arrange a meetup!",
      })
      router.push(`/trade-meetup/arrange/${proposal.id}`)
    }, 1000)
  }

  const handleDecline = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Trade Declined",
        description: "You've declined the trade proposal.",
      })
      router.push("/my-trades")
    }, 1000)
  }

  const handleCounterOffer = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Counter Offer Sent",
        description: "Your counter offer has been sent to the trader.",
      })
      setShowCounterOfferDialog(false)
      router.push("/my-trades")
    }, 1000)
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{proposal.title}</h1>
          <p className="text-muted-foreground">Review this trade proposal and respond</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trade Details</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                >
                  Pending
                </Badge>
              </div>
              <CardDescription>Proposed on {proposal.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <p className="text-sm">{proposal.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-medium">Your Item</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={proposal.yourItem.image || "/placeholder.svg"}
                        alt={proposal.yourItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{proposal.yourItem.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{proposal.yourItem.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">{proposal.yourItem.category}</Badge>
                        <span className="text-sm font-medium">${proposal.yourItem.estimatedValue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Their Item</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={proposal.theirItem.image || "/placeholder.svg"}
                        alt={proposal.theirItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{proposal.theirItem.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{proposal.theirItem.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline">{proposal.theirItem.category}</Badge>
                        <span className="text-sm font-medium">${proposal.theirItem.estimatedValue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Your Response</h3>
                <Textarea
                  placeholder="Add a message to your response (optional)"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button variant="destructive" onClick={handleDecline} disabled={isLoading} className="flex-1">
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>

              <Dialog open={showCounterOfferDialog} onOpenChange={setShowCounterOfferDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" disabled={isLoading} className="flex-1">
                    Counter Offer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make a Counter Offer</DialogTitle>
                    <DialogDescription>Request additional items or modifications to the trade.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">What would you like to request?</h4>
                      <Textarea
                        placeholder="I'd like to also include your headphones with the gaming console..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowCounterOfferDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCounterOffer} disabled={isLoading}>
                      Send Counter Offer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="default" onClick={handleAccept} disabled={isLoading} className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Accept & Arrange Meetup
              </Button>
            </CardFooter>
          </Card>

          <div className="rounded-lg border p-4 bg-yellow-50 dark:bg-yellow-900/10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Trading Safety Tips</h3>
                <ul className="mt-2 space-y-1 text-sm text-yellow-800/80 dark:text-yellow-400/80">
                  <li>• Always meet in a public place with plenty of people around</li>
                  <li>• Inspect items thoroughly before completing the trade</li>
                  <li>• Consider bringing a friend to the meetup</li>
                  <li>• Trust your instincts - if something feels off, don't proceed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trader Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={proposal.trader.avatar || "/placeholder.svg"} alt={proposal.trader.name} />
                  <AvatarFallback>{proposal.trader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{proposal.trader.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span>
                      {proposal.trader.rating} • {proposal.trader.tradeCount} trades
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{proposal.trader.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Member since {proposal.trader.joinedDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/messages/${proposal.trader.id}`)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Trader
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Value Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your Item</span>
                  <span className="font-medium">${proposal.yourItem.estimatedValue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Their Item</span>
                  <span className="font-medium">${proposal.theirItem.estimatedValue}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Difference</span>
                  <div className="flex items-center gap-1">
                    {proposal.theirItem.estimatedValue > proposal.yourItem.estimatedValue ? (
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`font-medium ${proposal.theirItem.estimatedValue > proposal.yourItem.estimatedValue ? "text-green-600" : "text-red-600"}`}
                    >
                      ${Math.abs(proposal.theirItem.estimatedValue - proposal.yourItem.estimatedValue)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

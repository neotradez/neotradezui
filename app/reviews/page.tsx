"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Flag, MoreHorizontal, MessageSquare, ThumbsUp, Clock, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Mock data
const reviews = [
  {
    id: "rev1",
    reviewer: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user1",
    },
    tradeId: "TRD-78901",
    itemName: "Vintage Camera",
    date: "May 2, 2023",
    rating: 5,
    title: "Excellent trade experience!",
    content:
      "John was a pleasure to trade with. The camera was exactly as described, and he was punctual for our meetup. Would definitely trade with him again!",
    helpful: 12,
    isVerifiedPurchase: true,
  },
  {
    id: "rev2",
    reviewer: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user2",
    },
    tradeId: "TRD-78902",
    itemName: "Mechanical Keyboard",
    date: "April 28, 2023",
    rating: 4,
    title: "Good trade, minor issue with packaging",
    content:
      "The keyboard works perfectly and Sarah was very nice, but the original box was a bit damaged. Overall a positive experience though!",
    helpful: 8,
    isVerifiedPurchase: true,
  },
  {
    id: "rev3",
    reviewer: {
      name: "David Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user3",
    },
    tradeId: "TRD-78903",
    itemName: "Mountain Bike",
    date: "April 15, 2023",
    rating: 5,
    title: "Fantastic trade and great person",
    content:
      "The bike was in even better condition than the photos showed. Great communication and easy meetup process. Highly recommend trading with this person!",
    helpful: 15,
    isVerifiedPurchase: true,
  },
  {
    id: "rev4",
    reviewer: {
      name: "Sophia Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user4",
    },
    tradeId: "TRD-78904",
    itemName: "Designer Sunglasses",
    date: "April 8, 2023",
    rating: 3,
    title: "Okay trade, some scratches not mentioned",
    content:
      "The sunglasses had a few small scratches that weren't mentioned in the listing. The trader was nice about it though and we agreed on a partial refund.",
    helpful: 5,
    isVerifiedPurchase: false,
  },
  {
    id: "rev5",
    reviewer: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user5",
    },
    tradeId: "TRD-78905",
    itemName: "Gaming Console",
    date: "March 30, 2023",
    rating: 5,
    title: "Perfect condition, fast trade",
    content:
      "Console works perfectly and included all original accessories. Great trader who was flexible with meeting time and location. Would trade with again!",
    helpful: 20,
    isVerifiedPurchase: true,
  },
  {
    id: "rev6",
    reviewer: {
      name: "Emma Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      userId: "user6",
    },
    tradeId: "TRD-78906",
    itemName: "Bluetooth Headphones",
    date: "March 22, 2023",
    rating: 2,
    title: "Disappointed with battery life",
    content:
      "The headphones look good but the battery only lasts about 2 hours instead of the 8 hours mentioned. The trader was unresponsive when I brought this up.",
    helpful: 18,
    isVerifiedPurchase: true,
  },
]

// Mock rating summary data
const ratingSummary = {
  average: 4.0,
  total: reviews.length,
  distribution: [
    { rating: 5, count: 3, percentage: 50 },
    { rating: 4, count: 1, percentage: 16.7 },
    { rating: 3, count: 1, percentage: 16.7 },
    { rating: 2, count: 1, percentage: 16.7 },
    { rating: 1, count: 0, percentage: 0 },
  ],
}

export default function ReviewsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [reportReason, setReportReason] = useState("false_information")

  // Handle marking a review as helpful
  const handleMarkHelpful = (reviewId) => {
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback on this review.",
    })
  }

  // Handle reporting a review
  const handleReportReview = (review) => {
    setSelectedReview(review)
    setShowReportDialog(true)
  }

  // Handle submitting a report
  const handleSubmitReport = (e) => {
    e.preventDefault()
    setShowReportDialog(false)
    toast({
      title: "Report submitted",
      description: "Thank you for reporting this review. Our team will review it shortly.",
    })
  }

  // Navigate to contacting a reviewer
  const handleContactReviewer = (reviewer) => {
    router.push(`/messages?user=${reviewer.userId}`)
  }

  // Find a specific review
  const findReview = (searchQuery) => {
    setSearchQuery(searchQuery)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">View and manage your trade reviews.</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xl">Overall Rating</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{ratingSummary.average.toFixed(1)}</div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(ratingSummary.average)
                        ? "fill-primary text-primary"
                        : i < ratingSummary.average
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-1 text-muted-foreground">Based on {ratingSummary.total} reviews</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-xl">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ratingSummary.distribution.map((item) => (
              <div key={item.rating} className="grid grid-cols-12 items-center gap-2">
                <div className="col-span-2 flex items-center">
                  <span>{item.rating}</span>
                  <StarIcon className="ml-1 h-4 w-4 fill-primary text-primary" />
                </div>
                <div className="col-span-8">
                  <Progress value={item.percentage} className="h-2" />
                </div>
                <div className="col-span-2 text-right text-sm text-muted-foreground">
                  {item.count} ({item.percentage.toFixed(1)}%)
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Reviews</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reviews..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => findReview(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="received">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Reviews You've Received</TabsTrigger>
          <TabsTrigger value="given">Reviews You've Given</TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="mt-6">
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onMarkHelpful={() => handleMarkHelpful(review.id)}
                onReport={() => handleReportReview(review)}
                onContact={() => handleContactReviewer(review.reviewer)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="given" className="mt-6">
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard
                key={review.id}
                review={{ ...review, isGivenByUser: true }}
                onMarkHelpful={() => handleMarkHelpful(review.id)}
                onReport={() => handleReportReview(review)}
                onContact={() => handleContactReviewer(review.reviewer)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Review Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report Review</DialogTitle>
            <DialogDescription>Let us know why you think this review should be reviewed by our team.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport}>
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="mb-2 font-medium">Review by {selectedReview?.reviewer?.name}</h3>
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < selectedReview?.rating ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium">{selectedReview?.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedReview?.content}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Reason for reporting</Label>
                <RadioGroup defaultValue="false_information" onValueChange={setReportReason} value={reportReason}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false_information" id="false_information" />
                    <Label htmlFor="false_information">False information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inappropriate" id="inappropriate" />
                    <Label htmlFor="inappropriate">Inappropriate content</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spam" id="spam" />
                    <Label htmlFor="spam">Spam or advertising</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_relevant" id="not_relevant" />
                    <Label htmlFor="not_relevant">Not relevant to the traded item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other reason</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="report-details">Additional details</Label>
                <Textarea
                  id="report-details"
                  placeholder="Please provide any additional information that might help our review team..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowReportDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ReviewCard({ review, onMarkHelpful, onReport, onContact }) {
  const isGivenByUser = review.isGivenByUser

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <CardTitle className="text-lg">{review.title}</CardTitle>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span>For {review.itemName}</span>
              <span>•</span>
              <span>{review.date}</span>
              {review.isVerifiedPurchase && (
                <>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">
                    Verified Trade
                  </Badge>
                </>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!isGivenByUser && (
                <DropdownMenuItem onClick={onContact}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Reviewer
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onReport}>
                <Flag className="mr-2 h-4 w-4" />
                Report Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={review.reviewer.avatar || "/placeholder.svg"} alt={review.reviewer.name} />
            <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {isGivenByUser ? "You" : review.reviewer.name}
              {isGivenByUser && <span className="ml-2 text-sm text-muted-foreground">Left this review</span>}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">{review.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={onMarkHelpful} disabled={isGivenByUser}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            Helpful ({review.helpful})
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={`/my-trades/${review.tradeId}`}>
              <Clock className="mr-2 h-4 w-4" />
              View Trade
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

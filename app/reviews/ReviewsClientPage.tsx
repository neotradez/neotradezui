"use client"
import Link from "next/link"
import { ArrowLeft, Star, Flag } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    initials: string
  }
  rating: number
  date: string
  comment: string
  trade: {
    id: string
    items: string[]
  }
  badges?: string[]
}

interface ReviewCardProps {
  review: Review
  type: "received" | "given"
  handleReportReview: (review: Review) => void
}

function ReviewCard({ review, type, handleReportReview }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
              <AvatarFallback>{review.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/user/${review.user.id}`}>
                <CardTitle className="text-base hover:underline">{review.user.name}</CardTitle>
              </Link>
              <CardDescription>{review.date}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? "fill-amber-500 text-amber-500"
                      : i + 0.5 === review.rating
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => handleReportReview(review)}
              title="Report review"
            >
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.comment}</p>
        {review.badges && review.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {review.badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>Trade:</span>
          <Link href={`/my-trades/${review.trade.id}`} className="hover:underline">
            {review.trade.items.join(" ↔ ")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

const reviewsReceived: Review[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    rating: 5,
    date: "April 24, 2025",
    comment:
      "Great trader! The item was exactly as described and the meetup was smooth. Would definitely trade with again.",
    trade: {
      id: "trade1",
      items: ["Vintage Camera", "Mechanical Keyboard"],
    },
    badges: ["Punctual", "Honest", "Friendly"],
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Sam Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SR",
    },
    rating: 5,
    date: "April 20, 2025",
    comment:
      "Excellent experience! Communication was clear and the trade was completed without any issues. Highly recommend!",
    trade: {
      id: "trade2",
      items: ["Mountain Bike", "Gaming Console"],
    },
    badges: ["Responsive", "Fair"],
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TK",
    },
    rating: 4,
    date: "April 15, 2025",
    comment: "Good trader. Item was in slightly different condition than I expected, but still a fair trade overall.",
    trade: {
      id: "trade3",
      items: ["Acoustic Guitar", "Electric Keyboard"],
    },
  },
]

const reviewsGiven: Review[] = [
  {
    id: "4",
    user: {
      id: "user4",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
    },
    rating: 5,
    date: "April 22, 2025",
    comment: "Perfect trade! Jordan was on time and the item was in even better condition than described. Very happy!",
    trade: {
      id: "trade4",
      items: ["Drone", "DSLR Camera"],
    },
    badges: ["Punctual", "Honest"],
  },
  {
    id: "5",
    user: {
      id: "user5",
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    rating: 4,
    date: "April 18, 2025",
    comment: "Good trader, but was a bit late to our meetup. Item was as described though.",
    trade: {
      id: "trade5",
      items: ["Tablet", "Bluetooth Speaker"],
    },
  },
]

export default function ReviewsClientPage() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportedReview, setReportedReview] = useState<Review | null>(null)
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const { toast } = useToast()

  const handleReportReview = (review: Review) => {
    setReportedReview(review)
    setReportDialogOpen(true)
  }

  const handleSubmitReport = () => {
    if (!reportReason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your backend
    console.log("Reporting review:", reportedReview?.id, "Reason:", reportReason, "Details:", reportDetails)

    toast({
      title: "Report submitted",
      description: "Thank you for your report. We'll review it shortly.",
    })

    // Reset and close
    setReportDialogOpen(false)
    setReportReason("")
    setReportDetails("")
    setReportedReview(null)
  }

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/my-trades">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-950 px-3 py-1.5 rounded-full">
            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
            <span className="font-medium">4.8</span>
            <span className="text-muted-foreground text-sm">(32 reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Rating Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>5</span>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="w-full max-w-[180px] h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>4</span>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="w-full max-w-[180px] h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>3</span>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="w-full max-w-[180px] h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "6%" }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>2</span>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="w-full max-w-[180px] h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "3%" }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span>1</span>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="w-full max-w-[180px] h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="received">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="received">Reviews Received</TabsTrigger>
              <TabsTrigger value="given">Reviews Given</TabsTrigger>
            </TabsList>
            <TabsContent value="received" className="space-y-4 mt-4">
              {reviewsReceived.map((review) => (
                <ReviewCard key={review.id} review={review} type="received" handleReportReview={handleReportReview} />
              ))}
            </TabsContent>
            <TabsContent value="given" className="space-y-4 mt-4">
              {reviewsGiven.map((review) => (
                <ReviewCard key={review.id} review={review} type="given" handleReportReview={handleReportReview} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Report Review Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-destructive" />
              Report Review
            </DialogTitle>
            <DialogDescription>
              Report this review if you believe it violates our community guidelines.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for reporting
              </Label>
              <RadioGroup value={reportReason} onValueChange={setReportReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false_information" id="false_information" />
                  <Label htmlFor="false_information">False information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate">Inappropriate content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="harassment" id="harassment" />
                  <Label htmlFor="harassment">Harassment or bullying</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam">Spam or misleading</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="text-sm font-medium">
                Additional details
              </Label>
              <Textarea
                id="details"
                placeholder="Please provide specific details about the issue..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubmitReport} className="gap-2">
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

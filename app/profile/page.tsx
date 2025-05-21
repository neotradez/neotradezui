"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  Award,
  Calendar,
  Edit,
  Flag,
  Home,
  MapPin,
  MessageSquare,
  Star,
  ThumbsUp,
  User,
  Instagram,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock user data
  const user = {
    id: "user123",
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg?height=300&width=300",
    location: "New York, NY",
    bio: "Passionate trader and collector. Always looking for unique items to add to my collection or trade for something interesting.",
    memberSince: "January 2023",
    completedTrades: 24,
    positiveRatings: 22,
    verificationLevel: 80,
    badges: [
      { name: "Trusted Trader", icon: <Award className="h-4 w-4" /> },
      { name: "Quick Responder", icon: <MessageSquare className="h-4 w-4" /> },
      { name: "Top Rated", icon: <Star className="h-4 w-4" /> },
    ],
    listings: [
      {
        id: "listing1",
        title: "Vintage Camera",
        image: "/placeholder.svg?height=200&width=200",
        category: "Electronics",
        condition: "Good",
      },
      {
        id: "listing2",
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=200&width=200",
        category: "Electronics",
        condition: "Like New",
      },
      {
        id: "listing3",
        title: "Leather Jacket",
        image: "/placeholder.svg?height=200&width=200",
        category: "Clothing",
        condition: "Excellent",
      },
    ],
    reviews: [
      {
        id: "review1",
        user: {
          name: "Jamie Lee",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        comment: "Great trader! The item was exactly as described and Alex was very prompt with communication.",
        date: "2 weeks ago",
      },
      {
        id: "review2",
        user: {
          name: "Sam Rivera",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        comment: "Smooth transaction. Would definitely trade with Alex again!",
        date: "1 month ago",
      },
      {
        id: "review3",
        user: {
          name: "Taylor Kim",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        comment: "Good experience overall. Item was slightly different than in photos but still satisfied.",
        date: "2 months ago",
      },
    ],
    instagram: "@alexj_trades",
  }

  const handleMessage = () => {
    router.push("/messages")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  const handleReport = () => {
    setReportDialogOpen(true)
  }

  const handleSubmitReport = (e) => {
    e.preventDefault()
    setReportDialogOpen(false)
    // Show success message or notification
    alert("Report submitted successfully")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleShare = () => {
    // Create the profile URL
    const profileUrl = `${window.location.origin}/profile/${user.id}`

    // Copy to clipboard
    navigator.clipboard.writeText(profileUrl).then(
      () => {
        toast({
          title: "Link copied to clipboard",
          description: "You can now paste and share the profile link",
        })
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        })
      },
    )
  }

  return (
    <div className="container max-w-6xl py-8">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="mr-2">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Button>
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information.</p>
      </div>
      <Card className="mb-8 overflow-hidden animate-in fade-in duration-700">
        <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-12 md:-mt-16">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md transition-all duration-300 hover:scale-105">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pt-12 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{user.username}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                    <span>•</span>
                    <a
                      href={`https://instagram.com/${user.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      <Instagram className="h-4 w-4 mr-1" />
                      {user.instagram}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleMessage}
                    className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleEditProfile}
                    className="hover:bg-secondary/50 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReport}
                    className="hover:bg-secondary/50 transition-colors duration-200"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="hover:bg-secondary/50 transition-colors duration-200"
                  >
                    Share
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground">{user.bio}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {user.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 rounded-full border-none bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200"
                  >
                    {badge.icon}
                    {badge.name}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="text-2xl font-bold">{user.completedTrades}</span>
                  <span className="text-sm text-muted-foreground">Completed Trades</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-1 text-2xl font-bold">
                    <span>{user.positiveRatings}</span>
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Positive Ratings</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-1">
                    <User className="h-5 w-5" />
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-muted-foreground">Member since {user.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger
            value="listings"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          >
            Listings
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          >
            Trade History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.listings.map((listing) => (
              <Link
                href={`/marketplace/${listing.id}`}
                key={listing.id}
                className="block transition-transform hover:scale-105"
              >
                <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-square relative">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{listing.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{listing.category}</span>
                      <Badge variant="outline">{listing.condition}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {user.reviews.map((review) => (
            <Card key={review.id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{review.user.name}</h3>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>A record of all completed trades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Vintage Camera for Gaming Console</h4>
                    <p className="text-sm text-muted-foreground">Traded with Jamie Lee</p>
                  </div>
                  <Badge>Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Mechanical Keyboard for Vinyl Records</h4>
                    <p className="text-sm text-muted-foreground">Traded with Sam Rivera</p>
                  </div>
                  <Badge>Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Leather Jacket for Mountain Bike</h4>
                    <p className="text-sm text-muted-foreground">Traded with Taylor Kim</p>
                  </div>
                  <Badge>Completed</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full hover:bg-secondary/50 transition-colors duration-200">
                View All History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report User Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle>Report User</DialogTitle>
            <DialogDescription>
              Please provide details about why you're reporting this user. Our moderation team will review your report.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for report</Label>
                <select id="reason" className="w-full p-2 border rounded-md bg-white">
                  <option value="misleading">Misleading profile or listings</option>
                  <option value="inappropriate">Inappropriate content</option>
                  <option value="harassment">Harassment or threatening behavior</option>
                  <option value="scam">Scam or fraudulent activity</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  placeholder="Please provide specific details about the issue..."
                  className="min-h-[100px] bg-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <p className="text-sm text-muted-foreground">
                  All reports are confidential and will be reviewed by our moderation team.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setReportDialogOpen(false)}
                className="hover:bg-secondary/50 transition-colors duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
              >
                Submit Report
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

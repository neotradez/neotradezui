"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoogleMap } from "@/components/map/google-map"
import { ArrowLeft, Calendar, Flag, Heart, MapPin, MessageSquare, Share2, Star } from "lucide-react"
import { TradeProposalModal } from "@/components/trades/trade-proposal-modal"
import { ReportItemDialog } from "@/components/report-item-dialog"
import { useToast } from "@/hooks/use-toast"

export default function ItemDetailPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch item details
    const fetchItem = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock item data
        const mockItem = {
          id,
          title: "Vintage Polaroid Camera",
          description:
            "Classic Polaroid camera from the 1980s. In excellent working condition with minor cosmetic wear. Takes standard Polaroid film which is still available today. Great for photography enthusiasts or collectors.",
          images: [
            "/placeholder.svg?height=500&width=500&text=Polaroid+Camera",
            "/placeholder.svg?height=500&width=500&text=Camera+Side+View",
            "/placeholder.svg?height=500&width=500&text=Camera+Back",
            "/placeholder.svg?height=500&width=500&text=Camera+Lens",
          ],
          category: "Electronics",
          condition: "Good",
          rarity: "Uncommon",
          location: {
            address: "Brooklyn, NY",
            coordinates: {
              lat: 40.6782,
              lng: -73.9442,
            },
          },
          owner: {
            id: "user123",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=100&width=100&text=AJ",
            rating: 4.8,
            trades: 27,
            memberSince: "2023",
            location: "Brooklyn, NY",
          },
          listedAt: "2023-09-15T14:30:00Z",
          views: 142,
          saves: 23,
          tradeOffers: 5,
        }

        setItem(mockItem)
      } catch (error) {
        console.error("Error fetching item:", error)
        // Handle error state
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const handleSaveToggle = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Item removed from saved items" : "Item saved",
      description: isSaved
        ? "The item has been removed from your saved items."
        : "The item has been added to your saved items.",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this item with others.",
    })
  }

  const handleMessageSeller = () => {
    if (item) {
      router.push(`/messages/${item.owner.id}`)
    }
  }

  const handleProposeTrade = () => {
    setIsTradeModalOpen(true)
  }

  const handleReport = () => {
    setIsReportDialogOpen(true)
  }

  const handleViewOnMap = () => {
    router.push(`/map?item=${id}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Item Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The item you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/marketplace")}>Back to Marketplace</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-muted-foreground">Listed in {item.category}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg border">
            <div className="relative aspect-square w-full">
              <Image
                src={item.images[0] || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
              {item.images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Item Details */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {item.condition}
                  </Badge>
                  <CardTitle>{item.title}</CardTitle>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">{item.rarity}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="owner">Owner</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">Description</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Category</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Condition</h3>
                      <p className="text-sm text-muted-foreground">{item.condition}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Listed</h3>
                      <p className="text-sm text-muted-foreground">{new Date(item.listedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Rarity</h3>
                      <p className="text-sm text-muted-foreground">{item.rarity}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-muted p-3">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">{item.views}</span>
                        <span className="text-xs text-muted-foreground">Views</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">{item.saves}</span>
                        <span className="text-xs text-muted-foreground">Saves</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">{item.tradeOffers}</span>
                        <span className="text-xs text-muted-foreground">Offers</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="owner">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={item.owner.avatar || "/placeholder.svg"} alt={item.owner.name} />
                        <AvatarFallback>{item.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{item.owner.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {item.owner.rating} ({item.owner.trades} trades)
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Member since {item.owner.memberSince}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.owner.location}</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleMessageSeller}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Owner
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="location">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{item.location.address}</span>
                    </div>
                    <div className="relative h-[200px] overflow-hidden rounded-md border">
                      <GoogleMap
                        viewOnly={true}
                        initialLocation={item.location.coordinates}
                        itemDetails={{
                          id: item.id,
                          title: item.title,
                          location: item.location.address,
                        }}
                      />
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleViewOnMap}>
                      <MapPin className="mr-2 h-4 w-4" />
                      View on Map
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push(`/trade-meetup/arrange/${item.id}`)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Arrange Meetup
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" onClick={handleProposeTrade}>
                Propose Trade
              </Button>
              <div className="flex w-full gap-3">
                <Button variant="outline" className="flex-1" onClick={handleSaveToggle}>
                  <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  {isSaved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="icon" onClick={handleReport}>
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Trade Proposal Modal */}
      <TradeProposalModal
        open={isTradeModalOpen}
        onOpenChange={setIsTradeModalOpen}
        itemId={id}
        itemTitle={item?.title}
        itemImage={item?.images[0]}
        ownerId={item?.owner.id}
        ownerName={item?.owner.name}
      />

      {/* Report Dialog */}
      <ReportItemDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        itemId={id}
        itemTitle={item?.title}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import { useApp } from "@/context/app-context"
import { useToast } from "@/hooks/use-toast"

// Mock inventory items
const inventoryItems = [
  {
    id: "inv-1",
    title: "Vintage Camera",
    description: "Nikon F3 in excellent condition",
    category: "Electronics",
    condition: "Excellent",
    image: "/placeholder.svg?height=200&width=200",
    value: 250,
  },
  {
    id: "inv-2",
    title: "Mechanical Keyboard",
    description: "Custom built with Cherry MX switches",
    category: "Electronics",
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=200",
    value: 120,
  },
  {
    id: "inv-3",
    title: "Film Camera Lens",
    description: "50mm f/1.4 manual focus lens",
    category: "Photography",
    condition: "Good",
    image: "/placeholder.svg?height=200&width=200",
    value: 180,
  },
  {
    id: "inv-4",
    title: "Vintage Record Player",
    description: "1970s turntable, recently serviced",
    category: "Audio",
    condition: "Fair",
    image: "/placeholder.svg?height=200&width=200",
    value: 200,
  },
]

export default function ProposeTradeItemPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useApp()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [targetItem, setTargetItem] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push(`/sign-in?redirect=${encodeURIComponent(`/marketplace/propose-trade/${params.id}`)}`)
      return
    }

    // Fetch the target item
    const fetchItem = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate with mock data
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock item data
        const mockItem = {
          id: params.id,
          title: "Vintage Polaroid SX-70 Camera",
          description: "Original Polaroid SX-70 from the 1970s in excellent working condition.",
          category: "Electronics",
          condition: "Good",
          estimatedValue: 150,
          image: "/placeholder.svg?height=300&width=300",
          owner: {
            id: "user-2",
            name: "Jordan Lee",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4.9,
          },
        }

        setTargetItem(mockItem)
      } catch (error) {
        console.error("Error fetching item:", error)
        toast({
          title: "Error",
          description: "Failed to load item details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [params.id, isAuthenticated, router, toast])

  const handleSelectItem = (item) => {
    setSelectedItem(item)
  }

  const handleSubmitProposal = async () => {
    if (!selectedItem) {
      toast({
        title: "Select an item",
        description: "Please select an item to trade.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Trade proposal sent",
        description: "Your trade proposal has been sent successfully.",
      })

      // Redirect to my trades page
      router.push("/my-trades")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send trade proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
          <div className="flex animate-pulse flex-col items-center justify-center py-20">
            <div className="h-8 w-48 rounded-md bg-muted"></div>
            <div className="mt-4 h-4 w-64 rounded-md bg-muted"></div>
            <div className="mt-8 h-64 w-full max-w-md rounded-lg bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Propose a Trade</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">You Want</h2>
          <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-lg border">
                  <Image
                    src={targetItem.image || "/placeholder.svg"}
                    alt={targetItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{targetItem.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{targetItem.category}</Badge>
                    <Badge variant="outline">{targetItem.condition}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{targetItem.description}</p>
                  <div className="mt-2 text-sm font-medium">Estimated Value: ${targetItem.estimatedValue}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={targetItem.owner.avatar || "/placeholder.svg"}
                    alt={targetItem.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium">{targetItem.owner.name}</span>
                  <div className="flex items-center text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1 h-3 w-3 text-amber-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {targetItem.owner.rating}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="mb-4 mt-8 text-xl font-semibold">Your Message</h2>
          <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-6">
              <Textarea
                placeholder="Add a message to the trade owner (optional)"
                className="min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="gap-2" asChild>
                  <Link href={`/messages/${targetItem.owner.id}`}>
                    <MessageCircle className="h-4 w-4" />
                    Message Instead
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">You Offer</h2>
          <div className="space-y-4">
            {inventoryItems.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer border-border/40 bg-background/40 backdrop-blur-md transition-all hover:border-primary/50 dark:border-border/20 dark:bg-[#1a1a1a]/40 ${
                  selectedItem?.id === item.id ? "border-primary ring-1 ring-primary/20" : ""
                }`}
                onClick={() => handleSelectItem(item)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-lg border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.condition}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="mt-1 text-sm font-medium">Value: ${item.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-6 flex justify-end">
              <Button
                className="gap-2 group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                disabled={!selectedItem || submitting}
                onClick={handleSubmitProposal}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? "Sending Proposal..." : "Send Trade Proposal"}
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeftRight, CheckCircle } from "lucide-react"

export function TradeProposalModal({ trade, onClose }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [message, setMessage] = useState("")
  const [meetupLocation, setMeetupLocation] = useState("")

  // Sample inventory items
  const inventoryItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      description: "Premium wireless headphones with noise cancellation",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Like New",
      value: 120,
    },
    {
      id: 2,
      title: "Fitness Smartwatch",
      description: "Fitness tracker with heart rate monitoring, GPS, and sleep tracking",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Excellent",
      value: 180,
    },
    {
      id: 3,
      title: "Camping Tent",
      description: "3-person camping tent, waterproof with easy setup",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Good",
      value: 200,
    },
    {
      id: 4,
      title: "Vintage Record Player",
      description: "Classic record player with built-in speakers. Perfect for vinyl enthusiasts",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Good",
      value: 150,
    },
    {
      id: 5,
      title: "Leather Messenger Bag",
      description: "Genuine leather messenger bag with multiple compartments",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Good",
      value: 110,
    },
    {
      id: 6,
      title: "Mountain Bike Helmet",
      description: "High-quality helmet with adjustable fit system and ventilation",
      image: "/placeholder.svg?height=100&width=100",
      condition: "Excellent",
      value: 85,
    },
  ]

  const toggleItemSelection = (item) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit the trade proposal
    console.log({
      tradeFor: trade,
      offering: selectedItems,
      message,
      meetupLocation,
    })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto p-0 dark:bg-[#121212]">
        <DialogHeader className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-md dark:bg-[#121212]/80">
          <DialogTitle className="font-heading text-xl">Propose a Trade</DialogTitle>
          <p className="text-sm text-muted-foreground">Select items from your inventory to offer for this trade.</p>
        </DialogHeader>

        <div className="grid gap-6 p-4 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-heading text-lg font-medium">You want to trade for:</h3>
            <div className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image src={trade.image || "/placeholder.svg"} alt={trade.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{trade.title}</h4>
                  <p className="text-sm text-muted-foreground">{trade.owner.name}</p>
                  <div className="mt-1 text-sm">
                    Est. Value: <span className="text-[#00D084]">$120</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mb-4 font-heading text-lg font-medium">Select items to offer:</h3>
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    selectedItems.some((selected) => selected.id === item.id)
                      ? "border-[#00D084] bg-[#00D084]/5 dark:bg-[#00D084]/10"
                      : "border-border/40 bg-background/40 dark:border-border/20 dark:bg-[#1a1a1a]/40"
                  }`}
                  onClick={() => toggleItemSelection(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="ml-2 text-sm text-[#00D084]">${item.value}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      <div className="mt-1 text-xs font-medium">{item.condition}</div>
                    </div>
                    {selectedItems.some((selected) => selected.id === item.id) && (
                      <CheckCircle className="h-5 w-5 text-[#00D084]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-medium">Trade Details</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Message to Trader</label>
                <Textarea
                  placeholder="Introduce yourself and explain why you're interested in this trade..."
                  className="min-h-[120px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Preferred Meetup Location</label>
                <Input
                  placeholder="Suggest a safe public location for the exchange"
                  value={meetupLocation}
                  onChange={(e) => setMeetupLocation(e.target.value)}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  For safety, we recommend meeting in a public place like a coffee shop or library.
                </p>
              </div>

              {selectedItems.length > 0 && (
                <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <h4 className="mb-2 flex items-center gap-2 font-medium">
                    <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                    Your Offer:
                  </h4>
                  <div className="space-y-2">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <span>{item.title}</span>
                        <span className="text-sm text-muted-foreground">${item.value}</span>
                      </div>
                    ))}
                    <div className="border-t border-border/40 pt-2 dark:border-border/20">
                      <div className="flex items-center justify-between font-medium">
                        <span>Total Value:</span>
                        <span className="text-[#00D084]">
                          ${selectedItems.reduce((sum, item) => sum + item.value, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <h4 className="mb-2 flex items-center gap-2 font-medium">
                  <CheckCircle className="h-4 w-4 text-[#00D084]" />
                  Trade Tips
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Be specific about what you're offering and why it's a good trade</li>
                  <li>• Mention any additional items you might be willing to include</li>
                  <li>• Suggest flexible meeting times and safe locations</li>
                  <li>• Ask questions about the item you're trading for if needed</li>
                </ul>
              </div>

              <Button
                disabled={selectedItems.length === 0}
                className="mt-6 w-full group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                onClick={handleSubmit}
              >
                <span className="relative z-10">Submit Trade Proposal</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

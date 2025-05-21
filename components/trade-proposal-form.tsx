"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, Upload, X, Plus, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TradeProposalForm({ trade }) {
  const { toast } = useToast()
  const [selectedItems, setSelectedItems] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [additionalItemsNeeded, setAdditionalItemsNeeded] = useState(false)
  const [additionalItemDescription, setAdditionalItemDescription] = useState("")

  const myItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      image: "/placeholder.svg?height=100&width=100",
      category: "Electronics",
      estimatedValue: 120,
    },
    {
      id: 2,
      title: "Fitness Smartwatch",
      image: "/placeholder.svg?height=100&width=100",
      category: "Electronics",
      estimatedValue: 180,
    },
    {
      id: 3,
      title: "Camping Tent",
      image: "/placeholder.svg?height=100&width=100",
      category: "Outdoors",
      estimatedValue: 200,
    },
    {
      id: 4,
      title: "Vintage Record Player",
      image: "/placeholder.svg?height=100&width=100",
      category: "Electronics",
      estimatedValue: 250,
    },
    {
      id: 5,
      title: "Mountain Bike",
      image: "/placeholder.svg?height=100&width=100",
      category: "Outdoors",
      estimatedValue: 350,
    },
  ]

  const handleSelectItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleImageUpload = (e) => {
    // In a real app, this would handle file uploads
    // For this demo, we'll just simulate adding placeholder images
    if (uploadedImages.length < 3) {
      setUploadedImages([
        ...uploadedImages,
        {
          id: Date.now(),
          url: "/placeholder.svg?height=100&width=100",
        },
      ])
    }
    e.target.value = null
  }

  const removeUploadedImage = (id) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id))
  }

  const handleSubmitProposal = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to offer for trade",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Trade proposal submitted",
      description: `Your proposal for ${trade.title} has been sent to ${trade.owner.name}`,
    })
  }

  const toggleAdditionalItems = () => {
    setAdditionalItemsNeeded(!additionalItemsNeeded)
  }

  return (
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
                Est. Value: <span className="text-[#00D084]">${trade.estimatedValue}</span>
              </div>
            </div>
          </div>
        </div>

        {additionalItemsNeeded && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-medium">Request additional item:</h3>
              <Button variant="ghost" size="sm" onClick={toggleAdditionalItems}>
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
            </div>
            <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <Textarea
                placeholder="Describe what additional item you'd like from the trader..."
                value={additionalItemDescription}
                onChange={(e) => setAdditionalItemDescription(e.target.value)}
                className="mb-3"
              />
              <div className="text-sm text-muted-foreground flex items-center">
                <Info className="h-4 w-4 mr-1" />
                This will create a multi-item trade proposal
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-medium">Select items to offer:</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            {selectedItems.length} selected
          </Badge>
        </div>

        <div className="space-y-4">
          {myItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                selectedItems.find((i) => i.id === item.id)
                  ? "border-[#00D084] bg-[#00D084]/5 dark:bg-[#00D084]/10"
                  : "border-border/40 bg-background/40 dark:border-border/20 dark:bg-[#1a1a1a]/40"
              }`}
              onClick={() => handleSelectItem(item)}
            >
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm">
                    Est. Value: <span className="text-[#00D084]">${item.estimatedValue}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="relative mt-4 rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
            <input
              type="file"
              id="image-upload"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
            <div className="flex flex-col items-center">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium">Upload a new item</p>
              <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
            </div>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {uploadedImages.map((img) => (
                <div key={img.id} className="group relative h-20 w-full overflow-hidden rounded-md">
                  <Image src={img.url || "/placeholder.svg"} alt="Uploaded item" fill className="object-cover" />
                  <button
                    onClick={() => removeUploadedImage(img.id)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-heading text-lg font-medium">Trade Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Message to Trader</Label>
            <Textarea
              id="message"
              placeholder="Introduce yourself and explain why you're interested in this trade..."
              className="mt-1 h-32 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="meetup">Preferred Meetup Location</Label>
            <Input id="meetup" placeholder="Suggest a safe public location for the exchange" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="alternative">Alternative Items (Optional)</Label>
            <Input id="alternative" placeholder="Any other items you'd be willing to trade" className="mt-1" />
          </div>

          {!additionalItemsNeeded && (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={toggleAdditionalItems}
            >
              <Plus className="h-4 w-4" />
              Request Additional Item (2-for-2 Trade)
            </Button>
          )}

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
                    <span className="text-sm text-muted-foreground">${item.estimatedValue}</span>
                  </div>
                ))}
                <div className="border-t border-border/40 pt-2 dark:border-border/20">
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Value:</span>
                    <span className="text-[#00D084]">
                      ${selectedItems.reduce((sum, item) => sum + item.estimatedValue, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    disabled={selectedItems.length === 0}
                    className="mt-6 w-full group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                    onClick={handleSubmitProposal}
                  >
                    <span className="relative z-10 flex items-center gap-2">Submit Trade Proposal</span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{selectedItems.length === 0 ? "Select at least one item to offer" : "Send your trade proposal"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {additionalItemsNeeded && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
              <p className="flex items-center text-blue-700 dark:text-blue-400 font-medium">
                <Info className="h-4 w-4 mr-2" />
                Multi-item Trade
              </p>
              <p className="mt-1 text-muted-foreground">
                You're proposing a 2-for-2 trade. You'll offer your selected items in exchange for both the main item
                and your additional request.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

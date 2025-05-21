"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/context/app-context"

interface CancelTradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tradeId: string
  tradeType: "meetup" | "proposal" | "listing"
  onCancel?: () => void
}

export function CancelTradeDialog({ open, onOpenChange, tradeId, tradeType, onCancel }: CancelTradeDialogProps) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { cancelTrade } = useApp()
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      await cancelTrade(tradeId, reason === "Other reason" ? customReason : reason)

      toast({
        title: `${tradeType.charAt(0).toUpperCase() + tradeType.slice(1)} cancelled`,
        description: "The other party has been notified of your cancellation.",
      })

      if (onCancel) {
        onCancel()
      }

      onOpenChange(false)

      // Redirect based on trade type
      if (tradeType === "meetup") {
        router.push("/schedule")
      } else if (tradeType === "proposal") {
        router.push("/my-trades")
      } else {
        router.push("/inventory")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTitle = () => {
    switch (tradeType) {
      case "meetup":
        return "Cancel Meetup"
      case "proposal":
        return "Cancel Trade Proposal"
      case "listing":
        return "Remove Listing"
      default:
        return "Cancel"
    }
  }

  const getDescription = () => {
    switch (tradeType) {
      case "meetup":
        return "Are you sure you want to cancel this meetup? The other trader will be notified."
      case "proposal":
        return "Are you sure you want to cancel this trade proposal? This action cannot be undone."
      case "listing":
        return "Are you sure you want to remove this listing from the marketplace?"
      default:
        return "Are you sure you want to proceed with cancellation?"
    }
  }

  const reasonOptions = {
    meetup: [
      "I can no longer make the scheduled time",
      "I need to reschedule for a different day",
      "I'm no longer interested in this trade",
      "I have concerns about the meetup location",
      "I've found another trade opportunity",
      "Other reason",
    ],
    proposal: [
      "I'm no longer interested in this trade",
      "I've found another trade opportunity",
      "I'm no longer available to trade this item",
      "I have concerns about the other trader",
      "The item is no longer available",
      "Other reason",
    ],
    listing: [
      "Item is no longer available",
      "I've decided to keep the item",
      "I've traded this item elsewhere",
      "I want to update the listing details",
      "I'm taking a break from trading",
      "Other reason",
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Please select a reason:</h4>
            <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
              {reasonOptions[tradeType].map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`reason-${index}`} />
                  <Label htmlFor={`reason-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {reason === "Other reason" && (
            <div className="space-y-2">
              <Label htmlFor="custom-reason">Please specify:</Label>
              <Textarea
                id="custom-reason"
                placeholder="Tell us why you're cancelling..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Never mind
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isSubmitting || (reason === "Other reason" && !customReason) || !reason}
          >
            {isSubmitting ? "Cancelling..." : `Yes, ${tradeType === "listing" ? "remove" : "cancel"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

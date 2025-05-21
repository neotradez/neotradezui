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
import { CheckCircle, Star, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/context/app-context"

interface MeetupCompleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tradeId: string
  traderId: string
  traderName: string
}

export function MeetupCompleteDialog({ open, onOpenChange, tradeId, traderId, traderName }: MeetupCompleteDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { completeTrade } = useApp()
  const handleComplete = async () => {
    setIsSubmitting(true)

    try {
      await completeTrade(tradeId)

      toast({
        title: "Trade completed",
        description: "Congratulations on your successful trade!",
      })

      onOpenChange(false)

      // Redirect to leave a review
      router.push(`/reviews/submit/${tradeId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete trade. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleNotYet = () => {
    onOpenChange(false)

    toast({
      title: "No problem",
      description: "You can mark the trade as complete after your meetup.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#00D084]">
            <CheckCircle className="h-5 w-5" />
            Complete Trade
          </DialogTitle>
          <DialogDescription>Did you successfully complete your trade with {traderName}?</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="rounded-lg border p-4 bg-[#00D084]/5">
            <p className="text-sm">Marking a trade as complete means:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• You've met with {traderName} and exchanged items</li>
              <li>• You're satisfied with the condition of the received item</li>
              <li>• The trade is now finalized and will be added to your history</li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 text-amber-500">
            <Star className="h-5 w-5 fill-amber-500" />
            <p className="text-sm font-medium">Don't forget to leave a review after completing!</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={handleNotYet}>
            Not yet
          </Button>
          <Button className="gap-2 bg-[#00D084] hover:bg-[#00D084]/90" onClick={handleComplete} disabled={isSubmitting}>
            {isSubmitting ? "Completing..." : "Yes, trade completed"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

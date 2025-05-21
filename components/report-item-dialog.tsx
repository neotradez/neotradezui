"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface ReportItemDialogProps {
  isOpen: boolean
  onClose: () => void
  itemId: string
  itemTitle: string
}

const reportReasons = [
  { id: "prohibited", label: "Prohibited item" },
  { id: "counterfeit", label: "Counterfeit or replica" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "misleading", label: "Misleading description" },
  { id: "spam", label: "Spam or scam" },
  { id: "other", label: "Other" },
]

export function ReportItemDialog({ isOpen, onClose, itemId, itemTitle }: ReportItemDialogProps) {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      setError("Please select a reason for your report")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, this would be an API call
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "item",
          id: itemId,
          reason,
          details,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to submit report")
      }

      // Show success toast notification
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Report Submitted</span>
          </div>
        ),
        description: "Thank you for your report. Our team will review it shortly.",
        duration: 5000,
      })

      // Close the dialog
      onClose()
    } catch (err) {
      console.error("Error submitting report:", err)
      setError("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Item</DialogTitle>
          <DialogDescription>
            Report this item if you believe it violates our community guidelines or terms of service.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 text-sm font-medium">Item being reported:</h4>
              <p className="text-sm text-muted-foreground">{itemTitle}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Reason for report:</h4>
              <RadioGroup value={reason} onValueChange={setReason} className="space-y-2">
                {reportReasons.map((reportReason) => (
                  <div key={reportReason.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={reportReason.id} id={reportReason.id} />
                    <Label htmlFor={reportReason.id}>{reportReason.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional details (optional):</Label>
              <Textarea
                id="details"
                placeholder="Please provide any additional information that might help us understand the issue."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

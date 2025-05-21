"use client"

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
import { Flag, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/context/app-context"

interface ReportMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
  messageContent?: string
  isReportingUser?: boolean
}

export function ReportMessageDialog({
  open,
  onOpenChange,
  userName,
  messageContent,
  isReportingUser = false,
}: ReportMessageDialogProps) {
  const { toast } = useToast()
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { reportUser } = useApp()
  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // If reporting a user
      if (isReportingUser) {
        await reportUser(userName, reason, details)
      }
      // If reporting a message
      else {
        await reportUser(userName, reason, `Message content: ${messageContent}\n\nDetails: ${details}`)
      }

      // Show success state
      setIsSubmitted(true)

      // Reset form after submission
      setTimeout(() => {
        onOpenChange(false)
        // Reset the form after dialog is closed
        setTimeout(() => {
          setReason("")
          setDetails("")
          setIsSubmitted(false)
        }, 300)
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="mb-2 text-xl">Report Submitted</DialogTitle>
            <DialogDescription>
              Thank you for your report. Our team will review it and take appropriate action.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-destructive" />
                {isReportingUser ? "Report User" : "Report Message"}
              </DialogTitle>
              <DialogDescription>
                {isReportingUser
                  ? `Report inappropriate behavior from ${userName}. Your report will be reviewed by our team.`
                  : `Report this message from ${userName}. Your report will be reviewed by our team.`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {!isReportingUser && messageContent && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Message content</Label>
                  <div className="rounded-md bg-muted p-3 text-sm">{messageContent}</div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium">
                  Reason for reporting
                </Label>
                <RadioGroup value={reason} onValueChange={setReason}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inappropriate" id="inappropriate" />
                    <Label htmlFor="inappropriate">Inappropriate content</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="harassment" id="harassment" />
                    <Label htmlFor="harassment">Harassment or bullying</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scam" id="scam" />
                    <Label htmlFor="scam">Scam or fraud</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spam" id="spam" />
                    <Label htmlFor="spam">Spam or unwanted messages</Label>
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
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

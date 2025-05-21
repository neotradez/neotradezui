"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Flag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportUserDialogProps {
  userId: string
  userName: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function ReportUserDialog({ userId, userName, trigger, onSuccess }: ReportUserDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Success
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe. We'll review your report.",
    })

    setIsSubmitting(false)
    setOpen(false)
    setReason("")
    setDetails("")

    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Flag className="h-4 w-4" />
            Report User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {userName}</DialogTitle>
          <DialogDescription>
            Please let us know why you're reporting this user. All reports are confidential.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for reporting
              </Label>
              <RadioGroup id="reason" value={reason} onValueChange={setReason} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate">Inappropriate behavior</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scam" id="scam" />
                  <Label htmlFor="scam">Scam or fraud</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="misrepresentation" id="misrepresentation" />
                  <Label htmlFor="misrepresentation">Item misrepresentation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="harassment" id="harassment" />
                  <Label htmlFor="harassment">Harassment</Label>
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
                placeholder="Please provide any specific details about the issue..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

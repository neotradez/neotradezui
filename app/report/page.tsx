"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertTriangle, Check } from "lucide-react"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function ReportPage() {
  const router = useRouter()
  const [reportType, setReportType] = useState<"user" | "item">("item")
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [reportedItemId, setReportedItemId] = useState("")
  const [reportedUserId, setReportedUserId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock data for items and users
  const recentItems = [
    { id: "item1", title: "Vintage Camera", owner: "Alex Chen" },
    { id: "item2", title: "Mechanical Keyboard", owner: "Jordan Lee" },
    { id: "item3", title: "Leather Jacket", owner: "Taylor Kim" },
  ]

  const recentUsers = [
    { id: "user1", name: "Alex Chen" },
    { id: "user2", name: "Jordan Lee" },
    { id: "user3", name: "Taylor Kim" },
  ]

  const itemReportReasons = [
    "Prohibited item",
    "Counterfeit or fake",
    "Misleading description",
    "Inappropriate content",
    "Spam",
    "Other",
  ]

  const userReportReasons = [
    "Harassment or bullying",
    "Scam or fraud",
    "Impersonation",
    "Inappropriate behavior",
    "Spam",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleBack = () => {
    router.back()
  }

  if (isSubmitted) {
    return (
      <div className="container max-w-2xl px-4 py-12">
        <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Report Submitted</h2>
              <p className="mb-6 text-muted-foreground">
                Thank you for your report. Our team will review it and take appropriate action if necessary.
              </p>
              <Button onClick={handleBack}>Return</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl px-4 py-12">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Report</h1>
      </div>

      <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>Help us maintain a safe and trustworthy community by reporting issues.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>What would you like to report?</Label>
              <RadioGroup
                value={reportType}
                onValueChange={(value: "user" | "item") => setReportType(value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="item" id="report-item" />
                  <Label htmlFor="report-item">An item or listing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="report-user" />
                  <Label htmlFor="report-user">A user</Label>
                </div>
              </RadioGroup>
            </div>

            <Tabs value={reportType} onValueChange={(value: "user" | "item") => setReportType(value)}>
              <TabsContent value="item" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reported-item">Select the item</Label>
                  <Select value={reportedItemId} onValueChange={setReportedItemId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {recentItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title} (by {item.owner})
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other (enter ID manually)</SelectItem>
                    </SelectContent>
                  </Select>
                  {reportedItemId === "other" && (
                    <Input
                      placeholder="Enter item ID"
                      className="mt-2"
                      onChange={(e) => setReportedItemId(e.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-reason">Reason for report</Label>
                  <Select value={reportReason} onValueChange={setReportReason}>
                    <SelectTrigger id="item-reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemReportReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="user" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reported-user">Select the user</Label>
                  <Select value={reportedUserId} onValueChange={setReportedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {recentUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other (enter ID manually)</SelectItem>
                    </SelectContent>
                  </Select>
                  {reportedUserId === "other" && (
                    <Input
                      placeholder="Enter user ID or username"
                      className="mt-2"
                      onChange={(e) => setReportedUserId(e.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-reason">Reason for report</Label>
                  <Select value={reportReason} onValueChange={setReportReason}>
                    <SelectTrigger id="user-reason">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {userReportReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="details">Additional details</Label>
              <Textarea
                id="details"
                placeholder="Please provide any additional information that will help us understand the issue"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
              <div className="flex items-start">
                <AlertTriangle className="mr-3 h-5 w-5 text-amber-600 dark:text-amber-500" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Important</h3>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                    False reports are against our community guidelines. Please ensure your report is accurate and
                    truthful.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !reportReason ||
              (reportType === "item" && !reportedItemId) ||
              (reportType === "user" && !reportedUserId)
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

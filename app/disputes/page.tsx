"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock disputes data
const mockDisputes = [
  {
    id: "DSP-2023-0456",
    title: "Item condition not as described",
    status: "underReview",
    date: "May 2, 2023",
    lastUpdated: "2 days ago",
    counterparty: "Michael Brown",
    counterpartyAvatar: "/placeholder.svg?height=40&width=40",
    tradeId: "TRD-78901",
    description:
      "The vintage camera I received has significant damage that wasn't disclosed in the listing or during our trade negotiation.",
    progress: 50,
  },
  {
    id: "DSP-2023-0442",
    title: "Trade meetup no-show",
    status: "open",
    date: "Apr 28, 2023",
    lastUpdated: "5 days ago",
    counterparty: "Jessica Lee",
    counterpartyAvatar: "/placeholder.svg?height=40&width=40",
    tradeId: "TRD-78890",
    description: "The trader did not show up for our scheduled meetup and has not responded to messages.",
    progress: 25,
  },
  {
    id: "DSP-2023-0421",
    title: "Incomplete item set",
    status: "resolved",
    date: "Apr 15, 2023",
    lastUpdated: "Apr 22, 2023",
    counterparty: "David Wilson",
    counterpartyAvatar: "/placeholder.svg?height=40&width=40",
    tradeId: "TRD-78654",
    description: "The board game was missing several key pieces that weren't mentioned in the listing.",
    progress: 100,
    resolution: "Trader agreed to provide the missing pieces or partial refund.",
  },
  {
    id: "DSP-2023-0398",
    title: "Item authenticity concerns",
    status: "closed",
    date: "Mar 30, 2023",
    lastUpdated: "Apr 10, 2023",
    counterparty: "Emma Garcia",
    counterpartyAvatar: "/placeholder.svg?height=40&width=40",
    tradeId: "TRD-77901",
    description: "I have concerns about the authenticity of the collectible card I received in our trade.",
    progress: 100,
    resolution: "Authentication verified by third-party expert. Item confirmed genuine.",
  },
  {
    id: "DSP-2023-0376",
    title: "Damaged during shipping",
    status: "resolved",
    date: "Mar 18, 2023",
    lastUpdated: "Mar 25, 2023",
    counterparty: "Alex Johnson",
    counterpartyAvatar: "/placeholder.svg?height=40&width=40",
    tradeId: "TRD-77812",
    description: "The package arrived with visible damage and the item inside was broken.",
    progress: 100,
    resolution: "Seller provided a full refund and covered return shipping costs.",
  },
]

export default function DisputesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("active")
  const [selectedDispute, setSelectedDispute] = useState(null)

  // Dialogs state
  const [showFileDisputeDialog, setShowFileDisputeDialog] = useState(false)
  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false)
  const [showTimelineDialog, setShowTimelineDialog] = useState(false)
  const [showEscalateDialog, setShowEscalateDialog] = useState(false)
  const [showGuidelinesDialog, setShowGuidelinesDialog] = useState(false)
  const [showSolutionsDialog, setShowSolutionsDialog] = useState(false)
  const [showDisputeDetailsDialog, setShowDisputeDetailsDialog] = useState(false)

  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // Handle file new dispute
  const handleFileNewDispute = () => {
    setShowFileDisputeDialog(true)
  }

  // Handle submit evidence
  const handleSubmitEvidence = (dispute) => {
    setSelectedDispute(dispute)
    setShowEvidenceDialog(true)
  }

  // Handle view timeline
  const handleViewTimeline = (dispute) => {
    setSelectedDispute(dispute)
    setShowTimelineDialog(true)
  }

  // Handle escalate to support
  const handleEscalateToSupport = (dispute) => {
    setSelectedDispute(dispute)
    setShowEscalateDialog(true)
  }

  // Handle view dispute details
  const handleViewDisputeDetails = (dispute) => {
    setSelectedDispute(dispute)
    setShowDisputeDetailsDialog(true)
  }

  // Handle send message
  const handleSendMessage = (counterparty) => {
    router.push(`/messages?user=${counterparty.replace(" ", "-").toLowerCase()}`)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle filter toggle
  const handleFilterToggle = () => {
    setIsFilterExpanded(!isFilterExpanded)
    toast({
      title: isFilterExpanded ? "Filters collapsed" : "Filters expanded",
      description: isFilterExpanded ? "Basic filters shown" : "Advanced filters available",
    })
  }

  // View guidelines
  const handleViewGuidelines = () => {
    setShowGuidelinesDialog(true)
  }

  // View solutions
  const handleViewSolutions = () => {
    setShowSolutionsDialog(true)
  }

  // Contact support
  const handleContactSupport = () => {
    router.push("/contact?department=disputes")
  }

  // Handle dispute submission
  const handleDisputeSubmission = (e) => {
    e.preventDefault()
    setShowFileDisputeDialog(false)
    toast({
      title: "Dispute filed successfully",
      description: "Your dispute has been submitted and is now under review.",
    })
    // In a real app, we would submit the form data to an API
  }

  // Handle evidence submission
  const handleEvidenceSubmission = (e) => {
    e.preventDefault()
    setShowEvidenceDialog(false)
    toast({
      title: "Evidence submitted",
      description: "Your evidence has been added to the dispute case.",
    })
    // In a real app, we would submit the evidence to an API
  }

  // Handle escalation submission
  const handleEscalationSubmission = (e) => {
    e.preventDefault()
    setShowEscalateDialog(false)
    toast({
      title: "Dispute escalated",
      description: "Your dispute has been escalated to our support team.",
    })
    // In a real app, we would submit the escalation to an API
  }

  const activeDisputes = mockDisputes.filter((dispute) => dispute.status === "open" || dispute.status === "underReview")
  const resolvedDisputes = mockDisputes.filter(
    (dispute) => dispute.status === "resolved" || dispute.status === "closed",
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trade Disputes</h1>
          <p className="text-muted-foreground">Manage and resolve issues with your trades.</p>
        </div>
        <Button onClick={handleFileNewDispute}>
          <FileText className="mr-2 h-4 w-4" />
          File New Dispute
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-1">
          <h2 className="font-semibold">Need Help?</h2>
          <p className="text-sm text-muted-foreground">
            Our dispute resolution team is here to help you resolve any issues with your trades.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleViewGuidelines}>
            View Guidelines
          </Button>
          <Button size="sm" onClick={handleContactSupport}>
            Contact Support
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search disputes..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="underReview">Under Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleFilterToggle}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isFilterExpanded && (
        <div className="mb-6 rounded-lg border p-4">
          <h3 className="mb-3 font-medium">Advanced Filters</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select defaultValue="all-time">
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="trade-type">Trade Type</Label>
              <Select defaultValue="all-types">
                <SelectTrigger id="trade-type">
                  <SelectValue placeholder="Trade Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="item-for-item">Item for Item</SelectItem>
                  <SelectItem value="item-for-cash">Item for Cash</SelectItem>
                  <SelectItem value="service-trade">Service Trade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dispute-reason">Dispute Reason</Label>
              <Select defaultValue="all-reasons">
                <SelectTrigger id="dispute-reason">
                  <SelectValue placeholder="Dispute Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-reasons">All Reasons</SelectItem>
                  <SelectItem value="item-condition">Item Condition</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                  <SelectItem value="item-authenticity">Item Authenticity</SelectItem>
                  <SelectItem value="incomplete-item">Incomplete Item</SelectItem>
                  <SelectItem value="damaged-shipping">Damaged in Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusFilter("all")
                toast({
                  title: "Filters reset",
                  description: "All filters have been reset to default values.",
                })
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setIsFilterExpanded(false)
                toast({
                  title: "Filters applied",
                  description: "Your filter settings have been applied.",
                })
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Disputes</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Disputes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6 space-y-6">
          {activeDisputes.map((dispute) => (
            <DisputeCard
              key={dispute.id}
              dispute={dispute}
              onViewDetails={() => handleViewDisputeDetails(dispute)}
              onSendMessage={() => handleSendMessage(dispute.counterparty)}
              onSubmitEvidence={() => handleSubmitEvidence(dispute)}
              onViewTimeline={() => handleViewTimeline(dispute)}
              onEscalateToSupport={() => handleEscalateToSupport(dispute)}
            />
          ))}
        </TabsContent>
        <TabsContent value="resolved" className="mt-6 space-y-6">
          {resolvedDisputes.map((dispute) => (
            <DisputeCard
              key={dispute.id}
              dispute={dispute}
              onViewDetails={() => handleViewDisputeDetails(dispute)}
              onSendMessage={() => handleSendMessage(dispute.counterparty)}
              onSubmitEvidence={() => handleSubmitEvidence(dispute)}
              onViewTimeline={() => handleViewTimeline(dispute)}
            />
          ))}
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="rounded-lg border">
            <div className="grid grid-cols-1 divide-y">
              {mockDisputes.map((dispute) => (
                <DisputeListItem
                  key={dispute.id}
                  id={dispute.id}
                  title={dispute.title}
                  status={dispute.status}
                  date={dispute.date}
                  counterparty={dispute.counterparty}
                  onViewDetails={() => handleViewDisputeDetails(dispute)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Dispute Resources</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Dispute Guidelines
              </CardTitle>
              <CardDescription>Learn about our dispute resolution process</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={handleViewGuidelines}>
                View Guidelines
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Common Issues
              </CardTitle>
              <CardDescription>Solutions for frequently reported problems</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={handleViewSolutions}>
                View Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={handleContactSupport}>
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* File New Dispute Dialog */}
      <Dialog open={showFileDisputeDialog} onOpenChange={setShowFileDisputeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>File a New Dispute</DialogTitle>
            <DialogDescription>
              Provide details about the issue with your trade. Our team will review your case.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDisputeSubmission}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="trade-id">Trade ID</Label>
                <Input id="trade-id" placeholder="e.g., TRD-12345" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dispute-type">Dispute Type</Label>
                <Select defaultValue="item-condition">
                  <SelectTrigger id="dispute-type">
                    <SelectValue placeholder="Select dispute type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="item-condition">Item Condition Not As Described</SelectItem>
                    <SelectItem value="no-show">Meetup No-Show</SelectItem>
                    <SelectItem value="item-authenticity">Item Authenticity Concerns</SelectItem>
                    <SelectItem value="incomplete-item">Incomplete Item</SelectItem>
                    <SelectItem value="damaged-shipping">Damaged During Shipping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dispute-description">Description</Label>
                <Textarea id="dispute-description" placeholder="Describe the issue in detail..." rows={5} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desired-resolution">Desired Resolution</Label>
                <Select defaultValue="refund">
                  <SelectTrigger id="desired-resolution">
                    <SelectValue placeholder="Select desired resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refund">Refund</SelectItem>
                    <SelectItem value="replacement">Replacement</SelectItem>
                    <SelectItem value="partial-refund">Partial Refund</SelectItem>
                    <SelectItem value="return">Return Item</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowFileDisputeDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Dispute</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submit Evidence Dialog */}
      <Dialog open={showEvidenceDialog} onOpenChange={setShowEvidenceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit Evidence</DialogTitle>
            <DialogDescription>
              Provide additional evidence for your dispute case {selectedDispute?.id}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEvidenceSubmission}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="evidence-type">Evidence Type</Label>
                <Select defaultValue="photos">
                  <SelectTrigger id="evidence-type">
                    <SelectValue placeholder="Select evidence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photos">Photos</SelectItem>
                    <SelectItem value="messages">Messages</SelectItem>
                    <SelectItem value="receipts">Receipts</SelectItem>
                    <SelectItem value="third-party">Third-Party Assessment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="evidence-description">Description</Label>
                <Textarea
                  id="evidence-description"
                  placeholder="Describe the evidence you're submitting..."
                  rows={3}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="evidence-file">Upload Files</Label>
                <Input id="evidence-file" type="file" multiple />
                <p className="text-xs text-muted-foreground">
                  You can upload up to 5 files (max 10MB each). Supported formats: JPG, PNG, PDF.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEvidenceDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Evidence</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Timeline Dialog */}
      <Dialog open={showTimelineDialog} onOpenChange={setShowTimelineDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Dispute Timeline</DialogTitle>
            <DialogDescription>Timeline of events for dispute {selectedDispute?.id}.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto py-4">
            <div className="relative ml-4 border-l pl-6 pt-2">
              <div className="mb-8 relative">
                <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div className="mb-1 text-sm font-medium">Dispute Filed</div>
                <time className="mb-2 block text-xs text-muted-foreground">{selectedDispute?.date} - 10:23 AM</time>
                <p className="text-sm">You filed a dispute regarding {selectedDispute?.title.toLowerCase()}.</p>
              </div>
              <div className="mb-8 relative">
                <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div className="mb-1 text-sm font-medium">Dispute Acknowledged</div>
                <time className="mb-2 block text-xs text-muted-foreground">{selectedDispute?.date} - 2:45 PM</time>
                <p className="text-sm">The other party was notified of your dispute.</p>
              </div>
              <div className="mb-8 relative">
                <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <div className="mb-1 text-sm font-medium">Response Received</div>
                <time className="mb-2 block text-xs text-muted-foreground">
                  {new Date(new Date(selectedDispute?.date).getTime() + 86400000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  - 11:17 AM
                </time>
                <p className="text-sm">
                  {selectedDispute?.counterparty} responded to your dispute and provided their perspective.
                </p>
              </div>
              {selectedDispute?.status === "underReview" && (
                <>
                  <div className="mb-8 relative">
                    <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="mb-1 text-sm font-medium">Evidence Submitted</div>
                    <time className="mb-2 block text-xs text-muted-foreground">
                      {new Date(new Date(selectedDispute?.date).getTime() + 172800000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      - 3:30 PM
                    </time>
                    <p className="text-sm">You submitted photos as evidence for your dispute claim.</p>
                  </div>
                  <div className="mb-8 relative">
                    <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="mb-1 text-sm font-medium">Under Review</div>
                    <time className="mb-2 block text-xs text-muted-foreground">
                      {new Date(new Date(selectedDispute?.date).getTime() + 259200000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      - 9:05 AM
                    </time>
                    <p className="text-sm">Your dispute is now being reviewed by our dispute resolution team.</p>
                  </div>
                </>
              )}
              {(selectedDispute?.status === "resolved" || selectedDispute?.status === "closed") && (
                <>
                  <div className="mb-8 relative">
                    <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="mb-1 text-sm font-medium">Resolution Proposed</div>
                    <time className="mb-2 block text-xs text-muted-foreground">
                      {new Date(new Date(selectedDispute?.date).getTime() + 432000000).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      - 2:15 PM
                    </time>
                    <p className="text-sm">Our dispute team proposed a resolution based on the evidence provided.</p>
                  </div>
                  <div className="mb-8 relative">
                    <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="mb-1 text-sm font-medium">Resolution Accepted</div>
                    <time className="mb-2 block text-xs text-muted-foreground">{selectedDispute?.lastUpdated}</time>
                    <p className="text-sm">Both parties accepted the resolution. Dispute case closed.</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTimelineDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Escalate to Support Dialog */}
      <Dialog open={showEscalateDialog} onOpenChange={setShowEscalateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Escalate to Support</DialogTitle>
            <DialogDescription>
              Escalate dispute {selectedDispute?.id} to our support team for further assistance.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEscalationSubmission}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="escalation-reason">Reason for Escalation</Label>
                <Select defaultValue="no-response">
                  <SelectTrigger id="escalation-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-response">No Response from Other Party</SelectItem>
                    <SelectItem value="unresolved">Unable to Reach Agreement</SelectItem>
                    <SelectItem value="new-evidence">New Evidence Available</SelectItem>
                    <SelectItem value="policy-violation">Policy Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="escalation-details">Additional Details</Label>
                <Textarea
                  id="escalation-details"
                  placeholder="Provide any additional information that might help our support team..."
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="escalation-confirm" className="mt-1" required />
                <Label htmlFor="escalation-confirm" className="text-sm font-normal">
                  I understand that escalating this dispute may extend the resolution time and will involve review by
                  the support team.
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEscalateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Escalate Dispute</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Guidelines Dialog */}
      <Dialog open={showGuidelinesDialog} onOpenChange={setShowGuidelinesDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Dispute Guidelines</DialogTitle>
            <DialogDescription>Our comprehensive guide to the dispute resolution process</DialogDescription>
          </DialogHeader>
          <div className="max-h-[500px] overflow-y-auto py-2">
            <h3 className="text-lg font-medium mb-3">1. Filing a Dispute</h3>
            <p className="mb-4 text-sm">
              Disputes should be filed within 14 days of completing a trade. Provide detailed information about the
              issue and include any supporting evidence. Be clear about your desired resolution to help us process your
              case more efficiently.
            </p>

            <h3 className="text-lg font-medium mb-3">2. Resolution Process</h3>
            <p className="mb-4 text-sm">Our dispute resolution process follows these steps:</p>
            <ol className="ml-5 mb-4 text-sm space-y-2">
              <li>Initial review of the dispute claim (1-2 business days)</li>
              <li>Notification sent to the other party (automated)</li>
              <li>Collection of evidence from both parties (3-5 business days)</li>
              <li>Evaluation of evidence by our dispute team (2-3 business days)</li>
              <li>Resolution proposal</li>
              <li>Implementation of resolution</li>
            </ol>

            <h3 className="text-lg font-medium mb-3">3. Types of Resolutions</h3>
            <p className="mb-4 text-sm">
              Depending on the nature of the dispute, we may propose one of the following resolutions:
            </p>
            <ul className="ml-5 mb-4 text-sm space-y-2">
              <li>Item exchange or replacement</li>
              <li>Additional items to compensate</li>
              <li>Trade reversal</li>
              <li>Mediated resolution</li>
              <li>Educational resolution (for minor misunderstandings)</li>
            </ul>

            <h3 className="text-lg font-medium mb-3">4. Evidence Guidelines</h3>
            <p className="mb-4 text-sm">Acceptable forms of evidence include:</p>
            <ul className="ml-5 mb-4 text-sm space-y-2">
              <li>Clear photos of the items in question</li>
              <li>Screenshots of communications between parties</li>
              <li>Receipts, invoices, or proof of payment</li>
              <li>Third-party evaluations (for authenticity or condition disputes)</li>
              <li>Tracking information (for shipping-related disputes)</li>
            </ul>

            <h3 className="text-lg font-medium mb-3">5. Escalation Process</h3>
            <p className="mb-4 text-sm">
              If you're not satisfied with the initial resolution process, you can escalate your dispute to our support
              team. Escalations are reviewed by senior dispute specialists and generally take an additional 3-5 business
              days to resolve.
            </p>

            <h3 className="text-lg font-medium mb-3">6. Best Practices</h3>
            <p className="mb-4 text-sm">To ensure a smooth dispute resolution process:</p>
            <ul className="ml-5 mb-4 text-sm space-y-2">
              <li>Document all aspects of your trades with photos before and after</li>
              <li>Keep all communication within our platform's messaging system</li>
              <li>Be specific and factual when describing issues</li>
              <li>Respond promptly to requests for additional information</li>
              <li>Approach the process with a willingness to reach a fair resolution</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowGuidelinesDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Solutions Dialog */}
      <Dialog open={showSolutionsDialog} onOpenChange={setShowSolutionsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Common Issues & Solutions</DialogTitle>
            <DialogDescription>Practical solutions for frequently reported trading problems</DialogDescription>
          </DialogHeader>
          <div className="max-h-[500px] overflow-y-auto py-2">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Item Condition Not as Described</h3>
              <p className="mb-2 text-sm">
                This is one of the most common dispute types. It occurs when an item's condition differs significantly
                from what was advertised.
              </p>
              <h4 className="font-medium text-sm mb-1">Common Solutions:</h4>
              <ul className="ml-5 mb-3 text-sm space-y-1">
                <li>Additional items to compensate for the difference in value</li>
                <li>
                  Exchange of items (trader pays shipping for minor discrepancies, counterparty pays for major ones)
                </li>
                <li>Replacement with the item as originally described</li>
              </ul>
              <h4 className="font-medium text-sm mb-1">Prevention Tips:</h4>
              <ul className="ml-5 text-sm space-y-1">
                <li>Always include multiple clear photos of items from different angles</li>
                <li>Clearly disclose any defects, wear, or imperfections</li>
                <li>When receiving an item, inspect and document its condition immediately</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Trade Meetup No-Show</h3>
              <p className="mb-2 text-sm">
                When one trader doesn't show up for a scheduled in-person exchange without proper notification.
              </p>
              <h4 className="font-medium text-sm mb-1">Common Solutions:</h4>
              <ul className="ml-5 mb-3 text-sm space-y-1">
                <li>Rescheduling with clear communication</li>
                <li>Small compensation for wasted time/travel (in platform credits)</li>
                <li>Formal warning for repeated no-shows</li>
              </ul>
              <h4 className="font-medium text-sm mb-1">Prevention Tips:</h4>
              <ul className="ml-5 text-sm space-y-1">
                <li>Confirm the meetup details in writing the day before</li>
                <li>Use our platform's built-in meetup scheduler with reminders</li>
                <li>Have a backup plan or alternative meetup option</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Item Authenticity Concerns</h3>
              <p className="mb-2 text-sm">
                When there's doubt about whether an item is genuine or authentic as claimed.
              </p>
              <h4 className="font-medium text-sm mb-1">Common Solutions:</h4>
              <ul className="ml-5 mb-3 text-sm space-y-1">
                <li>Third-party authentication (costs split or covered by the party at fault)</li>
                <li>Trade reversal if item is proven to be inauthentic</li>
                <li>Report trader if intentional fraud is determined</li>
              </ul>
              <h4 className="font-medium text-sm mb-1">Prevention Tips:</h4>
              <ul className="ml-5 text-sm space-y-1">
                <li>Ask for proof of authenticity or purchase receipts before trading</li>
                <li>Research how to identify authentic items in the category</li>
                <li>For high-value items, consider authentication services before trading</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Incomplete Item Sets</h3>
              <p className="mb-2 text-sm">
                When an item that should include multiple components is missing some parts.
              </p>
              <h4 className="font-medium text-sm mb-1">Common Solutions:</h4>
              <ul className="ml-5 mb-3 text-sm space-y-1">
                <li>Trader provides the missing components</li>
                <li>Additional items to compensate for the value of missing pieces</li>
                <li>Trade reversal if the item is unusable without the missing parts</li>
              </ul>
              <h4 className="font-medium text-sm mb-1">Prevention Tips:</h4>
              <ul className="ml-5 text-sm space-y-1">
                <li>List all components included in your listing</li>
                <li>Take photos showing all parts laid out together</li>
                <li>Verify all components are present before completing the trade</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSolutionsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispute Details Dialog */}
      <Dialog open={showDisputeDetailsDialog} onOpenChange={setShowDisputeDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedDispute?.title}</DialogTitle>
            <DialogDescription>
              Dispute ID: {selectedDispute?.id} • Filed on {selectedDispute?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Resolution Progress</span>
                <span>{selectedDispute?.progress}%</span>
              </div>
              <Progress value={selectedDispute?.progress} className="h-2" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-medium">Trade Information</h4>
                <div className="rounded-lg border p-3 mb-4">
                  <div className="text-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-muted-foreground">Trade ID:</span>
                      <Link
                        href={`/my-trades/${selectedDispute?.tradeId}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {selectedDispute?.tradeId}
                      </Link>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={statusColors[selectedDispute?.status]} variant="outline">
                        {statusText[selectedDispute?.status]}
                      </Badge>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{selectedDispute?.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <h4 className="mb-2 text-sm font-medium">Description</h4>
                <div className="rounded-lg border p-3 mb-4">
                  <p className="text-sm text-muted-foreground">{selectedDispute?.description}</p>
                </div>

                {selectedDispute?.resolution && (
                  <>
                    <h4 className="mb-2 text-sm font-medium">Resolution</h4>
                    <div className="rounded-lg border p-3">
                      <p className="text-sm text-muted-foreground">{selectedDispute?.resolution}</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">Counterparty</h4>
                <div className="rounded-lg border p-3 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage
                        src={selectedDispute?.counterpartyAvatar || "/placeholder.svg"}
                        alt={selectedDispute?.counterparty}
                      />
                      <AvatarFallback>
                        {selectedDispute?.counterparty
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedDispute?.counterparty}</div>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                        <Link href={`/user/${selectedDispute?.counterparty.replace(" ", "-").toLowerCase()}`}>
                          View Profile
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleSendMessage(selectedDispute?.counterparty)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>

                <h4 className="mb-2 text-sm font-medium">Actions</h4>
                <div className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleSubmitEvidence(selectedDispute)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Submit Evidence
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleViewTimeline(selectedDispute)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    View Timeline
                  </Button>
                  {(selectedDispute?.status === "open" || selectedDispute?.status === "underReview") && (
                    <Button
                      size="sm"
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => handleEscalateToSupport(selectedDispute)}
                    >
                      Escalate to Support
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDisputeDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Status colors mapping
const statusColors = {
  open: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  underReview: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  closed: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
}

// Status text mapping
const statusText = {
  open: "Open",
  underReview: "Under Review",
  resolved: "Resolved",
  closed: "Closed",
}

function DisputeCard({ dispute, onViewDetails, onSendMessage, onSubmitEvidence, onViewTimeline, onEscalateToSupport }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{dispute.title}</CardTitle>
              <Badge className={statusColors[dispute.status]} variant="outline">
                {statusText[dispute.status]}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              Dispute ID: {dispute.id} • Filed on {dispute.date}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>Resolution Progress</span>
            <span>{dispute.progress}%</span>
          </div>
          <Progress value={dispute.progress} className="h-2" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h4 className="mb-2 text-sm font-medium">Trade Information</h4>
            <div className="rounded-lg border p-3">
              <div className="text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-muted-foreground">Trade ID:</span>
                  <Link href={`/my-trades/${dispute.tradeId}`} className="font-medium text-primary hover:underline">
                    {dispute.tradeId}
                  </Link>
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{dispute.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Counterparty</h4>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={dispute.counterpartyAvatar || "/placeholder.svg"} alt={dispute.counterparty} />
                  <AvatarFallback>
                    {dispute.counterparty
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{dispute.counterparty}</div>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <Link href={`/user/${dispute.counterparty.replace(" ", "-").toLowerCase()}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Actions</h4>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline" className="justify-start" onClick={onSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" className="justify-start" onClick={onSubmitEvidence}>
                <FileText className="mr-2 h-4 w-4" />
                Submit Evidence
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h4 className="mb-2 text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground">{dispute.description}</p>
        </div>

        {dispute.resolution && (
          <>
            <Separator className="my-4" />
            <div>
              <h4 className="mb-2 text-sm font-medium">Resolution</h4>
              <p className="text-sm text-muted-foreground">{dispute.resolution}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={onViewTimeline}>
          <Clock className="mr-2 h-4 w-4" />
          View Timeline
        </Button>
        {(dispute.status === "open" || dispute.status === "underReview") && onEscalateToSupport && (
          <Button variant="default" size="sm" onClick={onEscalateToSupport}>
            Escalate to Support
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function DisputeListItem({ id, title, status, date, counterparty, onViewDetails }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>ID: {id}</span>
            <span>•</span>
            <span>Filed: {date}</span>
            <span>•</span>
            <span>With: {counterparty}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={statusColors[status]} variant="outline">
          {statusText[status]}
        </Badge>
        <Button variant="ghost" size="sm" onClick={onViewDetails}>
          <span className="sr-only">View dispute details</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

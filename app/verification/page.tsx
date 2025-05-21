"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Camera, Check, CheckCircle, FileText, Lock, Shield, Upload, User, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function VerificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("identity")
  const [verificationProgress, setVerificationProgress] = useState(25)
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; status: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock verification status
  const verificationStatus = {
    identity: "pending", // pending, in-review, verified, rejected
    address: "not-started", // not-started, pending, in-review, verified, rejected
    phone: "verified",
    email: "verified",
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        status: "uploading",
      }))

      setUploadedFiles([...uploadedFiles, ...newFiles])

      // Simulate upload completion
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((file) => ({
            ...file,
            status: "uploaded",
          })),
        )

        setVerificationProgress((prev) => Math.min(prev + 25, 75))

        toast({
          title: "Files uploaded successfully",
          description: "Your documents have been uploaded and are ready for review.",
        })
      }, 2000)
    }
  }

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
    setVerificationProgress((prev) => Math.max(prev - 25, 25))
  }

  const handleSubmitVerification = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setVerificationProgress(100)

      toast({
        title: "Verification submitted",
        description: "Your verification documents have been submitted for review.",
      })
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check className="mr-1 h-3 w-3" /> Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending Review</Badge>
        )
      case "in-review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">In Review</Badge>
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <X className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Not Started
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Verification Center</h1>
            <p className="text-muted-foreground">Complete verification to unlock all trading features</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardHeader>
                <CardTitle>Verification Progress</CardTitle>
                <CardDescription>Complete all verification steps to become a fully verified trader</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{verificationProgress}% Complete</span>
                  <span className="text-sm text-muted-foreground">
                    {verificationProgress === 100 ? "All steps completed" : "Complete all steps"}
                  </span>
                </div>
                <Progress value={verificationProgress} className="h-2" />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 dark:border-border/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Email Verification</h3>
                        {getStatusBadge(verificationStatus.email)}
                      </div>
                      <p className="text-sm text-muted-foreground">Your email has been verified</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 dark:border-border/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Phone Verification</h3>
                        {getStatusBadge(verificationStatus.phone)}
                      </div>
                      <p className="text-sm text-muted-foreground">Your phone number has been verified</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 dark:border-border/20">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        verificationStatus.identity === "verified"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Identity Verification</h3>
                        {getStatusBadge(verificationStatus.identity)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {verificationStatus.identity === "verified"
                          ? "Your identity has been verified"
                          : verificationStatus.identity === "pending"
                            ? "Your documents are awaiting review"
                            : verificationStatus.identity === "in-review"
                              ? "Your documents are being reviewed"
                              : verificationStatus.identity === "rejected"
                                ? "Your verification was rejected"
                                : "Upload your ID to verify your identity"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 dark:border-border/20">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        verificationStatus.address === "verified"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Address Verification</h3>
                        {getStatusBadge(verificationStatus.address)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {verificationStatus.address === "verified"
                          ? "Your address has been verified"
                          : verificationStatus.address === "pending"
                            ? "Your documents are awaiting review"
                            : verificationStatus.address === "in-review"
                              ? "Your documents are being reviewed"
                              : verificationStatus.address === "rejected"
                                ? "Your verification was rejected"
                                : "Upload proof of address to verify"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardHeader>
                <CardTitle>Complete Verification</CardTitle>
                <CardDescription>Upload the required documents to verify your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="identity">Identity Verification</TabsTrigger>
                    <TabsTrigger value="address">Address Verification</TabsTrigger>
                  </TabsList>
                  <TabsContent value="identity" className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Upload ID Document</h3>
                      <p className="text-sm text-muted-foreground">
                        Please upload a clear photo of your government-issued ID (passport, driver's license, or ID
                        card)
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="relative rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
                        <input
                          type="file"
                          id="id-front"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={handleFileUpload}
                          accept="image/*"
                        />
                        <div className="flex flex-col items-center">
                          <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="mb-1 text-sm font-medium">Front of ID</p>
                          <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
                        </div>
                      </div>

                      <div className="relative rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
                        <input
                          type="file"
                          id="id-back"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={handleFileUpload}
                          accept="image/*"
                        />
                        <div className="flex flex-col items-center">
                          <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="mb-1 text-sm font-medium">Back of ID</p>
                          <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Take a Selfie</h3>
                      <p className="text-sm text-muted-foreground">
                        Please take a clear selfie of yourself holding your ID next to your face
                      </p>
                    </div>

                    <div className="relative rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
                      <input
                        type="file"
                        id="selfie"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                      <div className="flex flex-col items-center">
                        <User className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="mb-1 text-sm font-medium">Selfie with ID</p>
                        <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="address" className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Upload Proof of Address</h3>
                      <p className="text-sm text-muted-foreground">
                        Please upload a document showing your current address (utility bill, bank statement, etc.)
                        issued within the last 3 months
                      </p>
                    </div>

                    <div className="relative rounded-lg border border-dashed border-border/60 p-6 text-center dark:border-border/40">
                      <input
                        type="file"
                        id="address-proof"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={handleFileUpload}
                        accept="image/*,application/pdf"
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <p className="mb-1 text-sm font-medium">Proof of Address</p>
                        <p className="text-xs text-muted-foreground">
                          Utility bill, bank statement, or government letter
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Enter Your Address</h3>
                      <p className="text-sm text-muted-foreground">Please enter your current residential address</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input id="street" placeholder="123 Main St" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" placeholder="NY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="zip">ZIP/Postal Code</Label>
                          <Input id="zip" placeholder="10001" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="United States" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-medium">Uploaded Files</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between rounded-lg border border-border/40 p-3 dark:border-border/20"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === "uploading" ? (
                              <span className="text-xs text-muted-foreground">Uploading...</span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                <Check className="h-3 w-3" /> Uploaded
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveFile(file.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitVerification}
                  disabled={uploadedFiles.length === 0 || isSubmitting}
                  className="bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084]/90 hover:to-[#3B82F6]/90"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="mb-6 overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardHeader>
                <CardTitle>Verification Benefits</CardTitle>
                <CardDescription>Why you should verify your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00D084]/10 text-[#00D084]">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Enhanced Trust</h3>
                    <p className="text-sm text-muted-foreground">
                      Verified users are more likely to be trusted by other traders
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Higher Trade Limits</h3>
                    <p className="text-sm text-muted-foreground">
                      Verified users can trade higher value items with fewer restrictions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    <Badge className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Verified Badge</h3>
                    <p className="text-sm text-muted-foreground">Get a verified badge on your profile and listings</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Account Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Protect your account from unauthorized access and fraud
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardHeader>
                <CardTitle>Verification FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-1 font-medium">How long does verification take?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most verifications are completed within 24-48 hours after submission.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-1 font-medium">What documents are accepted?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept government-issued IDs such as passports, driver's licenses, and national ID cards.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-1 font-medium">Is my data secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, all your documents are encrypted and stored securely. We comply with data protection
                    regulations.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-1 font-medium">What if my verification is rejected?</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive feedback on why it was rejected and can resubmit with the correct documents.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

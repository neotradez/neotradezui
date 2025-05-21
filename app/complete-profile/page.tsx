"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, ArrowRight, Check, Upload, MapPin, Instagram } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CompleteProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    location: "",
    bio: "",
    avatar: "/placeholder.svg?height=100&width=100",
    interests: [] as string[],
    phoneNumber: "",
    instagramHandle: "", // Added Instagram handle field
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = [...prev.interests]
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter((i) => i !== interest) }
      } else {
        return { ...prev, interests: [...interests, interest] }
      }
    })
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.username || !formData.fullName) {
        setError("Username and full name are required")
        return
      }
    }

    setError(null)
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setError(null)
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validate form
    if (!formData.location) {
      setError("Location is required")
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call to save profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mark profile as completed
      localStorage.setItem("profileCompleted", "true")
      localStorage.removeItem("needsProfileCompletion")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const interestOptions = [
    "Electronics",
    "Collectibles",
    "Vintage",
    "Sports",
    "Music",
    "Art",
    "Books",
    "Fashion",
    "Gaming",
    "Outdoor",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-background/90 p-4 dark:from-[#121212] dark:to-[#0a0a0a]">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
          <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
            <span className="font-bold">NT</span>
          </div>
        </div>
        <span className="font-heading text-2xl font-bold">NeoTradez</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              {step > 1 && (
                <Button variant="ghost" className="p-0" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex-1 text-center">
                <CardTitle className="text-2xl font-bold">Complete your profile</CardTitle>
              </div>
              <div className="w-4"></div> {/* Spacer for alignment */}
            </div>
            <CardDescription className="text-center">
              {step === 1 && "Tell us about yourself to get started with NeoTradez"}
              {step === 2 && "Add a profile picture and bio to help others know you"}
              {step === 3 && "Almost done! Just a few more details"}
            </CardDescription>
            <div className="mx-auto mt-2 flex w-full max-w-[200px] justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex h-2 w-2 items-center justify-center rounded-full ${
                    s === step
                      ? "bg-primary dark:bg-[#00D084]"
                      : s < step
                        ? "bg-primary/60 dark:bg-[#00D084]/60"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Choose a unique username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramHandle">Instagram Handle (optional)</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagramHandle"
                      name="instagramHandle"
                      placeholder="@yourusername"
                      value={formData.instagramHandle}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>{formData.username.slice(0, 2).toUpperCase() || "NT"}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload profile picture
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell others about yourself and what you like to trade"
                    value={formData.bio}
                    onChange={handleChange}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Trading Interests</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {formData.interests.includes(interest) && <Check className="mr-2 h-4 w-4" />}
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step < 3 ? (
              <Button className="w-full" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Complete Profile"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

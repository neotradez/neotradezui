"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validate email
    if (!email) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, this would be an API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
            <div className="flex items-center">
              <Button variant="ghost" className="mr-2 p-0" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
            </div>
            <CardDescription>
              {!submitted
                ? "Enter your email address and we'll send you a code to reset your password"
                : "Check your email for the password reset code"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {submitted ? (
              <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                <Mail className="h-4 w-4" />
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>
                  We've sent a password reset code to <strong>{email}</strong>. Please check your inbox and enter the
                  code on the next screen.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset code"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link href="/sign-in" className="text-primary hover:underline dark:text-[#00D084]">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Reset Code</Label>
                    <Input id="code" placeholder="Enter the 6-digit code" maxLength={6} />
                  </div>
                  <Button type="button" className="w-full" onClick={() => router.push("/reset-password")}>
                    Verify Code
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

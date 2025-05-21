"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowRight, Check } from "lucide-react"

export default function EmailConfirmationPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Get the pending registration email
    const pendingEmail = localStorage.getItem("pendingRegistration")
    if (pendingEmail) {
      setEmail(pendingEmail)
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleVerifyEmail = () => {
    // Simulate email verification
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email || "user@example.com")
    localStorage.setItem("needsProfileCompletion", "true")

    // Redirect to complete profile
    router.push("/complete-profile")
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
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-center">
              We've sent a confirmation email to {email ? <strong>{email}</strong> : "your inbox"}. Please click the
              link in the email to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border/40 bg-muted/40 p-4 dark:border-border/20">
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Didn't receive an email?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check your spam folder or{" "}
                    <button className="text-primary hover:underline dark:text-[#00D084]">click here to resend</button>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                After confirming your email, you'll be able to complete your profile and start trading.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" onClick={handleVerifyEmail}>
              {countdown > 0 ? `Verify Email (${countdown}s)` : "Verify Email"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Return to home page
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

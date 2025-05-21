"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, KeyRound, QrCode, Shield, ShieldAlert, Smartphone } from "lucide-react"
import { motion } from "framer-motion"

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [recoveryCodesGenerated, setRecoveryCodesGenerated] = useState(false)
  const [authAppEnabled, setAuthAppEnabled] = useState(false)
  const [passwordAge, setPasswordAge] = useState(32) // days since last password change

  const handleGenerateRecoveryCodes = () => {
    setRecoveryCodesGenerated(true)
  }

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
  }

  const handleToggleAuthApp = () => {
    setAuthAppEnabled(!authAppEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                  <span className="font-bold">NT</span>
                </div>
              </div>
              <span className="hidden font-heading text-xl font-bold sm:inline-block">NeoTradez</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/settings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Settings
            </Link>
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Security Settings</h1>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="two-factor">Two-Factor Auth</TabsTrigger>
            <TabsTrigger value="activity" className="hidden lg:block">
              Account Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-[#00D084]" />
                      Password
                    </CardTitle>
                    <CardDescription>Manage your password settings and recovery options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Password age</h3>
                          <p className="text-sm text-muted-foreground">
                            {passwordAge > 90 ? "Consider changing your password soon" : "Your password is up to date"}
                          </p>
                        </div>
                        <div className={`text-sm ${passwordAge > 90 ? "text-amber-500" : "text-[#00D084]"}`}>
                          {passwordAge} days
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start space-y-2 border-t border-border/40 py-4 dark:border-border/20">
                    <div className="flex items-center space-x-2">
                      <Switch id="password-notifications" />
                      <Label htmlFor="password-notifications">Notify me when password is changed</Label>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#00D084]" />
                      Account Security
                    </CardTitle>
                    <CardDescription>Review your account security settings and activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Security level</h3>
                          <p className="text-sm text-muted-foreground">
                            {twoFactorEnabled ? "Your account has enhanced security" : "Basic security is enabled"}
                          </p>
                        </div>
                        <div className={`text-sm ${twoFactorEnabled ? "text-[#00D084]" : "text-amber-500"}`}>
                          {twoFactorEnabled ? "Enhanced" : "Basic"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Security alerts</h3>
                          <p className="text-sm text-muted-foreground">Get notified about important security events</p>
                        </div>
                        <Switch id="security-alerts" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start space-y-2 border-t border-border/40 py-4 dark:border-border/20">
                    <div className="flex items-center space-x-2">
                      <Switch id="login-notifications" defaultChecked />
                      <Label htmlFor="login-notifications">Notify me about new sign-ins</Label>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="two-factor">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-[#00D084]" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Enable 2FA</h3>
                          <p className="text-sm text-muted-foreground">
                            {twoFactorEnabled
                              ? "Two-factor authentication is enabled"
                              : "Protect your account with two-factor authentication"}
                          </p>
                        </div>
                        <Switch id="enable-2fa" checked={twoFactorEnabled} onCheckedChange={handleToggleTwoFactor} />
                      </div>

                      {twoFactorEnabled && (
                        <>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Authentication app</h3>
                              <p className="text-sm text-muted-foreground">
                                Use an authenticator app to generate codes
                              </p>
                            </div>
                            <Switch id="auth-app" checked={authAppEnabled} onCheckedChange={handleToggleAuthApp} />
                          </div>

                          {authAppEnabled && (
                            <div className="rounded-lg border border-border/40 bg-muted/30 p-4 dark:border-border/20">
                              <div className="mb-3 flex justify-center">
                                <div className="h-32 w-32 rounded-lg bg-muted/50 p-2 dark:bg-muted/20">
                                  <QrCode className="h-full w-full text-muted-foreground" />
                                </div>
                              </div>
                              <p className="text-center text-sm text-muted-foreground">
                                Scan this QR code with your authentication app
                              </p>
                              <div className="mt-3 flex justify-center">
                                <Button variant="outline" size="sm">
                                  Can't scan? Show secret key
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-[#00D084]" />
                      Recovery Options
                    </CardTitle>
                    <CardDescription>Set up methods to regain access if you're locked out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {twoFactorEnabled && (
                        <div>
                          <h3 className="mb-2 font-medium">Recovery codes</h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            Generate recovery codes to use if you can't access your authentication app
                          </p>

                          {recoveryCodesGenerated ? (
                            <div className="rounded-lg border border-border/40 bg-muted/30 p-4 dark:border-border/20">
                              <p className="mb-2 text-sm font-medium">Your recovery codes:</p>
                              <div className="mb-3 space-y-1">
                                <div className="rounded bg-muted/50 px-2 py-1 font-mono text-xs dark:bg-muted/20">
                                  ABCD-EFGH-1234
                                </div>
                                <div className="rounded bg-muted/50 px-2 py-1 font-mono text-xs dark:bg-muted/20">
                                  IJKL-MNOP-5678
                                </div>
                                <div className="rounded bg-muted/50 px-2 py-1 font-mono text-xs dark:bg-muted/20">
                                  QRST-UVWX-9012
                                </div>
                                <div className="rounded bg-muted/50 px-2 py-1 font-mono text-xs dark:bg-muted/20">
                                  YZAB-CDEF-3456
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Store these codes in a secure place. Each code can only be used once.
                              </p>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                Download codes
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" className="w-full" onClick={handleGenerateRecoveryCodes}>
                              Generate recovery codes
                            </Button>
                          )}
                        </div>
                      )}

                      <div>
                        <h3 className="mb-2 font-medium">Trusted devices</h3>
                        <p className="mb-2 text-sm text-muted-foreground">
                          Devices that don't require 2FA verification every time
                        </p>
                        <div className="rounded-lg border border-border/40 p-3 dark:border-border/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-muted/50 p-1.5 dark:bg-muted/20">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Current device</p>
                                <p className="text-xs text-muted-foreground">Last used just now</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>Recent sign-ins and security events for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border/40 p-4 dark:border-border/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Sign-in from New York, USA</h3>
                        <p className="text-xs text-muted-foreground">Today, 2:15 PM • Chrome on Windows</p>
                      </div>
                      <div className="rounded-full bg-[#00D084]/10 px-2 py-0.5 text-xs font-medium text-[#00D084]">
                        Current session
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/40 p-4 dark:border-border/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Password changed</h3>
                        <p className="text-xs text-muted-foreground">32 days ago • New York, USA</p>
                      </div>
                      <div className="rounded-full bg-muted/30 px-2 py-0.5 text-xs font-medium dark:bg-muted/20">
                        Security event
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border/40 p-4 dark:border-border/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Sign-in from Boston, USA</h3>
                        <p className="text-xs text-muted-foreground">Last week • Safari on macOS</p>
                      </div>
                      <div className="rounded-full bg-muted/30 px-2 py-0.5 text-xs font-medium dark:bg-muted/20">
                        Recognized device
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 py-4 dark:border-border/20">
                <Button variant="outline" className="w-full">
                  View all activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

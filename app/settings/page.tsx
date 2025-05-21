"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsTabsComponent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)
    // Update URL without full navigation
    router.push(`/settings?tab=${value}`, undefined, { shallow: true })
  }

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-8 grid w-full grid-cols-4">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="payment">
        <PaymentSettings />
      </TabsContent>
    </Tabs>
  )
}

export function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "Passionate trader of vintage electronics and photography equipment.",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Settings updated",
      description: "Your account settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details and public profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" name="displayName" value={formData.displayName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
              <p className="text-xs text-muted-foreground">This will be displayed on your public profile</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your password was last changed 3 months ago. We recommend changing your password regularly for security.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/settings/change-password")}>Change Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an extra layer of security to your account by requiring more than just a
            password to sign in.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/settings/2fa")}>Set Up 2FA</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function AppearanceSettings() {
  const { toast } = useToast()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleThemeChange = (checked) => {
    setIsDarkMode(checked)
    // In a real app, this would update the theme
    toast({
      title: "Theme updated",
      description: `Theme set to ${checked ? "dark" : "light"} mode.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how NeoTradez looks for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
          </div>
          <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationSettings() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState({
    tradeUpdates: true,
    messages: true,
    meetupReminders: true,
    marketplaceAlerts: false,
    email: true,
    push: true,
  })

  const handleToggle = (key) => {
    setNotifications((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] }

      // In a real app, this would update the notification settings
      toast({
        title: "Notification settings updated",
        description: `${key} notifications ${newSettings[key] ? "enabled" : "disabled"}.`,
      })

      return newSettings
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control what notifications you receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Types</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="trade-updates">Trade Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about your trade proposals and status changes
              </p>
            </div>
            <Switch
              id="trade-updates"
              checked={notifications.tradeUpdates}
              onCheckedChange={() => handleToggle("tradeUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="messages">Messages</Label>
              <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
            </div>
            <Switch id="messages" checked={notifications.messages} onCheckedChange={() => handleToggle("messages")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="meetup-reminders">Meetup Reminders</Label>
              <p className="text-sm text-muted-foreground">Receive reminders about upcoming meetups</p>
            </div>
            <Switch
              id="meetup-reminders"
              checked={notifications.meetupReminders}
              onCheckedChange={() => handleToggle("meetupReminders")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketplace-alerts">Marketplace Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about new items matching your saved searches</p>
            </div>
            <Switch
              id="marketplace-alerts"
              checked={notifications.marketplaceAlerts}
              onCheckedChange={() => handleToggle("marketplaceAlerts")}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Channels</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={() => handleToggle("email")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
            </div>
            <Switch id="push-notifications" checked={notifications.push} onCheckedChange={() => handleToggle("push")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods for premium features</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You don't have any payment methods set up yet. Add a payment method to access premium features.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Add Payment Method</Button>
      </CardFooter>
    </Card>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <SettingsTabsComponent />
    </div>
  )
}

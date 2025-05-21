import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Camera, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Link href="/profile" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Upload a new profile picture. JPG or PNG. 1MB max.</p>
                <Button>Upload New Picture</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue="John Trader" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johntrader" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Passionate collector and trader of vintage electronics and gadgets. Always looking for rare finds and interesting trades."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor="instagram">Instagram Username</Label>
                  <Input id="instagram" defaultValue="johntrader" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Twitter className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <Label htmlFor="twitter">Twitter Username</Label>
                  <Input id="twitter" defaultValue="johntrader" />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">Trading Interests</Label>
                <Textarea
                  id="interests"
                  rows={3}
                  defaultValue="Vintage electronics, mechanical keyboards, film cameras, vinyl records"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredMeetupLocations">Preferred Meetup Locations</Label>
                <Input id="preferredMeetupLocations" defaultValue="Downtown SF, Mission District" />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" defaultValue="415-555-1234" />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href="/profile">Cancel</Link>
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

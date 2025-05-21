import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/context/app-context"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </Button>
      </div>
      {/* Hero Section */}
      <div className="mb-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 p-8 text-center dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 md:p-12">
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          About NeoTradez
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-xl text-muted-foreground">
          Reimagining how we trade and share goods in our communities through the power of barter
        </p>
        <AboutCTA />
      </div>

      {/* TED Talk Section */}
      <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Inspired by the One Red Paperclip Story</h2>
          <p className="text-lg text-muted-foreground">
            Our platform was inspired by Kyle MacDonald's incredible journey of trading one red paperclip all the way up
            to a house. His TEDxVienna talk showcases how simple trades can lead to extraordinary outcomes when people
            connect over shared interests.
          </p>
          <p className="text-lg text-muted-foreground">
            At NeoTradez, we've built a platform that makes these kinds of trading journeys possible for everyone,
            combining the thrill of Kyle's adventure with modern technology.
          </p>
        </div>
        <div className="aspect-video overflow-hidden rounded-xl shadow-xl transition-transform hover:scale-[1.02]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/8s3bdVxuFBs"
            title="What if you could trade a paperclip for a house? | Kyle MacDonald | TEDxVienna"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-12 rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 p-8 dark:from-green-950/20 dark:to-teal-950/20 md:p-12">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Our Mission</h2>
        <p className="mb-6 text-xl text-muted-foreground">
          NeoTradez is built on the belief that trading can be more than just a transaction—it can be a journey of
          discovery, connection, and sustainability. We're creating a community where the value of items goes beyond
          monetary worth.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-0 bg-white/50 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-black/20">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Sustainable Consumption</h3>
              <p className="text-muted-foreground">
                By facilitating item trades, we help reduce waste and promote the reuse of goods, contributing to a more
                sustainable future.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/50 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-black/20">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community Building</h3>
              <p className="text-muted-foreground">
                NeoTradez connects people with similar interests, creating a vibrant community of traders who share
                stories and experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/50 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-black/20">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Our platform learns what you like and helps you discover items that match your interests and trading
                preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">How It Works</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="relative rounded-xl bg-muted/50 p-6">
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              1
            </div>
            <h3 className="mb-3 text-xl font-semibold">List Your Items</h3>
            <p className="text-muted-foreground">
              Add photos and descriptions of items you're willing to trade. Specify what you're looking for in return.
            </p>
          </div>

          <div className="relative rounded-xl bg-muted/50 p-6">
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-600 dark:bg-green-900/50 dark:text-green-400">
              2
            </div>
            <h3 className="mb-3 text-xl font-semibold">Browse & Connect</h3>
            <p className="text-muted-foreground">
              Explore items available for trade in your area or by category. Message traders to discuss potential
              exchanges.
            </p>
          </div>

          <div className="relative rounded-xl bg-muted/50 p-6">
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
              3
            </div>
            <h3 className="mb-3 text-xl font-semibold">Propose Trades</h3>
            <p className="text-muted-foreground">
              Make trade offers directly through the platform. Negotiate terms until both parties are satisfied.
            </p>
          </div>

          <div className="relative rounded-xl bg-muted/50 p-6">
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
              4
            </div>
            <h3 className="mb-3 text-xl font-semibold">Complete Exchange</h3>
            <p className="text-muted-foreground">
              Meet safely to exchange items or use our secure shipping options. Rate your experience afterward.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm dark:border-border/40">
              <h3 className="mb-2 text-xl font-semibold">Is NeoTradez free to use?</h3>
              <p className="text-muted-foreground">
                Yes, our core trading features are completely free. We believe in making trading accessible to everyone.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm dark:border-border/40">
              <h3 className="mb-2 text-xl font-semibold">How does NeoTradez ensure safety?</h3>
              <p className="text-muted-foreground">
                We provide safety guidelines, secure messaging, and community ratings to help create a trustworthy
                trading environment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm dark:border-border/40">
              <h3 className="mb-2 text-xl font-semibold">How far can I search for trades?</h3>
              <p className="text-muted-foreground">
                You can search locally or globally. Our map feature allows you to find trades in your immediate area or
                expand your search.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-card p-6 shadow-sm dark:border-border/40">
              <h3 className="mb-2 text-xl font-semibold">Can I track my trading journey?</h3>
              <p className="text-muted-foreground">
                Yes! Our Trade Journey feature lets you document your trades over time, similar to Kyle MacDonald's
                paperclip-to-house story.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 p-8 text-center dark:from-blue-950/50 dark:to-indigo-950/50 md:p-12">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Start Your Trading Journey?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-xl text-muted-foreground">
          Join thousands of traders who are discovering the joy of exchanging items and building connections.
        </p>
        <AboutCTA />
      </div>
    </div>
  )
}
// Client component for conditional rendering of CTA buttons
;("use client")
function AboutCTA() {
  const { isAuthenticated } = useApp()

  if (isAuthenticated) {
    return (
      <Button asChild size="lg" className="gap-2">
        <Link href="/marketplace">
          Explore Marketplace
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return (
    <Button asChild size="lg" className="gap-2">
      <Link href="/sign-up">
        Sign Up Now
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  )
}

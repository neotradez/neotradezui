"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Home, Search, MessageSquare, Network } from "lucide-react"
import { Suspense } from "react"
import { ProfileCompletionNotification } from "@/components/notifications/profile-completion-notification"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider, useApp } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav" // Import MainNav
import { ThemeToggle } from "@/components/theme-toggle"
import { GlobalSearch } from "@/components/global-search"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
         .perspective-500 {
           perspective: 500px;
         }
         .perspective-1000 {
           perspective: 1000px;
         }
         .perspective-1500 {
           perspective: 1500px;
         }
         .preserve-3d {
           transform-style: preserve-3d;
         }
         .backface-hidden {
           backface-visibility: hidden;
         }
         
         /* Improved focus styles for accessibility */
         :focus-visible {
           outline: 2px solid #00D084;
           outline-offset: 2px;
         }
         
         /* Ensure sufficient color contrast */
         .text-muted-foreground {
           color: hsl(215 16% 65%);
         }
         
         /* Ensure touch targets are large enough */
         @media (max-width: 768px) {
           button, 
           [role="button"],
           a,
           input,
           select,
           textarea {
             min-height: 44px;
             min-width: 44px;
           }
         }
       `}</style>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Persistent Navbar across all routes */}
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
                <GlobalSearch />
                <ThemeToggle />
                <UserNav />
              </div>
            </div>
          </header>

          <main className="container px-4 py-6 md:px-6 md:py-8">
            {/* Breadcrumbs instead of back buttons */}
            <Breadcrumbs className="mb-4" />
            <Suspense>{children}</Suspense>
          </main>

          <ProfileCompletionNotification />
          <Toaster />

          <div className="md:hidden">
            {/* Mobile navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border/40 bg-background/80 px-2 py-2 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
              <Link href="/" className="flex flex-col items-center justify-center px-2 py-1">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Link>
              <Link href="/marketplace" className="flex flex-col items-center justify-center px-2 py-1">
                <Search className="h-5 w-5" />
                <span className="text-xs">Marketplace</span>
              </Link>
              <Link href="/messages" className="flex flex-col items-center justify-center px-2 py-1">
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">Messages</span>
              </Link>
              <Link href="/network" className="flex flex-col items-center justify-center px-2 py-1">
                <Network className="h-5 w-5" />
                <span className="text-xs">Network</span>
              </Link>
              {!isAuthenticated && (
                <Button asChild variant="default" size="sm">
                  <Link href="/sign-in">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
              {isAuthenticated && <UserNav />}
            </nav>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <ClientLayout>{children}</ClientLayout>
    </AppProvider>
  )
}

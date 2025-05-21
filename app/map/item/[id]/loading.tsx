import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-provider"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"

export default function MapItemLoading() {
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
          <Skeleton className="mr-4 h-10 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="aspect-square h-auto w-full rounded-lg" />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 flex-shrink-0 rounded-md" />
              ))}
            </div>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>

            <Skeleton className="mb-4 h-4 w-48" />
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="mb-6 h-24 w-full" />

            <div className="mb-6">
              <Skeleton className="mb-4 h-8 w-full" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>

            <div className="mb-6">
              <Skeleton className="mb-2 h-5 w-32" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="col-span-2 h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

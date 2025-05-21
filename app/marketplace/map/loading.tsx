import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

export default function MarketplaceMapLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <ResponsiveContainer>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]">
                  <div className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]">
                    <span className="font-bold">NT</span>
                  </div>
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="hidden md:flex md:gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </ResponsiveContainer>
      </header>

      <main>
        <ResponsiveContainer className="pb-12 pt-6 md:pb-16 md:pt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Skeleton className="mb-2 h-8 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <div className="rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>

                <div className="space-y-4">
                  <div>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-5 w-full" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <div>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-[500px] w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </ResponsiveContainer>
      </main>

      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <ResponsiveContainer className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </ResponsiveContainer>
      </footer>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>

      <Skeleton className="mb-6 h-10 w-full" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <div className="rounded-lg border p-4">
            <Skeleton className="mb-2 h-6 w-48" />
            <Skeleton className="mb-4 h-4 w-64" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>

        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="mb-2 h-6 w-40" />
            <Skeleton className="mb-4 h-4 w-56" />
            <Skeleton className="mb-6 h-[200px] w-full" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="mb-4 h-6 w-40" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

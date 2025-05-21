import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-48 mb-1" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="w-full md:w-auto">
          <Skeleton className="h-10 w-full md:w-64" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32 mb-4" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
      </div>

      <div className="mt-8">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-full max-w-md mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

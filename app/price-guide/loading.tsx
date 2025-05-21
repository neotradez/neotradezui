import { Skeleton } from "@/components/ui/skeleton"

export default function PriceGuideLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <Skeleton className="mb-8 h-16 w-full" />

      <Skeleton className="mb-6 h-10 w-full" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="mb-2 h-6 w-48" />
              <Skeleton className="mb-2 h-4 w-36" />
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="border-t p-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

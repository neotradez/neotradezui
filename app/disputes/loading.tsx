import { Skeleton } from "@/components/ui/skeleton"

export default function DisputesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <Skeleton className="mb-8 h-24 w-full rounded-lg" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-full mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function NetworkLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-[120px] w-full rounded-lg" />
        <Skeleton className="h-[120px] w-full rounded-lg" />
        <Skeleton className="h-[120px] w-full rounded-lg" />
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[180px] w-full rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
      </div>
    </div>
  )
}

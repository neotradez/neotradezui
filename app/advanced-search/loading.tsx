import { Skeleton } from "@/components/ui/skeleton"

export default function AdvancedSearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <Skeleton className="h-[600px] w-full rounded-lg mb-6" />
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>

        <div className="md:col-span-9">
          <Skeleton className="mb-6 h-16 w-full rounded-lg" />
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-48" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
            <Skeleton className="h-[350px] w-full rounded-lg" />
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Skeleton className="h-10 w-[300px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

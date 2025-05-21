import { Skeleton } from "@/components/ui/skeleton"

export default function MapLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>

          <div className="flex w-full gap-2 md:w-auto">
            <Skeleton className="h-10 w-full md:w-64" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-9 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <Skeleton className="h-[calc(100vh-220px)] w-full rounded-lg" />
      </div>
    </div>
  )
}

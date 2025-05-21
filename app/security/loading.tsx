import { Skeleton } from "@/components/ui/skeleton"

export default function SecurityLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Skeleton className="mb-8 h-24 w-full rounded-lg" />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="h-10 w-full mb-6" />
          <Skeleton className="h-[400px] w-full rounded-lg mb-4" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
      </div>

      <Skeleton className="mt-8 h-16 w-full rounded-lg" />
    </div>
  )
}

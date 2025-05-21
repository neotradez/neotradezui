import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function SavedSearchesLoading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Skeleton className="h-10 w-full md:w-[300px]" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-5 w-20" />
                    </div>

                    <Skeleton className="h-4 w-full max-w-md mt-2" />

                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-5 w-24" />
                        ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

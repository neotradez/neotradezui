"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProposedTrades } from "@/components/my-trades/proposed-trades"
import { PendingTrades } from "@/components/my-trades/pending-trades"
import { CompletedTrades } from "@/components/my-trades/completed-trades"
import { ActiveListings } from "@/components/my-trades/active-listings"
import { SavedTrades } from "@/components/my-trades/saved-trades"
import { Badge } from "@/components/ui/badge"

export function MyTradesTabs() {
  return (
    <Tabs defaultValue="proposed" className="space-y-6">
      <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        <TabsTrigger
          value="proposed"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D084] data-[state=active]:to-[#3B82F6] data-[state=active]:text-white"
        >
          <span className="flex items-center gap-2">
            Proposed
            <Badge variant="secondary" className="ml-1 bg-[#00D084]/20 text-[#00D084]">
              3
            </Badge>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D084] data-[state=active]:to-[#3B82F6] data-[state=active]:text-white"
        >
          <span className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
              2
            </Badge>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D084] data-[state=active]:to-[#3B82F6] data-[state=active]:text-white"
        >
          <span className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="ml-1 bg-[#00D084]/20 text-[#00D084]">
              5
            </Badge>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="active"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D084] data-[state=active]:to-[#3B82F6] data-[state=active]:text-white"
        >
          <span className="flex items-center gap-2">
            Active Listings
            <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
              4
            </Badge>
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="saved"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D084] data-[state=active]:to-[#3B82F6] data-[state=active]:text-white"
        >
          <span className="flex items-center gap-2">
            Saved
            <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
              2
            </Badge>
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="proposed" className="mt-6 space-y-6">
        <ProposedTrades />
      </TabsContent>
      <TabsContent value="pending" className="mt-6 space-y-6">
        <PendingTrades />
      </TabsContent>
      <TabsContent value="completed" className="mt-6 space-y-6">
        <CompletedTrades />
      </TabsContent>
      <TabsContent value="active" className="mt-6 space-y-6">
        <ActiveListings />
      </TabsContent>
      <TabsContent value="saved" className="mt-6 space-y-6">
        <SavedTrades />
      </TabsContent>
    </Tabs>
  )
}

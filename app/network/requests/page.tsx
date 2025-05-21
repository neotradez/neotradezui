"use client"

import { useState } from "react"
import { mockConnectionRequests } from "@/mock/network-data"
import NetworkUserCard from "@/components/network/network-user-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserCheck } from "lucide-react"
import type { User } from "@/types"
import Link from "next/link"

export default function ConnectionRequestsPage() {
  const [requests, setRequests] = useState<User[]>(mockConnectionRequests)

  // Handle accepting a connection request
  const handleAcceptRequest = (userId: string) => {
    setRequests((prev) => prev.filter((user) => user.id !== userId))
    // In a real app, you would call an API to accept the request
    console.log(`Accepted connection request from user ${userId}`)
  }

  // Handle rejecting a connection request
  const handleRejectRequest = (userId: string) => {
    setRequests((prev) => prev.filter((user) => user.id !== userId))
    // In a real app, you would call an API to reject the request
    console.log(`Rejected connection request from user ${userId}`)
  }

  // Handle messaging a user
  const handleMessage = (userId: string) => {
    // In a real app, you would navigate to the messages page
    console.log(`Navigate to messages with user ${userId}`)
  }

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Link href="/network">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Connection Requests</h1>
      </div>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {requests.map((user) => (
            <NetworkUserCard
              key={user.id}
              user={user}
              isPending={true}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              onMessage={handleMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No pending requests</h3>
          <p className="text-gray-500 mt-2">You don't have any connection requests at the moment.</p>
          <Link href="/network" className="mt-4 inline-block">
            <Button variant="outline">Back to Network</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

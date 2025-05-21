"use client"

import { useState } from "react"
import { mockNetworkUsers } from "@/mock/network-data"
import NetworkUserCard from "@/components/network/network-user-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, UserPlus } from "lucide-react"
import type { User } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<User[]>(mockNetworkUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Filter connections based on search query
  const filteredConnections = connections.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle messaging a user
  const handleMessage = (userId: string) => {
    router.push(`/messages?user=${userId}`)
  }

  // Handle removing a connection
  const handleRemoveConnection = (userId: string) => {
    setConnections((prev) => prev.filter((user) => user.id !== userId))
    // In a real app, you would call an API to remove the connection
    console.log(`Removed connection with user ${userId}`)
  }

  // Handle trusting a user
  const handleTrustUser = (userId: string) => {
    // In a real app, you would call an API to trust the user
    console.log(`Trusted user ${userId}`)
  }

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Link href="/network">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Connections</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Link href="/network/explore">
          <Button className="w-full md:w-auto flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Find People
          </Button>
        </Link>
      </div>

      {filteredConnections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredConnections.map((user) => (
            <NetworkUserCard
              key={user.id}
              user={user}
              onMessage={handleMessage}
              onConnect={handleRemoveConnection}
              onTrust={handleTrustUser}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No connections found</h3>
          {searchQuery ? (
            <p className="text-gray-500 mt-2">No connections match your search criteria.</p>
          ) : (
            <>
              <p className="text-gray-500 mt-2">You haven't connected with anyone yet.</p>
              <Link href="/network/explore" className="mt-4 inline-block">
                <Button>Find People</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}

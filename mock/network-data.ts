import type { User } from "@/types"

// Mock network users
export const mockNetworkUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "San Francisco, CA",
    rating: 4.8,
    trades: 27,
    bio: "Collector of vintage cameras and tech enthusiast.",
    badges: ["Verified", "Top Trader", "Quick Responder"],
    joinedDate: "2022-03-15T00:00:00.000Z",
    trustedBy: 42,
  },
  {
    id: "user2",
    name: "Morgan Smith",
    avatar: "/placeholder.svg?height=80&width=80&text=MS",
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    location: "New York, NY",
    rating: 4.5,
    trades: 15,
    badges: ["Verified"],
    joinedDate: "2022-05-20T00:00:00.000Z",
    trustedBy: 18,
  },
  {
    id: "user3",
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=80&width=80&text=TW",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Chicago, IL",
    rating: 4.9,
    trades: 34,
    badges: ["Verified", "Top Trader", "Trusted"],
    joinedDate: "2021-11-10T00:00:00.000Z",
    trustedBy: 56,
  },
  {
    id: "user4",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=80&width=80&text=JL",
    isOnline: false,
    lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    location: "Austin, TX",
    rating: 4.2,
    trades: 8,
    badges: ["Verified"],
    joinedDate: "2023-01-05T00:00:00.000Z",
    trustedBy: 5,
  },
  {
    id: "user5",
    name: "Casey Martinez",
    avatar: "/placeholder.svg?height=80&width=80&text=CM",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Seattle, WA",
    rating: 4.7,
    trades: 21,
    badges: ["Verified", "Quick Responder"],
    joinedDate: "2022-08-12T00:00:00.000Z",
    trustedBy: 29,
  },
  {
    id: "user6",
    name: "Riley Thompson",
    avatar: "/placeholder.svg?height=80&width=80&text=RT",
    isOnline: false,
    lastActive: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    location: "Denver, CO",
    rating: 4.6,
    trades: 19,
    badges: ["Verified", "Trusted"],
    joinedDate: "2022-06-30T00:00:00.000Z",
    trustedBy: 23,
  },
  {
    id: "user7",
    name: "Jamie Garcia",
    avatar: "/placeholder.svg?height=80&width=80&text=JG",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Miami, FL",
    rating: 4.3,
    trades: 12,
    badges: ["Verified"],
    joinedDate: "2023-02-15T00:00:00.000Z",
    trustedBy: 8,
  },
  {
    id: "user8",
    name: "Quinn Roberts",
    avatar: "/placeholder.svg?height=80&width=80&text=QR",
    isOnline: false,
    lastActive: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    location: "Portland, OR",
    rating: 4.4,
    trades: 16,
    badges: ["Verified", "Quick Responder"],
    joinedDate: "2022-09-05T00:00:00.000Z",
    trustedBy: 14,
  },
]

// Mock pending connection requests
export const mockConnectionRequests: User[] = [
  {
    id: "user9",
    name: "Avery Williams",
    avatar: "/placeholder.svg?height=80&width=80&text=AW",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Boston, MA",
    rating: 4.7,
    trades: 23,
    badges: ["Verified", "Top Trader"],
    joinedDate: "2022-04-10T00:00:00.000Z",
    trustedBy: 31,
  },
  {
    id: "user10",
    name: "Dakota Chen",
    avatar: "/placeholder.svg?height=80&width=80&text=DC",
    isOnline: false,
    lastActive: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    location: "Los Angeles, CA",
    rating: 4.5,
    trades: 18,
    badges: ["Verified"],
    joinedDate: "2022-07-22T00:00:00.000Z",
    trustedBy: 20,
  },
]

// Mock trusted users
export const mockTrustedUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "San Francisco, CA",
    rating: 4.8,
    trades: 27,
    badges: ["Verified", "Top Trader", "Quick Responder"],
    joinedDate: "2022-03-15T00:00:00.000Z",
    trustedBy: 42,
  },
  {
    id: "user3",
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=80&width=80&text=TW",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Chicago, IL",
    rating: 4.9,
    trades: 34,
    badges: ["Verified", "Top Trader", "Trusted"],
    joinedDate: "2021-11-10T00:00:00.000Z",
    trustedBy: 56,
  },
  {
    id: "user5",
    name: "Casey Martinez",
    avatar: "/placeholder.svg?height=80&width=80&text=CM",
    isOnline: true,
    lastActive: new Date().toISOString(),
    location: "Seattle, WA",
    rating: 4.7,
    trades: 21,
    badges: ["Verified", "Quick Responder"],
    joinedDate: "2022-08-12T00:00:00.000Z",
    trustedBy: 29,
  },
]

// Helper function to get user by ID
export const getNetworkUserById = (userId: string): User | undefined => {
  return (
    mockNetworkUsers.find((user) => user.id === userId) ||
    mockConnectionRequests.find((user) => user.id === userId) ||
    mockTrustedUsers.find((user) => user.id === userId)
  )
}

export interface User {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
  lastActive: string
  location?: string
  rating?: number
  trades?: number
  bio?: string
  badges?: string[]
  joinedDate?: string
  trustedBy?: number
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
}

export interface Notification {
  id: string
  type: "message" | "trade" | "connection" | "system"
  title: string
  content: string
  timestamp: string
  read: boolean
  actionUrl?: string
  senderId?: string
}

export interface TradeItem {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  condition: string
  value: number
  ownerId: string
  location?: {
    lat: number
    lng: number
    address?: string
  }
  createdAt: string
  updatedAt: string
  status: "active" | "pending" | "completed" | "cancelled"
}

export interface Trade {
  id: string
  initiatorId: string
  receiverId: string
  initiatorItems: TradeItem[]
  receiverItems: TradeItem[]
  status: "draft" | "proposed" | "accepted" | "rejected" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
  meetupDetails?: MeetupDetails
}

export interface MeetupDetails {
  id: string
  tradeId: string
  location: {
    lat: number
    lng: number
    address: string
  }
  date: string
  status: "proposed" | "confirmed" | "completed" | "cancelled" | "rescheduled"
  notes?: string
}

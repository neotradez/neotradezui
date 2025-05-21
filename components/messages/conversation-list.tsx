"use client"
import type { Conversation, User } from "@/types"
import { Avatar } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface ConversationListProps {
  conversations: Conversation[]
  users: Record<string, User>
  selectedConversation: string | null
  onSelectConversation: (userId: string) => void
}

export default function ConversationList({
  conversations,
  users,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        <div className="space-y-2">
          {conversations.map((conversation) => {
            const otherParticipantId = conversation.participants.find((id) => id !== "currentUser")
            if (!otherParticipantId) return null

            const user = users[otherParticipantId]
            if (!user) return null

            const lastMessage = conversation.lastMessage

            return (
              <div
                key={conversation.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation === otherParticipantId
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => onSelectConversation(otherParticipantId)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 mr-3">
                    <img
                      src={user.avatar || `/placeholder.svg?height=48&width=48&text=${user.name.charAt(0)}`}
                      alt={user.name}
                    />
                  </Avatar>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {lastMessage.senderId === "currentUser" ? "You: " : ""}
                      {lastMessage.content}
                    </p>

                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { mockConversations, mockUsers, getMessagesByUserId } from "@/mock/messages-data"
import ConversationList from "@/components/messages/conversation-list"
import MessageThread from "@/components/messages/message-thread"
import type { User, Message } from "@/types"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<Record<string, User>>({})
  const [showConversations, setShowConversations] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Initialize users map
  useEffect(() => {
    const usersMap: Record<string, User> = {}
    mockUsers.forEach((user) => {
      usersMap[user.id] = user
    })
    setUsers(usersMap)
  }, [])

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedUserId) {
      const userMessages = getMessagesByUserId(selectedUserId)
      setMessages(userMessages)

      // On mobile, hide the conversation list when a thread is selected
      if (isMobile) {
        setShowConversations(false)
      }
    }
  }, [selectedUserId, isMobile])

  // Handle sending a new message
  const handleSendMessage = (content: string, to: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "currentUser",
      receiverId: to,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  // Handle going back to conversation list on mobile
  const handleBackToConversations = () => {
    setShowConversations(true)
  }

  // Get the selected user
  const selectedUser = selectedUserId ? users[selectedUserId] : null

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversation List - Hidden on mobile when a thread is selected */}
      {(!isMobile || showConversations) && (
        <div className="w-full md:w-1/3 border-r">
          <ConversationList
            conversations={mockConversations}
            users={users}
            selectedConversation={selectedUserId}
            onSelectConversation={(userId) => setSelectedUserId(userId)}
          />
        </div>
      )}

      {/* Message Thread or Empty State */}
      <div className="hidden md:flex md:w-2/3 items-center justify-center">
        {selectedUser && messages.length > 0 ? (
          <MessageThread
            user={selectedUser}
            messages={messages}
            onBack={handleBackToConversations}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="text-center p-8">
            <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
          </div>
        )}
      </div>

      {/* Mobile Message Thread */}
      {isMobile && !showConversations && selectedUser && (
        <div className="w-full">
          <MessageThread
            user={selectedUser}
            messages={messages}
            onBack={handleBackToConversations}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  )
}

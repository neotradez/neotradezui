import type { User } from "@/types"

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  attachments?: string[]
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
}

// Mock users with online status
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
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
    avatar: "/placeholder.svg?height=40&width=40&text=MS",
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
    avatar: "/placeholder.svg?height=40&width=40&text=TW",
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
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
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
    avatar: "/placeholder.svg?height=40&width=40&text=CM",
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

// Mock users with online status
export const activeUsers = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(),
  },
  {
    id: "user2",
    name: "Morgan Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(),
  },
  {
    id: "user3",
    name: "Jamie Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
  }, // 15 mins ago
  {
    id: "user4",
    name: "Taylor Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(),
  },
  {
    id: "user5",
    name: "Jordan Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 45),
  }, // 45 mins ago
  {
    id: "user6",
    name: "Casey Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 120),
  }, // 2 hours ago
  {
    id: "user7",
    name: "Riley Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastActive: new Date(),
  },
  {
    id: "user8",
    name: "Avery Moore",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5),
  }, // 5 hours ago
]

// Mock messages for conversations
export const mockMessages: Record<string, Message[]> = {
  user1: [
    {
      id: "msg1",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hey there! I saw your vintage camera listing. Is it still available?",
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
      read: true,
    },
    {
      id: "msg2",
      senderId: "currentUser",
      receiverId: "user1",
      content: "Yes, it is! Are you interested in trading?",
      timestamp: new Date(Date.now() - 3600000 * 23).toISOString(),
      read: true,
    },
    {
      id: "msg3",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Definitely! I have a mechanical keyboard I could trade. Would you be interested in that?",
      timestamp: new Date(Date.now() - 3600000 * 22).toISOString(),
      read: true,
    },
    {
      id: "msg4",
      senderId: "currentUser",
      receiverId: "user1",
      content: "That sounds interesting! Can you send me some pictures?",
      timestamp: new Date(Date.now() - 3600000 * 21).toISOString(),
      read: true,
    },
    {
      id: "msg5",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Sure thing! Here you go.",
      timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
      read: true,
      attachments: ["/images/mechanical-keyboard.jpeg"],
    },
  ],
  user2: [
    {
      id: "msg6",
      senderId: "user2",
      receiverId: "currentUser",
      content: "Hi! I'm interested in your drone listing.",
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      read: true,
    },
    {
      id: "msg7",
      senderId: "currentUser",
      receiverId: "user2",
      content: "Hello! Yes, it's still available. What did you have in mind for a trade?",
      timestamp: new Date(Date.now() - 3600000 * 47).toISOString(),
      read: true,
    },
    {
      id: "msg8",
      senderId: "user2",
      receiverId: "currentUser",
      content: "I have a gaming console I could trade. It's in excellent condition.",
      timestamp: new Date(Date.now() - 3600000 * 46).toISOString(),
      read: true,
    },
  ],
  user3: [
    {
      id: "msg9",
      senderId: "user3",
      receiverId: "currentUser",
      content: "Hello! Are you still looking for vintage vinyl records?",
      timestamp: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
      read: true,
    },
    {
      id: "msg10",
      senderId: "currentUser",
      receiverId: "user3",
      content: "Yes, I am! Do you have some for trade?",
      timestamp: new Date(Date.now() - 3600000 * 71).toISOString(),
      read: true,
    },
    {
      id: "msg11",
      senderId: "user3",
      receiverId: "currentUser",
      content: "I have a collection of 70s rock albums in great condition. Would you be interested?",
      timestamp: new Date(Date.now() - 3600000 * 70).toISOString(),
      read: false,
    },
  ],
  user4: [
    {
      id: "msg12",
      senderId: "currentUser",
      receiverId: "user4",
      content: "Hi Jordan, I saw your listing for the mountain bike. Is it still available?",
      timestamp: new Date(Date.now() - 3600000 * 96).toISOString(), // 4 days ago
      read: true,
    },
    {
      id: "msg13",
      senderId: "user4",
      receiverId: "currentUser",
      content: "Hey! Yes, it is. What do you have to trade?",
      timestamp: new Date(Date.now() - 3600000 * 95).toISOString(),
      read: true,
    },
    {
      id: "msg14",
      senderId: "currentUser",
      receiverId: "user4",
      content: "I have a set of golf clubs I'm looking to trade. They're only a year old.",
      timestamp: new Date(Date.now() - 3600000 * 94).toISOString(),
      read: true,
    },
    {
      id: "msg15",
      senderId: "user4",
      receiverId: "currentUser",
      content: "That sounds interesting. Can we meet up to take a look at them?",
      timestamp: new Date(Date.now() - 3600000 * 93).toISOString(),
      read: false,
    },
  ],
  user5: [
    {
      id: "msg16",
      senderId: "user5",
      receiverId: "currentUser",
      content: "Hello! I'm interested in your camera lens.",
      timestamp: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
      read: true,
    },
    {
      id: "msg17",
      senderId: "currentUser",
      receiverId: "user5",
      content: "Hi Casey! It's still available. What would you like to trade for it?",
      timestamp: new Date(Date.now() - 3600000 * 119).toISOString(),
      read: true,
    },
  ],
}

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: ["currentUser", "user1"],
    lastMessage: {
      id: "msg1",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hey, I'm interested in trading my vintage camera for your mechanical keyboard. Is it still available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: "conv2",
    participants: ["currentUser", "user2"],
    lastMessage: {
      id: "msg2",
      senderId: "currentUser",
      receiverId: "user2",
      content: "Yes, I can meet tomorrow at the coffee shop we discussed. Does 2pm work?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    participants: ["currentUser", "user3"],
    lastMessage: {
      id: "msg3",
      senderId: "user3",
      receiverId: "currentUser",
      content: "I've sent you some photos of the drone. Let me know what you think!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      attachments: ["/images/drone.webp"],
    },
    unreadCount: 0,
  },
  {
    id: "conv4",
    participants: ["currentUser", "user4"],
    lastMessage: {
      id: "msg4",
      senderId: "user4",
      receiverId: "currentUser",
      content: "Can we reschedule our meetup? Something came up for tomorrow.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv5",
    participants: ["currentUser", "user5"],
    lastMessage: {
      id: "msg5",
      senderId: "currentUser",
      receiverId: "user5",
      content: "I'm no longer interested in trading. Thanks anyway!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    unreadCount: 0,
  },
]

// Mock message threads
export const mockMessageThreads: Record<string, Message[]> = {
  conv1: [
    {
      id: "conv1-msg1",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hi there! I saw your mechanical keyboard listing and I'm very interested.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
    {
      id: "conv1-msg2",
      senderId: "currentUser",
      receiverId: "user1",
      content: "Hello! Yes, it's still available. What did you have in mind?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9), // 1.9 hours ago
      read: true,
    },
    {
      id: "conv1-msg3",
      senderId: "user1",
      receiverId: "currentUser",
      content: "I have a vintage camera I'd like to trade. It's in excellent condition.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8), // 1.8 hours ago
      read: true,
    },
    {
      id: "conv1-msg4",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Here's a photo of it:",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.7), // 1.7 hours ago
      read: true,
      attachments: ["/images/vintage-camera.jpeg"],
    },
    {
      id: "conv1-msg5",
      senderId: "currentUser",
      receiverId: "user1",
      content: "That looks great! Here's my keyboard:",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
      read: true,
      attachments: ["/images/mechanical-keyboard.jpeg"],
    },
    {
      id: "conv1-msg6",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Perfect! Would you be interested in meeting up to make the trade?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.4), // 1.4 hours ago
      read: true,
    },
    {
      id: "conv1-msg7",
      senderId: "currentUser",
      receiverId: "user1",
      content: "Definitely! When and where works for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.3), // 1.3 hours ago
      read: true,
    },
    {
      id: "conv1-msg8",
      senderId: "user1",
      receiverId: "currentUser",
      content: "How about tomorrow at 3pm? There's a coffee shop downtown that's pretty central.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.2), // 1.2 hours ago
      read: true,
    },
    {
      id: "conv1-msg9",
      senderId: "currentUser",
      receiverId: "user1",
      content: "That works for me! Can you send me the exact location?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.1), // 1.1 hours ago
      read: true,
    },
    {
      id: "conv1-msg10",
      senderId: "user1",
      receiverId: "currentUser",
      content: "Hey, I'm interested in trading my vintage camera for your mechanical keyboard. Is it still available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      read: false,
    },
  ],
  conv2: [
    {
      id: "conv2-msg1",
      senderId: "user2",
      receiverId: "currentUser",
      content: "Hi, I'm interested in your drone listing. Is it still available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
    {
      id: "conv2-msg2",
      senderId: "currentUser",
      receiverId: "user2",
      content: "Yes, it is! What did you want to know about it?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.8), // 4.8 hours ago
      read: true,
    },
    {
      id: "conv2-msg3",
      senderId: "user2",
      receiverId: "currentUser",
      content: "I'd like to meet up to see it in person. When are you available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5), // 4.5 hours ago
      read: true,
    },
    {
      id: "conv2-msg4",
      senderId: "currentUser",
      receiverId: "user2",
      content: "I'm free tomorrow afternoon. There's a coffee shop downtown we could meet at.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
    },
    {
      id: "conv2-msg5",
      senderId: "user2",
      receiverId: "currentUser",
      content: "That sounds good. What time works for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
      read: true,
    },
    {
      id: "conv2-msg6",
      senderId: "currentUser",
      receiverId: "user2",
      content: "How about 2pm?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: true,
    },
    {
      id: "conv2-msg7",
      senderId: "user2",
      receiverId: "currentUser",
      content: "Perfect. Can you send me the address?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
      read: true,
    },
    {
      id: "conv2-msg8",
      senderId: "currentUser",
      receiverId: "user2",
      content: "Yes, I can meet tomorrow at the coffee shop we discussed. Does 2pm work?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
  ],
  // Add more conversation threads as needed
}

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find((user) => user.id === userId)
}

// Helper function to get conversation by ID
export const getConversationById = (convId: string): Conversation | undefined => {
  return mockConversations.find((conv) => conv.id === convId)
}

// Helper function to get messages for a conversation
export const getMessagesByUserId = (userId: string): Message[] => {
  return mockMessages[userId] || []
}

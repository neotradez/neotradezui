import type { Notification } from "@/types"

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    type: "message",
    title: "New message from Alex Johnson",
    content: "Hey there! I saw your vintage camera listing. Is it still available?",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false,
    actionUrl: "/messages",
    senderId: "user1",
  },
  {
    id: "notif2",
    type: "trade",
    title: "Trade proposal accepted",
    content: "Morgan Smith has accepted your trade proposal for the mechanical keyboard.",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    read: false,
    actionUrl: "/my-trades/trade123",
    senderId: "user2",
  },
  {
    id: "notif3",
    type: "connection",
    title: "Connection request",
    content: "Taylor Wilson wants to connect with you on NeoTradez.",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: false,
    senderId: "user3",
  },
  {
    id: "notif4",
    type: "system",
    title: "Account verification",
    content: "Your account has been successfully verified! You now have access to all features.",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: true,
  },
  {
    id: "notif5",
    type: "trade",
    title: "Meetup reminder",
    content: "Your trade meetup with Jordan Lee is scheduled for tomorrow at 2:00 PM.",
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    read: true,
    actionUrl: "/trade-meetup/meetup456",
    senderId: "user4",
  },
  {
    id: "notif6",
    type: "connection",
    title: "Connection request",
    content: "Casey Martinez wants to connect with you on NeoTradez.",
    timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    read: false,
    senderId: "user5",
  },
  {
    id: "notif7",
    type: "message",
    title: "New message from Morgan Smith",
    content: "Thanks for the trade! Everything went smoothly.",
    timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    read: true,
    actionUrl: "/messages",
    senderId: "user2",
  },
  {
    id: "notif8",
    type: "connection",
    title: "New connection request",
    content: "Jordan Lee wants to connect with you on NeoTradez.",
    timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    read: false,
    senderId: "user6",
  },
  {
    id: "notif9",
    type: "meetup",
    title: "Meetup location changed",
    content: "Alex Johnson has changed the meetup location for your trade.",
    timestamp: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    read: false,
    actionUrl: "/trade-meetup/meetup789",
    senderId: "user1",
  },
  {
    id: "notif10",
    type: "meetup",
    title: "Meetup time changed",
    content: "Morgan Smith has requested to reschedule your meetup to tomorrow at 4:00 PM.",
    timestamp: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    read: true,
    actionUrl: "/trade-meetup/meetup101",
    senderId: "user2",
  },
]

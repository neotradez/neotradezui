// Mock API client for frontend development
// This will be replaced with actual API calls when backend is integrated

// Types for API responses
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

// Generic fetch wrapper
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    // For now, simulate API calls with mock data
    // In production, this would be a real fetch call
    console.log(`API call to ${endpoint} with options:`, options)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Get mock data based on endpoint
    const mockData = getMockData<T>(endpoint, options)

    return {
      data: mockData,
      status: 200,
    }
  } catch (error) {
    console.error("API error:", error)
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: 500,
    }
  }
}

// Mock data provider
function getMockData<T>(endpoint: string, options: RequestInit): T {
  // Extract method and body
  const method = options.method || "GET"
  const body = options.body ? JSON.parse(options.body as string) : {}

  // Return appropriate mock data based on endpoint and method
  if (endpoint.startsWith("/auth")) {
    return handleAuthEndpoints(endpoint, method, body) as T
  }

  if (endpoint.startsWith("/users")) {
    return handleUserEndpoints(endpoint, method, body) as T
  }

  if (endpoint.startsWith("/items")) {
    return handleItemEndpoints(endpoint, method, body) as T
  }

  if (endpoint.startsWith("/trades")) {
    return handleTradeEndpoints(endpoint, method, body) as T
  }

  if (endpoint.startsWith("/messages")) {
    return handleMessageEndpoints(endpoint, method, body) as T
  }

  // Default mock data
  return {} as T
}

// Auth endpoint handlers
function handleAuthEndpoints(endpoint: string, method: string, body: any) {
  if (endpoint === "/auth/login" && method === "POST") {
    return {
      user: {
        id: "user123",
        name: "John Doe",
        email: body.email,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      token: "mock-jwt-token",
    }
  }

  if (endpoint === "/auth/register" && method === "POST") {
    return {
      user: {
        id: "new-user-" + Date.now(),
        name: body.name,
        email: body.email,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      token: "mock-jwt-token",
    }
  }

  return {}
}

// User endpoint handlers
function handleUserEndpoints(endpoint: string, method: string, body: any) {
  if (endpoint === "/users/profile" && method === "GET") {
    return {
      id: "user123",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      bio: "Passionate trader and collector",
      rating: 4.8,
      tradesCompleted: 47,
      memberSince: "2022-06-15",
    }
  }

  if (endpoint === "/users/profile" && method === "PUT") {
    return {
      ...body,
      id: "user123",
    }
  }

  return {}
}

// Item endpoint handlers
function handleItemEndpoints(endpoint: string, method: string, body: any) {
  if (endpoint === "/items" && method === "GET") {
    return {
      items: Array(10)
        .fill(0)
        .map((_, i) => ({
          id: `item-${i}`,
          title: `Mock Item ${i}`,
          description: "This is a mock item description",
          category: ["Electronics", "Clothing", "Books", "Sports", "Collectibles"][i % 5],
          condition: ["New", "Like New", "Good", "Fair", "Poor"][i % 5],
          image: `/placeholder.svg?height=300&width=300&text=Item+${i}`,
          owner: {
            id: `user-${i}`,
            name: `User ${i}`,
            avatar: `/placeholder.svg?height=40&width=40&text=U${i}`,
          },
          location: "New York, NY",
          postedDate: new Date(Date.now() - i * 86400000).toISOString(),
        })),
    }
  }

  if (endpoint.match(/\/items\/\w+/) && method === "GET") {
    const id = endpoint.split("/").pop()
    return {
      id,
      title: `Item ${id}`,
      description: "Detailed description of this mock item",
      category: "Electronics",
      condition: "Good",
      images: [
        `/placeholder.svg?height=600&width=800&text=Item+${id}+Image+1`,
        `/placeholder.svg?height=600&width=800&text=Item+${id}+Image+2`,
        `/placeholder.svg?height=600&width=800&text=Item+${id}+Image+3`,
      ],
      owner: {
        id: "user123",
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      location: "New York, NY",
      coordinates: { lat: 40.7128, lng: -74.006 },
      postedDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    }
  }

  if (endpoint === "/items" && method === "POST") {
    return {
      id: `item-${Date.now()}`,
      ...body,
      postedDate: new Date().toISOString(),
    }
  }

  return {}
}

// Trade endpoint handlers
function handleTradeEndpoints(endpoint: string, method: string, body: any) {
  if (endpoint === "/trades" && method === "GET") {
    return {
      trades: Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `trade-${i}`,
          status: ["proposed", "pending", "accepted", "completed", "cancelled"][i],
          initiator: {
            id: "user123",
            name: "John Doe",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          recipient: {
            id: `user-${i}`,
            name: `User ${i}`,
            avatar: `/placeholder.svg?height=40&width=40&text=U${i}`,
          },
          offeredItems: [
            {
              id: `item-${i}-1`,
              title: `Offered Item ${i}-1`,
              image: `/placeholder.svg?height=100&width=100&text=Offered+${i}-1`,
            },
          ],
          requestedItems: [
            {
              id: `item-${i + 10}`,
              title: `Requested Item ${i + 10}`,
              image: `/placeholder.svg?height=100&width=100&text=Requested+${i + 10}`,
            },
          ],
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        })),
    }
  }

  if (endpoint === "/trades" && method === "POST") {
    return {
      id: `trade-${Date.now()}`,
      status: "proposed",
      ...body,
      createdAt: new Date().toISOString(),
    }
  }

  return {}
}

// Message endpoint handlers
function handleMessageEndpoints(endpoint: string, method: string, body: any) {
  if (endpoint === "/messages" && method === "GET") {
    return {
      conversations: Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `conv-${i}`,
          with: {
            id: `user-${i}`,
            name: `User ${i}`,
            avatar: `/placeholder.svg?height=40&width=40&text=U${i}`,
          },
          lastMessage: {
            text: `This is the last message in conversation ${i}`,
            timestamp: new Date(Date.now() - i * 3600000).toISOString(),
            isRead: i > 2,
          },
          unreadCount: i > 2 ? 0 : Math.floor(Math.random() * 5) + 1,
        })),
    }
  }

  if (endpoint.match(/\/messages\/\w+/) && method === "GET") {
    const conversationId = endpoint.split("/").pop()
    const otherUser = {
      id: `user-${conversationId}`,
      name: `User ${conversationId}`,
      avatar: `/placeholder.svg?height=40&width=40&text=U${conversationId}`,
    }

    return {
      id: conversationId,
      with: otherUser,
      messages: Array(10)
        .fill(0)
        .map((_, i) => ({
          id: `msg-${i}`,
          sender: i % 2 === 0 ? "user123" : otherUser.id,
          text: `This is message ${i} in the conversation`,
          timestamp: new Date(Date.now() - (10 - i) * 600000).toISOString(),
          isRead: true,
        })),
    }
  }

  if (endpoint.match(/\/messages\/\w+/) && method === "POST") {
    return {
      id: `msg-${Date.now()}`,
      sender: "user123",
      text: body.text,
      timestamp: new Date().toISOString(),
      isRead: false,
    }
  }

  return {}
}

// Export API methods
export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  // Users
  getProfile: () => fetchApi("/users/profile"),

  updateProfile: (profileData: any) =>
    fetchApi("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  // Items
  getItems: (filters?: any) =>
    fetchApi("/items", {
      method: "GET",
      ...(filters && { body: JSON.stringify(filters) }),
    }),

  getItem: (id: string) => fetchApi(`/items/${id}`),

  createItem: (itemData: any) =>
    fetchApi("/items", {
      method: "POST",
      body: JSON.stringify(itemData),
    }),

  updateItem: (id: string, itemData: any) =>
    fetchApi(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    }),

  // Trades
  getTrades: () => fetchApi("/trades"),

  getTrade: (id: string) => fetchApi(`/trades/${id}`),

  createTrade: (tradeData: any) =>
    fetchApi("/trades", {
      method: "POST",
      body: JSON.stringify(tradeData),
    }),

  updateTradeStatus: (id: string, status: string) =>
    fetchApi(`/trades/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  // Messages
  getConversations: () => fetchApi("/messages"),

  getConversation: (id: string) => fetchApi(`/messages/${id}`),

  sendMessage: (conversationId: string, text: string) =>
    fetchApi(`/messages/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  // Notifications
  getNotifications: () => fetchApi("/notifications"),

  markNotificationAsRead: (id: string) =>
    fetchApi(`/notifications/${id}/read`, {
      method: "PUT",
    }),
}

import { type NextRequest, NextResponse } from "next/server"

// Mock user data - in a real app, this would be in a database
const MOCK_USER = {
  id: "user-1",
  name: "Alex Rivera",
  email: "alex@example.com",
  password: "password123", // In a real app, this would be hashed
  avatar: "/placeholder.svg?height=40&width=40",
  location: "New York, NY",
  verified: true,
  memberSince: "June 2022",
  rating: 4.8,
  trades: 37,
  notifications: 5,
  messages: 3,
}

export async function POST(request: NextRequest) {
  const { action, email, password, name } = await request.json()

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  switch (action) {
    case "login":
      // In a real app, you would validate credentials against a database
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        // Don't include password in the response
        const { password, ...userWithoutPassword } = MOCK_USER
        return NextResponse.json({ success: true, user: userWithoutPassword })
      } else {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
      }

    case "signup":
      // In a real app, you would create a new user in the database
      if (email && password && name) {
        // Create a new user object
        const newUser = {
          ...MOCK_USER,
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          rating: 0,
          trades: 0,
          notifications: 0,
          messages: 0,
          verified: false,
        }

        // Don't include password in the response
        const { password: _, ...userWithoutPassword } = newUser
        return NextResponse.json({ success: true, user: userWithoutPassword })
      } else {
        return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
      }

    default:
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  }
}

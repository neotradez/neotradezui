"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, PaperclipIcon, Send, X } from "lucide-react"

// Mock data for the meetup
const mockMeetup = {
  id: "meetup-1",
  tradeId: "trade-101",
  title: "Camera Equipment Exchange",
  trader: {
    id: "user-101",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

// Mock messages for this meetup
const mockMessages = [
  {
    id: "msg-1",
    meetupId: "meetup-1",
    sender: "other",
    text: "Hi there! I'm looking forward to our meetup to exchange the camera equipment.",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "msg-2",
    meetupId: "meetup-1",
    sender: "me",
    text: "Me too! Just to confirm, we're meeting at Central Park at 2 PM tomorrow, right?",
    time: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
  },
  {
    id: "msg-3",
    meetupId: "meetup-1",
    sender: "other",
    text: "Yes, that's correct. I'll be bringing the Sony A7III with the 24-70mm lens as we discussed.",
    time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "msg-4",
    meetupId: "meetup-1",
    sender: "me",
    text: "Perfect! I'll have the Nikon F3 with me. It's in excellent condition as shown in the photos.",
    time: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: "msg-5",
    meetupId: "meetup-1",
    sender: "other",
    text: "Great! Looking forward to it. I'll be wearing a blue jacket so you can spot me easily.",
    time: new Date(Date.now() - 0.25 * 60 * 60 * 1000).toISOString(), // 15 minutes ago
  },
]

export default function MeetupChatPage({ params }) {
  const router = useRouter()
  const { meetupId } = params
  const [meetup, setMeetup] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [imageAttachment, setImageAttachment] = useState(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Simulate API call to fetch meetup and messages
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, these would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if the meetup exists
        if (meetupId === mockMeetup.id) {
          setMeetup(mockMeetup)
          setMessages(mockMessages)
        } else {
          // Handle not found
          console.error("Meetup not found")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [meetupId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleBack = () => {
    router.back()
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "" && !imageAttachment) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      meetupId,
      sender: "me",
      text: inputValue.trim(),
      time: new Date().toISOString(),
      image: imageAttachment,
    }

    setMessages([...messages, newMessage])
    setInputValue("")
    setImageAttachment(null)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const handleAttachImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImageAttachment(imageUrl)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading chat...</p>
      </div>
    )
  }

  if (!meetup) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <p className="text-lg font-medium">Meetup not found</p>
        <Button className="mt-4" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={handleBack} className="gap-2 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Meetups
      </Button>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/50 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={meetup.trader.avatar || "/placeholder.svg"} alt={meetup.trader.name} />
                <AvatarFallback>{meetup.trader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{meetup.title}</CardTitle>
                <p className="text-xs text-muted-foreground">Chat with {meetup.trader.name}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(`/meetups/${meetupId}`)}>
              View Meetup Details
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                {message.sender !== "me" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src={meetup.trader.avatar || "/placeholder.svg"} alt={meetup.trader.name} />
                    <AvatarFallback>{meetup.trader.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.image && (
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Attachment"
                      className="mt-2 max-h-48 rounded-md object-cover"
                    />
                  )}
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="border-t p-4">
            <form className="flex gap-2" onSubmit={handleSendMessage}>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                onChange={handleAttachImage}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload").click()}>
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {imageAttachment && (
              <div className="mt-2 relative inline-block">
                <img
                  src={imageAttachment || "/placeholder.svg"}
                  alt="Attachment preview"
                  className="h-20 rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                  onClick={() => setImageAttachment(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

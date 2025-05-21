"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Search, Send, MessageSquare, ImageIcon, Flag, MoreVertical, X, Smile } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { mockChats, mockMessages } from "@/mock/messages-data"
import { useToast } from "@/hooks/use-toast"
import { ReportMessageDialog } from "@/components/messages/report-message-dialog"
import { ImageAttachmentPreview } from "@/components/messages/image-attachment-preview"
import EmojiPicker from "emoji-picker-react"

export function MessagesLayout() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedChat, setSelectedChat] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [chats, setChats] = useState(mockChats)
  const [messages, setMessages] = useState([])
  const [filteredChats, setFilteredChats] = useState(mockChats)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportedMessage, setReportedMessage] = useState(null)
  const [imageAttachment, setImageAttachment] = useState(null)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const [replyingTo, setReplyingTo] = useState(null)

  const [showInventorySelector, setShowInventorySelector] = useState(false)
  const [messageText, setMessageText] = useState("")

  // Mock user inventory - replace with actual data fetch
  const userInventory = [
    { id: 1, name: "Vintage Camera", image: "/images/vintage-camera.jpeg" },
    { id: 2, name: "Mechanical Keyboard", image: "/images/mechanical-keyboard.jpeg" },
    { id: 3, name: "Drone", image: "/images/drone.webp" },
    // Add more items as needed
  ]

  const sendInventoryItem = (item) => {
    // Logic to send inventory item in chat
    console.log("Sending item:", item)
    // Add actual implementation to send the item in chat
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  useEffect(() => {
    // Filter chats based on search value
    if (searchValue.trim() === "") {
      setFilteredChats(chats)
    } else {
      const filtered = chats.filter((chat) => chat.name.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredChats(filtered)
    }
  }, [searchValue, chats])

  useEffect(() => {
    // Load messages for selected chat
    if (selectedChat) {
      const chatMessages = mockMessages.filter((msg) => msg.chatId === selectedChat.id)
      setMessages(chatMessages)
    }
  }, [selectedChat])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleReplyToMessage = (message) => {
    setReplyingTo(message)
    // Focus the input field
    setTimeout(() => {
      const inputElement = document.getElementById("message-input")
      if (inputElement) {
        inputElement.focus()
      }
    }, 100)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  const handleEmojiClick = (emojiData) => {
    setInputValue((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "" && !imageAttachment) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      chatId: selectedChat.id,
      sender: "me",
      text: inputValue.trim(),
      time: new Date().toISOString(),
      image: imageAttachment,
      status: "sent",
      replyTo: replyingTo
        ? {
            id: replyingTo.id,
            text: replyingTo.text,
            sender: replyingTo.sender,
          }
        : null,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setImageAttachment(null)
    setShowImagePreview(false)
    setReplyingTo(null)

    // Mark chat as read
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChat.id) {
          return { ...chat, unread: 0 }
        }
        return chat
      }),
    )

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage = {
        id: `msg-${Date.now() + 1}`,
        chatId: selectedChat.id,
        sender: selectedChat.id,
        text: `Thanks for your message! This is an automated reply from ${selectedChat.name}.`,
        time: new Date().toISOString(),
        status: "delivered",
      }
      setMessages((prev) => [...prev, replyMessage])
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)

    // Mark chat as read
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === chat.id) {
          return { ...c, unread: 0 }
        }
        return c
      }),
    )
  }

  const handleViewProfile = (userId) => {
    router.push(`/user/${userId}`)
  }

  const handleReportMessage = (message) => {
    setReportedMessage(message)
    setReportDialogOpen(true)
  }

  const handleAttachImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setImageAttachment(imageUrl)
      setShowImagePreview(true)
    }
  }

  const handleRemoveAttachment = () => {
    setImageAttachment(null)
    setShowImagePreview(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className="grid h-[600px] grid-cols-1 overflow-hidden rounded-lg border border-border/40 bg-background dark:border-border/20 dark:bg-[#1a1a1a] lg:grid-cols-[300px_1fr]"
    >
      <div className="border-r border-border/40 bg-background dark:border-border/20 dark:bg-[#1a1a1a]">
        <div className="p-4">
          <motion.div className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="w-full pl-9 transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,208,132,0.3)]"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </motion.div>
        </div>
        <div className="overflow-y-auto">
          {filteredChats.length > 0 ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {filteredChats.map((chat) => (
                <motion.button
                  key={chat.id}
                  variants={itemVariants}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex w-full items-start gap-3 border-b border-border/40 p-4 last:border-none hover:bg-accent hover:text-accent-foreground dark:border-border/20 transition-all duration-300 ${selectedChat?.id === chat.id ? "bg-accent text-accent-foreground" : ""}`}
                  whileHover={{ backgroundColor: "rgba(0, 208, 132, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00D084] ring-2 ring-background"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <motion.div
                      className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D084] text-xs font-medium text-[#121212]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {chat.unread}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="mb-4 rounded-full bg-muted/50 p-3"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </motion.div>
              <h3 className="mb-2 text-sm font-medium">No conversations found</h3>
              <p className="text-xs text-muted-foreground">Try a different search term or start a new conversation</p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          {selectedChat ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col"
            >
              <motion.div
                className="sticky top-0 z-10 border-b border-border/40 bg-background dark:border-border/20 dark:bg-[#121212] p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-10 w-10 cursor-pointer" onClick={() => handleViewProfile(selectedChat.id)}>
                        <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedChat.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00D084] ring-2 ring-background"></span>
                      )}
                    </div>
                    <div>
                      <h3
                        className="font-medium cursor-pointer hover:text-[#00D084]"
                        onClick={() => handleViewProfile(selectedChat.id)}
                      >
                        {selectedChat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.isOnline ? (
                          <span className="flex items-center">
                            <span className="mr-1.5 h-2 w-2 rounded-full bg-[#00D084]"></span>
                            Online
                          </span>
                        ) : (
                          "Last seen recently"
                        )}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewProfile(selectedChat.id)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toast({
                            title: "Chat muted",
                            description: `You won't receive notifications from ${selectedChat.name}`,
                          })
                        }}
                      >
                        Mute Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setReportedMessage(null)
                          setReportDialogOpen(true)
                        }}
                        className="text-destructive"
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        Report User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
              {/* Message conversation area */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{
                  maxHeight: "calc(100% - 160px)",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}
                  >
                    {message.sender !== "me" && (
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.replyTo && (
                          <div className="mb-2 rounded border-l-2 border-[#00D084] bg-background/50 p-2 text-xs dark:bg-background/10">
                            <p className="font-medium">{message.replyTo.sender === "me" ? "You" : selectedChat.name}</p>
                            <p className="text-muted-foreground">{message.replyTo.text}</p>
                          </div>
                        )}
                        <p>{message.text}</p>
                        {message.image && (
                          <div className="mt-2">
                            <img
                              src={message.image || "/placeholder.svg"}
                              alt="Attachment"
                              className="max-h-48 rounded-md object-cover"
                            />
                          </div>
                        )}
                        <div className="mt-1 text-xs text-muted-foreground">
                          {new Date(message.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {message.sender === "me" && (
                            <span className="ml-1">{message.status === "read" ? "Read" : "Delivered"}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => handleReplyToMessage(message)}
                        >
                          Reply
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                          onClick={() => handleReportMessage(message)}
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Image preview */}
              {showImagePreview && (
                <ImageAttachmentPreview imageUrl={imageAttachment} onRemove={handleRemoveAttachment} />
              )}

              <motion.div
                className="sticky bottom-0 border-t border-border/40 bg-background dark:border-border/20 dark:bg-[#121212] p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {replyingTo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 border-t border-border/40 bg-background p-2 dark:border-border/20 dark:bg-[#121212]"
                  >
                    <div className="flex-1 overflow-hidden rounded bg-muted/30 p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium">
                          Replying to {replyingTo.sender === "me" ? "yourself" : selectedChat?.name}
                        </p>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={handleCancelReply}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{replyingTo.text}</p>
                    </div>
                  </motion.div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={handleAttachImage}>
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <div className="relative flex-1">
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="message-input"
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,208,132,0.3)]"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </motion.div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-full right-0 mb-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-[#00D084] text-white hover:bg-[#00D084]/90"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <motion.div
                className="mb-4 rounded-full bg-muted/50 p-4"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              >
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </motion.div>
              <h3 className="mb-2 text-lg font-medium">Your messages</h3>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                Select a conversation or start a new one by proposing a trade to another user
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="gap-2 border-[#3B82F6]/30 bg-background hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                  onClick={() => router.push("/marketplace")}
                >
                  Explore Trades
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Report Message Dialog */}
      <ReportMessageDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        userName={selectedChat?.name || "this user"}
        messageContent={reportedMessage?.text || ""}
        isReportingUser={!reportedMessage}
      />
      {showInventorySelector && (
        <div className="absolute bottom-16 left-0 right-0 bg-background border rounded-md shadow-lg p-4 max-h-64 overflow-y-auto">
          <h3 className="font-medium mb-2">Select item from inventory</h3>
          <div className="grid grid-cols-3 gap-2">
            {userInventory.map((item) => (
              <div
                key={item.id}
                className="border rounded p-2 cursor-pointer hover:bg-accent"
                onClick={() => {
                  // Handle sending this item
                  sendInventoryItem(item)
                  setShowInventorySelector(false)
                }}
              >
                <div className="aspect-square bg-muted rounded mb-1">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <p className="text-xs truncate">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

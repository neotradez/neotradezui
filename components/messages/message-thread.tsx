"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { User, Message } from "@/types"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smile, Send, Paperclip, ImageIcon, ArrowLeft, Flag, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import EmojiPicker from "emoji-picker-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MessageThreadProps {
  user: User
  messages: Message[]
  onBack: () => void
  onSendMessage: (content: string, to: string, replyTo?: Message | null) => void
}

export default function MessageThread({ user, messages, onBack, onSendMessage }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("spam")
  const [reportDetails, setReportDetails] = useState("")

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, user.id, replyingTo)
      setNewMessage("")
      setReplyingTo(null)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiClick = (emojiData: any) => {
    setNewMessage((prev) => prev + emojiData.emoji)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  const handleReplyToMessage = (message: Message) => {
    setReplyingTo(message)
    inputRef.current?.focus()
  }

  const cancelReply = () => {
    setReplyingTo(null)
  }

  const handleSubmitReport = () => {
    // Here you would send the report to your backend
    console.log("Submitting report:", { user: user.id, reason: reportReason, details: reportDetails })

    // Reset form and close dialog
    setReportReason("spam")
    setReportDetails("")
    setReportDialogOpen(false)

    // Show confirmation (in a real app, you'd use a toast notification)
    alert("Thank you for your report. Our moderation team will review it shortly.")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 mr-3">
          <img src={user.avatar || `/placeholder.svg?height=40&width=40`} alt={user.name} />
        </Avatar>

        <div className="flex-1">
          <Link href={`/user/${user.id}`} className="font-medium hover:underline">
            {user.name}
          </Link>
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full mr-2 ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
            <span className="text-xs text-gray-500">
              {user.isOnline
                ? "Online"
                : "Last seen " + formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/10"
          onClick={() => setReportDialogOpen(true)}
        >
          <Flag className="h-4 w-4 mr-1" />
          Report
        </Button>

        {/* Report Dialog */}
        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Report {user.name}</DialogTitle>
              <DialogDescription>
                Please select a reason for reporting this user. Our moderation team will review your report.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <RadioGroup value={reportReason} onValueChange={setReportReason} className="space-y-3">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="spam" id="spam" />
                  <Label htmlFor="spam" className="font-normal cursor-pointer">
                    <div className="font-medium">Spam or scam</div>
                    <div className="text-sm text-muted-foreground">
                      This user is sending unwanted promotional content or trying to scam me
                    </div>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="inappropriate" id="inappropriate" />
                  <Label htmlFor="inappropriate" className="font-normal cursor-pointer">
                    <div className="font-medium">Inappropriate content</div>
                    <div className="text-sm text-muted-foreground">
                      This user is sharing offensive or inappropriate content
                    </div>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="harassment" id="harassment" />
                  <Label htmlFor="harassment" className="font-normal cursor-pointer">
                    <div className="font-medium">Harassment or bullying</div>
                    <div className="text-sm text-muted-foreground">This user is harassing or bullying me or others</div>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="impersonation" id="impersonation" />
                  <Label htmlFor="impersonation" className="font-normal cursor-pointer">
                    <div className="font-medium">Impersonation</div>
                    <div className="text-sm text-muted-foreground">This user is pretending to be someone else</div>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal cursor-pointer">
                    <div className="font-medium">Other</div>
                    <div className="text-sm text-muted-foreground">Another reason not listed above</div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <Label htmlFor="details">Additional details (optional)</Label>
                <Textarea
                  id="details"
                  placeholder="Please provide any additional information that might help our moderation team..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReport}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${message.senderId === "currentUser" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.senderId === "currentUser"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
              }`}
            >
              <div className="break-words">{message.content}</div>
              <div className={`text-xs mt-1 ${message.senderId === "currentUser" ? "text-blue-100" : "text-gray-500"}`}>
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </div>
            </div>
            <div className="mt-1 mb-2 flex items-center space-x-2">
              <button
                onClick={() => handleReplyToMessage(message)}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="relative">
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {replyingTo && (
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 mb-2 rounded border-l-2 border-blue-500">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-blue-500">
                  Replying to {replyingTo.senderId === "currentUser" ? "yourself" : user.name}
                </span>
                <span className="text-xs text-gray-500 truncate max-w-[250px]">{replyingTo.content}</span>
              </div>
              <button onClick={cancelReply} className="text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile className="h-5 w-5 text-gray-500" />
            </Button>

            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </Button>

            <Button variant="ghost" size="icon" type="button">
              <ImageIcon className="h-5 w-5 text-gray-500" />
            </Button>

            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-10 flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>

            <Button type="button" size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

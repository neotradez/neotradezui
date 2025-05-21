"use client"

import { useState } from "react"
import { mockNotifications } from "@/mock/notifications-data"
import NotificationsList from "@/components/notifications/notifications-list"
import type { Notification } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, Check } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  // Mark a single notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  // Accept a connection request
  const handleAcceptConnection = (id: string) => {
    // In a real app, you would call an API to accept the connection
    // For now, we'll just mark it as read
    handleMarkAsRead(id)
    // Show a success message (in a real app)
    console.log(`Connection ${id} accepted`)
  }

  // Reject a connection request
  const handleRejectConnection = (id: string) => {
    // In a real app, you would call an API to reject the connection
    // For now, we'll just remove the notification
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    // Show a success message (in a real app)
    console.log(`Connection ${id} rejected`)
  }

  // Filter notifications by read status
  const unreadNotifications = notifications.filter((notif) => !notif.read)
  const readNotifications = notifications.filter((notif) => notif.read)

  // Count unread notifications
  const unreadCount = unreadNotifications.length

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead} className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>

          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>

          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="border rounded-lg overflow-hidden">
          <NotificationsList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onAcceptConnection={handleAcceptConnection}
            onRejectConnection={handleRejectConnection}
          />
        </TabsContent>

        <TabsContent value="unread" className="border rounded-lg overflow-hidden">
          {unreadNotifications.length > 0 ? (
            <NotificationsList
              notifications={unreadNotifications}
              onMarkAsRead={handleMarkAsRead}
              onAcceptConnection={handleAcceptConnection}
              onRejectConnection={handleRejectConnection}
            />
          ) : (
            <div className="p-6 text-center">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No unread notifications</h3>
              <p className="text-gray-500 mt-2">You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="border rounded-lg overflow-hidden">
          {readNotifications.length > 0 ? (
            <NotificationsList
              notifications={readNotifications}
              onMarkAsRead={handleMarkAsRead}
              onAcceptConnection={handleAcceptConnection}
              onRejectConnection={handleRejectConnection}
            />
          ) : (
            <div className="p-6 text-center">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No read notifications</h3>
              <p className="text-gray-500 mt-2">You haven't read any notifications yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

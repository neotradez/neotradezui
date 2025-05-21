"use client"

import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Bell, Calendar, CheckCircle, AlertTriangle } from "lucide-react"

interface NotificationProps {
  type:
    | "trade_rejected"
    | "trade_accepted"
    | "meetup_scheduled"
    | "meetup_reminder"
    | "meetup_confirmation"
    | "dispute_started"
  data: {
    username?: string
    date?: string
    id?: string
  }
}

export function useNotificationToast() {
  const router = useRouter()

  const showNotification = ({ type, data }: NotificationProps) => {
    const { username, date, id } = data

    let icon, title, description, action

    switch (type) {
      case "trade_rejected":
        icon = <AlertTriangle className="h-5 w-5 text-red-500" />
        title = "Trade Rejected"
        description = `Your trade was rejected by ${username}.`
        break

      case "trade_accepted":
        icon = <CheckCircle className="h-5 w-5 text-green-500" />
        title = "Trade Accepted"
        description = `Trade accepted! Schedule a meetup with ${username}.`
        action = {
          label: "Schedule",
          onClick: () => router.push("/meetups"),
        }
        break

      case "meetup_scheduled":
        icon = <Calendar className="h-5 w-5 text-blue-500" />
        title = "Meetup Scheduled"
        description = `Meetup scheduled for ${date}.`
        action = {
          label: "View Details",
          onClick: () => router.push(`/meetups/${id}`),
        }
        break

      case "meetup_reminder":
        icon = <Bell className="h-5 w-5 text-yellow-500" />
        title = "Meetup Reminder"
        description = "Reminder: You have a meetup today."
        action = {
          label: "View Details",
          onClick: () => router.push(`/meetups/${id}`),
        }
        break

      case "meetup_confirmation":
        icon = <CheckCircle className="h-5 w-5 text-green-500" />
        title = "Confirm Meetup"
        description = `Please confirm if the meetup with ${username} was successful.`
        action = {
          label: "Confirm",
          onClick: () => router.push(`/meetups/${id}/confirm`),
        }
        break

      case "dispute_started":
        icon = <AlertTriangle className="h-5 w-5 text-red-500" />
        title = "Dispute Opened"
        description = "A dispute has been opened. View details."
        action = {
          label: "View Details",
          onClick: () => router.push(`/disputes/${id}`),
        }
        break

      default:
        return
    }

    toast({
      title: (
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
      ),
      description: description,
      action: action ? (
        <div className="mt-2">
          <button
            onClick={action.onClick}
            className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
          >
            {action.label}
          </button>
        </div>
      ) : undefined,
    })
  }

  return { showNotification }
}

// Example component to demonstrate usage
export function NotificationListener() {
  const { showNotification } = useNotificationToast()

  useEffect(() => {
    // This would typically be connected to a real-time notification system
    // For demonstration purposes, we're just showing how it would be used

    // Example: Listen for notifications from your backend
    const handleNotification = (notification: any) => {
      showNotification({
        type: notification.type,
        data: notification.data,
      })
    }

    // Mock setup of a listener
    // In a real app, this might be a WebSocket connection or similar
    const cleanup = () => {
      // Cleanup logic for your real notification system
    }

    return cleanup
  }, [])

  return null // This component doesn't render anything
}

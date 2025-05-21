"use client"
import type { User } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, UserPlus, UserCheck, MapPin, ShieldCheck, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface NetworkUserCardProps {
  user: User
  isPending?: boolean
  isTrusted?: boolean
  onAccept?: (userId: string) => void
  onReject?: (userId: string) => void
  onMessage?: (userId: string) => void
  onConnect?: (userId: string) => void
  onTrust?: (userId: string) => void
  onUntrust?: (userId: string) => void
}

// Export the UserProfileCard component to be used in other parts of the application
// Add the export statement before the UserProfileCard function definition:

export function NetworkUserCard({
  user,
  isPending = false,
  isTrusted = false,
  onAccept,
  onReject,
  onMessage,
  onConnect,
  onTrust,
  onUntrust,
}: NetworkUserCardProps) {
  const router = useRouter()

  // If no handlers are provided, create default ones
  const handleMessage = onMessage || (() => router.push(`/messages?user=${user.id}`))
  const handleConnect =
    onConnect ||
    (() => {
      // Default connect handler
    })

  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case "shield-check":
        return <ShieldCheck className="h-4 w-4" />
      case "clock":
        return <Clock className="h-4 w-4" />
      case "check-circle":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* User status indicator */}
        {user.isOnline && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="bg-green-500 text-white border-0">
              Online
            </Badge>
          </div>
        )}

        {/* Background color banner */}
        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        {/* Avatar */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-900">
              <img
                src={user.avatar || `/placeholder.svg?height=80&width=80&text=${user.name.charAt(0)}`}
                alt={user.name}
              />
            </Avatar>
            {user.isOnline && (
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
            )}
          </div>
        </div>
      </div>

      <CardContent className="pt-12 pb-4 text-center">
        <Link href={`/user/${user.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg">{user.name}</h3>
        </Link>

        {user.location && (
          <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{user.location}</span>
          </div>
        )}

        <div className="flex items-center justify-center mt-2">
          {user.rating && (
            <div className="flex items-center mr-3">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{user.rating.toFixed(1)}</span>
            </div>
          )}

          {user.trades !== undefined && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {user.trades} {user.trades === 1 ? "trade" : "trades"}
            </div>
          )}
        </div>

        {user.badges && user.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-3">
            {user.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center gap-2 pt-0">
        {isPending ? (
          <>
            <Button size="sm" onClick={() => onAccept?.(user.id)} className="flex items-center">
              <UserCheck className="h-4 w-4 mr-1" />
              Accept
            </Button>

            <Button size="sm" variant="outline" onClick={() => onReject?.(user.id)} className="flex items-center">
              Decline
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => onMessage?.(user.id)} className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>

            {isTrusted ? (
              <Button size="sm" variant="outline" onClick={() => onUntrust?.(user.id)} className="flex items-center">
                Untrust
              </Button>
            ) : (
              <Button
                size="sm"
                variant={onConnect ? "default" : "outline"}
                onClick={() => (onConnect ? onConnect(user.id) : onTrust?.(user.id))}
                className="flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                {onConnect ? "Connect" : "Trust"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}

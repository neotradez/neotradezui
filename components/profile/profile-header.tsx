"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReportUserDialog } from "@/components/report-user-dialog"
import {
  ArrowLeft,
  Edit,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  Shield,
  Award,
  Instagram,
  ExternalLink,
  Share2,
  UserPlus,
  UserMinus,
} from "lucide-react"
import { ROUTES } from "@/lib/routes"
import { useToast } from "@/hooks/use-toast"

interface ProfileHeaderProps {
  user: {
    id: string
    name: string
    avatar: string
    location?: string
    bio?: string
    rating?: number
    tradesCompleted?: number
    memberSince?: string
    isVerified?: boolean
    badges?: string[]
    instagram?: string
  }
  isCurrentUser?: boolean
}

export function ProfileHeader({ user, isCurrentUser = false }: ProfileHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleMessageUser = () => {
    router.push(ROUTES.MESSAGES_CONVERSATION(user.id))
  }

  const handleEditProfile = () => {
    router.push(ROUTES.PROFILE_EDIT)
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)

    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You are no longer following ${user.name}` : `You are now following ${user.name}`,
      duration: 3000,
    })
  }

  const handleBack = () => {
    router.back()
  }

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Profile link copied to clipboard",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <motion.div
        className="relative rounded-xl border border-border/40 bg-background/40 p-6 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.isVerified && (
              <motion.div
                className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-1 text-white shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
              >
                <Shield className="h-4 w-4" />
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <h1 className="text-2xl font-bold md:text-3xl bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                {user.isVerified && (
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Verified Trader
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                {user.location && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.instagram && (
                  <Link
                    href={`https://instagram.com/${user.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>@{user.instagram}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>

            {user.bio && (
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {user.bio}
              </motion.p>
            )}

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {user.rating !== undefined && (
                <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-muted-foreground">rating</span>
                </div>
              )}
              {user.tradesCompleted !== undefined && (
                <div className="flex items-center gap-1 bg-muted/50 px-3 py-1 rounded-full">
                  <Badge variant="outline" className="font-normal">
                    {user.tradesCompleted} trades completed
                  </Badge>
                </div>
              )}
              {user.memberSince && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.memberSince}</span>
                </div>
              )}
            </motion.div>

            {user.badges && user.badges.length > 0 && (
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2 md:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {user.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/20 dark:to-teal-900/20"
                  >
                    <Award className="h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
                {user.badges.length > 3 && (
                  <Link href={`/user/${user.id}/badges`} className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          <motion.div
            className="flex flex-col gap-2 md:self-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isCurrentUser ? (
              <Button
                onClick={handleEditProfile}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleMessageUser}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
                <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollowToggle} className="gap-2">
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleShareProfile} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </Button>
                <ReportUserDialog userId={user.id} userName={user.name} />
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

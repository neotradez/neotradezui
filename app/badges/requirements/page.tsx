import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, Check, Clock, Info, ShieldCheck, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  title: "Badge Requirements",
  description: "Learn how to earn badges and achievements on NeoTradez",
}

export default function BadgeRequirementsPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/badges">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Badge Requirements</h1>
      </div>

      <p className="text-muted-foreground">
        Badges are awarded based on your trading activity and community participation. Complete the requirements to earn
        badges and showcase your trading reputation.
      </p>

      <Tabs defaultValue="trading">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trading">Trading Badges</TabsTrigger>
          <TabsTrigger value="community">Community Badges</TabsTrigger>
          <TabsTrigger value="special">Special Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="trading" className="space-y-4 mt-4">
          <BadgeRequirementCard
            badge={{
              id: "trusted-trader",
              name: "Trusted Trader",
              icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
              description: "Awarded to users who have completed multiple successful trades with positive ratings.",
              color: "emerald",
              requirements: [
                { description: "Complete 5 successful trades", progress: 3, total: 5 },
                { description: "Maintain a 4.5+ star rating", progress: 4.8, total: 5, type: "rating" },
                {
                  description: "No reported issues or disputes",
                  progress: 0,
                  total: 0,
                  type: "boolean",
                  completed: true,
                },
              ],
            }}
          />

          <BadgeRequirementCard
            badge={{
              id: "power-trader",
              name: "Power Trader",
              icon: <Zap className="h-6 w-6 text-amber-500" />,
              description: "For the most active traders who frequently exchange items on the platform.",
              color: "amber",
              requirements: [
                { description: "Complete 25 successful trades", progress: 3, total: 25 },
                { description: "Trade in at least 5 different categories", progress: 2, total: 5 },
                { description: "Maintain active listings for 30 days", progress: 12, total: 30 },
              ],
            }}
          />

          <BadgeRequirementCard
            badge={{
              id: "punctual-trader",
              name: "Punctual Trader",
              icon: <Clock className="h-6 w-6 text-blue-500" />,
              description: "For traders who consistently show up on time to meetups.",
              color: "blue",
              requirements: [
                { description: "Arrive on time to 10 consecutive meetups", progress: 7, total: 10 },
                { description: "No reported lateness", progress: 0, total: 0, type: "boolean", completed: true },
                { description: "Receive 'Punctual' badge from 5 different traders", progress: 3, total: 5 },
              ],
            }}
          />
        </TabsContent>

        <TabsContent value="community" className="space-y-4 mt-4">
          <BadgeRequirementCard
            badge={{
              id: "helpful-member",
              name: "Helpful Member",
              icon: <Award className="h-6 w-6 text-violet-500" />,
              description: "Awarded to users who contribute positively to the community.",
              color: "violet",
              requirements: [
                { description: "Help 5 new users with their first trade", progress: 2, total: 5 },
                { description: "Receive 10 'Helpful' ratings", progress: 6, total: 10 },
                { description: "Participate in community events", progress: 1, total: 3 },
              ],
            }}
          />

          <BadgeRequirementCard
            badge={{
              id: "top-reviewer",
              name: "Top Reviewer",
              icon: <Star className="h-6 w-6 text-pink-500" />,
              description: "For users who provide detailed and helpful reviews after trades.",
              color: "pink",
              requirements: [
                { description: "Write 15 detailed reviews (50+ words)", progress: 8, total: 15 },
                { description: "Have 10 of your reviews marked as helpful", progress: 5, total: 10 },
                {
                  description: "Review trades within 48 hours",
                  progress: 0,
                  total: 0,
                  type: "boolean",
                  completed: true,
                },
              ],
            }}
          />
        </TabsContent>

        <TabsContent value="special" className="space-y-4 mt-4">
          <BadgeRequirementCard
            badge={{
              id: "eco-trader",
              name: "Eco Trader",
              icon: <Award className="h-6 w-6 text-green-500" />,
              description: "For users who promote sustainable trading practices.",
              color: "green",
              requirements: [
                { description: "Trade 10 items in the 'Upcycled' category", progress: 4, total: 10 },
                { description: "Participate in 2 community cleanup events", progress: 1, total: 2 },
                { description: "Receive 5 'Eco-friendly' mentions in reviews", progress: 3, total: 5 },
              ],
            }}
          />

          <BadgeRequirementCard
            badge={{
              id: "local-legend",
              name: "Local Legend",
              icon: <Award className="h-6 w-6 text-orange-500" />,
              description: "For users who are highly active in their local trading community.",
              color: "orange",
              requirements: [
                { description: "Complete 20 trades in your neighborhood", progress: 12, total: 20 },
                { description: "Be active for 3 consecutive months", progress: 2, total: 3 },
                {
                  description: "Host a local trading meetup",
                  progress: 0,
                  total: 0,
                  type: "boolean",
                  completed: false,
                },
              ],
            }}
          />

          <BadgeRequirementCard
            badge={{
              id: "founding-member",
              name: "Founding Member",
              icon: <Award className="h-6 w-6 text-indigo-500" />,
              description: "Exclusive badge for early adopters who joined during the platform's launch.",
              color: "indigo",
              requirements: [
                {
                  description: "Created account during beta period",
                  progress: 0,
                  total: 0,
                  type: "boolean",
                  completed: true,
                },
                { description: "Completed at least 1 trade during beta", progress: 1, total: 1 },
                { description: "Provided platform feedback", progress: 0, total: 0, type: "boolean", completed: true },
              ],
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BadgeRequirement {
  description: string
  progress: number
  total: number
  type?: "standard" | "rating" | "boolean"
  completed?: boolean
}

interface Badge {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
  requirements: BadgeRequirement[]
}

interface BadgeRequirementCardProps {
  badge: Badge
}

function BadgeRequirementCard({ badge }: BadgeRequirementCardProps) {
  const isCompleted = badge.requirements.every(
    (req) => (req.type === "boolean" && req.completed) || req.progress >= req.total,
  )
  const progress = badge.requirements.reduce(
    (acc, req) => {
      if (req.type === "boolean") {
        return {
          completed: acc.completed + (req.completed ? 1 : 0),
          total: acc.total + 1,
        }
      }
      return {
        completed: acc.completed + (req.progress >= req.total ? 1 : 0),
        total: acc.total + 1,
      }
    },
    { completed: 0, total: 0 },
  )

  return (
    <Card className={isCompleted ? "border-green-500 dark:border-green-700" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {badge.icon}
            <CardTitle>{badge.name}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Badge Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{badge.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          {isCompleted ? (
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <Check className="h-4 w-4" /> Completed
            </span>
          ) : (
            <span>
              {progress.completed} of {progress.total} requirements completed
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {badge.requirements.map((requirement, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{requirement.description}</span>
              {requirement.type === "boolean" ? (
                <span
                  className={requirement.completed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}
                >
                  {requirement.completed ? "Completed" : "Incomplete"}
                </span>
              ) : requirement.type === "rating" ? (
                <span className="flex items-center gap-1">
                  <span>{requirement.progress}</span>
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span className="text-muted-foreground">/ {requirement.total}</span>
                </span>
              ) : (
                <span>
                  {requirement.progress} / {requirement.total}
                </span>
              )}
            </div>
            {requirement.type !== "boolean" && (
              <Progress
                value={(requirement.progress / requirement.total) * 100}
                className={`h-2 ${
                  requirement.progress >= requirement.total ? "bg-green-200 dark:bg-green-950" : "bg-muted"
                }`}
                indicatorClassName={
                  requirement.progress >= requirement.total
                    ? "bg-green-600 dark:bg-green-400"
                    : `bg-${badge.color}-600 dark:bg-${badge.color}-400`
                }
              />
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {!isCompleted && (
          <Button variant="outline" className="w-full">
            View Related Activities
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

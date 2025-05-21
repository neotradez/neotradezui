"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TradeJourneyStats({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Statistics</CardTitle>
        <CardDescription>Your trading performance and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Items Traded</h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-2xl font-bold">{user?.stats?.itemsTraded || 24}</div>
              <Badge variant="outline" className="text-xs font-normal">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +3 this month
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-2xl font-bold">{user?.stats?.averageRating || 4.8}</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(user?.stats?.averageRating || 4.8)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Trader Level</h3>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{user?.stats?.traderLevel || "Expert"}</div>
                <Badge>{user?.stats?.traderPoints || 1250} points</Badge>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${user?.stats?.levelProgress || 80}%` }}
                ></div>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Current: {user?.stats?.traderLevel || "Expert"}</span>
                <span>Next: {user?.stats?.nextLevel || "Master"}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Growth Rate</h3>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{user?.stats?.growthRate || "+32%"}</div>
                <Badge variant="outline" className="text-xs font-normal">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Year over year
                </Badge>
              </div>
              <div className="mt-2">
                <ResponsiveContainer width="100%" height={60}>
                  <AreaChart
                    data={
                      user?.stats?.growthData || [
                        { month: "Jan", value: 10 },
                        { month: "Feb", value: 15 },
                        { month: "Mar", value: 12 },
                        { month: "Apr", value: 18 },
                        { month: "May", value: 22 },
                        { month: "Jun", value: 20 },
                        { month: "Jul", value: 25 },
                        { month: "Aug", value: 30 },
                        { month: "Sep", value: 35 },
                        { month: "Oct", value: 32 },
                        { month: "Nov", value: 40 },
                        { month: "Dec", value: 42 },
                      ]
                    }
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

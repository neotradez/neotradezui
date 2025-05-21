"use client"

import { MapPin, Bookmark } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function TradeCard({ trade, onClick, onOwnerClick, onSaveClick, isSaved = false, compact = false }) {
  const router = useRouter()
  const CategoryIcon = null //getCategoryIcon(trade.category);

  const handleOwnerClick = (e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation()
      e.preventDefault()
    }

    if (onOwnerClick) {
      onOwnerClick(e)
    } else if (trade.owner?.id) {
      router.push(`/user/${trade.owner.id}`)
    }
  }

  const handleSaveClick = (e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation()
      e.preventDefault()
    }

    if (onSaveClick) {
      onSaveClick(e)
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/40 bg-background/40 backdrop-blur-md transition-all hover:shadow-md dark:border-border/20 dark:bg-[#1a1a1a]/40",
        compact ? "h-full" : "",
      )}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="relative">
        <div className={cn("relative overflow-hidden", compact ? "aspect-square" : "aspect-video")}>
          <img
            src={trade && trade.image ? trade.image : "/placeholder.svg?height=300&width=300"}
            alt={trade ? trade.title : "Trade item"}
            className="object-cover w-full h-full"
          />

          {/* Save button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            onClick={handleSaveClick}
          >
            <Bookmark className={cn("h-4 w-4", isSaved ? "fill-primary text-primary" : "")} />
            <span className="sr-only">{isSaved ? "Unsave" : "Save"} item</span>
          </Button>
        </div>
        <Badge variant="secondary" className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
          {CategoryIcon && <CategoryIcon className="mr-1 h-3 w-3" />}
          {trade?.category || "Uncategorized"}
        </Badge>
      </div>
      <CardContent className={cn("flex flex-col", compact ? "p-3" : "p-4")}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn("font-medium line-clamp-2", compact ? "text-sm" : "text-base")}>
                {trade?.title || "Untitled Item"}
              </h3>
            </div>
            {!compact && trade?.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{trade.description}</p>
            )}
          </div>
          <div className="text-right">
            <Badge variant="outline">{trade?.rarity || "Common"}</Badge>
          </div>
        </div>

        {!compact && trade?.lookingFor && trade.lookingFor.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {trade.lookingFor.slice(0, 2).map((item, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
            {trade.lookingFor.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{trade.lookingFor.length - 2} more
              </Badge>
            )}
          </div>
        )}

        <div className={cn("flex items-center justify-between", compact ? "mt-2" : "mt-4")}>
          {trade.owner && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => onOwnerClick && onOwnerClick(e)}>
              <Avatar className={cn(compact ? "h-5 w-5" : "h-6 w-6")}>
                <AvatarImage src={trade.owner.avatar || "/placeholder.svg"} alt={trade.owner.name} />
                <AvatarFallback>{trade.owner.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className={cn("font-medium truncate", compact ? "text-xs max-w-[80px]" : "text-sm max-w-[120px]")}>
                {trade.owner.name}
              </span>
            </div>
          )}
          {trade?.location && (
            <div className="flex items-center gap-1">
              <MapPin className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
              <span
                className={cn(
                  "text-muted-foreground truncate",
                  compact ? "text-xs max-w-[60px]" : "text-sm max-w-[100px]",
                )}
              >
                {trade.location}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

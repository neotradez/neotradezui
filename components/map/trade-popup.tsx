"use client"

import { motion } from "framer-motion"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCategoryIcon } from "@/lib/category-utils"
import { useRouter } from "next/navigation";

export function TradePopup({ trade, position, onClose, onView }) {
  const IconComponent = getCategoryIcon(trade.category)
  const router = useRouter();

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 120}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="w-64 rounded-lg border bg-card p-3 shadow-lg">
        <div className="flex justify-between">
          <h3 className="font-medium">{trade.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
            {trade.image ? (
              <img src={trade.image || "/placeholder.svg"} alt={trade.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <IconComponent className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Badge variant="outline" className="mb-1">
              <IconComponent className="mr-1 h-3 w-3" />
              {trade.category}
            </Badge>
            <p className="text-xs text-muted-foreground">{trade.description.substring(0, 50)}...</p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => router.push(`/map/item/${trade.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

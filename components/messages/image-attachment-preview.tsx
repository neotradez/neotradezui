"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ImageAttachmentPreviewProps {
  imageUrl: string
  onRemove: () => void
}

export function ImageAttachmentPreview({ imageUrl, onRemove }: ImageAttachmentPreviewProps) {
  return (
    <motion.div
      className="border-t border-border/40 bg-background/80 p-3 backdrop-blur-md dark:border-border/20 dark:bg-[#121212]/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-border/40 dark:border-border/20">
          <img src={imageUrl || "/placeholder.svg"} alt="Attachment preview" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Image attached</p>
          <p className="text-xs text-muted-foreground">Ready to send</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

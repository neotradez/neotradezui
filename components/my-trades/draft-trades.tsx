"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"

export function DraftTrades() {
  const draftTrades = []

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {draftTrades.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {draftTrades.map((draft, index) => (
            <motion.div
              key={draft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 dark:border-border/20 dark:bg-[#1a1a1a]/40">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={draft.image || "/placeholder.svg"}
                      alt={draft.title}
                      fill
                      className="object-cover opacity-70 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] dark:bg-[#121212]/30">
                      <div className="rounded-lg bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm dark:bg-[#121212]/80">
                        Draft
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold">{draft.title}</h3>
                      <div className="text-sm font-medium text-muted-foreground">~${draft.estimatedValue}</div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{draft.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Last edited: {new Date(draft.lastEdited).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 dark:border-border/40">
          <div className="mb-4 rounded-full bg-muted/50 p-3">
            <Edit className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No draft trades</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            You don't have any draft trades yet. Start creating a listing and save it as a draft to continue later.
          </p>
          <Button className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
            <span className="relative z-10">Create New Trade</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>
        </div>
      )}
    </motion.div>
  )
}

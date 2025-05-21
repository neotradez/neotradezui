"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bell, Check, Filter } from "lucide-react"

export function NotificationsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="mb-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, delay: 0.5, repeat: 1 }}
          >
            <Bell className="h-8 w-8 text-[#3B82F6]" />
          </motion.div>
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Notifications</h1>
            <p className="mt-1 text-muted-foreground">Stay updated on trade requests, messages, and platform updates</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="gap-2">
              <Check className="h-4 w-4" />
              Mark All Read
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

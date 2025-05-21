"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3">
        <motion.div animate={{ rotate: [0, 180] }} transition={{ duration: 2, delay: 0.5, repeat: 1, repeatDelay: 5 }}>
          <Settings className="h-8 w-8 text-[#3B82F6]" />
        </motion.div>
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your account preferences and platform settings</p>
        </div>
      </div>
    </motion.div>
  )
}

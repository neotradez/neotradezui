"use client"

import { motion } from "framer-motion"

export function MessagesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Messages</h1>
      <p className="mt-1 text-muted-foreground">Communicate with other traders and manage your trade negotiations</p>
    </motion.div>
  )
}

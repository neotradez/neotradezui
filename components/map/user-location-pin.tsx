"use client"

import { motion } from "framer-motion"

export function UserLocationPin({ position }) {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <div className="relative">
        <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500 opacity-30"
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </motion.div>
  )
}

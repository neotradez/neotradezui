"use client"

import { motion } from "framer-motion"
import { getCategoryColor } from "@/lib/category-utils"

export function PinCluster({ cluster, position, onClick }) {
  const color = getCategoryColor(cluster.category)

  return (
    <motion.div
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs font-bold text-white">{cluster.count}</span>
      </div>
    </motion.div>
  )
}

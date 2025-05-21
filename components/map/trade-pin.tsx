"use client"

import { motion } from "framer-motion"
import { getCategoryIcon, getCategoryColor } from "@/lib/category-utils"

export function TradePin({ trade, position, isSelected, onClick, category }) {
  const IconComponent = getCategoryIcon(category)
  const color = getCategoryColor(category)

  return (
    <motion.div
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: isSelected ? 1.2 : 1,
        opacity: 1,
        y: isSelected ? -5 : 0,
      }}
      whileHover={{ scale: 1.2, y: -5 }}
      onClick={onClick}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full shadow-md"
        style={{ backgroundColor: color }}
      >
        <IconComponent className="h-4 w-4 text-white" />
      </div>
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  )
}

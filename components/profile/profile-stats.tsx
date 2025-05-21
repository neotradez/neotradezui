"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Package, Star, Award, History } from "lucide-react"

export default function ProfileStats() {
  // Sample stats data
  const stats = [
    {
      title: "Completed Trades",
      value: 47,
      icon: ArrowLeftRight,
      color: "#00D084",
    },
    {
      title: "Items Listed",
      value: 12,
      icon: Package,
      color: "#3B82F6",
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: Star,
      color: "#F59E0B",
    },
    {
      title: "Trader Level",
      value: "Expert",
      icon: Award,
      color: "#8B5CF6",
    },
    {
      title: "Days Active",
      value: 215,
      icon: History,
      color: "#EC4899",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px ${stat.color}40`,
            y: -5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="flex flex-col items-center p-4 text-center">
              <motion.div
                className="mb-2 rounded-full p-2"
                style={{ backgroundColor: `${stat.color}20` }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
              >
                <stat.icon style={{ color: stat.color }} className="h-5 w-5" />
              </motion.div>
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
              >
                <h3 className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useApp } from "@/context/app-context"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (container) {
        const rect = (container as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const calculateTilt = (index: number) => {
    const centerX = windowDimensions.width / 2
    const centerY = windowDimensions.height / 2
    const deltaX = (mousePosition.x - centerX) / 50
    const deltaY = (mousePosition.y - centerY) / 50

    // Add some variation based on the card index
    return {
      x: deltaX * (1 + index * 0.1),
      y: -deltaY * (1 + index * 0.1),
    }
  }

  const cards = [
    {
      id: 1,
      title: "Vintage Camera",
      image: "/images/vintage-camera.jpeg",
      value: "Est. Value: $120",
      owner: "Alex Chen",
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      image: "/images/mechanical-keyboard.jpeg",
      value: "Est. Value: $150",
      owner: "Jordan Lee",
    },
    {
      id: 3,
      title: "Drone",
      image: "/images/drone.webp",
      value: "Est. Value: $300",
      owner: "Sam Rivera",
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

  const { isAuthenticated } = useApp()

  return (
    <section className="relative py-12 md:py-24 perspective-1000">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,208,132,0.1), transparent 50%)",
          filter: "blur(40px)",
          transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
        }}
      />

      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <motion.div
          className="flex flex-col justify-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Trade Anything.
              <motion.span
                className="bg-gradient-to-r from-[#00D084] to-[#3B82F6] bg-clip-text text-transparent dark:from-[#00D084] dark:to-[#3B82F6]"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                {" "}
                No Currency.
              </motion.span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The future of barter is here. Trade physical items directly with others in a seamless digital experience.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-4">
            {!isAuthenticated && (
              <>
                <Link href="/sign-up">
                  <Button
                    className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                    size="lg"
                  >
                    <span className="relative z-10">Sign up now</span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </Link>
              </>
            )}
            <Link href="/marketplace">
              <Button variant="outline" size="lg">
                Explore Marketplace
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-muted-foreground">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="h-4 w-4 text-[#00D084]" />
            </motion.div>
            <span></span>
          </motion.div>
        </motion.div>

        <div className="relative flex items-center justify-center" ref={containerRef}>
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              background: "radial-gradient(ellipse at center, rgba(59,130,246,0.1), transparent 70%)",
              filter: "blur(40px)",
              transform: `translate(${-mousePosition.x / 80}px, ${-mousePosition.y / 80}px)`,
            }}
          />

          <motion.div
            className="relative h-[400px] w-full max-w-[500px]"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="absolute left-0 top-0 h-[280px] w-[220px] cursor-pointer overflow-hidden rounded-xl border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                  style={{
                    left: `${index * 40}px`,
                    top: `${index * 40}px`,
                    zIndex: cards.length - index,
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${index * 20}px)`,
                  }}
                  initial={{ opacity: 0, y: 100, rotateX: 0, rotateY: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: calculateTilt(index).y,
                    rotateY: calculateTilt(index).x,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 * index,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 30px rgba(0, 208, 132, 0.4)",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                    z: 50,
                  }}
                  whileTap={{ scale: 0.95 }}
                  drag
                  dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                  }}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  dragElastic={0.5}
                >
                  <div className="flex h-full flex-col">
                    <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg">
                      <Image
                        src={card.image || "/placeholder.svg"}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.value}</p>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                      <motion.div
                        className="h-5 w-5 rounded-full bg-primary/20"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                      {card.owner}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

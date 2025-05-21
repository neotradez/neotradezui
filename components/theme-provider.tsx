"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative h-4 w-4"
        >
          <motion.div
            initial={false}
            animate={theme === "dark" ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Moon className="h-4 w-4" />
          </motion.div>
          <motion.div
            initial={false}
            animate={theme === "light" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}

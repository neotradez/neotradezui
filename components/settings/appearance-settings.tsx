"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { useState } from "react"

export function AppearanceSettings() {
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

  // 5. Make accent colors work in settings
  // Add state to track the selected accent color
  const [selectedAccentColor, setSelectedAccentColor] = useState("default")

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize how NeoTradez looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="overflow-hidden rounded-lg border border-border/40 bg-background p-2 dark:border-border/20">
                  <div className="mb-2 aspect-video rounded bg-background"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Light</span>
                    <Switch />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-border/40 bg-[#121212] p-2 dark:border-border/20">
                  <div className="mb-2 aspect-video rounded bg-[#1a1a1a]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Dark</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-background to-background/90 p-2 dark:border-border/20 dark:from-[#121212] dark:to-[#0a0a0a]">
                  <div className="mb-2 aspect-video rounded bg-gradient-to-br from-[#00D084]/10 to-[#3B82F6]/10"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>

            {/* Update the accent color section to handle selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Accent Color</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
                <div className="overflow-hidden rounded-lg border border-border/40 bg-background p-2 dark:border-border/20">
                  <div className="mb-2 aspect-square rounded bg-gradient-to-br from-[#00D084] to-[#3B82F6]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Default</span>
                    <Switch
                      checked={selectedAccentColor === "default"}
                      onCheckedChange={() => setSelectedAccentColor("default")}
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-border/40 bg-background p-2 dark:border-border/20">
                  <div className="mb-2 aspect-square rounded bg-gradient-to-br from-[#F97316] to-[#EC4899]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Sunset</span>
                    <Switch
                      checked={selectedAccentColor === "sunset"}
                      onCheckedChange={() => setSelectedAccentColor("sunset")}
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-border/40 bg-background p-2 dark:border-border/20">
                  <div className="mb-2 aspect-square rounded bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Neon</span>
                    <Switch
                      checked={selectedAccentColor === "neon"}
                      onCheckedChange={() => setSelectedAccentColor("neon")}
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-lg border border-border/40 bg-background p-2 dark:border-border/20">
                  <div className="mb-2 aspect-square rounded bg-gradient-to-br from-[#10B981] to-[#3B82F6]"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Ocean</span>
                    <Switch
                      checked={selectedAccentColor === "ocean"}
                      onCheckedChange={() => setSelectedAccentColor("ocean")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Replace the Language & Region section with just Region */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Region</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="region">
                    Region
                  </label>
                  <Select defaultValue="us">
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
              <span className="relative z-10 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

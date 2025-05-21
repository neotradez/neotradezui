"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Moon } from "lucide-react"
import { AccountSettings } from "@/components/settings/account-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
          <TabsTrigger value="account" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Appearance
            </span>
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="account" className="mt-0">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="privacy" className="mt-0">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <AppearanceSettings />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}

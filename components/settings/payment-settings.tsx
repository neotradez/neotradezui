"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Save } from "lucide-react"

export function PaymentSettings() {
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
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods and transaction history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border/40 bg-background/60 p-4 dark:border-border/20 dark:bg-[#1a1a1a]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-background p-2 dark:bg-[#121212]">
                    <CreditCard className="h-6 w-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Membership</h3>
                    <p className="text-sm text-muted-foreground">Upgrade to access premium features</p>
                  </div>
                </div>
                <Button>Upgrade</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-border/40 p-4 dark:border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-background p-2 dark:bg-[#121212]">
                      <CreditCard className="h-5 w-5 text-[#00D084]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Credit Card</h4>
                      <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <CreditCard className="h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Billing Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing-name">Name</Label>
                  <Input id="billing-name" defaultValue="Alex Morgan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Email</Label>
                  <Input id="billing-email" type="email" defaultValue="alex@neotradez.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Address</Label>
                  <Input id="billing-address" defaultValue="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-city">City</Label>
                  <Input id="billing-city" defaultValue="Seattle" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-state">State</Label>
                  <Input id="billing-state" defaultValue="WA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-zip">ZIP Code</Label>
                  <Input id="billing-zip" defaultValue="98101" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]">
              <span className="relative z-10 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

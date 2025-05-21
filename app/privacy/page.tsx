"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 dark:from-[#121212] dark:to-[#0a0a0a]">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-foreground dark:from-[#00D084] dark:to-[#3B82F6]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-background dark:text-[#121212]"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 10,
                  }}
                >
                  <span className="font-bold">NT</span>
                </motion.div>
              </motion.div>
              <motion.span
                className="hidden font-heading text-xl font-bold sm:inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #00D084, #3B82F6, #00D084)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NeoTradez
              </motion.span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container px-4 pb-12 pt-6 md:px-6 md:pb-16 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#00D084]" />
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Privacy Policy</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none dark:prose-invert"
        >
          <p className="lead">Last Updated: March 15, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            At NeoTradez, we respect your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our platform, including:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, and profile picture.
            </li>
            <li>
              <strong>Account Information:</strong> Username, password, and account preferences.
            </li>
            <li>
              <strong>Location Information:</strong> General location (city, state) and specific location when you opt
              to share it.
            </li>
            <li>
              <strong>Transaction Information:</strong> Details about the items you list, trade requests, and completed
              trades.
            </li>
            <li>
              <strong>Communication Information:</strong> Messages exchanged with other users through our platform.
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our platform, including pages visited, features
              used, and time spent.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type, device type, and operating system.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our platform</li>
            <li>Process and facilitate trades between users</li>
            <li>Communicate with you about your account and trades</li>
            <li>Personalize your experience and provide recommendations</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect the security and integrity of our platform</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>Other Users:</strong> When you engage in trades or communicate with other users, certain
              information is shared.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect our rights.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
            </li>
          </ul>

          <h2>5. Your Privacy Choices</h2>
          <p>You have several choices regarding your personal information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> You can update your account information through your profile
              settings.
            </li>
            <li>
              <strong>Location Information:</strong> You can control location sharing in your privacy settings.
            </li>
            <li>
              <strong>Communication Preferences:</strong> You can manage who can contact you and how you receive
              notifications.
            </li>
            <li>
              <strong>Marketing Communications:</strong> You can opt out of marketing emails by following the
              unsubscribe instructions.
            </li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 13 years of age, and we do not knowingly collect personal
            information from children under 13.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence,
            which may have different data protection laws.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@neotradez.com.</p>
        </motion.div>
      </main>
      <footer className="border-t border-border/40 bg-background/80 py-6 backdrop-blur-sm dark:border-border/20 dark:bg-[#121212]/80">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
          <p className="text-sm text-muted-foreground">© 2025 NeoTradez. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Terms
              </motion.span>
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Privacy
              </motion.span>
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              <motion.span whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                Contact
              </motion.span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

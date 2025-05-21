"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export default function TermsPage() {
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
            <FileText className="h-8 w-8 text-[#3B82F6]" />
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Terms of Service</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none dark:prose-invert"
        >
          <p className="lead">Last Updated: March 15, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to NeoTradez. By accessing or using our platform, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            NeoTradez provides a platform for users to trade physical items with other users without the use of
            currency. We facilitate connections between users but are not a party to any transaction between users.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use certain features of our platform, you must register for an account. You are responsible for
            maintaining the confidentiality of your account information and for all activities that occur under your
            account.
          </p>

          <h2>4. User Conduct</h2>
          <p>You agree not to use our platform to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Post or trade illegal, counterfeit, or prohibited items</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Impersonate another user or person</li>
            <li>Engage in any fraudulent activity</li>
          </ul>

          <h2>5. Trading Rules</h2>
          <p>When engaging in trades on our platform:</p>
          <ul>
            <li>You must accurately represent the items you are offering</li>
            <li>You are responsible for arranging the exchange of items</li>
            <li>You assume all risks associated with meeting other users in person</li>
            <li>We recommend meeting in public places for exchanges</li>
            <li>We are not responsible for the quality, safety, or legality of items traded</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, and other matters related to our platform are protected by
            applicable intellectual property rights. Except as expressly provided, nothing should be construed as
            granting any license or right to use any trademarks or other intellectual property.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, NeoTradez shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>

          <h2>8. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will provide notice of significant
            changes by posting the new Terms on our platform. Your continued use of our platform after such
            modifications constitutes your acceptance of the modified Terms.
          </p>

          <h2>9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our platform at our sole discretion,
            without notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
            us, or third parties, or for any other reason.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the United States,
            without regard to its conflict of law provisions.
          </p>

          <h2>11. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at support@neotradez.com.</p>
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

import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./client-layout"

export const metadata: Metadata = {
  title: "NeoTradez - Futuristic Barter Trading Platform",
  description: "Trade physical items with no currency transactions in a sleek, immersive platform.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


import './globals.css'
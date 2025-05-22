"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function HomePage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle any searchParams logic here after component mount
    const params = new URLSearchParams(searchParams)
    // Use params as needed
  }, [searchParams])

  return (
    <div>
      {/* Your existing homepage content */}
      <h1>Welcome to NeoTradez</h1>
    </div>
  )
}
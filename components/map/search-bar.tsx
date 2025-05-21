"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({ value, onChange, placeholder }) {
  const [inputValue, setInputValue] = useState(value || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    onChange(inputValue)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border/40 bg-background/95 p-1 shadow-md backdrop-blur-sm dark:border-border/20 dark:bg-[#1a1a1a]/90 mx-auto"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder || "Search..."}
          className="border-0 pl-9 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <Button type="submit" size="sm" className="h-8">
        Search
      </Button>
    </form>
  )
}

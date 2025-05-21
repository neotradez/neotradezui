"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CATEGORY_COLORS, getCategoryIcon } from "@/lib/category-utils"
import { Search, X } from "lucide-react"
import React from "react"

export function CategorySidebar({ onCategoryChange = () => {}, selectedCategories = [] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])
  const [selected, setSelected] = useState(selectedCategories)

  // Initialize categories from the CATEGORY_COLORS object
  useEffect(() => {
    const categoryList = Object.keys(CATEGORY_COLORS).map((key) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      color: CATEGORY_COLORS[key],
    }))
    setCategories(categoryList)
  }, [])

  // Update parent component when selection changes
  useEffect(() => {
    onCategoryChange(selected)
  }, [selected, onCategoryChange])

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelected((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Clear all selected categories
  const clearSelection = () => {
    setSelected([])
  }

  return (
    <div className="flex h-full w-72 md:w-80 flex-col border-r border-border/40 bg-background dark:border-border/20">
      <div className="border-b border-border/40 p-4 dark:border-border/20">
        <h2 className="text-lg font-semibold">Categories</h2>
        <p className="text-sm text-muted-foreground">Filter items by category</p>
        <div className="mt-3 relative">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border/40 px-4 py-2 dark:border-border/20">
        <span className="text-sm font-medium">
          {selected.length} {selected.length === 1 ? "category" : "categories"} selected
        </span>
        {selected.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearSelection}>
            Clear all
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No categories found</p>
          ) : (
            <div className="space-y-1">
              {filteredCategories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isSelected={selected.includes(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function CategoryItem({ category, isSelected, onToggle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 ${
        isSelected
          ? "border-primary/50 bg-primary/5 dark:border-primary/30 dark:bg-primary/10"
          : "border-transparent hover:bg-muted/50"
      }`}
    >
      <Checkbox checked={isSelected} onCheckedChange={onToggle} id={`category-${category.id}`} />
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: category.color }}
      >
        {React.createElement(getCategoryIcon(category.id), { className: "h-4 w-4" })}
      </div>
      <label htmlFor={`category-${category.id}`} className="flex-1 cursor-pointer text-sm font-medium">
        {category.name}
      </label>
    </motion.div>
  )
}

// Define the category colors
export const CATEGORY_COLORS = {
  electronics: "#00D084",
  furniture: "#8ED1FC",
  clothing: "#FCB900",
  sports: "#FF6900",
  collectibles: "#7BDCB5",
  books: "#ABB8C3",
  music: "#9900EF",
  art: "#EB144C",
  tools: "#F78DA7",
  photography: "#9C27B0",
  gaming: "#2196F3",
  jewelry: "#FFC107",
  kitchen: "#FF5722",
  home: "#8ED1FC", // Same as furniture for consistency
}

// Function to get color for a category
export function getCategoryColor(category: string): string {
  const lowerCategory = category.toLowerCase()
  return CATEGORY_COLORS[lowerCategory] || "#808080" // Default to gray if category not found
}

// Function to get a formatted category name
export function getCategoryName(category: string): string {
  if (!category) return "Unknown"

  // Capitalize first letter and replace hyphens with spaces
  const formatted = category
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return formatted
}

// Import all icons we'll use
import {
  Smartphone,
  Sofa,
  Shirt,
  Dumbbell,
  Trophy,
  BookOpen,
  Music,
  Palette,
  Wrench,
  Camera,
  Gamepad,
  Gem,
  UtensilsCrossed,
  Tag,
} from "lucide-react"

// Function to get icon component for a category
export function getCategoryIcon(category: string) {
  const lowerCategory = category?.toLowerCase()

  switch (lowerCategory) {
    case "electronics":
      return Smartphone
    case "furniture":
    case "home":
      return Sofa
    case "clothing":
      return Shirt
    case "sports":
      return Dumbbell
    case "collectibles":
      return Trophy
    case "books":
      return BookOpen
    case "music":
      return Music
    case "art":
      return Palette
    case "tools":
      return Wrench
    case "photography":
      return Camera
    case "gaming":
      return Gamepad
    case "jewelry":
      return Gem
    case "kitchen":
      return UtensilsCrossed
    default:
      return Tag
  }
}

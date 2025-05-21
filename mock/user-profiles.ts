export interface UserProfile {
  id: number
  name: string
  username: string
  avatar: string
  bio: string
  location: string
  rating: number
  reviewCount: number
  completedTrades: number
  isOnline: boolean
  joinDate: string
  inventory: InventoryItem[]
  badges: Badge[]
}

export interface InventoryItem {
  id: number
  name: string
  category: string
  image: string
  description: string
  condition: string
  estimatedValue: string
  isListed: boolean
}

export interface Badge {
  id: number
  name: string
  icon: string
  description: string
}

export const mockUserProfiles: UserProfile[] = [
  {
    id: 101,
    name: "Alex Chen",
    username: "alexc",
    avatar: "/placeholder.svg?height=200&width=200&text=AC",
    bio: "Vintage camera collector and photography enthusiast. Looking to trade camera gear and accessories.",
    location: "Brooklyn, NY",
    rating: 4.8,
    reviewCount: 24,
    completedTrades: 31,
    isOnline: true,
    joinDate: "2024-01-15",
    inventory: [
      {
        id: 1001,
        name: "Vintage Nikon F2 Camera",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Nikon+F2",
        description: "Classic Nikon F2 in excellent condition. Comes with 50mm lens and original case.",
        condition: "Excellent",
        estimatedValue: "$450",
        isListed: true,
      },
      {
        id: 1002,
        name: "Canon AE-1 Program",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Canon+AE-1",
        description: "Canon AE-1 Program 35mm film camera. Fully functional with minor cosmetic wear.",
        condition: "Good",
        estimatedValue: "$200",
        isListed: true,
      },
      {
        id: 1003,
        name: "Camera Lens Collection",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Lens+Collection",
        description: "Set of 3 vintage prime lenses. 28mm, 50mm, and 135mm.",
        condition: "Very Good",
        estimatedValue: "$350",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 1,
        name: "Trusted Trader",
        icon: "shield-check",
        description: "Completed over 25 successful trades",
      },
      {
        id: 2,
        name: "Quick Responder",
        icon: "clock",
        description: "Responds to messages within 2 hours on average",
      },
    ],
  },
  {
    id: 102,
    name: "Jordan Lee",
    username: "jlee",
    avatar: "/placeholder.svg?height=200&width=200&text=JL",
    bio: "Mechanical keyboard enthusiast and tech collector. Always looking for rare keycap sets and vintage tech.",
    location: "Manhattan, NY",
    rating: 4.9,
    reviewCount: 36,
    completedTrades: 42,
    isOnline: false,
    joinDate: "2023-11-03",
    inventory: [
      {
        id: 2001,
        name: "Custom Mechanical Keyboard",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Mech+Keyboard",
        description: "Custom built mechanical keyboard with Gateron Brown switches and PBT keycaps.",
        condition: "Excellent",
        estimatedValue: "$280",
        isListed: true,
      },
      {
        id: 2002,
        name: "Vintage IBM Model M Keyboard",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=IBM+Model+M",
        description: "Original IBM Model M keyboard from 1989. Buckling spring switches in working condition.",
        condition: "Good",
        estimatedValue: "$180",
        isListed: true,
      },
      {
        id: 2003,
        name: "Artisan Keycap Collection",
        category: "Collectibles",
        image: "/placeholder.svg?height=300&width=300&text=Artisan+Keycaps",
        description: "Collection of 5 limited edition artisan keycaps.",
        condition: "Mint",
        estimatedValue: "$250",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 3,
        name: "Power Trader",
        icon: "zap",
        description: "Completed over 40 successful trades",
      },
      {
        id: 4,
        name: "Verified Seller",
        icon: "check-circle",
        description: "Identity and listings verified by NeoTradez",
      },
    ],
  },
  {
    id: 103,
    name: "Taylor Kim",
    username: "tkim",
    avatar: "/placeholder.svg?height=200&width=200&text=TK",
    bio: "Fashion and accessory collector. Interested in vintage clothing, designer items, and unique accessories.",
    location: "Queens, NY",
    rating: 4.7,
    reviewCount: 19,
    completedTrades: 23,
    isOnline: true,
    joinDate: "2024-02-10",
    inventory: [
      {
        id: 3001,
        name: "Designer Sunglasses",
        category: "Fashion",
        image: "/placeholder.svg?height=300&width=300&text=Sunglasses",
        description: "Ray-Ban Wayfarer sunglasses in black. Includes original case and cleaning cloth.",
        condition: "Like New",
        estimatedValue: "$120",
        isListed: true,
      },
      {
        id: 3002,
        name: "Vintage Leather Jacket",
        category: "Fashion",
        image: "/placeholder.svg?height=300&width=300&text=Leather+Jacket",
        description: "Genuine leather jacket from the 80s. Medium size with minimal wear.",
        condition: "Very Good",
        estimatedValue: "$200",
        isListed: true,
      },
      {
        id: 3003,
        name: "Designer Watch",
        category: "Accessories",
        image: "/placeholder.svg?height=300&width=300&text=Watch",
        description: "Minimalist design watch with leather strap. Swiss movement.",
        condition: "Excellent",
        estimatedValue: "$350",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 5,
        name: "Style Expert",
        icon: "shopping-bag",
        description: "Specializes in fashion and accessory trades",
      },
    ],
  },
  {
    id: 104,
    name: "Sam Rivera",
    username: "srivera",
    avatar: "/placeholder.svg?height=200&width=200&text=SR",
    bio: "Outdoor enthusiast and gear collector. Looking to trade camping, hiking, and water sports equipment.",
    location: "Bronx, NY",
    rating: 4.6,
    reviewCount: 15,
    completedTrades: 18,
    isOnline: false,
    joinDate: "2024-01-05",
    inventory: [
      {
        id: 4001,
        name: "Mountain Bike",
        category: "Sports & Outdoors",
        image: "/placeholder.svg?height=300&width=300&text=Mountain+Bike",
        description: "Specialized Rockhopper mountain bike. 29-inch wheels, hydraulic disc brakes.",
        condition: "Good",
        estimatedValue: "$450",
        isListed: true,
      },
      {
        id: 4002,
        name: "Kayak",
        category: "Sports & Outdoors",
        image: "/placeholder.svg?height=300&width=300&text=Kayak",
        description: "10-foot recreational kayak. Includes paddle and life vest.",
        condition: "Very Good",
        estimatedValue: "$300",
        isListed: true,
      },
      {
        id: 4003,
        name: "Camping Tent",
        category: "Sports & Outdoors",
        image: "/placeholder.svg?height=300&width=300&text=Tent",
        description: "4-person dome tent. Waterproof with rainfly. Used only twice.",
        condition: "Like New",
        estimatedValue: "$150",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 6,
        name: "Outdoor Expert",
        icon: "mountain",
        description: "Specializes in outdoor gear and equipment",
      },
    ],
  },
  {
    id: 105,
    name: "Jamie Wilson",
    username: "jwilson",
    avatar: "/placeholder.svg?height=200&width=200&text=JW",
    bio: "Music lover and vinyl collector. Looking to trade records, audio equipment, and instruments.",
    location: "Staten Island, NY",
    rating: 4.9,
    reviewCount: 28,
    completedTrades: 34,
    isOnline: true,
    joinDate: "2023-10-20",
    inventory: [
      {
        id: 5001,
        name: "Vinyl Record Collection",
        category: "Music & Media",
        image: "/placeholder.svg?height=300&width=300&text=Vinyl+Records",
        description: "Collection of 20 classic rock vinyl records. Includes Beatles, Pink Floyd, Led Zeppelin.",
        condition: "Very Good",
        estimatedValue: "$300",
        isListed: true,
      },
      {
        id: 5002,
        name: "Vintage Turntable",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Turntable",
        description: "Technics SL-1200 turntable. Fully functional with new stylus.",
        condition: "Good",
        estimatedValue: "$400",
        isListed: true,
      },
      {
        id: 5003,
        name: "Acoustic Guitar",
        category: "Musical Instruments",
        image: "/placeholder.svg?height=300&width=300&text=Guitar",
        description: "Yamaha FG800 acoustic guitar. Solid top with hardshell case included.",
        condition: "Excellent",
        estimatedValue: "$250",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 7,
        name: "Music Enthusiast",
        icon: "music",
        description: "Specializes in music-related trades",
      },
      {
        id: 8,
        name: "Top Rated",
        icon: "star",
        description: "Maintains a 4.9+ rating with over 25 reviews",
      },
    ],
  },
  {
    id: 106,
    name: "Morgan Chen",
    username: "mchen",
    avatar: "/placeholder.svg?height=200&width=200&text=MC",
    bio: "Photography enthusiast and gear collector. Specializing in camera lenses and accessories.",
    location: "Brooklyn, NY",
    rating: 4.7,
    reviewCount: 21,
    completedTrades: 26,
    isOnline: false,
    joinDate: "2023-12-15",
    inventory: [
      {
        id: 6001,
        name: "Camera Lens",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Camera+Lens",
        description: "Canon 50mm f/1.8 prime lens. Perfect condition with both caps and hood.",
        condition: "Excellent",
        estimatedValue: "$120",
        isListed: true,
      },
      {
        id: 6002,
        name: "Camera Tripod",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Tripod",
        description: "Manfrotto carbon fiber tripod. Lightweight and sturdy.",
        condition: "Very Good",
        estimatedValue: "$180",
        isListed: true,
      },
      {
        id: 6003,
        name: "Camera Bag",
        category: "Electronics",
        image: "/placeholder.svg?height=300&width=300&text=Camera+Bag",
        description: "Lowepro camera backpack. Multiple compartments with rain cover.",
        condition: "Good",
        estimatedValue: "$80",
        isListed: false,
      },
    ],
    badges: [
      {
        id: 9,
        name: "Photography Pro",
        icon: "camera",
        description: "Specializes in photography equipment trades",
      },
    ],
  },
]

"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Meetup } from "@/types/meetup"

// Define the context type
type MeetupContextType = {
  meetups: Meetup[]
  getMeetup: (id: string) => Meetup | null
  proposeMeetup: (meetupData: Partial<Meetup>) => Promise<Meetup>
  confirmMeetup: (id: string) => Promise<Meetup>
  requestMeetupChange: (
    id: string,
    changeType: "location" | "date" | "time" | "both",
    changeData: any,
  ) => Promise<Meetup>
  cancelMeetup: (id: string, reason: string) => Promise<void>
}

// Create the context
const MeetupContext = createContext<MeetupContextType | undefined>(undefined)

// Mock data for initial meetups
const initialMeetups: Meetup[] = [
  {
    id: "meetup-1",
    trade: {
      id: "trade-123",
      title: "Vintage Camera for Gaming Console",
      yourItem: {
        id: "item-1",
        title: "Gaming Console",
        image: "/placeholder.svg?height=100&width=100&text=Console",
        condition: "Like New",
        rarity: "Common",
      },
      theirItem: {
        id: "item-2",
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100&text=Camera",
        condition: "Good",
        rarity: "Uncommon",
      },
      owner: {
        id: "user-789",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=50&width=50&text=JS",
        location: {
          address: "Manhattan, NY",
          coordinates: { lat: 40.7831, lng: -73.9712 },
        },
      },
    },
    initiator: {
      id: "user-123",
      name: "Current User",
      avatar: "/placeholder.svg?height=50&width=50&text=CU",
      location: {
        address: "Brooklyn, NY",
        coordinates: { lat: 40.6782, lng: -73.9442 },
      },
    },
    recipient: {
      id: "user-789",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=50&width=50&text=JS",
      location: {
        address: "Manhattan, NY",
        coordinates: { lat: 40.7831, lng: -73.9712 },
      },
    },
    meetup: {
      location: {
        id: "loc-1",
        name: "Madison Square Park",
        address: "Madison Ave & E 23rd St, New York, NY 10010",
        type: "Park",
        coordinates: { lat: 40.742, lng: -73.9874 },
        safetyRating: 4.8,
      },
      date: "2025-05-25",
      time: "2:30 PM",
      timeRange: "afternoon",
      notes: "I'll be wearing a blue jacket. Let's meet near the fountain.",
    },
    status: "confirmed",
    proposedAt: "2025-05-15T14:30:00Z",
    confirmedAt: "2025-05-16T10:15:00Z",
  },
  {
    id: "meetup-2",
    trade: {
      id: "trade-456",
      title: "Mechanical Keyboard for Vintage Records",
      yourItem: {
        id: "item-3",
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100&text=Keyboard",
        condition: "Excellent",
        rarity: "Common",
      },
      theirItem: {
        id: "item-4",
        title: "Vintage Records",
        image: "/placeholder.svg?height=100&width=100&text=Records",
        condition: "Good",
        rarity: "Rare",
      },
      owner: {
        id: "user-456",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=50&width=50&text=AJ",
        location: {
          address: "Queens, NY",
          coordinates: { lat: 40.7282, lng: -73.7949 },
        },
      },
    },
    initiator: {
      id: "user-456",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50&text=AJ",
      location: {
        address: "Queens, NY",
        coordinates: { lat: 40.7282, lng: -73.7949 },
      },
    },
    recipient: {
      id: "user-123",
      name: "Current User",
      avatar: "/placeholder.svg?height=50&width=50&text=CU",
      location: {
        address: "Brooklyn, NY",
        coordinates: { lat: 40.6782, lng: -73.9442 },
      },
    },
    meetup: {
      location: {
        id: "loc-2",
        name: "Central Park - Columbus Circle",
        address: "Columbus Circle, New York, NY 10019",
        type: "Park",
        coordinates: { lat: 40.7679, lng: -73.9814 },
        safetyRating: 4.7,
      },
      date: "2025-06-05",
      time: "11:00 AM",
      timeRange: "morning",
      notes: "I'll bring the records in a protective case.",
    },
    status: "pending",
    proposedAt: "2025-05-20T09:45:00Z",
  },
]

// Create the provider component
export function MeetupProvider({ children }) {
  const [meetups, setMeetups] = useState<Meetup[]>([])

  // Initialize meetups from localStorage or use initial data
  useEffect(() => {
    const storedMeetups = localStorage.getItem("meetups")
    if (storedMeetups) {
      setMeetups(JSON.parse(storedMeetups))
    } else {
      setMeetups(initialMeetups)
    }
  }, [])

  // Save meetups to localStorage when they change
  useEffect(() => {
    if (meetups.length > 0) {
      localStorage.setItem("meetups", JSON.stringify(meetups))
    }
  }, [meetups])

  // Get a meetup by ID
  const getMeetup = (id: string) => {
    return meetups.find((meetup) => meetup.id === id) || null
  }

  // Propose a new meetup
  const proposeMeetup = async (meetupData: Partial<Meetup>) => {
    // Generate a new ID
    const id = `meetup-${Date.now()}`

    // Create the new meetup
    const newMeetup: Meetup = {
      id,
      ...meetupData,
      status: "pending",
      proposedAt: new Date().toISOString(),
    } as Meetup

    // Add to meetups
    setMeetups((prev) => [...prev, newMeetup])

    return newMeetup
  }

  // Confirm a meetup
  const confirmMeetup = async (id: string) => {
    const updatedMeetups = meetups.map((meetup) => {
      if (meetup.id === id) {
        return {
          ...meetup,
          status: "confirmed",
          confirmedAt: new Date().toISOString(),
        }
      }
      return meetup
    })

    setMeetups(updatedMeetups)

    return updatedMeetups.find((meetup) => meetup.id === id) as Meetup
  }

  // Request a change to a meetup
  const requestMeetupChange = async (
    id: string,
    changeType: "location" | "date" | "time" | "both",
    changeData: any,
  ) => {
    const updatedMeetups = meetups.map((meetup) => {
      if (meetup.id === id) {
        return {
          ...meetup,
          status: "change-requested",
          changeRequested: {
            type: changeType,
            data: changeData,
            requestedAt: new Date().toISOString(),
          },
        }
      }
      return meetup
    })

    setMeetups(updatedMeetups)

    return updatedMeetups.find((meetup) => meetup.id === id) as Meetup
  }

  // Cancel a meetup
  const cancelMeetup = async (id: string, reason: string) => {
    const updatedMeetups = meetups.map((meetup) => {
      if (meetup.id === id) {
        return {
          ...meetup,
          status: "cancelled",
          cancelReason: reason,
          cancelledAt: new Date().toISOString(),
        }
      }
      return meetup
    })

    setMeetups(updatedMeetups)
  }

  // Create the context value
  const contextValue: MeetupContextType = {
    meetups,
    getMeetup,
    proposeMeetup,
    confirmMeetup,
    requestMeetupChange,
    cancelMeetup,
  }

  return <MeetupContext.Provider value={contextValue}>{children}</MeetupContext.Provider>
}

// Create a hook to use the context
export function useMeetup() {
  const context = useContext(MeetupContext)
  if (context === undefined) {
    throw new Error("useMeetup must be used within a MeetupProvider")
  }
  return context
}

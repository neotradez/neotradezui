export type Coordinates = {
  lat: number
  lng: number
}

export type Location = {
  address: string
  coordinates: Coordinates
}

export type MeetupLocation = {
  id: string
  name: string
  address: string
  type: string
  coordinates: Coordinates
  safetyRating?: number
}

export type TradeItem = {
  id: string
  title: string
  image: string
  condition: string
  rarity: string
}

export type TradeOwner = {
  id: string
  name: string
  avatar: string
  location: Location
}

export type Trade = {
  id: string
  title: string
  yourItem: TradeItem
  theirItem: TradeItem
  owner: TradeOwner
}

export type User = {
  id: string
  name: string
  avatar: string
  location: Location
}

export type MeetupDetails = {
  location: MeetupLocation
  date: string
  time: string
  timeRange: string
  notes?: string
}

export type ChangeRequest = {
  type: "location" | "date" | "time" | "both"
  data: any
  requestedAt: string
}

export type Meetup = {
  id: string
  trade: Trade
  initiator: User
  recipient: User
  meetup: MeetupDetails
  status: "pending" | "confirmed" | "change-requested" | "cancelled" | "completed"
  proposedAt: string
  confirmedAt?: string
  changeRequested?: ChangeRequest
  cancelReason?: string
  cancelledAt?: string
  completedAt?: string
}

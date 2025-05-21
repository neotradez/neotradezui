"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface RescheduleMeetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tradeId: string
  currentDate?: Date
  currentTime?: string
  traderId: string
  traderName: string
}

export function RescheduleMeetupDialog({
  open,
  onOpenChange,
  tradeId,
  currentDate,
  currentTime,
  traderId,
  traderName,
}: RescheduleMeetupDialogProps) {
  const [date, setDate] = useState<Date | undefined>(currentDate || undefined)
  const [timeSlot, setTimeSlot] = useState<string>(currentTime || "")
  const [note, setNote] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const timeSlots = ["Morning (8:00 AM - 12:00 PM)", "Afternoon (12:00 PM - 5:00 PM)", "Evening (5:00 PM - 9:00 PM)"]

  const handleSubmit = async () => {
    if (!date || !timeSlot) {
      toast({
        title: "Missing information",
        description: "Please select both a date and time for the meetup.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, this would be an API call to reschedule the meetup
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Reschedule request sent",
        description: `${traderName} will be notified of your request to reschedule.`,
      })

      onOpenChange(false)
      router.push("/schedule")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reschedule request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reschedule Meetup</DialogTitle>
          <DialogDescription>Propose a new date and time for your meetup with {traderName}.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <div className="col-span-3">
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot">
                    {timeSlot ? (
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {timeSlot}
                      </div>
                    ) : (
                      "Select a time slot"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="note" className="text-right pt-2">
              Note
            </Label>
            <Textarea
              id="note"
              placeholder="Add a note about why you're rescheduling..."
              className="col-span-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !date || !timeSlot}>
            {isSubmitting ? "Sending request..." : "Send reschedule request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

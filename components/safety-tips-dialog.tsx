import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, Users, MapPin, Clock, AlertTriangle } from "lucide-react"

interface SafetyTipsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SafetyTipsDialog({ open, onOpenChange }: SafetyTipsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Meetup Safety Tips
          </DialogTitle>
          <DialogDescription>Follow these guidelines to ensure a safe trading experience</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Meet in Public Places</h3>
              <p className="text-sm text-muted-foreground">
                Always meet in well-lit, busy public locations like coffee shops, shopping malls, or police station
                parking lots. Avoid private homes or secluded areas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Bring Someone With You</h3>
              <p className="text-sm text-muted-foreground">
                If possible, bring a friend or family member to the meetup. There's safety in numbers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Meet During Daylight Hours</h3>
              <p className="text-sm text-muted-foreground">
                Schedule your meetups during daylight hours when possible. Visibility improves safety.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Trust Your Instincts</h3>
              <p className="text-sm text-muted-foreground">
                If something feels wrong or suspicious, don't hesitate to leave the situation. Your safety is more
                important than any trade.
              </p>
            </div>
          </div>

          <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-900/20 mt-4">
            <p className="text-sm font-medium">Additional Tips:</p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
              <li>Share your meetup details with a trusted friend or family member</li>
              <li>Keep your phone charged and easily accessible</li>
              <li>Inspect items thoroughly before completing the trade</li>
              <li>Be wary of last-minute location changes</li>
              <li>Report any suspicious behavior to NeoTradez support</li>
            </ul>
          </div>
        </div>
        <DialogClose asChild>
          <Button className="w-full">Got it</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

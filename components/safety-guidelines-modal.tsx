"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield } from "lucide-react"

interface SafetyGuidelinesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SafetyGuidelinesModal({ isOpen, onClose }: SafetyGuidelinesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Safety Guidelines
          </DialogTitle>
          <DialogDescription>Follow these guidelines to ensure safe trading experiences.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Meeting in Person</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always meet in public, well-lit places like coffee shops or shopping centers.</li>
                <li>Consider bringing a friend or family member with you.</li>
                <li>Share your meeting details with someone you trust.</li>
                <li>Use the app's location sharing feature during meetups.</li>
                <li>Trust your instincts - if something feels wrong, cancel the meetup.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Verifying Items</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Inspect items thoroughly before completing the trade.</li>
                <li>Test electronic items to ensure they work properly.</li>
                <li>Verify that collectibles or valuable items are authentic.</li>
                <li>Don't rush the inspection process - take your time.</li>
                <li>If the item differs significantly from its description, you can decline the trade.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Communication</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Keep all communication within the app for your protection.</li>
                <li>Be wary of users who insist on moving conversations to other platforms.</li>
                <li>Maintain respectful and clear communication.</li>
                <li>Document any agreements about the condition or details of items.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Avoiding Scams</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Never send money or gift cards to "hold" an item.</li>
                <li>Be cautious of deals that seem too good to be true.</li>
                <li>Check user profiles, ratings, and trade history before agreeing to meet.</li>
                <li>Report suspicious behavior immediately through the app.</li>
                <li>Don't share personal financial information with other traders.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">After the Trade</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mark the trade as completed in the app.</li>
                <li>Leave honest feedback about your experience.</li>
                <li>Report any issues that occurred during the trade.</li>
                <li>If you discover an issue with an item after trading, contact support promptly.</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

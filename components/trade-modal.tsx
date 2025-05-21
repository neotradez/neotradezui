"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, MapPin, Star, X } from "lucide-react"
import { TradeProposalForm } from "@/components/trade-proposal-form"

export function TradeModal({ trade, onClose }) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-auto p-0 dark:bg-[#121212]">
        <DialogHeader className="sticky top-0 z-10 bg-background/80 p-4 backdrop-blur-md dark:bg-[#121212]/80">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-heading text-xl">{trade.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            <div className="flex items-center gap-2 text-sm">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={trade.owner.avatar || "/placeholder.svg"}
                  alt={trade.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{trade.owner.name}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-3 w-3 fill-amber-500" />
                <span>{trade.owner.rating}</span>
              </div>
              <span className="ml-auto flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {trade.location}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="sticky top-[72px] z-10 w-full justify-start bg-background/80 px-4 backdrop-blur-md dark:bg-[#121212]/80">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="propose">Propose Trade</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 p-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border/40 dark:border-border/20">
                <Image src={trade.image || "/placeholder.svg"} alt={trade.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                      {trade.category}
                    </Badge>
                    <div className="ml-auto text-sm font-medium">
                      Estimated Value: <span className="text-[#00D084]">${trade.estimatedValue}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{trade.description}</p>
                </div>

                <div className="mb-6 rounded-lg border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
                  <h4 className="mb-2 flex items-center gap-2 font-medium">
                    <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                    Looking for:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trade.lookingFor.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setActiveTab("propose")}
                  className="mt-auto group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Propose a Trade <ArrowLeftRight className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="propose" className="mt-0">
            <TradeProposalForm trade={trade} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

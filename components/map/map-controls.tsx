"use client"

import { Plus, Minus, Locate, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MapControls({ zoom, onZoomChange }) {
  const [mapType, setMapType] = useState("standard")

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 1, 18))
  }

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 1, 5))
  }

  const handleLocate = () => {
    // In a real app, this would use the browser's geolocation API
    // For now, just log to console
    console.log("Locating user...")
  }

  const handleMapTypeChange = (type) => {
    setMapType(type)
    // In a real app, this would change the map style
    console.log("Map type changed to:", type)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/95 shadow-md backdrop-blur-sm dark:bg-[#1a1a1a]/90"
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Zoom in</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom in</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/95 shadow-md backdrop-blur-sm dark:bg-[#1a1a1a]/90"
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Zoom out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom out</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/95 shadow-md backdrop-blur-sm dark:bg-[#1a1a1a]/90"
              onClick={handleLocate}
            >
              <Locate className="h-4 w-4" />
              <span className="sr-only">My location</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>My location</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/95 shadow-md backdrop-blur-sm dark:bg-[#1a1a1a]/90"
                >
                  <Layers className="h-4 w-4" />
                  <span className="sr-only">Map type</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Map type</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleMapTypeChange("standard")}>Standard</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMapTypeChange("satellite")}>Satellite</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMapTypeChange("terrain")}>Terrain</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  )
}

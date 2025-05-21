"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export interface TouchFriendlyButtonProps extends ButtonProps {
  touchClassName?: string
}

const TouchFriendlyButton = forwardRef<HTMLButtonElement, TouchFriendlyButtonProps>(
  ({ className, touchClassName, children, ...props }, ref) => {
    const isMobile = useMobile()

    return (
      <Button
        ref={ref}
        className={cn(
          className,
          isMobile &&
            cn(
              "min-h-[44px] min-w-[44px]", // Ensure touch target is at least 44x44px
              touchClassName,
            ),
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
TouchFriendlyButton.displayName = "TouchFriendlyButton"

export { TouchFriendlyButton }

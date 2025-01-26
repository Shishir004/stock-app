import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        destructive:
          'border-destructive/50 bg-destructive/50 text-destructive focus-visible:ring-destructive/50',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Input = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <input
      className={cn(inputVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input, inputVariants }
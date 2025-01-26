import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label className={cn(labelVariants(), className)} ref={ref} {...props} />
  )
})
Label.displayName = 'Label'

export { Label, labelVariants }
import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-lg bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Card = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      className={cn(cardVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
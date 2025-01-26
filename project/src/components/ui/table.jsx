import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tableVariants = cva('w-full caption-bottom text-left text-sm', {
  variants: {
    variant: {
      default: 'border',
      plain: 'border-none',
    },
    size: {
      default: 'p-4',
      sm: 'p-2',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const Table = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn(tableVariants({ variant, size, className }))} ref={ref} {...props} />
    </div>
  )
})
Table.displayName = 'Table'

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot className={cn('bg-primary font-semibold text-primary-foreground', className)} ref={ref} {...props} />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} ref={ref} {...props} />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th className={cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption className={cn('mt-4 text-sm text-muted-foreground', className)} ref={ref} {...props} />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, tableVariants }
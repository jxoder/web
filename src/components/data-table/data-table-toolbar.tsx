import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'
import React from 'react'

interface IProps {
  table: Table<any>
  filterRenderer?: () => React.ReactNode
}

export const DataTableToolbar: React.FC<IProps> = props => {
  const { table, filterRenderer } = props
  return (
    <div className="flex flex-wrap items-center justify-between mb-4">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {filterRenderer?.()}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                column =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide(),
              )
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

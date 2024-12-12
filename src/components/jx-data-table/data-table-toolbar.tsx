import { Table } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { RefreshCcw, SlidersHorizontal } from 'lucide-react'

interface IProps<TData> {
  table: Table<TData>
  refetch?: () => void
  render?: () => React.ReactNode | JSX.Element
  toolbarRender?: () => React.ReactNode | JSX.Element
}

export const JXDataTableToolbar = <TData,>(props: IProps<TData>) => {
  const { table, render, toolbarRender, refetch } = props

  return (
    <div className="flex flex-wrap items-center justify-between">
      {!!render ? render?.() : <div></div>}

      <div className="flex items-center gap-2">
        {!!toolbarRender && toolbarRender?.()}
        {!!refetch && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => refetch?.()}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
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

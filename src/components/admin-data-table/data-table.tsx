import { flexRender, Table as TanstackTable } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { DataTableRow } from './data-table-row'
import React from 'react'

interface IDataTableProps<TData> {
  table: TanstackTable<TData>
  loading?: boolean
  detailRenderer?: (data: TData) => React.ReactNode
}

export const DataTable = <TData,>(props: IDataTableProps<TData>) => {
  const renderHeader = React.useMemo(() => {
    return (
      <TableHeader>
        {props.table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
    )
  }, [props.table])

  // loading..
  if (props.loading) {
    return (
      <div className="rounded-md border">
        <Table>
          {renderHeader}
          <TableBody>
            {Array.from({ length: 10 }, (_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: 3 }, (_, i) => (
                  <TableCell key={i} className="px-4 py-3">
                    <Skeleton className="h-8 w-[60%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // no data
  if (!props.table.getRowModel().rows?.length) {
    return (
      <div className="rounded-md border">
        <Table>
          {renderHeader}
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={props.table.getHeaderGroups()[0].headers.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        {renderHeader}

        {/* Table Content */}
        <TableBody>
          {props.table.getRowModel().rows.map(row => {
            return (
              <DataTableRow
                key={row.id}
                data={row.original}
                renderer={props.detailRenderer}
              >
                <TableRow>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </DataTableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

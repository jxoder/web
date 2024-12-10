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

interface IProps<TData> {
  table: TanstackTable<TData>
  loading?: boolean
}

export const JXDataTableView = <TData,>(props: IProps<TData>) => {
  const { table, loading } = props

  return (
    <div className="rounded-md border">
      <Table>
        {/* table header */}
        <TableHeader>
          {table.getHeaderGroups().map(hg => (
            <TableRow key={hg.id}>
              {hg.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {/* table body */}
        <TableBody>
          {/* data view */}
          {table.getRowModel().rows.map(row => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}

          {/* loading view */}
          {loading &&
            Array.from({ length: 10 }, (_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: 3 }, (_, i) => (
                  <TableCell key={i} className="px-4 py-3">
                    <Skeleton className="h-8 w-[60%]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {/* no data view */}
          {!table.getRowModel().rows?.length && !loading && (
            <TableRow>
              <TableCell
                colSpan={table.getHeaderGroups()[0].headers.length}
                className="h-40 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

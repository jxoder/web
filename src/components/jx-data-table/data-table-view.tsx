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
  onSelectRow?: (id: string | number | null | undefined) => void
  loading?: boolean
}

export const JXDataTableView = <TData,>(props: IProps<TData>) => {
  const { table, loading, onSelectRow } = props

  // 하단에 loading 조건으로 처리하면 로딩일때 렌더링이 안되는 이슈가 있어 컴포넌트 분리해서 처리
  // table.getRowModel().rows 를 조회하는 것이랑 react-query 로딩이랑 충돌나는 것 같음.
  if (loading) return <JXDataTableLoading table={table} />

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
          {table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.map(row => {
              return (
                <TableRow
                  key={row.id}
                  onClick={() => onSelectRow?.((row.original as any)?.id)}
                >
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

          {/* no data view */}
          {table.getRowModel().rows.length === 0 && (
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

export const JXDataTableLoading = <TData,>(props: IProps<TData>) => {
  const { table } = props

  return (
    <div className="rounded-md border">
      <Table>
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
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index} className="hover:bg-transparent">
              {Array.from({ length: 3 }, (_, i) => (
                <TableCell key={i} className="px-4 py-3">
                  <Skeleton className="h-6 w-[60%]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { JXDataTableView } from './data-table-view'
import { useQueryParamNumber } from '@/hooks/use-queryparam'
import { IListResponse } from '@/api/common'
import React from 'react'
import { JXDataTablePagination } from './data-table-pagination'
import { JXDataTableToolbar } from './data-table-toolbar'

interface IProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  list: (filters: object) => Promise<IListResponse<TData>>
  filters?: object

  // custom render
  filterRender?: () => React.ReactNode | JSX.Element
}

export const JXDataTable = <TData, TValue>(props: IProps<TData, TValue>) => {
  const { columns, list, filters, filterRender } = props

  const [page, setPage] = useQueryParamNumber('page', 1)
  const [size, setSize] = useQueryParamNumber('size', 10)

  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<
    Pick<IListResponse<TData>, 'list' | 'total'>
  >({
    list: [],
    total: 10,
  })

  const table = useReactTable({
    data: data.list,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const fetchData = React.useCallback(
    async (filters: object) => {
      const res = await list({ ...filters, page, size })
      setData(res)
    },
    [list, page, size],
  )

  React.useEffect(() => {
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, size])

  React.useEffect(() => {
    setLoading(true)
    fetchData({ ...filters }).finally(() => {
      setLoading(false)
    })
  }, [fetchData, filters])

  return (
    <div className="flex flex-col gap-4">
      <JXDataTableToolbar table={table} render={filterRender} />
      <JXDataTableView table={table} loading={loading} />
      <JXDataTablePagination
        pageSize={size}
        onChangePageSize={setSize}
        page={page}
        setPage={setPage}
        total={data.total}
      />
    </div>
  )
}

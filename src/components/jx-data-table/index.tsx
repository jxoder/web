import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { JXDataTableView } from './data-table-view'
import { IListResponse } from '@/api/common'
import React from 'react'
import { JXDataTablePagination } from './data-table-pagination'
import { JXDataTableToolbar } from './data-table-toolbar'
import { useQuery } from '@tanstack/react-query'
import { useQueryParam, withDefault, NumberParam } from 'use-query-params'

interface IProps<TData, TValue> {
  columns:
    | ColumnDef<TData, TValue>[]
    | ((refetch: () => void) => ColumnDef<TData, TValue>[])
  listApi: (filters: object) => Promise<IListResponse<TData>>
  token?: string // for refresh api
  filters?: object

  // custom render
  filterRender?: () => React.ReactNode | JSX.Element
  toolbarRender?: () => React.ReactNode | JSX.Element

  onSelectRow?: (id: any) => void
}

export const JXDataTable = <TData, TValue>(props: IProps<TData, TValue>) => {
  const {
    token,
    columns,
    listApi,
    filters = {},
    filterRender,
    onSelectRow,
    toolbarRender,
  } = props

  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1))
  const [size, setSize] = useQueryParam('size', withDefault(NumberParam, 10))

  const { data, isLoading, refetch, isRefetching } = useQuery<
    IListResponse<TData>
  >({
    queryKey: [token, filters, page, size],
    queryFn: () => {
      return listApi({ ...filters, page, size })
    },
  })

  const table = useReactTable({
    data: data?.list ?? [],
    columns: typeof columns === 'function' ? columns(refetch) : columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col gap-4">
      <JXDataTableToolbar
        table={table}
        render={filterRender}
        toolbarRender={toolbarRender}
        refetch={refetch}
      />
      <JXDataTableView
        table={table}
        loading={isLoading || isRefetching}
        onSelectRow={onSelectRow}
      />
      <JXDataTablePagination
        pageSize={size}
        onChangePageSize={setSize}
        page={page}
        setPage={setPage}
        total={data?.total ?? 1}
      />
    </div>
  )
}

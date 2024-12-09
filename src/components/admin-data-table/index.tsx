import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
import React from 'react'
import { IListResponse } from '@/api/common'
import { useToast } from '@/hooks/use-toast'

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  list: (filters: object) => Promise<IListResponse<TData>>
  filters?: object
  filterRenderer?: () => React.ReactNode
  detailRenderer?: (data: TData) => React.ReactNode
}

export const JXAdminDataTable = <TData, TValue>(
  props: IDataTableProps<TData, TValue>,
) => {
  const { list } = props
  const { toast } = useToast()
  const [page, setPage] = React.useState<number>(1)
  const [size, setSize] = React.useState<number>(10)

  const [data, setData] = React.useState<
    Pick<IListResponse<TData>, 'list' | 'total'>
  >({
    list: [],
    total: 10,
  })

  const [loading, setLoading] = React.useState<boolean>(false)
  const table = useReactTable({
    data: data.list,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // 데이터 로딩
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await list({ page, size, ...props.filters })
        setData(res)
      } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error)
        toast({
          duration: 1000,
          variant: 'destructive',
          title: '오류가 발생했습니다.',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [list, page, size, props.filters, toast])

  // 필터가 변경될 때 페이지를 초기화
  React.useEffect(() => {
    setPage(1)
  }, [props.filters])

  return (
    <>
      <DataTableToolbar table={table} filterRenderer={props.filterRenderer} />
      <DataTable
        table={table}
        loading={loading}
        detailRenderer={props.detailRenderer}
      />
      <DataTablePagination
        pageSize={size}
        onChangePageSize={setSize}
        page={page}
        setPage={setPage}
        total={data.total}
      />
    </>
  )
}

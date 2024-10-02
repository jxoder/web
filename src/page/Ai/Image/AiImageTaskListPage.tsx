import React from 'react'
import LoadableContainer from '../../../container/LoadableContainer'
import Table from '../../../components/base/Table'
import { useStore } from '../../../hook/useStore'
import {
  IAIImageTask,
  TASK_STATUS,
} from '../../../interface/models/ai-image-task.interface'
import Pagination from '../../../components/base/Pagination'

const COLUMNS = [
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'images',
    name: 'Images',
  },
  { key: 'error', name: 'Error' },
]

const AiImageTaskListPage: React.FC = () => {
  const store = useStore()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(1)
  const [total, setTotal] = React.useState<number>(0)
  const [list, setList] = React.useState<IAIImageTask[]>([])

  React.useEffect(() => {
    setLoading(true)
    store.api.comfy
      .listTasks({ page })
      .then(res => {
        setList(res.list)
        setTotal(res.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [store, page])

  return (
    <LoadableContainer loading={loading}>
      <Table
        columns={COLUMNS}
        list={list}
        renderTd={row => {
          const badgeMapper = (status: TASK_STATUS) => {
            switch (status) {
              case TASK_STATUS.WAITING:
                return { text: 'Waiting', color: '#F9C107' }
              case TASK_STATUS.ACTIVE:
                return { text: 'Active', color: '#3BA2B8' }
              case TASK_STATUS.SUCCESS:
                return { text: 'Success', color: '#3CA745' }
              case TASK_STATUS.FAILED:
                return { text: 'Failed', color: '#DC3545' }
            }
          }
          const { text, color } = badgeMapper(row.status)
          return (
            <>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {row.id}
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <div
                  className={`inline-flex rounded-full border border-[${color}] px-3 py-1 text-sm font-medium text-[${color}]`}
                >
                  {text}
                </div>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <div className="flex">
                  {(row.images ?? []).map((url: string, index: number) => {
                    return (
                      <img
                        className="w-24 mr-1"
                        key={index}
                        src={url}
                        alt="image"
                      />
                    )
                  })}
                </div>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                {row?.error ?? 'none'}
              </td>
            </>
          )
        }}
      />
      <div className="flex mt-5">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 10)}
          onPageChange={(page: number) => setPage(page)}
        />
      </div>
    </LoadableContainer>
  )
}

export default AiImageTaskListPage

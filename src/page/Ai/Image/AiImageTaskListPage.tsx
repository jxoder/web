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
          return (
            <>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {row.id}
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                {row.status === TASK_STATUS.WAITING && (
                  <div className="inline-flex rounded-full border border-[#F9C107] px-3 py-1 text-sm font-medium text-[#F9C107]">
                    Waiting
                  </div>
                )}
                {row.status === TASK_STATUS.ACTIVE && (
                  <div className="inline-flex rounded-full border border-[#3BA2B8] px-3 py-1 text-sm font-medium text-[#3BA2B8]">
                    Active
                  </div>
                )}
                {row.status === TASK_STATUS.SUCCESS && (
                  <div className="inline-flex rounded-full border border-[#3CA745] px-3 py-1 text-sm font-medium text-[#3CA745]">
                    Success
                  </div>
                )}
                {row.status === TASK_STATUS.FAILED && (
                  <div className="inline-flex rounded-full border border-[#DC3545] px-3 py-1 text-sm font-medium text-[#DC3545]">
                    Failed
                  </div>
                )}
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
        renderItem={row => {
          const model = (
            row.payload.ckpt_model ??
            row.payload.unet_model ??
            'UNKNOWN/unknown'
          )
            .split('/')[1]
            .replace(/.safetensors/g, '')

          const metadata = ['width', 'height', 'scheduler', 'sampler_name']
          const metadataName = (key: string) => {
            switch (key) {
              case 'sampler_name':
                return 'sampler'
              default:
                return key
            }
          }
          return (
            <div>
              <h1>ID: {row.id}</h1>
              {(row.images ?? []).map((url: string, index: number) => {
                return (
                  <img className="w-full" key={index} src={url} alt="image" />
                )
              })}

              <div className="mt-2" />
              <div className="inline-flex rounded border border-[#637381] px-2 py-1 text-sm font-medium text-[#637381] hover:opacity-80 mr-2 dark:border-white dark:text-white">
                {row.payload.type}
              </div>
              <div className="inline-flex rounded border border-[#212B36] px-2 py-1 text-sm font-medium text-[#212B36] hover:opacity-80 dark:border-white dark:text-white">
                {model}
              </div>
              <div className="mb-4" />
              <h2 className="font-bold">Prompt</h2>
              <p>{row.payload.prompt}</p>

              {row.payload.negative_prompt && (
                <>
                  <div className="mt-4" />
                  <h2 className="font-bold">Negative Prompt</h2>
                  <p>{row.payload.negative_prompt}</p>
                </>
              )}

              <div className="mb-6" />
              {metadata
                .filter(key => row.payload[key])
                .map((key, index) => {
                  return (
                    <div
                      key={index}
                      className="inline-flex rounded bg-[#637381] px-2 py-1 text-sm font-medium text-white hover:bg-opacity-90 mr-2"
                    >
                      {metadataName(key)}: {row.payload[key]}
                    </div>
                  )
                })}

              {/* {JSON.stringify(row.payload)} */}
            </div>
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

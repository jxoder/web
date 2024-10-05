import React from 'react'

interface IColumn {
  key: string
  name: string
  width?: string
}

interface ITableProps<T = any> {
  list: T[]
  columns: IColumn[]
  renderTd: (row: T) => React.ReactNode
  renderItem?: (row: T) => React.ReactNode
}

const Table: React.FC<ITableProps> = props => {
  const { columns } = props
  const [item, setItem] = React.useState<any | null>(null)

  // React.useEffect(() => {
  //   return () => setItem(null)
  // }, [])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="flex flex-col">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns.map((columns, index) => {
                  const cls = columns.width ? `min-w-[${columns.width}px] ` : ''
                  const first = index === 0 ? 'xl:pl-11' : ''
                  return (
                    <th
                      className={
                        cls +
                        first +
                        'py-4 px-4 font-medium text-black dark:text-white xl:pl-11'
                      }
                    >
                      {columns.name}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {props.list.map((row, index) => {
                return (
                  <tr
                    className={'cursor-pointer'}
                    key={index}
                    onClick={() => {
                      if (row === item) {
                        setItem(null)
                      } else {
                        setItem(row)
                      }
                    }}
                  >
                    {props.renderTd(row)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {props.renderItem && (
        <div
          className={`absolute top-0 right-0 h-full w-70 md:w-150 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out dark:bg-meta-4  ${
            item ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pl-4 h-full overflow-auto">
            <button
              className="w-24 h-4 flex items-center justify-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              onClick={() => setItem(null)}
            >
              Close
            </button>
            <div className="h-4" />
            {item && props.renderItem(item)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Table

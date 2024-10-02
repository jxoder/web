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
}

const Table: React.FC<ITableProps> = props => {
  const { columns } = props
  return (
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
              return <tr key={index}>{props.renderTd(row)}</tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table

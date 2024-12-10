import { JXDataTable } from '@/components/jx-data-table'
import React from 'react'
import { columns } from './column'
import { emailAccountApi } from '@/api'
import { Sheet } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { omitBy } from 'lodash'
import { useQueryParam } from 'use-query-params'
import { EmailAccountDetail } from './detail'

export const EmailAccountList: React.FC = () => {
  const [search, setSearch] = useDebounce<string>('', 500)
  const [selectedRow, setSelectedRow] = useQueryParam<string | undefined>(
    'emailAccountId',
  )

  const getFilters = React.useCallback(() => {
    return omitBy(
      {
        email: search.value,
      },
      v => !v || (typeof v === 'string' && !v.trim()),
    )
  }, [search.value])

  return (
    <div className="w-full h-full">
      <Sheet
        open={!!selectedRow}
        onOpenChange={() => setSelectedRow(undefined)}
      >
        <JXDataTable
          columns={columns}
          onSelectRow={id => setSelectedRow(id)}
          listApi={(filter: object) => emailAccountApi.list({ ...filter })}
          filters={getFilters()}
          filterRender={() => (
            <>
              <Input
                className="w-[150x] lg:w-[250px]"
                placeholder="email search..."
                onChange={e => setSearch(e.target.value?.trim())}
              />
            </>
          )}
        />
        {/* detail view */}
        {!!selectedRow && <EmailAccountDetail emailAccountId={selectedRow} />}
      </Sheet>
    </div>
  )
}

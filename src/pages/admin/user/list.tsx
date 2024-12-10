import { JXDataTable } from '@/components/jx-data-table'
import { Sheet } from '@/components/ui/sheet'
import React from 'react'
import { useQueryParam } from 'use-query-params'
import { columns } from './columns'
import { userApi } from '@/api'
import { UserDetail } from './detail'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/jx-data-table/faceted-filter'
import { USER_ROLE } from '@/api/user/user.model'
import { useDebounce } from '@/hooks/use-debounce'
import { omitBy } from 'lodash'

export const UserList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useQueryParam<string | undefined>(
    'userId',
  )
  const [selectedRoles, setSelectedRoles] = React.useState<Array<string>>([])
  const [name, setName] = useDebounce<string>('', 500)

  const getFilters = React.useCallback(() => {
    return omitBy(
      {
        name: name.value,
        role: selectedRoles,
      },
      v =>
        !v ||
        (typeof v === 'string' && !v.trim()) ||
        (Array.isArray(v) && v.length === 0),
    )
  }, [name.value, selectedRoles])

  return (
    <div className="w-full h-full">
      <Sheet
        open={!!selectedRow}
        onOpenChange={() => setSelectedRow(undefined)}
      >
        <JXDataTable
          columns={columns}
          onSelectRow={id => setSelectedRow(id)}
          listApi={(filter: object) => userApi.list({ ...filter })}
          filters={getFilters()}
          filterRender={() => (
            <>
              <Input
                className="h-8 w-[150px] lg:w-[250px]"
                placeholder="name search..."
                onChange={e => setName(e.target.value?.trim())}
              />
              <DataTableFacetedFilter
                title="role"
                selected={new Set(selectedRoles)}
                onSelected={(value: string[]) =>
                  setSelectedRoles(Array.from(new Set(value)))
                }
                options={[
                  { label: 'Master', value: USER_ROLE.MASTER },
                  { label: 'Admin', value: USER_ROLE.ADMIN },
                  { label: 'User', value: USER_ROLE.USER },
                ]}
              />
            </>
          )}
        />

        {!!selectedRow && <UserDetail userId={selectedRow} />}
      </Sheet>
    </div>
  )
}

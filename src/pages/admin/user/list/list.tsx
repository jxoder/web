import { userApi } from '@/api'
import React from 'react'
import { columns } from './columns'
import { JXDataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/data-table/faceted-filter'
import { USER_ROLE } from '@/api/user/user.model'
import { omitBy } from 'lodash'

export const UserList: React.FC = () => {
  const [roleSelected, setRoleSelected] = React.useState<Set<string>>(new Set())
  const [search, setSearch] = React.useState<string>('')

  const filters = React.useMemo(() => {
    const obj = {
      role: roleSelected.size > 0 ? Array.from(roleSelected) : undefined,
      search: search.length > 0 ? search : undefined,
    }

    return omitBy(obj, value => value === undefined)
  }, [roleSelected, search])

  return (
    <div className="w-full h-full">
      <JXDataTable
        columns={columns}
        list={userApi.list.bind(userApi)}
        filters={filters}
        filterRenderer={() => (
          <>
            <Input
              className="h-8 w-[150px] lg:w-[250px]"
              placeholder="search..."
              onChange={e => setSearch(e.target.value?.trim())}
            />
            <DataTableFacetedFilter
              title="role"
              selected={roleSelected}
              onSelected={(value: string[]) => setRoleSelected(new Set(value))}
              options={[
                { label: 'Master', value: USER_ROLE.MASTER },
                { label: 'Admin', value: USER_ROLE.ADMIN },
                { label: 'User', value: USER_ROLE.USER },
              ]}
            />
          </>
        )}
      />
    </div>
  )
}

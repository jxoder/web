import { User } from '@/api/user/user.model'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.getValue('createdAt')).toLocaleTimeString('ko-KR')}
        </span>
      )
    },
  },
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

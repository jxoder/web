import { ColumnDef } from '@tanstack/react-table'
import { EmailAccount } from '@/api/email/email.model'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export const columns: ColumnDef<EmailAccount>[] = [
  { accessorKey: 'id', header: 'ID' },
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
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => {
      const value = row.getValue<string>('userId')
      return (
        <div onClick={e => e.stopPropagation()}>
          <Link
            className="text-blue-500 underline"
            to={`/admin/users?userId=${value}`}
          >
            {value}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'loggedAt',
    header: 'Last Logged At',
    cell: ({ row }) => {
      const value = row.getValue<string>('loggedAt')
      return <span>{value ? dayjs(value).fromNow() : '-'}</span>
    },
  },
]

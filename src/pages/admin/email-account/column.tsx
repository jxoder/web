import { ColumnDef } from '@tanstack/react-table'
import { EmailAccount } from '@/api/email/email.model'
import dayjs from 'dayjs'

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
    accessorKey: 'loggedAt',
    header: 'Last Logged At',
    cell: ({ row }) => {
      const value = row.getValue<string>('loggedAt')

      if (!value) {
        return <span>-</span>
      }

      const now = dayjs()

      const daydiff = now.diff(value, 'days')

      if (daydiff > 0) {
        return <span>{daydiff}일 전</span>
      }

      const hourdiff = now.diff(value, 'hours')
      if (hourdiff > 0) {
        return <span>{hourdiff}시간 전</span>
      }

      return <span>{now.diff(value, 'minutes')}분 전</span>
    },
  },
]

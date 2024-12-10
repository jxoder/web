import { ColumnDef } from '@tanstack/react-table'
import { EmailAccount } from '@/api/email/email.model'

export const columns: ColumnDef<EmailAccount>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'createdAt', header: 'Created At' },
  { accessorKey: 'loggedAt', header: 'Last Logged At' },
  { accessorKey: 'email', header: 'Email' },
]

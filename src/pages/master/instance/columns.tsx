import { ColumnDef } from '@tanstack/react-table'
import { Instance, INSTANCE_STATUS } from '@/api/instance/instance.model'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { instanceApi } from '@/api'

export function createColumns(_refetch: () => void): ColumnDef<Instance>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    {
      accessorKey: 'provider',
      header: 'Provider',
      cell: ({ row }) => {
        return (
          <Badge className="font-mono" variant="outline">
            {row.original.provider}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const value = row.original.status
        switch (value) {
          case INSTANCE_STATUS.RUNNING:
            return (
              <Badge className="font-mono" variant="outline">
                Running
              </Badge>
            )
          case INSTANCE_STATUS.STOPPED:
            return (
              <Badge className="font-mono" variant="destructive">
                Stopped
              </Badge>
            )
          default:
            return (
              <Badge className="font-mono" variant="destructive">
                Unknown
              </Badge>
            )
        }
      },
    },
    {
      accessorKey: 'uptime',
      header: 'UpTime',
      cell: ({ row }) => {
        const instance = row.original
        if (!instance.uptime) return <div>--</div>

        if (instance.uptime < 0) {
          return <div>unknown</div>
        }

        const hours = 3600
        const days = hours * 24

        if (instance.uptime > days) {
          return <div>{Math.floor(instance.uptime / days)}d</div>
        }

        if (instance.uptime > hours) {
          return <div>{Math.floor(instance.uptime / hours)}h</div>
        }

        return <div>{instance.uptime} s</div>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const instance = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={async e => {
                  e.stopPropagation()
                  await instanceApi.turnOn(instance.id)
                }}
              >
                Start
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async e => {
                  e.stopPropagation()
                  await instanceApi.turnOff(instance.id)
                }}
              >
                Stop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}

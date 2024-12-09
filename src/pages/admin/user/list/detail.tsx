import { userApi } from '@/api'
import { User, USER_ROLE } from '@/api/user/user.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

interface IProps {
  row: User
}

export const UserDetail: React.FC<IProps> = props => {
  const [user, setUser] = React.useState<User>(props.row)
  const [loading, setLoading] = React.useState(false)

  const [updates, setUpdates] = React.useState<Partial<User>>({})

  React.useEffect(() => {
    setLoading(true)

    userApi
      .get(props.row.id)
      .then(res => setUser(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [props.row])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* conetent */}
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={updates?.name ?? user.name}
            className="col-span-3"
            onChange={e =>
              setUpdates(prev => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-4 items-center">
          <Label htmlFor="role">Role</Label>
          <Select
            value={updates?.role ?? user.role}
            onValueChange={value =>
              setUpdates(prev => ({ ...prev, role: value as USER_ROLE }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={USER_ROLE.ANONYMOUS}>Anonymous</SelectItem>
              <SelectItem value={USER_ROLE.ADMIN}>Admin</SelectItem>
              <SelectItem value={USER_ROLE.MASTER}>Master</SelectItem>
              <SelectItem value={USER_ROLE.USER}>User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* footer */}
      <div className="mt-auto flex justify-end">
        <Button
          onClick={() => {
            console.log(updates)
          }}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

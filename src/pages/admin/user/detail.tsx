import { userApi } from '@/api'
import { USER_ROLE } from '@/api/user/user.model'
import { Input } from '@/components/ui/input'
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@radix-ui/react-label'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

interface IProps {
  userId?: string
}

export const UserDetail: React.FC<IProps> = props => {
  const { userId } = props

  const { data, isLoading } = useQuery({
    queryKey: [userId],
    queryFn: () => {
      if (!userId || !Number(userId)) {
        return Promise.resolve(null)
      }

      return userApi.get(Number(userId))
    },
  })

  return (
    <SheetContent side="right" className="w-[400px]">
      <SheetTitle>상세 정보</SheetTitle>
      <SheetDescription></SheetDescription>

      {isLoading && <div>loading...</div>}
      {!isLoading && !data && <div>데이터가 없습니다.</div>}

      {!isLoading && data && (
        <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] xl:h-[calc(100vh-80px)] flex flex-col gap-4">
          <div className="h-full overflow-y-scroll scrollbar-hide px-1 pt-2 flex flex-col gap-4">
            <div className="grid grid-cols-4 items-center">
              <Label>ID</Label>
              <Input className="col-span-3" value={data.id} disabled />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                className="col-span-3"
                // onChange={e => {}}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="role">Role</Label>
              <Select
                value={data.role}
                // onValueChange={value => {}}
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
            <Button onClick={() => {}}>Update</Button>
          </div>
        </div>
      )}
    </SheetContent>
  )
}

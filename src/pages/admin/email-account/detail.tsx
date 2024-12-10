import { emailAccountApi } from '@/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface IProps {
  emailAccountId?: string
}

export const EmailAccountDetail: React.FC<IProps> = props => {
  const { emailAccountId } = props

  const { data, isLoading } = useQuery({
    queryKey: [emailAccountId],
    queryFn: () => {
      if (!emailAccountId || !Number(emailAccountId)) {
        return Promise.resolve(null)
      }

      return emailAccountApi.get(Number(emailAccountId))
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
              <Label>이메일</Label>
              <Input className="col-span-3" value={data.email} disabled />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label>마지막 로그인</Label>
              <Input
                className="col-span-3"
                value={data.loggedAt ?? ''}
                disabled
              />
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

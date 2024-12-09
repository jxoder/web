import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface IProps<TData> {
  children: React.ReactNode
  data: any
  renderer?: (data: TData) => React.ReactNode
}

export const DataTableRow = <TData,>(props: IProps<TData>) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>상세 정보</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {/* 여기에 상세 내용을 추가하세요 */}
        <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] xl:h-[calc(100vh-80px)] overflow-y-scroll scrollbar-hide px-1 pt-2">
          {props.renderer ? props.renderer(props.data) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}

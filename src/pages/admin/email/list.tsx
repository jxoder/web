import { JXDataTable } from '@/components/jx-data-table'
import React from 'react'
import { columns } from './column'
import { emailAccountApi } from '@/api'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export const EmailAccountList: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(false)
  const [search, setSearch] = useDebounce<string>('', 500)
  const [searchValue, setSearchValue] = React.useState<string>('')

  const handleToggle = (open: boolean) => {
    console.log(open)
    setToggle(open)
  }

  return (
    <div className="w-full h-full">
      <Input
        className="w-[150x] lg:w-[250px]"
        placeholder="email search..."
        onChange={e => setSearchValue(e.target.value?.trim())}
      />
      <Sheet open={!!toggle} onOpenChange={handleToggle}>
        <JXDataTable
          columns={columns}
          list={(filter: object) => emailAccountApi.list({ ...filter })}
          filterRender={() => (
            <>
              <Input
                className="w-[150x] lg:w-[250px]"
                placeholder="email search..."
                onChange={e => setSearchValue(e.target.value?.trim())}
              />
            </>
          )}
        />
        <SheetContent>
          <SheetTitle>상세 정보</SheetTitle>
          <SheetDescription>Test</SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  )
}

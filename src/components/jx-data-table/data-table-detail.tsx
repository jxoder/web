import { SheetContent, SheetDescription, SheetTitle } from '../ui/sheet'

export const DataTableSheetDetailContainer: React.FC<{
  title: string
  description?: string
  children: React.ReactNode
}> = props => {
  const { title, description, children } = props

  return (
    <SheetContent side="right" className="w-[450px]">
      <SheetTitle>{title}</SheetTitle>
      <SheetDescription>{description}</SheetDescription>

      <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-120px)] xl:h-[calc(100vh-80px)] flex flex-col gap-4">
        {children}
      </div>
    </SheetContent>
  )
}

export const DataTableSheetDetailContent: React.FC<{
  children?: React.ReactNode
}> = props => {
  const { children } = props

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide px-1 pt-2 flex flex-col gap-4">
      {children}
    </div>
  )
}

export const DataTableSheetDetailFooter: React.FC<{
  children: React.ReactNode
}> = props => {
  const { children } = props

  return <div className="flex justify-end">{children}</div>
}

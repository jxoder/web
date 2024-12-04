import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'

interface IProps {
  pathname: string
}

export const JXBreadcrum: React.FC<IProps> = props => {
  const { pathname } = props

  const paths = React.useMemo(
    () => pathname.split('/').filter(t => t.length !== 0),
    [pathname],
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((p, index) => {
          if (index === paths.length - 1) {
            return (
              <div className="flex items-center gap-2" key={index}>
                {index !== 0 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </div>
            )
          }
          return (
            <div className="flex items-center gap-2" key={index}>
              {index !== 0 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink to={`/${p}`}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
